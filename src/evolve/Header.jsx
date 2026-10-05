import React, { useEffect, useRef, useState } from 'react';
import { ABOUT, EMAIL, FIRST, LAST, LINKEDIN, NAME, NAV, PROJECTS, SERVICES, mailto } from './content.js';
import { onNav } from './hooks.js';
import { Arrow, ArrowUpRight, Caret, Linkedin, Mail } from './icons.jsx';

export const Logo = ({ onClick }) => (
  <a className="ev-logo" href="#top" onClick={onClick ?? onNav('top')} aria-label={`${NAME}, back to top`}>
    <span className="ev-logo-word" aria-hidden="true">
      {[...FIRST].map((c, i) => (
        <span key={`f${i}`} style={{ '--i': i }}>
          {c}
        </span>
      ))}
      {[...LAST].map((c, i) => (
        <span key={`l${i}`} className="ev-accent" style={{ '--i': FIRST.length + i }}>
          {c}
        </span>
      ))}
    </span>
    {/* five phases; the pink one is Evolve */}
    <svg className="ev-logo-dots" viewBox="0 0 96 11" aria-hidden="true">
      {[5, 27, 49, 71, 91].map((x, i) => (
        <circle key={x} cx={x} cy="5.5" r="2.4" className={i === 4 ? 'is-pink' : undefined} />
      ))}
    </svg>
  </a>
);

