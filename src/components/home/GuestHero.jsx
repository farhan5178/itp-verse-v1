import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, CheckCircle2, Star, Play,
  TrendingUp, BookOpen, Mic, Award, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/* ── Score range data ── */
const scoreRanges = [
  {
    id: 'foundation',
    band: 'Band 5 or below',
    level: 'FOUNDATION',
    mascot: '/mascots/foundation.png',
  },
  {
    id: 'intermediate',
    band: 'Band 5.5 – 7',
    level: 'INTERMEDIATE',
    mascot: '/mascots/intermediate.png',
  },
  {
    id: 'advanced',
    band: 'Band 7.5 – 9',
    level: 'ADVANCED',
    mascot: '/mascots/advanced.png',
  },
];

/* ── Floating Card Component ── */
function FloatingCard({ children, className, delay = 0, y = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 120 }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, y, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
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
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-10 lg:pb-20 bg-white dark:bg-[#09090b]">

      {/* ── Soft ambient gradient ── */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#f72585]/8 via-transparent to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Partner Pill (centered, small) ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 text-xs">
            <span className="text-base">🎧</span>
            <span className="font-extrabold text-[#f72585]">idp</span>
            <span className="font-black text-slate-900 dark:text-white">IELTS</span>
            <span className="text-slate-300 dark:text-zinc-600">•</span>
            <span className="text-base">😎</span>
            <span className="font-black text-slate-900 dark:text-white">ITPverse</span>
            <span className="mx-1 text-slate-300 dark:text-zinc-600">—</span>
            <span className="font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-[10px]">Official Partner</span>
          </div>
        </motion.div>

        {/* ════════════════════ MAIN GRID ════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ──────── LEFT COLUMN: Text + Selector ──────── */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                Targeting your score{' '}
                <br className="hidden lg:block" />
                in 2 months?
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-black text-slate-900 dark:text-white mt-1.5">
                Just Follow{' '}
                <span className="bg-gradient-to-r from-[#f72585] to-[#d91a70] bg-clip-text text-transparent">
                  ITPverse!
                </span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-500 dark:text-zinc-400 font-medium max-w-md mx-auto lg:mx-0 leading-relaxed">
                AI proctored mock tests, instant band grading, and smart study paths — everything you need to ace IELTS, TOEFL & PTE.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={openAuthModal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#f72585] to-[#d91a70] text-white font-extrabold text-sm shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#demo-section"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-100 font-bold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Play className="w-4 h-4 text-[#f72585] fill-[#f72585]" />
                <span>Watch Demo</span>
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-bold text-slate-400 dark:text-zinc-500"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>AI Band Grading</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>IDP / ETS Format</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>24/7 AI Tutor</span>
              </div>
            </motion.div>

            {/* User social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-zinc-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="" />
                <img className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-zinc-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="" />
                <img className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-zinc-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="" />
                <img className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-zinc-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="" />
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-xs font-black text-slate-800 dark:text-zinc-200">4.9</span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">Trusted by 100K+ students</p>
              </div>
            </motion.div>
          </div>

          {/* ──────── RIGHT COLUMN: Hero Image + Floating Cards ──────── */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] lg:min-h-[520px]">

            {/* Student Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative z-10"
            >
              <img
                src="/hero-student.png"
                alt="ITPverse student preparing for IELTS"
                className="w-[280px] sm:w-[320px] lg:w-[360px] h-auto object-contain drop-shadow-2xl"
              />
              {/* Subtle glow behind student */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#f72585]/10 via-transparent to-transparent rounded-full blur-3xl scale-125" />
            </motion.div>

            {/* ── Floating UI Cards ── */}

            {/* 🎯 Band Score Card — top-right */}
            <FloatingCard
              className="absolute top-4 right-0 lg:right-2 z-20"
              delay={0.4}
              y={-6}
            >
              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-black/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f72585] to-[#d91a70] flex items-center justify-center shadow-md shadow-pink-500/20">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Target Score</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white leading-none">Band 8.0</p>
                </div>
              </div>
            </FloatingCard>

            {/* 📊 AI Feedback Badge — top-left */}
            <FloatingCard
              className="absolute top-12 left-0 lg:-left-4 z-20"
              delay={0.6}
              y={-8}
            >
              <div className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-black/30 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">AI Powered</p>
                  <p className="text-xs font-black text-slate-900 dark:text-white">Instant Grading</p>
                </div>
              </div>
            </FloatingCard>

            {/* 🎙 Speaking Score — middle-right */}
            <FloatingCard
              className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-6 z-20"
              delay={0.8}
              y={-5}
            >
              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-black/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <Mic className="w-3.5 h-3.5 text-[#f72585]" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Speaking</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#f72585]">7.5</span>
                  <span className="text-[10px] font-bold text-slate-400">/9.0</span>
                </div>
                <div className="mt-1.5 w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full w-[83%] bg-gradient-to-r from-[#f72585] to-[#d91a70] rounded-full" />
                </div>
              </div>
            </FloatingCard>

            {/* 📚 Mock Test Count — bottom-left */}
            <FloatingCard
              className="absolute bottom-8 left-2 lg:-left-2 z-20"
              delay={1.0}
              y={-7}
            >
              <div className="px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-black/30 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <BookOpen className="w-4.5 h-4.5 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Mock Tests</p>
                  <p className="text-base font-black text-slate-900 dark:text-white leading-none">100+ <span className="text-[10px] text-emerald-500 font-bold">Available</span></p>
                </div>
              </div>
            </FloatingCard>

            {/* 🏆 Achievement — bottom-right */}
            <FloatingCard
              className="absolute bottom-4 right-4 lg:right-0 z-20"
              delay={1.2}
              y={-6}
            >
              <div className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-black/30 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#f72585]/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-[#f72585]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500">Top 5%</p>
                  <p className="text-xs font-black text-slate-900 dark:text-white">Achievers</p>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>

        {/* ════════════ SCORE RANGE SELECTOR (below hero) ════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 lg:mt-16"
        >
          <p className="text-center text-sm font-semibold text-slate-500 dark:text-zinc-400 mb-6">
            What's your current score range?
          </p>

          <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-2xl mx-auto">
            {scoreRanges.map((range) => {
              const isSelected = selectedRange === range.id;
              return (
                <motion.button
                  key={range.id}
                  onClick={() => setSelectedRange(range.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`
                    relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl text-center cursor-pointer transition-all duration-300
                    ${isSelected
                      ? 'bg-white dark:bg-zinc-900 border-2 border-[#1a2b4a] dark:border-zinc-300 shadow-xl shadow-slate-200/40 dark:shadow-black/30 scale-[1.02]'
                      : 'bg-slate-50/80 dark:bg-zinc-900/40 border-2 border-transparent hover:border-slate-200 dark:hover:border-zinc-700'
                    }
                  `}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3">
                    <img
                      src={range.mascot}
                      alt={range.level}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                  <h3 className={`text-[11px] sm:text-sm font-black mb-0.5 ${
                    isSelected ? 'text-[#1a2b4a] dark:text-white' : 'text-slate-600 dark:text-zinc-400'
                  }`}>
                    {range.band}
                  </h3>
                  <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] ${
                    isSelected ? 'text-[#f72585]' : 'text-slate-400 dark:text-zinc-500'
                  }`}>
                    {range.level}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
