import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, CheckCircle2, Play,
  TrendingUp, BookOpen, Mic, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/* ── Score range data ── */
const scoreRanges = [
  {
    id: 'foundation',
    band: 'Band 5 or below',
    level: 'FOUNDATION',
    mascot: '/img/mascots/foundation.png',
  },
  {
    id: 'intermediate',
    band: 'Band 5.5 – 7',
    level: 'INTERMEDIATE',
    mascot: '/img/mascots/intermediate.png',
  },
  {
    id: 'advanced',
    band: 'Band 7.5 – 9',
    level: 'ADVANCED',
    mascot: '/img/mascots/advanced.png',
  },
];

/* ── Jolly Floating Card Component ── */
function FloatingCard({ children, className, delay = 0, y = -6, rotate = 2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: rotate - 6 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay, type: 'spring', bounce: 0.5 }}
      whileHover={{ scale: 1.08, rotate: rotate > 0 ? 3 : -3, zIndex: 40 }}
      className={`cursor-pointer ${className}`}
    >
      <motion.div
        animate={{ y: [0, y, 0], rotate: [0, rotate, 0] }}
        transition={{ duration: 3.5 + delay * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function GuestHero() {
  const { openAuthModal } = useAuth();
  const [selectedRange, setSelectedRange] = useState('intermediate');

  return (
    <section className="relative overflow-hidden pt-4 pb-12 bg-slate-50/50 dark:bg-[#09090b]">

      {/* ── Soft Ambient Glow ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[480px] bg-gradient-to-b from-[#f72585]/12 via-[#a855f7]/8 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center">

        {/* 1. Partner Pill (Ultra Premium Pill Badge) */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-slate-200/90 dark:border-zinc-800 text-xs mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-none"
        >
          <span className="text-xs">🎧</span>
          <span className="font-extrabold text-[#f72585]">idp</span>
          <span className="font-black text-slate-900 dark:text-white">IELTS</span>
          <span className="text-slate-300 dark:text-zinc-600">•</span>
          <span className="text-xs">😎</span>
          <span className="font-black text-slate-900 dark:text-white">ITPverse</span>
          <span className="mx-0.5 text-slate-300 dark:text-zinc-600">—</span>
          <span className="font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-[8.5px]">Official Partner</span>
        </motion.div>

        {/* 2. Headline & Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-3 max-w-xl"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            Targeting your score in 2 months?{' '}
            <span className="bg-gradient-to-r from-[#f72585] via-[#f72585] to-[#8b5cf6] bg-clip-text text-transparent inline-block">
              Just Follow ITPverse!
            </span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium max-w-md mx-auto">
            AI proctored mock tests, instant band grading, and smart study paths for IELTS, TOEFL & PTE.
          </p>
        </motion.div>

        {/* 3. Center Piece: Student Photo + Ultra-Premium Floating Badges */}
        <div className="relative w-full max-w-[460px] sm:max-w-[500px] mx-auto my-4 flex justify-center items-center h-[230px] sm:h-[260px]">
          
          {/* Student Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative z-10"
          >
            <img
              src="/img/hero-grad-cap.png"
              alt="ITPverse graduation cap & app dashboard"
              className="w-[220px] sm:w-[270px] h-auto object-contain drop-shadow-2xl"
            />
            <div className="absolute inset-0 top-3 -z-10 bg-gradient-to-t from-[#f72585]/20 via-[#a855f7]/10 to-transparent rounded-full blur-2xl scale-110" />
          </motion.div>

          {/* ── 4 Premium Floating Cards (Glassmorphism & Crisp Light Mode Shadows) ── */}

          {/* 1. Top-Left: AI Powered Instant Grading */}
          <FloatingCard
            className="absolute top-2 -left-1 sm:left-2 z-20"
            delay={0.15}
            y={-6}
            rotate={-2}
          >
            <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-zinc-800 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.09)] dark:shadow-black/60 flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-xs">
                <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="text-left">
                <p className="text-[9px] sm:text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">AI Powered</p>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">Instant Grading</p>
              </div>
            </div>
          </FloatingCard>

          {/* 2. Top-Right: Target Score Band 8.0 */}
          <FloatingCard
            className="absolute top-2 -right-1 sm:right-2 z-20"
            delay={0.2}
            y={-6}
            rotate={3}
          >
            <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-zinc-800 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.09)] dark:shadow-black/60 flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#f72585] via-[#f72585] to-[#8b5cf6] flex items-center justify-center text-white shadow-md shadow-pink-500/25">
                <TrendingUp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="text-left">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Score</p>
                <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-none">Band 8.0</p>
              </div>
            </div>
          </FloatingCard>

          {/* 3. Bottom-Left: 100+ Live Mock Tests */}
          <FloatingCard
            className="absolute bottom-3 -left-1 sm:left-2 z-20"
            delay={0.25}
            y={-6}
            rotate={-3}
          >
            <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-zinc-800 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.09)] dark:shadow-black/60 flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-xs">
                <BookOpen className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="text-left">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">Mock Tests</p>
                <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-none">100+ Live</p>
              </div>
            </div>
          </FloatingCard>

          {/* 4. Bottom-Right: Speaking Score 7.5/9.0 */}
          <FloatingCard
            className="absolute bottom-3 -right-1 sm:right-2 z-20"
            delay={0.3}
            y={-6}
            rotate={2}
          >
            <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-zinc-800 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.09)] dark:shadow-black/60 flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#f72585]/10 border border-[#f72585]/20 flex items-center justify-center text-[#f72585] shadow-xs">
                <Mic className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="text-left">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">Speaking</p>
                <p className="text-xs sm:text-sm font-black text-[#f72585] leading-none">7.5 <span className="text-[9px] font-bold text-slate-400">/ 9.0</span></p>
              </div>
            </div>
          </FloatingCard>

        </div>

        {/* 4. Main CTA Buttons (Ultra Premium Glossy Buttons for Light Mode) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3.5 my-3"
        >
          {/* Primary CTA: Premium Gradient Button with Top Inner Sheen */}
          <button
            onClick={openAuthModal}
            className="relative group px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#f72585] via-[#ff2a8d] to-[#8b5cf6] text-white font-extrabold text-xs sm:text-sm shadow-[0_12px_30px_-5px_rgba(247,37,133,0.4)] hover:shadow-[0_18px_36px_-5px_rgba(247,37,133,0.55)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer border-t border-white/30 overflow-hidden"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
            <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="tracking-wide">Get Started Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA: Crisp Elevated Glass Button */}
          <a
            href="#demo-section"
            className="px-7 py-3.5 rounded-2xl bg-white/90 dark:bg-zinc-900 backdrop-blur-md border border-slate-200/90 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 font-extrabold text-xs sm:text-sm shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_16px_rgba(0,0,0,0.06)] hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-[#f72585]/10 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-[#f72585] fill-[#f72585] ml-0.5" />
            </div>
            <span>Watch Demo</span>
          </a>

          <div className="flex items-center gap-3.5 text-xs font-bold text-slate-500 dark:text-zinc-500 ml-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>AI Grading</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>IDP / ETS</span>
            </div>
          </div>
        </motion.div>

        {/* 5. Score Range Selector Cards (Elevated Glass Panels) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="w-full max-w-lg mx-auto pt-5 border-t border-slate-200/60 dark:border-zinc-800/60 mt-3"
        >
          <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 mb-3 tracking-wide">
            What's your current score range?
          </p>

          <div className="grid grid-cols-3 gap-3">
            {scoreRanges.map((range) => {
              const isSelected = selectedRange === range.id;
              return (
                <button
                  key={range.id}
                  onClick={() => setSelectedRange(range.id)}
                  className={`
                    relative p-3 sm:p-4 rounded-2xl text-center cursor-pointer transition-all duration-300
                    ${isSelected
                      ? 'bg-white dark:bg-zinc-900 border-2 border-[#f72585] dark:border-[#f72585] shadow-[0_12px_28px_-6px_rgba(247,37,133,0.25)] scale-[1.03]'
                      : 'bg-white/80 dark:bg-zinc-900/40 border border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-[#f72585]/40 hover:bg-white hover:shadow-md'
                    }
                  `}
                >
                  <div className="w-11 h-11 sm:w-14 sm:h-14 mx-auto mb-1.5">
                    <img
                      src={range.mascot}
                      alt={range.level}
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </div>
                  <h3 className={`text-[11px] sm:text-xs font-black mb-0.5 ${
                    isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-zinc-400'
                  }`}>
                    {range.band}
                  </h3>
                  <p className={`text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-wider ${
                    isSelected ? 'text-[#f72585]' : 'text-slate-400 dark:text-zinc-500'
                  }`}>
                    {range.level}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
