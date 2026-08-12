import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  GraduationCap,
  Users,
  Award,
  Globe,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import Particles from './HeroOnboarding/Particles';
import InteractiveGlobe from './InteractiveGlobe';
import { useAuth } from '../../context/AuthContext';


/* ── Floating Thought Bubble Component with Sequential Spring Entrance ── */
function FloatingThoughtBubble({ text, className, delay = 0, tailPosition = "bottom-left" }) {
  const getTailClass = () => {
    switch (tailPosition) {
      case 'bottom-right':
        return 'absolute -bottom-1.5 right-3 sm:right-6 w-2.5 h-2.5 bg-white/95 dark:bg-[#0d242b]/95 border-r border-b border-slate-200 dark:border-[#0097B2]/40 rotate-45';
      case 'bottom-left':
        return 'absolute -bottom-1.5 left-3 sm:left-6 w-2.5 h-2.5 bg-white/95 dark:bg-[#0d242b]/95 border-r border-b border-slate-200 dark:border-[#0097B2]/40 rotate-45';
      case 'right':
        return 'absolute top-3 -right-1.5 w-2.5 h-2.5 bg-white/95 dark:bg-[#0d242b]/95 border-t border-r border-slate-200 dark:border-[#0097B2]/40 rotate-45';
      case 'top-left':
        return 'absolute -top-1.5 left-3 sm:left-6 w-2.5 h-2.5 bg-white/95 dark:bg-[#0d242b]/95 border-t border-l border-slate-200 dark:border-[#0097B2]/40 rotate-45';
      default:
        return 'absolute -bottom-1.5 left-3 sm:left-6 w-2.5 h-2.5 bg-white/95 dark:bg-[#0d242b]/95 border-r border-b border-slate-200 dark:border-[#0097B2]/40 rotate-45';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -20, transition: { duration: 0.3 } }}
      transition={{
        duration: 0.5,
        delay: delay,
        type: 'spring',
        stiffness: 220,
        damping: 16
      }}
      whileHover={{ scale: 1.08, y: -4 }}
      className={`absolute px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 dark:bg-[#0d242b]/95 backdrop-blur-xl border border-slate-200/90 dark:border-[#0097B2]/40 shadow-xl shadow-[#0097B2]/15 text-slate-800 dark:text-[#E6F5F7] text-[10px] sm:text-xs font-extrabold cursor-pointer z-30 ${className}`}
    >
      <span className="relative z-10">{text}</span>
      <div className={getTailClass()} />
    </motion.div>
  );
}

