import React, { useCallback, useRef, useState } from 'react';
import { HERO, LOCATION, PROJECTS, STACK } from './content.js';
import { ParticleSphere } from './Background.jsx';
import Globe from './Globe.jsx';
import { useScrollFrame } from './hooks.js';
import { ArrowUpRight } from './icons.jsx';
import { BRAND, project } from './util.js';

const PIN = project(LOCATION.lat, LOCATION.lon);

const Logos = () => {
  const group = (hidden) => (
    <ul className="ev-logos-group" aria-hidden={hidden || undefined}>
      {STACK.map(({ name, icon }) => {
        const Icon = BRAND[icon];
        return (
          <li key={name}>
            <Icon aria-hidden="true" />
            {name}
          </li>
        );
      })}
    </ul>
  );
  return (
    <div className="ev-logos">
      <div className="ev-logos-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
};

const Card = ({ p, hidden }) => (
  <a
    className="ev-card"
    href={p.href}
    target="_blank"
    rel="noreferrer"
    aria-hidden={hidden || undefined}
    tabIndex={hidden ? -1 : undefined}
  >
    <span className="ev-card-src">
      <i className={p.status === 'soon' ? 'is-soon' : undefined} />
      client project
      <span className="ev-card-status">{p.status === 'soon' ? 'launching soon' : 'live'}</span>
    </span>
    <span className="ev-card-tags">{p.tags.join(' · ')}</span>
    <span className="ev-card-quote">&ldquo;{p.description}&rdquo;</span>
    <span className="ev-card-more">
      {p.status === 'soon' ? 'preview the site' : 'visit the site'} <ArrowUpRight />
    </span>
    <span className="ev-card-who">
      <img src={p.image} alt="" loading="lazy" />
      <span>
        <b>{p.name}</b> · {p.tagline}
      </span>
    </span>
  </a>
);

const Hero = ({ reduced }) => {
  const globeRef = useRef(null);
  const [intro, setIntro] = useState(!reduced);
  const endIntro = useCallback(() => setIntro(false), []);

  // the globe drifts up and dims as the hero scrolls away
  useScrollFrame(() => {
    const el = globeRef.current;
    if (!el) return;
    const y = window.scrollY;
    const k = Math.min(1, y / (window.innerHeight * 0.95));
    el.style.opacity = String(1 - k);
    el.style.transform = `translate3d(-50%, ${y * -0.25}px, 0) scale(${1 - k * 0.08})`;
  });

  return (
    <>
      <section className="ev-hero" aria-labelledby="hero-title">
        <div className="ev-globe" ref={globeRef}>
          <div className={`ev-globe-disc ${intro ? 'is-intro' : ''}`}>
            <Globe reduced={reduced} />
          </div>
          {intro && <ParticleSphere mode="intro" count={1400} reduced={reduced} onDone={endIntro} className="ev-globe-intro" />}
          <span className="ev-online" style={{ '--px': PIN.x.toFixed(3), '--py': PIN.y.toFixed(3) }}>
            <i /> online · {LOCATION.label}
          </span>
        </div>

        <div className="ev-hero-copy">
          <h1 id="hero-title" className="ev-h1">
            {HERO.lines.map((line, li) => {
              const words = line.split(' ');
              return (
                <span key={line} className="ev-h1-line">
                  {words.map((w, wi) => {
                    const last = li === HERO.lines.length - 1 && wi === words.length - 1;
                    return (
                      <React.Fragment key={w}>
                        <span className="ev-blur" style={{ '--i': li * 3 + wi }}>
                          {last ? w.slice(0, -1) : w}
                          {last && <span className="ev-accent">.</span>}
                        </span>
                        {wi < words.length - 1 && ' '}
                      </React.Fragment>
                    );
                  })}
                </span>
              );
            })}
          </h1>
          <p className="ev-hero-sub ev-rise" style={{ '--i': 6 }}>
            {HERO.sub}
          </p>
        </div>

        <div className="ev-trust ev-rise" style={{ '--i': 8 }}>
          <Logos />
          <div className="ev-stats">
            <span className="ev-stats-edge is-top" aria-hidden="true" />
            {HERO.stats.map((s) => (
              <React.Fragment key={s}>
                <span>{s}</span>
                <span className="ev-stats-sep" aria-hidden="true">
                  ·
                </span>
              </React.Fragment>
            ))}
            <span className="ev-status">
              <i aria-hidden="true" /> open to work
            </span>
            <span className="ev-stats-edge is-bottom" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section id="work" className="ev-work" aria-label="Client work">
        <div className="ev-cards">
          <div className="ev-cards-track">
            {PROJECTS.map((p) => (
              <Card key={p.id} p={p} />
            ))}
            {PROJECTS.map((p) => (
              <Card key={`${p.id}-loop`} p={p} hidden />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
