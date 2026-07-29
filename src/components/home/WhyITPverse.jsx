import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Video,
  FileText,
  MessageSquare,
  Headphones,
  HelpCircle,
  BookOpen
} from 'lucide-react';

const featureList = [
  {
    id: 1,
    title: 'A clearly structured curriculum',
    description: "Follow our guided study schedule and you'll always know what to do next. No more feeling lost!",
    previewType: 'curriculum',
    activeHighlight: 'tracks'
  },
  {
    id: 2,
    title: 'Everything you need',
    description: '1,000+ lessons in 6+ comprehensive courses means you can go from true newbie to speaking and writing IELTS expert all in one place.',
    previewType: 'everything',
    activeHighlight: 'lessons'
  },
  {
    id: 3,
    title: 'See real results',
    description: "With as little as 30 minutes a day, we guarantee you'll see real progress on ITPverse. It's that good!",
    previewType: 'results',
    activeHighlight: 'quiz'
  },
  {
    id: 4,
    title: 'A lifetime of learning',
    description: 'With many years worth of study materials - including 15K+ vocab flashcards, 10K+ quiz questions, and much more - you can easily review the English skills you learn so you never lose them again!',
    previewType: 'lifetime',
    activeHighlight: 'flashcards'
  }
];

export default function WhyITPverse() {
  const [activeId, setActiveId] = useState(1);

  const activeFeature = featureList.find((f) => f.id === activeId) || featureList[0];

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#07070a] py-20 lg:py-28 border-t border-slate-100 dark:border-zinc-900">
      {/* Background soft glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Title & Subtitle ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Why <span className="text-[#F59E0B] dark:text-[#FBBF24]">ITPverse?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-500 dark:text-zinc-400 font-medium leading-relaxed"
          >
            Find out what makes the web’s best IELTS preparation courses so popular.
          </motion.p>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── Left Column: Interactive UI Graphic Preview ── */}
          <div className="lg:col-span-5 relative flex justify-center py-6">
            
            {/* Outer Container with Floating Badges */}
            <div className="relative w-full max-w-md">

              {/* Top Floating Badge: Avatar + 6+ prep tracks */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute -top-6 -left-2 sm:-left-6 z-20 px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex items-center gap-2.5 transition-all ${
                  activeFeature.activeHighlight === 'tracks' ? 'ring-2 ring-[#F59E0B] shadow-[#F59E0B]/20 scale-105' : ''
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center overflow-hidden border border-amber-300">
                  <span className="text-xs font-black text-amber-700 dark:text-amber-300">👩🏻‍🎓</span>
                </div>
                <span className="text-xs font-black text-slate-800 dark:text-zinc-100">6+ prep tracks</span>
              </motion.div>

              {/* Left Floating Badge: EN Document */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-1/2 -left-8 -translate-y-1/2 z-20 w-12 h-14 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex flex-col items-center justify-center gap-0.5"
              >
                <FileText className="w-5 h-5 text-cyan-500" />
                <span className="text-[10px] font-black text-slate-700 dark:text-zinc-300">EN</span>
              </motion.div>

              {/* Right Floating Circle 'a' */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/3 -right-5 z-20 w-10 h-10 rounded-full bg-[#FDE68A] dark:bg-amber-900/60 shadow-lg border border-amber-300 flex items-center justify-center text-amber-900 dark:text-amber-200 font-black text-sm"
              >
                a
              </motion.div>

              {/* Bottom Right Floating Badge: 1,000+ lessons */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className={`absolute -bottom-5 -right-3 sm:-right-6 z-20 px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-slate-100 dark:border-zinc-700 flex items-center gap-2 transition-all ${
                  activeFeature.activeHighlight === 'lessons' ? 'ring-2 ring-[#F59E0B] shadow-[#F59E0B]/20 scale-105' : ''
                }`}
              >
                <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-black text-slate-800 dark:text-zinc-100">1,000+ lessons</span>
              </motion.div>

              {/* Main Preview Card */}
              <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-6 sm:p-7 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                
                {/* List Rows */}
                <div className="space-y-4 mb-6">
                  
                  {/* Row 1: Flashcards */}
                  <div className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                    activeFeature.activeHighlight === 'flashcards' ? 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30' : 'hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <BookOpen className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-zinc-200">Flashcards</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">15</span>
                  </div>

                  {/* Row 2: Dialogue */}
                  <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
                        <MessageSquare className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-zinc-200">Dialogue</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">5</span>
                  </div>

                  {/* Row 3: Audio */}
                  <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                        <Headphones className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold font-semibold text-teal-600 dark:text-teal-400">Audio</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">8:12</span>
                  </div>

                  {/* Row 4: Quiz */}
                  <div className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                    activeFeature.activeHighlight === 'quiz' ? 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30' : 'hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <HelpCircle className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-zinc-200">Quiz</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">10</span>
                  </div>

                </div>

                {/* Primary CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-black text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Start Test</span>
                </motion.button>

              </div>
            </div>

          </div>

          {/* ── Right Column: Interactive Accordion Feature List ── */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {featureList.map((item) => {
              const isActive = activeId === item.id;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  whileHover={{ x: 4 }}
                  className={`group cursor-pointer transition-all p-3 sm:p-4 rounded-3xl ${
                    isActive ? 'bg-amber-50/60 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/20' : 'hover:bg-slate-50/80 dark:hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    
                    {/* Circle / Checkbox Icon */}
                    <div className="mt-1 shrink-0">
                      {isActive ? (
                        <div className="w-6 h-6 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-md shadow-amber-500/30">
                          <CheckCircle2 className="w-6 h-6 text-white fill-[#F59E0B]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-zinc-700 group-hover:border-amber-400 transition-colors" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5">
                      <h3
                        className={`text-lg sm:text-xl font-extrabold tracking-tight transition-colors ${
                          isActive
                            ? 'text-[#F59E0B] dark:text-[#FBBF24]'
                            : 'text-slate-800 dark:text-zinc-200 group-hover:text-slate-900 dark:group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
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