export default function UniversityFinder() {
  const { openAuthModal } = useAuth();
  const [animCycleKey, setAnimCycleKey] = useState(0);

  /* 10-Second Storytelling Sequence Replay Timer */
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimCycleKey((prev) => prev + 1);
    }, 10500);
    return () => clearInterval(timer);
  }, []);

  const handleReplayCycle = () => {
    setAnimCycleKey((prev) => prev + 1);
  };

  return (
    <section id="university-finder" className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 min-h-[90vh] flex flex-col justify-between max-w-full border-t border-slate-200/80 dark:border-zinc-800">
      
      {/* ── Background: Brand Academic Clarity Gradient ── */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: 'linear-gradient(135deg, #eef9fb 0%, #f4fafb 40%, #e6f5f7 70%, #f0fbfe 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 hidden dark:block"
        style={{
          background: 'linear-gradient(135deg, #061317 0%, #091b20 40%, #00252d 70%, #092027 100%)',
        }}
      />

      <Particles />

      {/* Glowing Ambient Radial Orbs */}
      <div className="absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#0097B2]/10 dark:bg-[#0097B2]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#004B59]/10 dark:bg-[#004B59]/25 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        
        {/* Top Mission Pill Tag */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white/90 dark:bg-[#091b20]/90 backdrop-blur-md border border-[#0097B2]/30 dark:border-[#0097B2]/40 shadow-sm text-[10.5px] sm:text-xs font-bold text-slate-700 dark:text-[#E6F5F7] text-center"
          >
            <Globe className="w-3.5 h-3.5 text-[#0097B2] dark:text-[#1AB0CB] flex-shrink-0" />
            <span>Unique Ecosystem Feature • <strong className="text-[#0097B2] dark:text-[#1AB0CB]">University & Scholarship Finder</strong></span>
          </motion.div>
        </div>

        {/* ── Main 3-Column Storytelling Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* ── CENTER COLUMN: Main Headline & Solution Cards (Order-1 on Desktop) ── */}
          <div className="lg:col-span-6 flex flex-col items-center text-center order-1 lg:order-2">
            
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-[#E6F5F7] leading-[1.2] lg:leading-[1.15] tracking-tight mb-3 px-2 sm:px-0"
            >
              Find Universities & Scholarships <br className="hidden sm:inline" />
              Based On Your <span className="bg-gradient-to-r from-[#0097B2] via-[#00788E] to-[#004B59] bg-clip-text text-transparent">IELTS Score.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-semibold max-w-lg mb-6 leading-relaxed px-3 sm:px-0"
            >
              Search 500+ global universities, filter 100% full-ride scholarships, <br className="hidden sm:inline" />
              and check tuition-free public options with real alumni guidance.
            </motion.p>

            {/* ── Interactive 3D Moving Globe (Middle Feature) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="my-3 flex justify-center w-full"
            >
              <InteractiveGlobe size={320} className="w-full" />
            </motion.div>

            {/* 3 Brand Solution Cards */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-6 px-2 sm:px-0"
            >
              {/* Card 1 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-200/80 dark:border-[#0097B2]/30 shadow-md hover:shadow-xl hover:border-[#0097B2]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-10 h-10 rounded-xl bg-[#0097B2]/10 text-[#0097B2] dark:text-[#1AB0CB] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-[#E6F5F7] mb-1 leading-tight">
                  500+ Universities
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-snug">
                  Filter USA, UK, Canada, Australia & Europe options.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-200/80 dark:border-[#0097B2]/30 shadow-md hover:shadow-xl hover:border-emerald-500/60 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-[#E6F5F7] mb-1 leading-tight">
                  100% Scholarships
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-snug">
                  Match full tuition & living stipend grants.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-200/80 dark:border-[#0097B2]/30 shadow-md hover:shadow-xl hover:border-[#004B59]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-10 h-10 rounded-xl bg-[#004B59]/10 text-[#004B59] dark:text-[#1AB0CB] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-[#E6F5F7] mb-1 leading-tight">
                  Score Cutoff Match
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-snug">
                  Match Band 6.0 to 8.0+ criteria instantly.
                </p>
              </div>
            </motion.div>

            {/* Primary CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col items-center gap-3 w-full px-2 sm:px-0 mb-4 lg:mb-0"
            >
              <Link
                to="/university-finder"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0097B2] via-[#00788E] to-[#004B59] text-white font-black text-sm sm:text-base shadow-lg shadow-[#0097B2]/30 hover:shadow-xl hover:shadow-[#0097B2]/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>Find Universities & Scholarships</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-1 text-slate-500 dark:text-zinc-400 text-xs font-semibold text-center">
                <p className="text-[10.5px] sm:text-[11px]">500+ Partner Institutions • 99.4% Match Rate</p>
              </div>
            </motion.div>

          </div>

          {/* ── LEFT COLUMN: Confused Girl Avatar Enters FIRST (t=0.2s), then Questions Arise Sequentially (t=0.8s, 1.4s, 2.0s, 2.6s) ── */}
          <div className="lg:col-span-3 flex flex-col items-center relative order-2 lg:order-1 min-h-[380px] sm:min-h-[420px] justify-center overflow-visible">
            <AnimatePresence mode="wait">
              <div key={animCycleKey} className="relative w-full max-w-[290px] sm:max-w-[340px] lg:max-w-full flex items-center justify-center min-h-[360px]">
                
                {/* 1st Question Arises at t=0.8s */}
                <FloatingThoughtBubble
                  text="Which University accepts Band 6.5?"
                  delay={0.8}
                  tailPosition="bottom-right"
                  className="-top-12 -left-3 sm:-left-8 lg:-left-6"
                />

                {/* 2nd Question Arises at t=1.4s (Repositioned higher & right to clear her face!) */}
                <FloatingThoughtBubble
                  text="Can I get 100% Scholarship?"
                  delay={1.4}
                  tailPosition="bottom-left"
                  className="-top-2 -right-4 sm:-right-10 lg:-right-8"
                />

                {/* 3rd Question Arises at t=2.0s */}
                <FloatingThoughtBubble
                  text="Are German public UNIs free?"
                  delay={2.0}
                  tailPosition="right"
                  className="top-36 -left-6 sm:-left-12 lg:-left-10"
                />

                {/* 4th Question Arises at t=2.6s */}
                <FloatingThoughtBubble
                  text="Too many options... Where do I start?"
                  delay={2.6}
                  tailPosition="top-left"
                  className="-bottom-4 -right-4 sm:-right-10 lg:-right-8"
                />

                {/* Girl Avatar Enters FIRST at t=0.2s */}
                <motion.div
                  initial={{ opacity: 0, x: -150, scale: 0.75 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 100, scale: 0.8, transition: { duration: 0.5 } }}
                  transition={{
                    duration: 0.65,
                    delay: 0.2, // Girl enters FIRST!
                    type: 'spring',
                    bounce: 0.35
                  }}
                  onClick={handleReplayCycle}
                  className="relative z-10 cursor-pointer group/avatar my-4"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, -1.5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                    whileHover={{ scale: 1.08, rotate: -3, y: -12 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-[#0097B2]/20 rounded-full blur-2xl -z-10 pointer-events-none" />
                    <img
                      src="/img/confused_female_student.png"
                      alt="Confused Female Student Avatar"
                      className="w-44 sm:w-60 lg:w-72 max-h-[320px] sm:max-h-[380px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,151,178,0.25)] group-hover/avatar:drop-shadow-[0_20px_40px_rgba(0,151,178,0.4)] transition-all duration-300"
                    />
                  </motion.div>
                </motion.div>

              </div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT COLUMN: Boy Mentor Avatar Enters THEN (t=3.2s), providing Solution & Checklist ── */}
          <div className="lg:col-span-3 flex flex-col items-center relative order-3">
            <AnimatePresence mode="wait">
              <div key={animCycleKey} className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full flex flex-col items-center">
                
                {/* Mentor Speech Bubble Arises at t=3.6s */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -20, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.45, delay: 3.6, type: 'spring', stiffness: 220 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-white/95 dark:bg-[#0d242b]/90 backdrop-blur-md border border-[#0097B2]/30 dark:border-[#0097B2]/40 shadow-md text-[11px] sm:text-xs font-bold text-slate-800 dark:text-[#E6F5F7] mb-2 cursor-pointer"
                >
                  <span className="text-[#0097B2] dark:text-[#1AB0CB] font-black">We Have The Solution!</span>
                </motion.div>

                {/* Boy Mentor Avatar Enters AFTER Questions at t=3.2s */}
                <motion.div
                  initial={{ opacity: 0, x: 150, scale: 0.75 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.8, transition: { duration: 0.5 } }}
                  transition={{
                    duration: 0.65,
                    delay: 3.2, // Boy Mentor enters AFTER questions!
                    type: 'spring',
                    bounce: 0.35
                  }}
                  onClick={handleReplayCycle}
                  className="relative z-10 cursor-pointer group/mentor"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 3.7 }}
                    whileHover={{ scale: 1.08, rotate: 3, y: -12 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-[#004B59]/20 rounded-full blur-2xl -z-10 pointer-events-none" />
                    <img
                      src="/img/happy_mentor_student.png"
                      alt="Edwaay University Mentor"
                      className="w-44 sm:w-60 lg:w-72 max-h-[320px] sm:max-h-[380px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,75,89,0.2)] group-hover/mentor:drop-shadow-[0_20px_40px_rgba(0,151,178,0.35)] transition-all duration-300"
                    />
                  </motion.div>
                </motion.div>

                {/* Solution Checklist Box Arises at t=4.0s */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.45, delay: 4.0, type: 'spring', stiffness: 220 }}
                  className="w-full mt-2 p-3 sm:p-3.5 rounded-2xl bg-white/95 dark:bg-[#091b20]/95 backdrop-blur-md border border-slate-200/90 dark:border-[#0097B2]/30 shadow-lg space-y-2 text-left"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-[#E6F5F7]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Find Universities by Score</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-[#E6F5F7]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Filter 100% Full-Ride Grants</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-[#E6F5F7]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Tuition-Free Public UNIs <span className="text-[9.5px] text-[#0097B2] font-extrabold">(Germany)</span></span>
                  </div>
                </motion.div>

              </div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* ── BOTTOM FEATURE CAPSULE BAR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="p-3 sm:p-4 rounded-3xl bg-white/90 dark:bg-[#091b20]/90 backdrop-blur-xl border border-slate-200/80 dark:border-[#0097B2]/30 shadow-xl grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3 text-center"
        >
          {/* Feature 1 */}
          <div className="flex items-center justify-center gap-2.5 p-2 rounded-2xl hover:bg-[#E6F5F7]/50 dark:hover:bg-[#0d242b]/60 transition-colors">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#0097B2] dark:text-[#1AB0CB] flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-black text-slate-900 dark:text-[#E6F5F7] leading-tight">Top Universities</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Worldwide</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center justify-center gap-2.5 p-2 rounded-2xl hover:bg-[#E6F5F7]/50 dark:hover:bg-[#0d242b]/60 transition-colors">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-black text-slate-900 dark:text-[#E6F5F7] leading-tight">100% Scholarships</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Matched</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center justify-center gap-2.5 p-2 rounded-2xl hover:bg-[#E6F5F7]/50 dark:hover:bg-[#0d242b]/60 transition-colors">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#004B59] dark:text-[#1AB0CB] flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-black text-slate-900 dark:text-[#E6F5F7] leading-tight">IELTS / PTE Cutoff</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Instant Match</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center justify-center gap-2.5 p-2 rounded-2xl hover:bg-[#E6F5F7]/50 dark:hover:bg-[#0d242b]/60 transition-colors">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#0097B2] flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-black text-slate-900 dark:text-[#E6F5F7] leading-tight">Real Alumni</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Mentors</p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-2.5 p-2 rounded-2xl hover:bg-[#E6F5F7]/50 dark:hover:bg-[#0d242b]/60 transition-colors">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#004B59] dark:text-[#1AB0CB] flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs font-black text-slate-900 dark:text-[#E6F5F7] leading-tight">99.4% Match Rate</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Guaranteed</p>
            </div>
          </div>

        </motion.div>
      </div>

    </section>
  );
}
