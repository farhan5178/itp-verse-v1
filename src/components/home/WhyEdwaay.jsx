import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  TrendingUp,
  Target,
  Calendar,
  BarChart3,
  Brain,
  Mic,
  Clock,
  Check,
  Flame,
  AlertCircle,
  Users,
  UserCheck,
  Video,
  Heart,
  ShieldCheck
} from 'lucide-react';

const featureList = [
  {
    id: 1,
    title: 'AI Speaking Partner',
    description: 'Practice anytime.',
    emoji: '⚡',
    icon: Zap,
    badgeBg: 'bg-cyan-500/10 dark:bg-cyan-500/20 text-[#0097B2] dark:text-cyan-400 border border-cyan-500/20',
    activeBadgeBg: 'bg-[#0097B2] text-white shadow-md shadow-[#0097B2]/30',
  },
  {
    id: 2,
    title: 'Instant Score Prediction',
    description: 'Know your expected band score.',
    emoji: '📈',
    icon: TrendingUp,
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    activeBadgeBg: 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30',
  },
  {
    id: 3,
    title: 'Full Mock Tests',
    description: 'Real exam environment.',
    emoji: '🎯',
    icon: Target,
    badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20',
    activeBadgeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30',
  },
  {
    id: 4,
    title: 'Personalized Study Plan',
    description: 'Daily roadmap.',
    emoji: '📅',
    icon: Calendar,
    badgeBg: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20',
    activeBadgeBg: 'bg-purple-600 text-white shadow-md shadow-purple-500/30',
  },
  {
    id: 5,
    title: 'Progress Tracking',
    description: 'See improvement every day.',
    emoji: '📊',
    icon: BarChart3,
    badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    activeBadgeBg: 'bg-amber-500 text-white shadow-md shadow-amber-500/30',
  },
  {
    id: 6,
    title: 'Smart Weakness Analysis',
    description: 'AI tells you where to improve.',
    emoji: '🧠',
    icon: Brain,
    badgeBg: 'bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 border border-pink-500/20',
    activeBadgeBg: 'bg-pink-500 text-white shadow-md shadow-pink-500/30',
  },
  {
    id: 7,
    title: 'Human Speaking Partner',
    description: 'Match 1-on-1 with real IELTS student candidates.',
    emoji: '🧑🏻‍🎓',
    icon: Users,
    badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20',
    activeBadgeBg: 'bg-blue-600 text-white shadow-md shadow-blue-500/30',
  },
  {
    id: 8,
    title: 'Women Speaking Partner',
    description: 'Connect with female student peers for comfortable practice.',
    emoji: '👩🏻‍🎓',
    icon: Heart,
    badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    activeBadgeBg: 'bg-rose-500 text-white shadow-md shadow-rose-500/30',
  },
];

