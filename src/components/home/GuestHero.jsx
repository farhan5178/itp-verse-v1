import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Play, ArrowRight, CheckCircle2, 
  Award, Star, BookOpen, Bot, Zap, Globe, Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function GuestHero() {
  const { openAuthModal } = useAuth();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">

      {/* Decorative Ambient Background Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-pink-500/15 via-purple-500/10 to-indigo-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Hero Pitch & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">

            {/* Free Trial Pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/30 text-xs font-extrabold text-[#f72585] dark:text-[#ff5fa0]"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>100% Free AI Mock Test Trial — No Credit Card Required</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900 dark:text-white"
            >
              Master IELTS, TOEFL & PTE <br className="hidden sm:block" />
              with <span className="bg-gradient-to-r from-[#f72585] via-[#8b5cf6] to-[#4361ee] bg-clip-text text-transparent">Instant AI Proctored Mocks</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Achieve your dream university & visa score with real exam-like proctored simulation panels, instant AI speech & writing band scorecards, and smart study paths.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <button
                onClick={openAuthModal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f72585] to-[#d91a70] text-white font-extrabold text-sm shadow-xl shadow-pink-500/30 hover:shadow-pink-500/45 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#demo-section"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-100 font-bold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#f72585] fill-[#f72585]" />
                <span>Try Demo Test (Guest Mode)</span>
              </a>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs font-bold text-slate-500 dark:text-zinc-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant AI Band Grading</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Real IDP / ETS Exam Format</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>24/7 AI Tutor Assistant</span>
              </div>
            </motion.div>

            {/* User Rating Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-2 flex items-center justify-center lg:justify-start gap-4"
            >
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-900" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-900" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-900" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Student" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-black text-slate-800 dark:text-zinc-200 ml-1">4.9/5</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">Trusted by 100,000+ IELTS & TOEFL candidates</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Live Mock Test Interactive Preview Panel */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-2xl p-6 overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-extrabold text-slate-500 dark:text-zinc-400 ml-2">Mock Test Simulation Panel</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                  ● Live Preview
                </span>
              </div>

              {/* Sample Test Card */}
              <div className="pt-5 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[#f72585] uppercase tracking-wider">IELTS Academic Module</span>
                    <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">Duration: 60 Mins</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Academic Writing Task 2 — AI Feedback</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 line-clamp-2">
                    "Evaluate the advantages and disadvantages of artificial intelligence in higher education..."
                  </p>
                </div>

                {/* Score Gauge Demo */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-indigo-500/5 border border-pink-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Estimated Band Score</span>
                      <div className="text-3xl font-black text-[#f72585] mt-0.5">Band 8.0 <span className="text-xs font-semibold text-emerald-500">(Top 5%)</span></div>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-white dark:bg-zinc-900 border-4 border-[#f72585] flex items-center justify-center text-xs font-black text-slate-900 dark:text-white shadow-md">
                      8.0
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <div className="p-2 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-slate-200/50 dark:border-zinc-800">
                      <span className="block text-[10px] font-bold text-slate-400">Grammar</span>
                      <span className="text-xs font-black text-emerald-500">92%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-slate-200/50 dark:border-zinc-800">
                      <span className="block text-[10px] font-bold text-slate-400">Cohesion</span>
                      <span className="text-xs font-black text-blue-500">88%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-slate-200/50 dark:border-zinc-800">
                      <span className="block text-[10px] font-bold text-slate-400">Lexical</span>
                      <span className="text-xs font-black text-purple-500">90%</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action */}
                <button
                  onClick={openAuthModal}
                  className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  <span>Unlock Full Proctored Mock Test Workspace</span>
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
