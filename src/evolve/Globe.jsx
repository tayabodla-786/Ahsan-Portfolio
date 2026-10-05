import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { ARCS, LOCATION } from './content.js';
import { VIEW } from './util.js';

const DEG = Math.PI / 180;

// cobe's rotation that brings a lat/lon to the centre of the disc
const PHI = Math.PI - (VIEW.lon * DEG - Math.PI / 2);
const THETA = VIEW.lat * DEG;

const Globe = ({ reduced, onReady }) => {
  const canvasRef = useRef(null);
  const ready = useRef(onReady);
  useEffect(() => {
    ready.current = onReady;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = canvas.clientWidth;
    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size,
      height: size,
      phi: PHI,
      theta: THETA,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 24000,
      mapBrightness: 7,
      mapBaseBrightness: 0,
      baseColor: [0.22, 0.22, 0.23],
      markerColor: [0.894, 0, 0.486],
      glowColor: [0.4, 0.4, 0.43],
      markers: [{ location: [LOCATION.lat, LOCATION.lon], size: 0.03 }],
      arcs: ARCS.map((a) => ({ from: [LOCATION.lat, LOCATION.lon], to: [a.lat, a.lon] })),
      arcColor: [0.92, 0.92, 0.97],
      arcWidth: 0.35,
      arcHeight: 0.28,
      opacity: 0.95,
    });
    ready.current?.();

    const ro = new ResizeObserver(() => {
      size = canvas.clientWidth;
      globe.update({ width: size, height: size });
    });
    ro.observe(canvas);

    // a touch of pointer parallax; small, so the pin stays under its label
    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let visible = true;
    let raf = 0;
    const loop = () => {
      raf = 0;
      smooth.x += (pointer.x - smooth.x) * 0.05;
      smooth.y += (pointer.y - smooth.y) * 0.05;
      globe.update({ phi: PHI + smooth.x * 0.06, theta: THETA + smooth.y * 0.04 });
      if (!reduced && visible) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      globe.destroy();
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="ev-globe-canvas" aria-hidden="true" />;
};

export default Globe;
