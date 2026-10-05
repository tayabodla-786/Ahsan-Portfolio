import React, { useRef, useState } from 'react';
import { METHOD_INTRO, PHASES } from './content.js';
import { seeded } from './util.js';
import { useMediaQuery, useScrollFrame } from './hooks.js';
import { Dot } from './icons.jsx';

const pad = (n) => String(n).padStart(2, '0');
const clamp = (v) => Math.min(1, Math.max(0, v));
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgb = ([r, g, b], a = 1) => `rgba(${r}, ${g}, ${b}, ${a})`;
const WHITE = [255, 255, 255];
const INK = [23, 23, 23];
const PAPER = [240, 240, 248];

// The track starts sliding once the intro has had its moment
const SLIDE_FROM = 0.2;
// Where a panel's text has to cross for it to count as the current phase (fraction of viewport width)
const ACTIVE_LINE = 0.42;

// Ink drops that splash up into the dark section above as this one arrives
const random = seeded(41);
const DROPS = Array.from({ length: 22 }, (_, i) => ({
  x: (i / 21) * 1440 + (random() - 0.5) * 60,
  y: 120 + random() * 70,
  r: 26 + random() * 64,
  lag: random() * 0.35,
}));

const RAIL_X = [6.9, 66.9, 127, 187.1, 247.1];

const Method = () => {
  const narrow = useMediaQuery('(max-width: 720px)');
  const sec = useRef(null);
  const track = useRef(null);
  const intro = useRef(null);
  const fills = useRef([]);
  const drops = useRef([]);
  const [active, setActive] = useState(0);
  const [onRail, setOnRail] = useState(false);

  useScrollFrame(() => {
    const el = sec.current;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const p = clamp(-r.top / (r.height - vh));

    const enter = clamp((vh - r.top) / (vh * 0.9));
    drops.current.forEach((c, i) => c && c.setAttribute('r', (DROPS[i].r * clamp((enter - DROPS[i].lag) / (1 - DROPS[i].lag)) * 1.6).toFixed(1)));

    // intro rises in as the section arrives, then steps back for the track
    const inK = clamp(enter * 1.25 - 0.25);
    const outK = clamp((p - SLIDE_FROM + 0.06) / 0.07);
    intro.current.style.opacity = String(inK * (1 - outK));
    intro.current.style.transform = `scale(${0.95 + inK * 0.05 - outK * 0.03})`;

    // white → grey → ink over the last phases, accelerating at the end
    const t = Math.pow(clamp((p - 0.55) / 0.45), 2.2);
    el.style.setProperty('--method-bg', rgb(mix(WHITE, INK, t), t > 0.92 ? 1 - (t - 0.92) / 0.08 : 1));
    el.style.setProperty('--method-fg', rgb(mix(INK, PAPER, t)));
    el.style.setProperty('--method-border', t > 0.5 ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)');

    const W = narrow ? 0.85 : 0.7;
    const lead = narrow ? 0.06 : 0.08;
    const end = (narrow ? 0.1 : 0.23) - lead - (PHASES.length - 1) * W;
    const q = clamp((p - SLIDE_FROM) / (1 - SLIDE_FROM));
    const x = 1 + (end - 1) * q;
    track.current.style.transform = `translate3d(${(x * vw).toFixed(1)}px, 0, 0)`;

    // panel i is current once its text has crossed the active line
    const v = (ACTIVE_LINE - lead - x) / W;
    setActive(Math.max(0, Math.min(PHASES.length - 1, Math.floor(v))));
    fills.current.forEach((f, j) => f && f.setAttribute('width', (47 * clamp(v - j)).toFixed(1)));
    setOnRail(p > SLIDE_FROM + 0.02 && r.bottom > vh * 0.5);
  });

  return (
    <section id="method" ref={sec} className="ev-method" aria-labelledby="method-title" style={{ '--n': PHASES.length }}>
      <svg className="ev-splash" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="ev-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
        </defs>
        <g filter="url(#ev-goo)">
          {DROPS.map((d, i) => (
            <circle key={i} ref={(c) => (drops.current[i] = c)} cx={d.x} cy={d.y} r="0" />
          ))}
          <rect x="-20" y="190" width="1480" height="20" />
        </g>
      </svg>

      <div className="ev-method-stage">
        <div className="ev-method-intro" ref={intro}>
          <p className="ev-eyebrow">[ the framework ]</p>
          <h2 id="method-title" className="ev-display">
            The 5 method
            <Dot />
          </h2>
          <p className="ev-method-lead">{METHOD_INTRO}</p>
          <p className="ev-method-steps">
            {PHASES.slice(0, -1).map((ph) => ph.name).join(' · ')} · <span className="ev-accent">{PHASES.at(-1).name}</span>
          </p>
        </div>

        <div className="ev-method-track" ref={track}>
          {PHASES.map((ph, i) => (
            <article key={ph.name} className={`ev-phase ${i === active ? 'is-active' : ''}`}>
              <span className="ev-phase-num" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <div className="ev-phase-body">
                <h3 className="ev-phase-title">
                  {ph.name}
                  <Dot className={i === PHASES.length - 1 ? 'is-pink' : ''} />
                </h3>
                <span className="ev-phase-rule" aria-hidden="true" />
                <p className="ev-phase-line">{ph.line}</p>
                <ul>
                  {ph.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className={`ev-rail ${onRail ? 'is-on' : ''}`} aria-hidden="true">
          <svg viewBox="0 0 254 34" className="ev-rail-svg">
            {RAIL_X.slice(0, -1).map((x) => (
              <rect key={x} x={x + 6} y="16.5" width="47" height="1" className="ev-rail-line" />
            ))}
            {RAIL_X.slice(0, -1).map((x, j) => (
              <rect key={`f${x}`} ref={(f) => (fills.current[j] = f)} x={x + 6} y="16.5" width="0" height="1" className="ev-rail-fill" />
            ))}
            {RAIL_X.map((x, i) => (
              <text
                key={x}
                x={x}
                y="23"
                textAnchor="middle"
                className={`ev-rail-letter ${i <= active ? 'is-on' : ''} ${i === PHASES.length - 1 ? 'is-last' : ''}`}
              >
                {PHASES[i].name[0]}
              </text>
            ))}
          </svg>
          <div className="ev-rail-labels">
            {PHASES.map((ph, i) => (
              <span key={ph.name} style={{ left: `${(RAIL_X[i] / 254) * 100}%` }} className={`${i === active ? 'is-on' : ''} ${i === PHASES.length - 1 ? 'is-last' : ''}`}>
                {ph.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Method;
