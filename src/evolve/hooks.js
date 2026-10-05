import { useEffect, useRef, useState } from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

// Smooth-scrolls through Lenis when it's running, natively otherwise
export const scrollToId = (id) => {
  const el = id === 'top' ? 0 : document.getElementById(id);
  if (el === null) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  else if (el === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  else el.scrollIntoView({ behavior: 'smooth' });
};

export const onNav = (id, after) => (e) => {
  e.preventDefault();
  after?.();
  scrollToId(id);
};

// Calls `fn` on every scroll/resize, coalesced to one call per animation frame
export const useScrollFrame = (fn) => {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  });
  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      ref.current();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
};

// True once the element has scrolled into view
export const useInView = (rootMargin = '0px 0px -10% 0px') => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, seen];
};

const GLYPHS = '中马お生日せひす大林心ね日国る라거버바ابتثجأدوحك洋树天风亮空서';

// Text that resolves out of random glyphs, left to right, whenever `run` changes to a truthy value
export const useScramble = (text, run, duration = 900) => {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const k = Math.min(1, (now - start) / duration);
      const settled = Math.floor(k * text.length);
      let s = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        s += text[i] === ' ' ? ' ' : GLYPHS[(i * 7 + Math.floor(now / 50)) % GLYPHS.length];
      }
      setOut(s);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, run, duration]);
  return out;
};

const clockFormat = (timeZone) =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).format(new Date());

// The local time somewhere else, refreshed every few seconds
export const useClock = (timeZone) => {
  const [now, setNow] = useState(() => clockFormat(timeZone));
  useEffect(() => {
    const id = setInterval(() => setNow(clockFormat(timeZone)), 10000);
    return () => clearInterval(id);
  }, [timeZone]);
  return now;
};
