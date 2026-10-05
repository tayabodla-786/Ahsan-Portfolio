import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Audit, { Curve } from './Audit.jsx';
import { Background, Gauge } from './Background.jsx';
import Footer, { Talk } from './Footer.jsx';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import Method from './Method.jsx';
import { useReducedMotion } from './hooks.js';
import './evolve.css';

const Evolve = () => {
  const reduced = useReducedMotion();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.4 });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [reduced]);

  // Blur-in words and rising blocks play as they scroll into view.
  // An attribute rather than a class, so React re-renders never wipe it.
  useEffect(() => {
    const els = document.querySelectorAll('.ev-blur, .ev-rise');
    if (reduced) {
      els.forEach((el) => el.setAttribute('data-shown', ''));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute('data-shown', '');
          io.unobserve(e.target);
        }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div className="ev" id="top">
      <a className="ev-skip" href="#main">
        Skip to content
      </a>
      <Background reduced={reduced} />
      <Header />
      <Gauge />
      <main id="main">
        <Hero reduced={reduced} />
        <Method />
        <Audit />
        <Curve />
        <Talk />
      </main>
      <Footer reduced={reduced} />
    </div>
  );
};

export default Evolve;
