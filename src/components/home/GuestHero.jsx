import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, Building2,
  GraduationCap, Users, Award, Globe, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Particles from './HeroOnboarding/Particles';

/* ── Surrounding Thought Bubble (Shoots out from body to surrounding 4 positions) ── */
function SurroundingThoughtBubble({ text, className, delay = 0, initialOffset = { x: 0, y: 20 }, tailPosition = "bottom-left" }) {
  const getTailClass = () => {
    switch (tailPosition) {
      case 'bottom-right':
        return 'absolute -bottom-1.5 right-4 sm:right-6 w-3 h-3 bg-white dark:bg-zinc-900 border-r border-b border-[#0097B2]/30 dark:border-zinc-800 rotate-45';
      case 'bottom-left':
        return 'absolute -bottom-1.5 left-4 sm:left-6 w-3 h-3 bg-white dark:bg-zinc-900 border-r border-b border-[#0097B2]/30 dark:border-zinc-800 rotate-45';
      case 'right':
        return 'absolute top-3 -right-1.5 w-3 h-3 bg-white dark:bg-zinc-900 border-t border-r border-[#0097B2]/30 dark:border-zinc-800 rotate-45';
      case 'top-left':
        return 'absolute -top-1.5 left-4 sm:left-6 w-3 h-3 bg-white dark:bg-zinc-900 border-t border-l border-[#0097B2]/30 dark:border-zinc-800 rotate-45';
      default:
        return 'absolute -bottom-1.5 left-4 sm:left-6 w-3 h-3 bg-white dark:bg-zinc-900 border-r border-b border-[#0097B2]/30 dark:border-zinc-800 rotate-45';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, ...initialOffset }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.55,
        delay: delay,
        type: 'spring',
        stiffness: 220,
        damping: 16
      }}
      whileHover={{ scale: 1.08, y: -4, zIndex: 40 }}
      className={`absolute px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-[#0097B2]/30 dark:border-zinc-800 shadow-xl shadow-[#0097B2]/15 text-slate-800 dark:text-zinc-100 text-[10px] sm:text-xs font-extrabold whitespace-nowrap cursor-pointer z-30 ${className}`}
    >
      <span className="relative z-10">{text}</span>
      {/* Speech bubble tail indicator pointing directly to avatar */}
      <div className={getTailClass()} />
    </motion.div>
  );
}

