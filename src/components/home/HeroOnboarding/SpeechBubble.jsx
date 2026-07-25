import React from 'react';
import { motion } from 'framer-motion';

/**
 * SpeechBubble
 * Displays the typewriter text in a chat-bubble with a cursor.
 *
 * Props:
 *   displayed {string[]} — lines currently visible (filled by useTypewriter)
 *   done      {boolean}  — true when typing is complete (hides cursor)
 */
export default function SpeechBubble({ displayed, done }) {
  // Per-line style: first=greeting, second=subtitle, third=CTA text
  const lineClass = (i) => {
    if (i === 0) return 'text-lg font-bold text-slate-900';       // "👋 Hi, ..."
    if (i === 1) return 'text-sm font-medium text-slate-600';      // "Welcome back..."
    return 'text-base font-bold' +                                  // "Ready to reach..."
           ' ' + 'text-transparent bg-clip-text' +
           ' ' + 'bg-gradient-to-r from-[#f72585] to-[#4361ee]';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -16, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={[
        'relative',
        'bg-white',                       /* always white in light mode */
        'dark:bg-[#18181f]',
        'rounded-3xl rounded-bl-none',
        'px-6 py-5',
        'shadow-xl',
        'border border-slate-200',
        'dark:border-[#27272a]',
        'min-h-[100px]',
        'min-w-[280px] md:min-w-[340px]',
      ].join(' ')}
      style={{ boxShadow: '0 8px 40px rgba(247,37,133,0.08), 0 2px 12px rgba(67,97,238,0.07)' }}
    >
      {/* Bubble tail — bottom-left corner pointing toward avatar */}
      <span
        aria-hidden="true"
        className="absolute -bottom-[10px] left-6 w-4 h-4 rotate-45 bg-white dark:bg-[#18181f] border-r border-b border-slate-200 dark:border-[#27272a]"
      />

      <div className="space-y-1.5">
        {displayed.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={lineClass(i)}
          >
            {line}
            {/* Blinking cursor on the last line being typed */}
            {i === displayed.length - 1 && !done && (
              <span className="cursor-blink" aria-hidden="true" />
            )}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