/* ── Preview 1: AI Speaking Partner ── */
function AISpeakingPartnerPreview() {
  return (
    <div className="relative w-full max-w-md">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -left-2 sm:-left-6 z-20 px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex items-center gap-2.5"
      >
        <div className="w-7 h-7 rounded-full bg-[#0097B2]/15 flex items-center justify-center text-sm">
          ⚡
        </div>
        <span className="text-xs font-black text-slate-800 dark:text-zinc-100">AI Partner Active</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-5 -right-2 sm:-right-4 z-20 px-4 py-2 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex items-center gap-2"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-black text-slate-800 dark:text-zinc-100">Practice Anytime 24/7</span>
      </motion.div>

      <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-6 sm:p-7 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100 dark:border-zinc-800">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0097B2] to-cyan-400 flex items-center justify-center text-white shadow-md shadow-[#0097B2]/30">
            <Mic className="w-6 h-6" />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900" />
          </div>
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              AI Speaking Coach
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">IELTS Speaking Part 2</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="bg-slate-50 dark:bg-zinc-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-zinc-800 text-xs font-medium text-slate-700 dark:text-zinc-200">
            <p className="text-[#0097B2] dark:text-cyan-400 font-bold mb-1">AI Coach:</p>
            "Describe a memorable trip you took recently. You have 1 minute to prepare."
          </div>

          <div className="bg-[#0097B2]/10 dark:bg-[#0097B2]/20 p-3.5 rounded-2xl border border-[#0097B2]/20 text-xs font-medium text-slate-800 dark:text-zinc-100 ml-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#0097B2] dark:text-cyan-400">You (Speaking):</span>
              <span className="text-[10px] text-slate-400">00:42</span>
            </div>
            <div className="flex items-center gap-1 my-2 h-5">
              {[40, 80, 50, 90, 60, 100, 70, 40, 85, 60, 95, 50].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: [`${h}%`, `${100 - h}%`, `${h}%`] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-[#0097B2] rounded-full"
                />
              ))}
            </div>
            "Last summer, I visited Sylhet and explored the tea gardens..."
          </div>
        </div>

        <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#0097B2] to-[#004B59] hover:from-[#00849c] hover:to-[#003b47] text-white font-black text-sm shadow-lg shadow-[#0097B2]/25 transition-all flex items-center justify-center gap-2 cursor-pointer">
          <Mic className="w-4 h-4" />
          <span>Start Speaking Session</span>
        </button>
      </div>
    </div>
  );
}

/* ── Preview 2: Instant Score Prediction ── */
function ScorePredictionPreview() {
  return (
    <div className="relative w-full max-w-md">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -right-2 sm:-right-4 z-20 px-4 py-2 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex items-center gap-2"
      >
        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">Target: Band 7.5+</span>
      </motion.div>

      <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-6 sm:p-7 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="text-center mb-6">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1">
            ESTIMATED OVERALL BAND
          </span>
          <div className="inline-flex items-baseline gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-6 py-2 rounded-2xl border border-emerald-200 dark:border-emerald-800/50">
            <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">7.5</span>
            <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">/ 9.0</span>
          </div>
          <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-400 mt-2">
            Based on your last 5 AI test evaluations
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
            <span className="text-[10px] font-bold text-slate-400 block">Speaking</span>
            <span className="text-lg font-black text-slate-800 dark:text-zinc-100">7.5</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
            <span className="text-[10px] font-bold text-slate-400 block">Writing</span>
            <span className="text-lg font-black text-slate-800 dark:text-zinc-100">7.0</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
            <span className="text-[10px] font-bold text-slate-400 block">Reading</span>
            <span className="text-lg font-black text-slate-800 dark:text-zinc-100">8.0</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
            <span className="text-[10px] font-bold text-slate-400 block">Listening</span>
            <span className="text-lg font-black text-slate-800 dark:text-zinc-100">7.5</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-zinc-400 border-t border-slate-100 dark:border-zinc-800">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <Check className="w-4 h-4 stroke-[3]" /> 98% Accuracy
          </span>
          <span>Updated Today</span>
        </div>
      </div>
    </div>
  );
}

/* ── Preview 3: Full Mock Tests ── */
function MockTestsPreview() {
  return (
    <div className="relative w-full max-w-md">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -left-3 z-20 px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex items-center gap-2 text-xs font-black text-indigo-600 dark:text-indigo-400"
      >
        <Clock className="w-4 h-4 text-indigo-500" />
        <span>Timed Test Mode</span>
      </motion.div>

      <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-6 sm:p-7 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-zinc-800">
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">IELTS Academic Mock #4</h4>
            <span className="text-xs font-medium text-slate-400">Full 4-Module Simulation</span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold">
            LIVE
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/50">
            <span className="text-xs font-bold text-slate-700 dark:text-zinc-200">1. Listening</span>
            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">Completed (30m)</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/50">
            <span className="text-xs font-bold text-slate-700 dark:text-zinc-200">2. Reading</span>
            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">Completed (60m)</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">3. Writing (In Progress)</span>
            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">24:15 Left</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 opacity-60">
            <span className="text-xs font-bold text-slate-700 dark:text-zinc-200">4. Speaking</span>
            <span className="text-xs font-medium text-slate-400">Up Next</span>
          </div>
        </div>

        <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-black text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer">
          <Target className="w-4 h-4" />
          <span>Resume Mock Exam</span>
        </button>
      </div>
    </div>
  );
}