export default function GuestHero() {
  const { openAuthModal } = useAuth();

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-8 pb-12 sm:pb-16 min-h-[90vh] flex flex-col justify-between">
      
      {/* ── Background: Brand Academic Clarity Palette ── */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: 'linear-gradient(135deg, #eef9fb 0%, #f4fafb 40%, #e6f5f7 70%, #f0fbfe 100%)',
        }}
      />
      {/* Dark Overlay for dark mode */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hidden dark:block"
        style={{
          background: 'linear-gradient(135deg, #061317 0%, #091b20 40%, #00252d 70%, #092027 100%)',
        }}
      />

      {/* ── Floating ambient animated particles (From Login Hero) ── */}
      <Particles />

      {/* Glowing Ambient Radial Orbs in Brand Teal */}
      <div className="absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#0097B2]/10 dark:bg-[#0097B2]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#004B59]/10 dark:bg-[#004B59]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* Decorative Background Doodles */}
      <div className="absolute top-12 left-4 sm:left-12 text-[#0097B2]/30 dark:text-[#0097B2]/40 text-4xl sm:text-5xl font-black select-none pointer-events-none -z-10 animate-bounce" style={{ animationDuration: '4s' }}>
        ?
      </div>
      <div className="absolute top-28 left-1/4 text-[#004B59]/25 text-2xl sm:text-3xl font-black select-none pointer-events-none -z-10">
        ?
      </div>
      <div className="absolute top-16 right-4 sm:right-16 text-amber-400/50 text-3xl sm:text-4xl select-none pointer-events-none -z-10">
        💡
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* Top Mission Pill Tag */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-[#0097B2]/30 dark:border-[#0097B2]/40 shadow-sm text-[11px] sm:text-xs font-bold text-slate-700 dark:text-zinc-200"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#0097B2] dark:text-[#1AB0CB]" />
            <span>Your Dream <strong className="text-[#0097B2] dark:text-[#1AB0CB]">UNI</strong>. Your Future. Our Mission.</span>
          </motion.div>
        </div>

        {/* ── Main 3-Column Layout (Fully Mobile Responsive) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* ── LEFT COLUMN: Confused Female Avatar + 4 Surrounding Questions ── */}
          <div className="lg:col-span-3 flex flex-col items-center relative order-2 lg:order-1 min-h-[340px] sm:min-h-[400px] justify-center overflow-x-visible">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-full flex items-center justify-center min-h-[340px]">
              
              {/* 4 Surrounding Thought Bubbles (Mobile Optimized Positioning) */}
              
              {/* 1. Top-Left */}
              <SurroundingThoughtBubble
                text="Which UNI is right for me?"
                delay={0.65}
                initialOffset={{ x: 40, y: 30 }}
                tailPosition="bottom-right"
                className="-top-3 left-0 sm:-left-6"
              />

              {/* 2. Top-Right */}
              <SurroundingThoughtBubble
                text="How to get High CTO?"
                delay={0.8}
                initialOffset={{ x: -40, y: 30 }}
                tailPosition="bottom-left"
                className="top-8 right-0 sm:-right-8"
              />

              {/* 3. Mid-Left */}
              <SurroundingThoughtBubble
                text="Where can I find real scholarships?"
                delay={0.95}
                initialOffset={{ x: 40, y: -20 }}
                tailPosition="right"
                className="top-36 left-0 sm:-left-10"
              />

              {/* 4. Bottom-Right */}
              <SurroundingThoughtBubble
                text="I wish I had someone to guide me..."
                delay={1.1}
                initialOffset={{ x: -30, y: -30 }}
                tailPosition="top-left"
                className="bottom-0 right-0 sm:-right-6"
              />

              {/* 3D Animated Female Student Avatar with Explicit Confused Face */}
              <motion.div
                initial={{ opacity: 0, x: -140, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.65,
                  type: 'spring',
                  bounce: 0.35,
                }}
                className="relative z-10 cursor-pointer group/avatar"
              >
                {/* Continuous Breathing Float Motion */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -1.5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.7,
                  }}
                  whileHover={{ scale: 1.08, rotate: -3, y: -12 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Pulsing Ambient Teal Aura */}
                  <motion.div
                    animate={{
                      scale: [0.95, 1.25, 0.95],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-[#0097B2]/20 rounded-full blur-2xl -z-10 pointer-events-none"
                  />

                  <img
                    src="/img/confused_female_student.png"
                    alt="Confused Student with doubt expression"
                    className="w-48 sm:w-60 lg:w-72 max-h-[340px] sm:max-h-[380px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,151,178,0.25)] group-hover/avatar:drop-shadow-[0_20px_40px_rgba(0,151,178,0.4)] transition-all duration-300"
                  />
                </motion.div>
              </motion.div>

            </div>
          </div>

          {/* ── CENTER COLUMN: Main Headline & Brand Solution Cards ── */}
          <div className="lg:col-span-6 flex flex-col items-center text-center order-1 lg:order-2">
            
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.2] lg:leading-[1.15] tracking-tight mb-3 px-2 sm:px-0"
            >
              Confused About Your Future? <br className="hidden sm:inline" />
              We Have <span className="bg-gradient-to-r from-[#0097B2] via-[#00788E] to-[#004B59] bg-clip-text text-transparent">The Solution.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-semibold max-w-lg mb-6 leading-relaxed px-3 sm:px-0"
            >
              High CTOs. Top Universities. Real Scholarships. <br className="hidden sm:inline" />
              Guided by Alumni Who've Been There.
            </motion.p>

            {/* 3 Brand Solution Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6 px-2 sm:px-0"
            >
              {/* Card 1: High CTO Universities */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-md hover:shadow-xl hover:border-[#0097B2]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-10 h-10 rounded-xl bg-[#0097B2]/10 text-[#0097B2] dark:text-[#1AB0CB] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mb-1 leading-tight">
                  High CTO Universities
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-snug">
                  Get into top ranked universities with high CTOs.
                </p>
              </div>

              {/* Card 2: Smart Scholarship Finder */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-md hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mb-1 leading-tight">
                  Smart Scholarship Finder
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-snug">
                  Find the best matching scholarships in just one click.
                </p>
              </div>

              {/* Card 3: Alumni Mentor Guidance */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-md hover:shadow-xl hover:border-[#004B59]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-10 h-10 rounded-xl bg-[#004B59]/10 text-[#004B59] dark:text-[#00677B] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white mb-1 leading-tight">
                  Alumni Mentor Guidance
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-snug">
                  Connect with alumni who guide, support & mentor you.
                </p>
              </div>
            </motion.div>

            {/* Primary CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col items-center gap-3 w-full px-2 sm:px-0"
            >
              <button
                onClick={openAuthModal}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0097B2] via-[#00788E] to-[#004B59] text-white font-black text-sm sm:text-base shadow-lg shadow-[#0097B2]/30 hover:shadow-xl hover:shadow-[#0097B2]/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>Join Edwaay Today</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Trust Proof Row */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-1 text-slate-500 dark:text-zinc-400 text-xs font-semibold text-center">
                <p className="text-[10.5px] sm:text-[11px]">Thousands of students. One platform. Endless possibilities.</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Student" />
                    <img className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Student" />
                    <img className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Student" />
                    <span className="w-6 h-6 rounded-full bg-[#0097B2] text-white text-[9px] font-black flex items-center justify-center border-2 border-white dark:border-zinc-900">
                      10K+
                    </span>
                  </div>
                  <span className="text-[10.5px] font-bold text-slate-700 dark:text-zinc-300">Students trust Edwaay</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: Mentor Avatar + Solution Checklist ── */}
          <div className="lg:col-span-3 flex flex-col items-center relative order-3">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full flex flex-col items-center">
              
              {/* Floating Speech Bubble Above Guide */}
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8, type: 'spring', stiffness: 220 }}
                whileHover={{ scale: 1.05 }}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-[#0097B2]/30 dark:border-zinc-800 shadow-md text-[11px] sm:text-xs font-bold text-slate-800 dark:text-zinc-200 mb-2 cursor-pointer"
              >
                <span className="text-[#0097B2] dark:text-[#1AB0CB] font-black">Edwaay</span> has Everything you need!
              </motion.div>

              {/* 3D Animated Male Mentor Avatar */}
              <motion.div
                initial={{ opacity: 0, x: 140, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.65,
                  type: 'spring',
                  bounce: 0.35,
                  delay: 0.1,
                }}
                className="relative z-10 cursor-pointer group/mentor"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.7,
                  }}
                  whileHover={{ scale: 1.08, rotate: 3, y: -12 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Pulsing Ambient Teal Aura */}
                  <motion.div
                    animate={{
                      scale: [0.95, 1.25, 0.95],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-[#004B59]/20 rounded-full blur-2xl -z-10 pointer-events-none"
                  />

                  <img
                    src="/img/happy_mentor_student.png"
                    alt="Edwaay Happy Student Mentor guiding options"
                    className="w-48 sm:w-60 lg:w-72 max-h-[340px] sm:max-h-[380px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,75,89,0.2)] group-hover/mentor:drop-shadow-[0_20px_40px_rgba(0,151,178,0.35)] transition-all duration-300"
                  />
                </motion.div>
              </motion.div>

              {/* Floating Solution Checklist Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.95, type: 'spring', stiffness: 220 }}
                className="w-full mt-2 p-3 sm:p-3.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-slate-200/90 dark:border-zinc-800 shadow-lg space-y-2 text-left"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>High CTO Universities</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Smart Scholarship Finder</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Alumni Mentor Guidance <span className="text-[9.5px] text-[#0097B2] font-extrabold">(Exclusive)</span></span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

      </div>

      {/* ── BOTTOM FEATURE CAPSULE BAR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="p-3 sm:p-4 rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-xl grid grid-cols-2 md:grid-cols-5 gap-3 text-center"
        >
          {/* Feature 1 */}
          <div className="flex items-center justify-center gap-2.5 p-2 rounded-2xl hover:bg-[#E6F5F7]/50 dark:hover:bg-zinc-800/50 transition-colors">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#0097B2] dark:text-[#1AB0CB] flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">Top Universities</p>
              <p className="text-[10px] text-slate-500 font-medium">Worldwide</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center justify-center gap-2.5 p-2 rounded-2xl hover:bg-[#E6F5F7]/50 dark:hover:bg-zinc-800/50 transition-colors">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#004B59] dark:text-[#1AB0CB] flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">High CTO</p>
              <p className="text-[10px] text-slate-500 font-medium">Guaranteed</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center justify-center gap-2.5 p-2 rounded-2xl hover:bg-[#E6F5F7]/50 dark:hover:bg-zinc-800/50 transition-colors">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">1000+ Scholarships</p>
              <p className="text-[10px] text-slate-500 font-medium">Available</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center justify-center gap-2.5 p-2 rounded-2xl hover:bg-[#E6F5F7]/50 dark:hover:bg-zinc-800/50 transition-colors">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#0097B2] flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">Real Alumni</p>
              <p className="text-[10px] text-slate-500 font-medium">Mentors</p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-2.5 p-2 rounded-2xl hover:bg-[#E6F5F7]/50 dark:hover:bg-zinc-800/50 transition-colors">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#004B59] dark:text-[#1AB0CB] flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">Personalized</p>
              <p className="text-[10px] text-slate-500 font-medium">Guidance</p>
            </div>
          </div>

        </motion.div>
      </div>

    </section>
  );
}
