import {
  SiExpress,
  SiGit,
  SiGreensock,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiVercel,
  SiWordpress,
} from 'react-icons/si';

// Seeded random, so particle layouts are the same on every render and every visit
export const seeded = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const DEG = Math.PI / 180;

// The point at the centre of the hero globe. Chosen so the pin sits up and to the right, where its label goes.
export const VIEW = { lat: -8, lon: 57 };

// Orthographic position of a lat/lon on the globe's disc, as fractions of the radius (y up)
export const project = (lat, lon) => {
  const [p, l, p0, l0] = [lat * DEG, lon * DEG, VIEW.lat * DEG, VIEW.lon * DEG];
  return {
    x: Math.cos(p) * Math.sin(l - l0),
    y: Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l - l0),
  };
};

export const BRAND = {
  react: SiReact,
  next: SiNextdotjs,
  node: SiNodedotjs,
  express: SiExpress,
  mongo: SiMongodb,
  postgres: SiPostgresql,
  tailwind: SiTailwindcss,
  three: SiThreedotjs,
  gsap: SiGreensock,
  wordpress: SiWordpress,
  vercel: SiVercel,
  git: SiGit,
};