const ServicesMenu = ({ onPick }) => (
  <div className="ev-mega-grid">
    {SERVICES.map((g) => (
      <div key={g.group}>
        <p className="ev-label">{g.group}</p>
        <ul>
          {g.items.map((it) => (
            <li key={it.title}>
              <a className="ev-mega-item" href={mailto(`Enquiry: ${it.title}`)} onClick={onPick}>
                <span className="ev-mega-title">
                  {it.title}
                  {it.core && <span className="ev-chip">core</span>}
                </span>
                <span className="ev-mega-text">{it.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
    <div className="ev-mega-foot">
      <p>And every build ships with clean, documented code the next developer can pick up in an afternoon.</p>
      <a className="ev-mega-all" href={mailto('Project enquiry')} onClick={onPick}>
        start a project <Arrow />
      </a>
    </div>
  </div>
);

const WorkMenu = ({ onPick }) => (
  <div className="ev-mega-work">
    <ul>
      {PROJECTS.map((p) => (
        <li key={p.id}>
          <a className="ev-mega-project" href={p.href} target="_blank" rel="noreferrer" onClick={onPick}>
            <img src={p.image} alt="" loading="lazy" />
            <span>
              <span className="ev-mega-title">
                {p.name}
                {p.status === 'soon' && <span className="ev-chip">soon</span>}
              </span>
              <span className="ev-mega-text">{p.tagline}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
    <div className="ev-mega-side">
      <p className="ev-label">client work</p>
      <p>Real builds for real businesses: what was needed, what shipped, and where to click through to see it live.</p>
      <a className="ev-mega-all" href="#work" onClick={onNav('work', onPick)}>
        all work <Arrow />
      </a>
    </div>
  </div>
);

const MoreMenu = ({ onPick }) => (
  <div className="ev-mega-more">
    <div>
      <p className="ev-label">about</p>
      <p>{ABOUT}</p>
    </div>
    <ul>
      <li>
        <a className="ev-mega-row" href={LINKEDIN} target="_blank" rel="noreferrer" onClick={onPick}>
          linkedin <ArrowUpRight />
        </a>
      </li>
      <li>
        <a className="ev-mega-row" href={`mailto:${EMAIL}`} onClick={onPick}>
          email <ArrowUpRight />
        </a>
      </li>
      <li>
        <a className="ev-mega-row" href="#method" onClick={onNav('method', onPick)}>
          the method <Arrow />
        </a>
      </li>
    </ul>
  </div>
);

const MENUS = { services: ServicesMenu, work: WorkMenu, more: MoreMenu };

const Header = () => {
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState(null);
  const leave = useRef();

  const show = (m) => {
    clearTimeout(leave.current);
    setMenu(m);
  };
  const hide = () => {
    clearTimeout(leave.current);
    leave.current = setTimeout(() => setMenu(null), 140);
  };
  // Restart Lenis here rather than in an effect cleanup: start() resets it,
  // which would cancel the scroll a menu link kicks off right after closing
  const close = () => {
    window.__lenis?.start();
    setOpen(false);
    setMenu(null);
  };

  useEffect(() => () => clearTimeout(leave.current), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setMenu(null);
      setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    return () => window.__lenis?.start();
  }, [open]);

  const Menu = menu && MENUS[menu];

  return (
    <header className={`ev-header ${open ? 'is-open' : ''}`} onMouseLeave={hide}>
      <div className="ev-pill">
        <Logo onClick={onNav('top', close)} />

        <nav className="ev-nav" aria-label="Primary">
          {NAV.map((n) =>
            n.menu ? (
              <button
                key={n.id}
                type="button"
                className={`ev-navlink ${menu === n.menu ? 'is-on' : ''}`}
                aria-expanded={menu === n.menu}
                aria-controls="ev-mega"
                onMouseEnter={() => show(n.menu)}
                onClick={() => setMenu((m) => (m === n.menu ? null : n.menu))}
              >
                {n.label}
                <Caret />
              </button>
            ) : (
              <a key={n.id} className="ev-navlink" href={`#${n.id}`} onMouseEnter={hide} onClick={onNav(n.id, close)}>
                {n.label}
              </a>
            )
          )}
        </nav>

        <div className="ev-pill-actions">
          <a className="ev-icon-link" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin />
          </a>
          <a className="ev-msg" href={mailto('Hello Ahsan')}>
            <Mail className="ev-msg-icon" />
            <span>message me</span>
          </a>
          <button
            type="button"
            className="ev-burger"
            aria-expanded={open}
            aria-controls="ev-sheet"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="ev-mega" className={`ev-mega ${Menu ? 'is-open' : ''}`} onMouseEnter={() => clearTimeout(leave.current)} inert={!Menu}>
        {Menu && <Menu onPick={close} />}
      </div>

      <div id="ev-sheet" className="ev-sheet" inert={!open}>
        <nav aria-label="Primary mobile">
          {NAV.map((n) =>
            n.menu ? (
              <div key={n.id} className={`ev-sheet-group ${section === n.id ? 'is-open' : ''}`}>
                <button type="button" className="ev-sheet-row" aria-expanded={section === n.id} onClick={() => setSection((s) => (s === n.id ? null : n.id))}>
                  {n.label}
                  <Caret />
                </button>
                <div className="ev-sheet-body">
                  <div>
                    {n.menu === 'services' &&
                      SERVICES.map((g) => (
                        <div key={g.group} className="ev-sheet-list">
                          <p className="ev-label">{g.group}</p>
                          {g.items.map((it) => (
                            <a key={it.title} href={mailto(`Enquiry: ${it.title}`)} onClick={close}>
                              {it.core && <span className="ev-chip">core</span>}
                              {it.title}
                            </a>
                          ))}
                        </div>
                      ))}
                    {n.menu === 'work' && (
                      <div className="ev-sheet-list">
                        {PROJECTS.map((p) => (
                          <a key={p.id} href={p.href} target="_blank" rel="noreferrer" onClick={close}>
                            {p.name} <ArrowUpRight />
                          </a>
                        ))}
                        <a className="ev-sheet-all" href="#work" onClick={onNav('work', close)}>
                          all work <Arrow />
                        </a>
                      </div>
                    )}
                    {n.menu === 'more' && (
                      <div className="ev-sheet-list">
                        <p className="ev-sheet-about">{ABOUT}</p>
                        <a href={LINKEDIN} target="_blank" rel="noreferrer" onClick={close}>
                          LinkedIn <ArrowUpRight />
                        </a>
                        <a href={`mailto:${EMAIL}`} onClick={close}>
                          {EMAIL}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <a key={n.id} className="ev-sheet-row" href={`#${n.id}`} onClick={onNav(n.id, close)}>
                {n.label}
              </a>
            )
          )}
        </nav>
        <a className="ev-msg ev-sheet-cta" href={mailto('Hello Ahsan')} onClick={close}>
          <Mail className="ev-msg-icon" />
          <span>message me</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
