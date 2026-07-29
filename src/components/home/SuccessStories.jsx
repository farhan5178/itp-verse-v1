import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Neha D.',
    role: 'Academic Advisor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    quote: "Edwaay didn't just help me pass the IELTS — it helped me master real English expression. I've never felt more confident and fluent speaking under pressure.",
    rotation: '-rotate-6 hover:-rotate-2',
    offset: 'lg:translate-y-6',
    zIndex: 'z-10',
  },
  {
    id: 2,
    name: 'Fatima S.',
    role: 'Corporate Scholar, UAE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: "I never imagined I'd hit my target IELTS Band 8.0 score on the first attempt — let alone top the charts! I was overwhelmed searching for mock structures, but Edwaay guided me with its smart dynamic resources, interactive lessons, and realistic simulator.",
    rotation: 'rotate-0',
    offset: 'lg:-translate-y-4',
    zIndex: 'z-20 shadow-2xl scale-105',
    featured: true,
  },
  {
    id: 3,
    name: 'Ray K.',
    role: 'Graduate Student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: "From zero preparation to an absolute band score boost on IELTS in 30 days! The realistic mock systems and expert study plan made the entire process stress-free.",
    rotation: 'rotate-6 hover:rotate-2',
    offset: 'lg:translate-y-6',
    zIndex: 'z-10',
  },
];

/* ── Dot Grid Decor Pattern ── */
function DotGridPattern({ className }) {
  return (
    <svg className={`w-24 h-16 text-slate-200 dark:text-zinc-800 ${className}`} fill="currentColor" viewBox="0 0 96 64">
      <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="2" />
      </pattern>
      <rect width="96" height="64" fill="url(#dot-pattern)" />
    </svg>
  );
}

export default function SuccessStories() {
  return (
    <section className="relative overflow-hidden bg-slate-50/70 dark:bg-[#07070a] py-20 lg:py-28 border-t border-slate-100 dark:border-zinc-900">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#0097B2]/5 dark:bg-[#0097B2]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Dot Matrix Corner Accents */}
      <DotGridPattern className="absolute top-8 left-8 opacity-60 pointer-events-none" />
      <DotGridPattern className="absolute top-8 right-8 opacity-60 pointer-events-none" />
      <DotGridPattern className="absolute bottom-8 left-8 opacity-60 pointer-events-none" />
      <DotGridPattern className="absolute bottom-8 right-8 opacity-60 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Title ── */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700 text-[11px] font-black uppercase tracking-[0.2em] text-[#0097B2] dark:text-cyan-400 shadow-xs mb-4"
          >
            <span>STUDENT TESTIMONIALS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Success Stories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-slate-500 dark:text-zinc-400 font-medium"
          >
            Real results from students who conquered their score barriers.
          </motion.p>
        </div>

        {/* ── Cards Container ── */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4 items-center">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.25 } }}
                className={`relative rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-7 shadow-xl transition-all duration-300 flex flex-col justify-between ${item.rotation} ${item.offset} ${item.zIndex}`}
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-200 font-medium leading-relaxed mb-6 italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#0097B2]/30 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                      {item.name}
                    </h4>
                    <span className="text-[10px] sm:text-xs font-bold text-[#0097B2] dark:text-cyan-400">
                      {item.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
