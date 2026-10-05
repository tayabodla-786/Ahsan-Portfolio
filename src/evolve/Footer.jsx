import React from 'react';
import { SiReact, SiVite } from 'react-icons/si';
import { EMAIL, LINKEDIN, LOCATION, NAME, PROJECTS, ROLE, SERVICES, mailto } from './content.js';
import { ParticleSphere } from './Background.jsx';
import { onNav, useClock } from './hooks.js';
import { Arrow, Linkedin, Mail } from './icons.jsx';

const CARDS = [
  { key: 'email', sub: 'write to me', detail: EMAIL, href: mailto('Hello Ahsan'), Icon: Mail },
  { key: 'linkedin', sub: "let's connect", detail: 'in/muhammad-ahsan-zahid', href: LINKEDIN, Icon: Linkedin, external: true },
];

export const Talk = () => (
  <section id="contact" className="ev-talk" aria-labelledby="talk-title">
    <p className="ev-eyebrow" id="talk-title">
      [ talk to me ]
    </p>
    <div className="ev-talk-grid">
      {CARDS.map((c) => {
        const Icon = c.Icon;
        return (
          <a key={c.key} className="ev-talk-card" href={c.href} {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            <span className="ev-talk-icon">
              <Icon />
            </span>
            <span className="ev-talk-copy">
              <span className="ev-talk-key">{c.key}</span>
              <span className="ev-talk-sub">
                {c.sub} · {c.detail}
              </span>
            </span>
            <Arrow className="ev-talk-arrow" />
          </a>
        );
      })}
    </div>
  </section>
);

const CORE = SERVICES.flatMap((g) => g.items).filter((s) => s.core);

const COLUMNS = [
  {
    label: 'Popular services',
    links: [
      ...CORE.map((s) => ({ text: s.title, href: mailto(`Enquiry: ${s.title}`) })),
      { text: 'Performance', href: mailto('Enquiry: Performance') },
      { text: 'Start a project', href: mailto('Project enquiry'), strong: true },
    ],
  },
  {
    label: 'Site',
    links: [
      { text: 'Work', to: 'work' },
      { text: 'Method', to: 'method' },
      { text: 'The audit', to: 'audit' },
      { text: 'Contact', to: 'contact' },
    ],
  },
  {
    label: 'Quick links',
    links: [
      { text: 'Email', href: `mailto:${EMAIL}` },
      { text: 'LinkedIn', href: LINKEDIN, external: true },
      ...PROJECTS.filter((p) => !p.status).slice(0, 2).map((p) => ({ text: p.name, href: p.href, external: true })),
      { text: 'Back to top', to: 'top' },
    ],
  },
];

const FooterLink = ({ l }) =>
  l.to ? (
    <a className="ev-sweep" href={`#${l.to}`} onClick={onNav(l.to)}>
      {l.text}
    </a>
  ) : (
    <a className={`ev-sweep ${l.strong ? 'is-strong' : ''}`} href={l.href} {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {l.text}
      {l.strong && <Arrow />}
    </a>
  );

const Footer = ({ reduced }) => {
  const time = useClock(LOCATION.tz);
  return (
    <footer className="ev-footer">
      <div className="ev-cure">
        <ParticleSphere mode="cloud" count={1900} reduced={reduced} className="ev-cure-cloud" />
        <p className="ev-eyebrow">[ the cure ]</p>
        <h2 className="ev-cure-title">
          {['And', 'every', 'idea', 'deserves', 'to'].map((w, i) => (
            <React.Fragment key={w}>
              <span className="ev-blur" style={{ '--i': i }}>
                {w}
              </span>{' '}
            </React.Fragment>
          ))}
          <span className="ev-blur ev-cure-accent" style={{ '--i': 5 }}>
            evolve<span className="ev-cure-dot">.</span>
          </span>
        </h2>
      </div>

      <div className="ev-follow">
        <p className="ev-eyebrow">[ follow ]</p>
        <div className="ev-follow-row">
          <a className="ev-follow-btn" href={LINKEDIN} target="_blank" rel="noreferrer">
            <Linkedin /> linkedin
          </a>
          <a className="ev-follow-btn" href={`mailto:${EMAIL}`}>
            <Mail /> email
          </a>
        </div>
      </div>

      <div className="ev-footer-cols">
        {COLUMNS.map((c) => (
          <div key={c.label} className="ev-footer-col">
            <p className="ev-label">{c.label}</p>
            <ul style={{ '--rows': Math.ceil(c.links.length / 2) }}>
              {c.links.map((l) => (
                <li key={l.text}>
                  <FooterLink l={l} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="ev-footer-pills">
        <div className="ev-pills-row">
          <span className="ev-tag">
            <i aria-hidden="true" />
            <b>{LOCATION.label}</b> · {LOCATION.code} · base · <time>{time}</time>
          </span>
          <span className="ev-tag">
            <b>remote</b> · worldwide · available
          </span>
          <span className="ev-tag">
            <b>{PROJECTS.length}</b> client builds · <b>full-stack</b>
          </span>
        </div>
        <div className="ev-built">
          <span>built with</span>
          <span className="ev-built-chip" title="React">
            <SiReact aria-hidden="true" />
          </span>
          <span className="ev-built-chip" title="Vite">
            <SiVite aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="ev-footer-base">
        <p>
          © {new Date().getFullYear()} {NAME} — {ROLE}
        </p>
        <p className="ev-footer-legal">
          <a className="ev-sweep" href={`mailto:${EMAIL}`}>
            email
          </a>
          <a className="ev-sweep" href={LINKEDIN} target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a className="ev-sweep" href="#top" onClick={onNav('top')}>
            back to top
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
