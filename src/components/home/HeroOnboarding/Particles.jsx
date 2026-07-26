import React from 'react';
import { motion } from 'framer-motion';

// Seeded once so particles don't re-generate on re-render
const PARTICLE_DATA = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: 2 + (i * 7 % 6),
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 7)  % 100,
  color: ['#f72585', '#d91a70', '#c77dff', '#ff9e00', '#ff5fa0'][i % 5],
  opacity: 0.12 + (i % 5) * 0.06,
  duration: 3 + (i % 4),
  delay: (i * 0.35) % 3,
}));

/**
 * Floating ambient particles rendered across the hero section background.
 * Pure presentational — no props needed.
 */
export default function Particles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLE_DATA.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width:      p.size,
            height:     p.size,
            left:       `${p.x}%`,
            top:        `${p.y}%`,
            background: p.color,
            opacity:    p.opacity,
          }}
          animate={{
            y:       [-12, 12, -12],
            scale:   [1, 1.3, 1],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