/* ── Preview 4: Personalized Study Plan ── */
function StudyPlanPreview() {
  return (
    <div className="relative w-full max-w-md">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -right-2 z-20 px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex items-center gap-2 text-xs font-black text-purple-600 dark:text-purple-400"
      >
        <Calendar className="w-4 h-4" />
        <span>Day 14 of 30</span>
      </motion.div>

      <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-6 sm:p-7 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-zinc-800">
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">Daily Target Roadmap</h4>
            <span className="text-xs font-medium text-slate-400">Customized for Band 7.5</span>
          </div>
          <span className="text-xs font-black text-purple-600 dark:text-purple-400">80% Done Today</span>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-zinc-100 line-through">Vocabulary: 20 Advanced Phrases</p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Completed • 15 mins</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40">
            <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black shrink-0">
              2
            </div>
            <div>
              <p className="text-xs font-bold text-purple-950 dark:text-purple-200">Task 2 Essay Structure Drill</p>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">Current Task • 25 mins</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/50">
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-zinc-700 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
              3
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">Listening Section 4 Practice</p>
              <span className="text-[10px] text-slate-400 font-medium">Upcoming • 20 mins</span>
            </div>
          </div>
        </div>

        <button className="w-full py-3.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer">
          <span>Continue Today's Roadmap</span>
        </button>
      </div>
    </div>
  );
}

/* ── Preview 5: Progress Tracking ── */
function ProgressTrackingPreview() {
  return (
    <div className="relative w-full max-w-md">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -left-3 z-20 px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex items-center gap-2 text-xs font-black text-amber-600 dark:text-amber-400"
      >
        <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
        <span>14 Day Streak 🔥</span>
      </motion.div>

      <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-6 sm:p-7 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
              SCORE PROGRESSION
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900 dark:text-white">Band 5.5 → 7.5+</span>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/50">
                +2.0 Jump
              </span>
            </div>
          </div>
          <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl">
            Target Met 🎉
          </span>
        </div>

        {/* Smooth Area Wave Chart */}
        <div className="relative h-36 w-full my-3">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 110">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#0097B2" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="0" y1="20" x2="320" y2="20" stroke="currentColor" strokeDasharray="4 4" className="text-slate-200 dark:text-zinc-800" />
            <line x1="0" y1="60" x2="320" y2="60" stroke="currentColor" strokeDasharray="4 4" className="text-slate-200 dark:text-zinc-800" />
            <line x1="0" y1="95" x2="320" y2="95" stroke="currentColor" strokeDasharray="4 4" className="text-slate-200 dark:text-zinc-800" />

            {/* Filled Area */}
            <path
              d="M 0,90 C 50,80 80,70 120,55 C 160,40 200,35 240,20 C 280,12 300,10 320,8 L 320,100 L 0,100 Z"
              fill="url(#areaGradient)"
            />

            {/* Animated Smooth Line */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              d="M 0,90 C 50,80 80,70 120,55 C 160,40 200,35 240,20 C 280,12 300,10 320,8"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Milestone Points */}
            <circle cx="0" cy="90" r="4" className="fill-amber-500" />
            <circle cx="120" cy="55" r="4" className="fill-emerald-500" />
            <circle cx="240" cy="20" r="4" className="fill-cyan-500" />
            <circle cx="320" cy="8" r="6" className="fill-[#0097B2] stroke-white stroke-2" />
          </svg>
        </div>

        {/* X-Axis Timeline Labels */}
        <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-zinc-500 border-t border-slate-100 dark:border-zinc-800 pt-2">
          <span>Week 1 (5.5)</span>
          <span>Week 2 (6.0)</span>
          <span>Week 4 (6.5)</span>
          <span>Week 6 (7.0)</span>
          <span className="text-[#0097B2] dark:text-cyan-400 font-black">Week 8 (7.5+)</span>
        </div>

        <p className="text-xs font-medium text-slate-500 dark:text-zinc-400 text-center mt-3">
          Continuous AI progress tracking updated after every practice.
        </p>
      </div>
    </div>
  );
}

