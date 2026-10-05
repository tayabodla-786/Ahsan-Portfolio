import React, { useEffect, useRef, useState } from 'react';
import { BANNER, FRICTIONS, TYPED, mailto } from './content.js';
import { useInView, useScramble, useScrollFrame } from './hooks.js';
import { Arrow, ArrowUpRight } from './icons.jsx';

// Where each friction floats on wide screens: [left or right %, top px], in FRICTIONS order
const SPOTS = [
  { l: 3, t: 880 },
  { l: 2, t: 70 },
  { r: 4, t: 330 },
  { l: 6, t: 520 },
  { r: 3, t: 120 },
  { r: 9, t: 720 },
  { l: 39, t: 690 },
  { l: 24, t: 980 },
  { r: 16, t: 930 },
];

const Friction = ({ f, i, live, picked, onPick }) => {
  const [hover, setHover] = useState(0);
  const text = useScramble(f.text, live, 700 + i * 90);
  // a fresh scramble on every hover
  const again = useScramble(f.text, hover, 500);
  const spot = SPOTS[i];
  return (
    <button
      type="button"
      className={`ev-friction ${picked ? 'is-picked' : ''}`}
      style={{ '--i': i, left: spot.l != null ? `${spot.l}%` : undefined, right: spot.r != null ? `${spot.r}%` : undefined, top: spot.t }}
      onMouseEnter={() => setHover((h) => h + 1)}
      onClick={() => onPick(f)}
      aria-pressed={picked}
    >
      <span className="ev-friction-text">{hover ? again : text}</span>
      <ArrowUpRight className="ev-friction-arrow" />
    </button>
  );
};

// A placeholder that types itself out, phrase by phrase
const useTyped = (phrases, on) => {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!on) return;
    let i = 0;
    let n = 0;
    let dir = 1;
    let timer;
    const step = () => {
      const p = phrases[i];
      n += dir;
      setOut(p.slice(0, n));
      if (dir > 0 && n >= p.length) {
        dir = -1;
        timer = setTimeout(step, 1800);
        return;
      }
      if (dir < 0 && n <= 0) {
        dir = 1;
        i = (i + 1) % phrases.length;
      }
      timer = setTimeout(step, dir > 0 ? 45 : 18);
    };
    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, [phrases, on]);
  return out;
};

const Audit = () => {
  const [ref, live] = useInView('0px 0px -20% 0px');
  const [value, setValue] = useState('');
  const [picked, setPicked] = useState(null);
  const typed = useTyped(TYPED, live && !value);
  const input = useRef(null);

  const pick = (f) => {
    setPicked(f);
    setValue(f.text);
    input.current?.focus({ preventScroll: true });
  };

  const fix = picked && picked.text === value ? picked.fix : null;
  const send = (e) => {
    e.preventDefault();
    const what = value.trim() || typed;
    window.location.href = mailto(`Friction: ${what}`, `Hi Ahsan,\n\nWhat's slowing me down: ${what}\n${fix ? `\nThe fix you suggested: ${fix}\n` : ''}\nA bit about the project:\n`);
  };

  return (
    <section id="audit" className={`ev-audit ${live ? 'is-live' : ''}`} ref={ref} aria-labelledby="audit-title">
      <div className="ev-audit-head">
        <p className="ev-eyebrow">[ the audit ]</p>
        <h2 id="audit-title" className="ev-display-l">
          {"What's slowing you down?".split(' ').map((w, i) => (
            <React.Fragment key={w}>
              <span className="ev-blur" style={{ '--i': i }}>
                {w}
              </span>{' '}
            </React.Fragment>
          ))}
        </h2>
        <p className="ev-audit-sub ev-rise" style={{ '--i': 3 }}>
          You name the friction. I map the fix.
          <br />
          See what happens next...
        </p>
        <p className="ev-audit-live ev-rise" style={{ '--i': 4 }}>
          <span className="ev-live-pill">
            <i aria-hidden="true" /> live
          </span>
          <b>{String(FRICTIONS.length).padStart(2, '0')}</b>
          <span aria-hidden="true">·</span> frictions I fix
        </p>
        <form className="ev-audit-form ev-rise" style={{ '--i': 5 }} onSubmit={send}>
          <label htmlFor="ev-friction-input" className="sr-only">
            What&apos;s slowing you down?
          </label>
          <input
            id="ev-friction-input"
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={typed}
            autoComplete="off"
          />
          <button type="submit" aria-label="Send it to Ahsan">
            <Arrow />
          </button>
        </form>
        <p className={`ev-audit-fix ${fix ? 'is-on' : ''}`} aria-live="polite">
          {fix && (
            <>
              <span className="ev-accent">the fix →</span> {fix}
            </>
          )}
        </p>
      </div>

      <div className="ev-frictions" role="group" aria-label="Common frictions">
        {FRICTIONS.map((f, i) => (
          <Friction key={f.text} f={f} i={i} live={live} picked={picked === f} onPick={pick} />
        ))}
      </div>
    </section>
  );
};

// The manifesto, set along a rising curve and pushed sideways by the scroll
export const Curve = () => {
  const host = useRef(null);
  const path = useRef(null);
  useScrollFrame(() => {
    const r = host.current.getBoundingClientRect();
    const k = (window.innerHeight - r.top) / (window.innerHeight + r.height);
    path.current.setAttribute('startOffset', `${(-k * 2200).toFixed(0)}`);
  });
  return (
    <div className="ev-curve" ref={host} aria-label={BANNER.trim()} role="img">
      <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path id="ev-curve-path" d="M -320 300 C 260 330, 860 300, 1760 40" fill="none" />
        <text className="ev-curve-text">
          <textPath href="#ev-curve-path" ref={path} startOffset="0">
            {BANNER.repeat(3).toUpperCase()}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default Audit;
