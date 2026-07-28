import React from 'react';
import { motion } from 'framer-motion';

export default function EdwaayLogo({ className = '', showText = true, size = 'md' }) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
  };

  // Ultra-silky smooth infinite wave loop for the 3 icon bars
  const pulseLoop = (delay, xMax) => ({
    animate: {
      x: [0, xMax, 0],
      opacity: [1, 0.92, 1],
    },
    transition: {
      duration: 3.2,
      delay: delay,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: [0.45, 0, 0.55, 1], // Silky Smooth Cubic Bezier
    },
  });

  const textLetters = ['d', 'w', 'a', 'a', 'y'];

  return (
    <motion.div
      whileHover="hover"
      className={`flex items-center gap-0.5 select-none cursor-pointer group ${className}`}
    >
      {/* Edwaay 3-pill tilted 'E' icon mark with ultra-smooth glowing aura */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        {/* Soft Ambient Teal Glow Aura */}
        <motion.div
          animate={{
            scale: [0.95, 1.2, 0.95],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: [0.45, 0, 0.55, 1],
          }}
          className="absolute w-8 h-8 rounded-full bg-[#0097B2] blur-md -z-10 pointer-events-none"
        />

        <svg
          className={`${iconSizes[size] || 'w-8 h-8'} flex-shrink-0 overflow-visible`}
          viewBox="10 0 90 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="rotate(-14 60 60)">
            {/* Top Bar */}
            <motion.rect
              {...pulseLoop(0, 5)}
              whileHover={{ x: 6, scaleX: 1.05, transition: { duration: 0.3, ease: 'easeOut' } }}
              x="14"
              y="24"
              width="92"
              height="20"
              rx="10"
              fill="#0097B2"
            />
            {/* Middle Bar */}
            <motion.rect
              {...pulseLoop(0.4, 3)}
              whileHover={{ x: 3, scaleX: 1.05, transition: { duration: 0.3, ease: 'easeOut' } }}
              x="20"
              y="50"
              width="82"
              height="20"
              rx="10"
              fill="#0097B2"
            />
            {/* Bottom Bar */}
            <motion.rect
              {...pulseLoop(0.8, 6)}
              whileHover={{ x: 7, scaleX: 1.05, transition: { duration: 0.3, ease: 'easeOut' } }}
              x="26"
              y="76"
              width="76"
              height="20"
              rx="10"
              fill="#0097B2"
            />
          </g>
        </svg>
      </div>

      {/* Silky Animated Text 'dwaay' with letter-by-letter wave & Codec Pro font */}
      {showText && (
        <div className={`${textSizes[size] || 'text-2xl'} font-black tracking-tight leading-none font-codec flex items-center -ml-0.5`}>
          {textLetters.map((char, index) => {
            const isA = char === 'a';
            return (
              <motion.span
                key={index}
                animate={{
                  y: [0, -2, 0],
                  opacity: [0.92, 1, 0.92],
                }}
                transition={{
                  duration: 3.2,
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: [0.45, 0, 0.55, 1],
                }}
                className={`text-[#545F61] dark:text-white font-extrabold tracking-tight transition-colors duration-300 inline-block ${
                  isA ? 'group-hover:text-[#0097B2] dark:group-hover:text-[#1AB0CB]' : ''
                }`}
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
