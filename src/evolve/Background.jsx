import React, { useEffect, useRef } from 'react';
import { useScrollFrame } from './hooks.js';
import { seeded } from './util.js';

const STARS = 130;

// Fixed dot grid with a faint, slowly drifting starfield over it
export const Background = ({ reduced }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const random = seeded(3);
    const stars = Array.from({ length: STARS }, () => ({ x: random(), y: random(), r: 0.4 + random() * 1.1, a: 0.15 + random() * 0.5, tw: random() * 6.28 }));
    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf;
    let last = 0;
    const draw = (now) => {
      // stars barely move, so 30fps is plenty
      if (now - last > 33) {
        last = now;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#f0f0f8';
        const drift = (window.scrollY * 0.06) / h;
        for (const s of stars) {
          const y = (((s.y - drift) % 1) + 1) % 1;
          ctx.globalAlpha = s.a * (reduced ? 1 : 0.55 + 0.45 * Math.sin(now / 900 + s.tw));
          ctx.beginPath();
          ctx.arc(s.x * w, y * h, s.r, 0, 6.283);
          ctx.fill();
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  return (
    <div className="ev-bg" aria-hidden="true">
      <div className="ev-bg-grid" />
      <canvas ref={ref} className="ev-bg-stars" />
    </div>
  );
};

// Scroll position as a percentage, pinned to the right edge
export const Gauge = () => {
  const host = useRef(null);
  const bar = useRef(null);
  const label = useRef(null);

  useScrollFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.current.style.transform = `translateY(${p * 56}px)`;
    label.current.textContent = `${String(Math.round(p * 100)).padStart(3, '0')}%`;
    host.current.classList.toggle('is-done', p > 0.995);
  });

  return (
    <div className="ev-gauge" ref={host} aria-hidden="true">
      <div className="ev-gauge-line">
        <span ref={bar} />
      </div>
      <span className="ev-gauge-pct" ref={label}>
        000%
      </span>
    </div>
  );
};

const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const clamp = (v) => Math.min(1, Math.max(0, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

// A sphere of drifting dots. "intro" gathers scattered dots into the sphere and fades out;
// "cloud" is a loose, slowly turning swarm
export const ParticleSphere = ({ mode = 'cloud', count = 1100, reduced, onDone, className = '' }) => {
  const ref = useRef(null);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const random = seeded(mode === 'intro' ? 11 : 23);
    const pts = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = i * GOLDEN;
      return {
        x: Math.cos(t) * r,
        y,
        z: Math.sin(t) * r,
        shell: mode === 'cloud' ? 0.55 + random() * 0.6 : 0.97 + random() * 0.06,
        scatter: 1.5 + random() * 2.2,
        size: 0.7 + random() * 1.1,
        tw: random() * 6.28,
      };
    });

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    let raf = 0;
    const t0 = performance.now();
    const draw = (now) => {
      raf = 0;
      const t = (now - t0) / 1000;
      let gather = 1;
      let fade = 1;
      if (mode === 'intro') {
        gather = reduced ? 1 : easeOut(clamp(t / 1.7));
        fade = reduced ? 0 : 1 - clamp((t - 1.5) / 0.9);
        if (fade <= 0) {
          ctx.clearRect(0, 0, w, h);
          done.current?.();
          return;
        }
      }
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#f0f0f8';
      const R = Math.min(w, h) * (mode === 'cloud' ? 0.42 : 0.5) * (mode === 'intro' ? 0.82 : 1);
      const squash = mode === 'cloud' ? 0.6 : 1;
      const rot = t * (mode === 'cloud' ? 0.08 : 0.35);
      const cs = Math.cos(rot);
      const sn = Math.sin(rot);
      for (const p of pts) {
        const s = mode === 'intro' ? p.scatter + (p.shell - p.scatter) * gather : p.shell * (1 + Math.sin(t * 0.5 + p.tw) * 0.04);
        const xr = p.x * cs - p.z * sn;
        const zr = p.x * sn + p.z * cs;
        const front = (zr + 1) / 2;
        ctx.globalAlpha = (0.12 + 0.88 * front) * fade * (mode === 'cloud' ? 0.95 : 0.85) * (0.65 + 0.35 * Math.sin(t * 1.6 + p.tw));
        ctx.fillRect(w / 2 + xr * R * s, h / 2 + p.y * R * s * squash, p.size, p.size);
      }
      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [mode, count, reduced]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
};