/* ── Preview 6: Smart Weakness Analysis ── */
function WeaknessAnalysisPreview() {
  return (
    <div className="relative w-full max-w-md">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -right-3 z-20 px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex items-center gap-2 text-xs font-black text-pink-600 dark:text-pink-400"
      >
        <Brain className="w-4 h-4 text-pink-500" />
        <span>AI Diagnostic</span>
      </motion.div>

      <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-6 sm:p-7 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100 dark:border-zinc-800">
          <div className="w-10 h-10 rounded-2xl bg-pink-100 dark:bg-pink-950/50 flex items-center justify-center text-pink-600 dark:text-pink-400">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">Weakness Breakdown</h4>
            <span className="text-xs font-medium text-slate-400">Targeted areas for fast improvement</span>
          </div>
        </div>

        <div className="space-y-3.5 mb-6">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-zinc-200 mb-1">
              <span>Grammar: Complex Sentences</span>
              <span className="text-pink-500">Needs Focus (62%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
              <div className="h-full bg-pink-500 w-[62%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-zinc-200 mb-1">
              <span>Pronunciation: Intonation</span>
              <span className="text-amber-500">Moderate (75%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
              <div className="h-full bg-amber-500 w-[75%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-zinc-200 mb-1">
              <span>Lexical Resource: Synonyms</span>
              <span className="text-emerald-500">Strong (88%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
              <div className="h-full bg-emerald-500 w-[88%]" />
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-pink-50 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/30 text-xs font-medium text-pink-900 dark:text-pink-200">
          💡 <strong>AI Recommendation:</strong> Do 10 minutes of Complex Sentence Writing Drills to raise score by +0.5.
        </div>
      </div>
    </div>
  );
}

/* ── Preview 7: Human Speaking Partner (Peer Student Match) ── */
function HumanPartnerPreview() {
  return (
    <div className="relative w-full max-w-md">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -left-3 z-20 px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex items-center gap-2 text-xs font-black text-blue-600 dark:text-blue-400"
      >
        <Users className="w-4 h-4 text-blue-500" />
        <span>Peer-to-Peer Student Match</span>
      </motion.div>

      <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-6 sm:p-7 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100 dark:border-zinc-800">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-blue-500/30">
            🧑🏻‍🎓
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              Tanvir Ahmed <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-600 px-2 py-0.5 rounded-full font-extrabold">Student</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">IELTS Candidate (Target Band 7.5)</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-3.5 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-xs font-medium text-blue-900 dark:text-blue-200 flex items-center justify-between">
            <span className="font-bold">Match Status:</span>
            <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-extrabold text-[10px]">Connected Live</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-700 dark:text-zinc-200 font-bold">
              <span>Practicing Topic:</span>
              <span className="text-blue-500">IELTS Part 2 Cue Card</span>
            </div>
            <p className="text-slate-500 dark:text-zinc-400">
              "Practice speaking 1-on-1 with real fellow candidates worldwide to build real exam confidence."
            </p>
          </div>
        </div>

        <button className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer">
          <UserCheck className="w-4 h-4" />
          <span>Match with Candidate Partner</span>
        </button>
      </div>
    </div>
  );
}

/* ── Preview 8: Women Speaking Partner (Female Student Peer Match) ── */
function WomenPartnerPreview() {
  return (
    <div className="relative w-full max-w-md">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-5 -right-3 z-20 px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex items-center gap-2 text-xs font-black text-rose-600 dark:text-rose-400"
      >
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        <span>100% Female Student Matching</span>
      </motion.div>

      <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-6 sm:p-7 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100 dark:border-zinc-800">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-rose-500/30">
            👩🏻‍🎓
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              Nusrat Jahan <span className="text-xs bg-rose-100 dark:bg-rose-950 text-rose-600 px-2 py-0.5 rounded-full font-extrabold">Student Peer</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">IELTS Candidate (Target Band 7.0)</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30">
            <span className="text-xs font-bold text-rose-900 dark:text-rose-200">Female Student Peer Match</span>
            <span className="text-[10px] font-black text-rose-600 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded-md">
              Comfort Guaranteed
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 text-xs space-y-2">
            <span className="font-bold text-slate-700 dark:text-zinc-200 block">Peer Preferences:</span>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 font-bold text-slate-700 dark:text-zinc-200 text-[10px]">👩🏻 Female-only Mode</span>
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 font-bold text-slate-700 dark:text-zinc-200 text-[10px]">🗣️ Part 1 & 2 Practice</span>
            </div>
          </div>
        </div>

        <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer">
          <Heart className="w-4 h-4 fill-white" />
          <span>Match with Female Student</span>
        </button>
      </div>
    </div>
  );
}

export default function WhyEdwaay() {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#07070a] py-20 lg:py-28 border-t border-slate-100 dark:border-zinc-900">
      {/* Background soft glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#0097B2]/5 dark:bg-[#0097B2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Title & Subtitle ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Why Choose <span className="bg-gradient-to-r from-[#0097B2] to-[#004B59] dark:to-cyan-400 bg-clip-text text-transparent">Edwaay</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-500 dark:text-zinc-400 font-medium leading-relaxed"
          >
            Everything you need to master your IELTS exam with AI-powered personalized learning & peer student partners.
          </motion.p>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── Left Column: Interactive UI Graphic Preview ── */}
          <div className="lg:col-span-5 relative flex justify-center py-4 min-h-[420px] items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full flex justify-center"
              >
                {activeId === 1 && <AISpeakingPartnerPreview />}
                {activeId === 2 && <ScorePredictionPreview />}
                {activeId === 3 && <MockTestsPreview />}
                {activeId === 4 && <StudyPlanPreview />}
                {activeId === 5 && <ProgressTrackingPreview />}
                {activeId === 6 && <WeaknessAnalysisPreview />}
                {activeId === 7 && <HumanPartnerPreview />}
                {activeId === 8 && <WomenPartnerPreview />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right Column: Cards with Icons (8 Items) ── */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featureList.map((item) => {
              const isActive = activeId === item.id;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`group cursor-pointer transition-all p-4 rounded-2xl border ${isActive
                    ? 'bg-white dark:bg-zinc-900 border-[#0097B2] dark:border-cyan-400 shadow-xl shadow-[#0097B2]/10 ring-2 ring-[#0097B2]/20 dark:ring-cyan-400/20'
                    : 'bg-white/60 dark:bg-zinc-900/60 border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-md'
                    }`}
                >
                  <div className="flex items-start gap-3.5">

                    {/* Icon Box with Badge Styling */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-lg transition-all ${isActive
                        ? item.activeBadgeBg
                        : item.badgeBg
                        }`}
                    >
                      <span>{item.emoji}</span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-base font-extrabold tracking-tight transition-colors ${isActive
                            ? 'text-[#0097B2] dark:text-cyan-400'
                            : 'text-slate-800 dark:text-zinc-100 group-hover:text-slate-900 dark:group-hover:text-white'
                            }`}
                        >
                          {item.title}
                        </h3>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#0097B2] dark:bg-cyan-400 animate-pulse" />
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
