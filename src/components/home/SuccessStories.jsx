import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, CheckCircle2, Award, GraduationCap } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Marcus Vance',
    role: 'Graduate Applicant, UK',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: "I improved from 6.0 to 7.5 in just two months.",
    detail: "The dynamic study roadmap kept me accountable every single day, and the exam simulator prepared me perfectly for the real test environment.",
    scoreBadge: '+1.5 Band Boost',
    scoreDetail: 'Target Score Reached',
    highlight: true,
    rotation: '-rotate-1 hover:rotate-0',
    zIndex: 'z-10',
  },
  {
    id: 2,
    name: 'Aisha Rahman',
    role: "Master's Scholar, Germany",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    quote: "The AI speaking feedback was incredibly useful.",
    detail: "It pinpointed my exact pronunciation mistakes and grammar hesitation in real time, giving me actionable fixes after every practice session.",
    scoreBadge: 'Speaking 28/30',
    scoreDetail: 'AI Feedback Mastery',
    highlight: true,
    rotation: 'rotate-0',
    zIndex: 'z-20 shadow-2xl scale-[1.02]',
    featured: true,
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Undergraduate Scholar, USA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: "From zero prep to 630 on TOEFL ITP on my first attempt!",
    detail: "The full-length mock tests match the actual exam format 1:1. I entered test day feeling 100% confident and calm.",
    scoreBadge: 'Score: 630 (95th%)',
    scoreDetail: 'First Attempt Clear',
    highlight: false,
    rotation: 'rotate-1 hover:rotate-0',
    zIndex: 'z-10',
  },
];

const platformStats = [
  { label: 'Target Score Reach Rate', value: '98.4%', icon: TrendingUp },
  { label: 'Students Accelerated', value: '15,000+', icon: Award },
  { label: 'Average User Rating', value: '4.95 / 5', icon: Star },
];

/* ── Dot Grid Background Accent ── */
function DotGridPattern({ className }) {
  return (
    <svg className={`w-28 h-20 text-slate-200/60 dark:text-dark-700/40 ${className}`} fill="currentColor" viewBox="0 0 96 64">
      <pattern id="dot-pattern-testimonials" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="2" />
      </pattern>
      <rect width="96" height="64" fill="url(#dot-pattern-testimonials)" />
    </svg>
  );
}

export default function SuccessStories() {
  return (
    <section className="relative overflow-hidden bg-slate-50/80 dark:bg-dark-900 py-20 lg:py-28 border-t border-slate-200/80 dark:border-dark-700/80 transition-colors duration-300">
      
      {/* Background Brand Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-brand/5 dark:bg-brand/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/5 dark:bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Dot Matrix Patterns */}
      <DotGridPattern className="absolute top-8 left-8 opacity-70 pointer-events-none hidden sm:block" />
      <DotGridPattern className="absolute top-8 right-8 opacity-70 pointer-events-none hidden sm:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Title Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6F5F7] dark:bg-[#0097B2]/15 border border-[#0097B2]/30 text-xs font-black uppercase tracking-wider text-[#0097B2] dark:text-cyan-300 shadow-xs mb-4"
          >
            <GraduationCap className="w-4 h-4 text-[#0097B2] dark:text-cyan-300" />
            <span>10. STUDENT TESTIMONIALS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-headline"
          >
            Proven Results from{' '}
            <span className="bg-gradient-to-r from-[#0097B2] via-cyan-500 to-[#004B59] dark:from-cyan-400 dark:via-[#0097B2] dark:to-teal-300 bg-clip-text text-transparent">
              Real Test-Takers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-dark-muted font-medium max-w-2xl mx-auto"
          >
            Discover how candidates unlock score breakthroughs with personalized practice and real-time AI feedback.
          </motion.p>
        </div>

        {/* ── Testimonial Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative rounded-3xl bg-white dark:bg-dark-800 border ${
                item.featured
                  ? 'border-brand/40 dark:border-brand/50 ring-2 ring-brand/20 dark:ring-brand/30'
                  : 'border-slate-200/90 dark:border-dark-700'
              } p-7 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${item.rotation} ${item.zIndex}`}
            >
              {/* Quote Watermark Icon */}
              <div className="absolute top-6 right-6 text-brand/10 dark:text-brand/15 pointer-events-none">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                {/* Score Improvement Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-muted text-brand dark:bg-brand/20 dark:text-brand-light border border-brand/20 dark:border-brand/30">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {item.scoreBadge}
                  </span>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Primary Testimonial Quote */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-3">
                  "{item.quote}"
                </h3>

                {/* Supporting Detail */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-muted font-normal leading-relaxed mb-6">
                  {item.detail}
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-5 border-t border-slate-100 dark:border-dark-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-brand/40 shadow-xs shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs font-semibold text-brand dark:text-brand-light mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Platform Impact Summary Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto rounded-2xl bg-white/90 dark:bg-dark-800/90 border border-slate-200 dark:border-dark-700 p-6 sm:p-8 shadow-lg backdrop-blur-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-dark-700">
            {platformStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className={i > 0 ? 'pt-4 sm:pt-0' : ''}>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-muted dark:bg-brand/20 text-brand dark:text-brand-light mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-headline">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-neutral-slate dark:text-dark-muted mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

