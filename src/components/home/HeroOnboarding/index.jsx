import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import useTypewriter from './hooks/useTypewriter';
import Particles    from './Particles';
import AIAvatar     from './AIAvatar';
import SpeechBubble from './SpeechBubble';
import StatsRow     from './StatsRow';

/* ─────────────────────────────────────────────────
   USER DATA  (TODO backend: GET /api/user/profile)
   ───────────────────────────────────────────────── */
const USER = {
  name:    'Abdullah Masud',
  target:  'Band 8+',
  exam:    'IELTS',
};

const USER_STATS = [
  { label: 'Current Band', value: '6.5', icon: '📊' },
  { label: 'Target',       value: '8.0', icon: '🎯' },
  { label: 'Streak',       value: '12d', icon: '🔥' },
];

/* ─────────────────────────────────────────────────
   HERO ONBOARDING — root component
   ───────────────────────────────────────────────── */
export default function HeroOnboarding() {
  const [avatarLanded, setAvatarLanded] = useState(false);
  const [showCTA,      setShowCTA]      = useState(false);

  /* Greeting lines — TODO backend: personalise from user profile */
  const greetingLines = useMemo(() => [
    `👋  Hi, ${USER.name}!`,
    `Welcome back to ITPverse.`,
    `Ready to reach ${USER.target}? 🎯`,
  ], []);

  const { displayed, done: typingDone } = useTypewriter(
    greetingLines,
    42,    // charSpeed ms
    480,   // lineDelay ms
    1000,  // startDelay ms  ← reduced: avatar is faster now
  );

  useEffect(() => {
    if (!typingDone) return;
    const t = setTimeout(() => setShowCTA(true), 450);
    return () => clearTimeout(t);
  }, [typingDone]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Welcome onboarding"
    >
      {/* ── Background — explicit light & dark colours ──────── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg,#fff5f9 0%,#f8f8ff 40%,#eef2ff 70%,#fdf4ff 100%)',
        }}
      />
      {/* Dark overlay — only visible when .dark class is on <html> */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden dark:block"
        style={{
          background: 'linear-gradient(135deg,#1a0010 0%,#09090b 40%,#0d0020 70%,#150020 100%)',
        }}
      />

      {/* Glow orbs */}
      <div aria-hidden="true" className="absolute pointer-events-none"
        style={{ width:500,height:500,top:'5%',left:'2%',borderRadius:'50%',
          background:'radial-gradient(circle,rgba(247,37,133,0.10) 0%,transparent 70%)',filter:'blur(50px)' }}
      />
      <div aria-hidden="true" className="absolute pointer-events-none"
        style={{ width:500,height:500,bottom:'5%',right:'2%',borderRadius:'50%',
          background:'radial-gradient(circle,rgba(67,97,238,0.10) 0%,transparent 70%)',filter:'blur(50px)' }}
      />

      {/* Floating particles */}
      <Particles />

      {/* ── Main layout ─────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 px-6 max-w-5xl mx-auto w-full">

        {/* Avatar — faster spring: stiffness↑ damping↑ */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0,    opacity: 1 }}
          transition={{
            type:      'spring',
            stiffness: 140,   // ← was 55 → now snappier
            damping:   22,
            mass:      0.9,
          }}
          onAnimationComplete={() => setAvatarLanded(true)}
          className="flex-shrink-0"
        >
          <AIAvatar isReady={avatarLanded} />
        </motion.div>

        {/* Text column */}
        <div className="flex flex-col items-start gap-5">

          {/* Speech bubble — appears once avatar lands */}
          <AnimatePresence>
            {avatarLanded && (
              <SpeechBubble displayed={displayed} done={typingDone} />
            )}
          </AnimatePresence>

          {/* CTA button */}
          <AnimatePresence>
            {showCTA && (
              <motion.button
                initial={{ opacity: 0, y: 16, scale: 0.92 }}
                animate={{ opacity: 1, y: 0,  scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                className="btn-primary text-sm px-8 py-3.5 mt-1 tracking-wide"
              >
                Let's Continue Learning →
              </motion.button>
            )}
          </AnimatePresence>

          {/* Stats row */}
          <AnimatePresence>
            {showCTA && <StatsRow stats={USER_STATS} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(255,245,249,0.7), transparent)' }}
      />
    </section>
  );
}
