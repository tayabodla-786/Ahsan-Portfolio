import React from 'react';
import { SiLinkedin } from 'react-icons/si';

const base = { width: '1em', height: '1em', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const Arrow = (p) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

export const ArrowUpRight = (p) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
  </svg>
);

export const Caret = (p) => (
  <svg viewBox="0 0 8 8" width="6" height="6" aria-hidden="true" {...p}>
    <path d="M1 2.5 4 5.5 7 2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Mail = (p) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
    <path d="m3 5.5 7 5.5 7-5.5" />
  </svg>
);

export const Linkedin = (p) => <SiLinkedin aria-hidden="true" {...p} />;

// Accent dot that closes display headings
export const Dot = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={`ev-dot ${className}`} aria-hidden="true">
    <circle cx="50" cy="50" r="50" fill="currentColor" />
  </svg>
);

export const Spark = (p) => (
  <svg viewBox="0 0 100 100" width="1em" height="1em" aria-hidden="true" {...p}>
    <path d="M50 0C53 30 70 47 100 50 70 53 53 70 50 100 47 70 30 53 0 50 30 47 47 30 50 0Z" fill="currentColor" />
  </svg>
);

