import React from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function StudyPlanCTA() {
  const { openAuthModal } = useAuth();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#07070a] py-16 sm:py-24 border-t border-slate-100 dark:border-zinc-900">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0097B2]/5 dark:bg-[#0097B2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl mx-auto rounded-3xl sm:rounded-[2.5rem] bg-[#F3FAFC] dark:bg-[#0a1e24] border border-[#D0EEF5] dark:border-[#0097B2]/30 p-8 sm:p-12 text-center overflow-hidden shadow-xl shadow-[#0097B2]/5 group"
        >
          {/* Decorative Target Aura Graphic (Bottom Right) */}
          <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-20 dark:opacity-30 transition-transform duration-500 group-hover:scale-110">
            <div className="w-48 h-48 rounded-full border-8 border-pink-400/40 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-[#0097B2]/40 flex items-center justify-center">
                <Target className="w-16 h-16 text-pink-500" />
              </div>
            </div>
          </div>

          {/* Top Subtitle Badge */}
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0097B2] dark:text-cyan-400 block mb-3">
            INTERACTIVE DAILY TRAINER
          </span>

          {/* Main Headline */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            Ready to kickstart your study?
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 font-medium max-w-lg mx-auto leading-relaxed mb-8">
            Unlock your complete day-by-day 8-week curriculum for IELTS. Access lessons, core speaking/writing interactive templates, vocabulary and practice activities customized to your target range.
          </p>

          {/* Primary Action Pill Button */}
          <motion.button
            onClick={openAuthModal}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0097B2] hover:bg-[#00829a] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-[#0097B2]/25 transition-all cursor-pointer"
          >
            {/* Target Icon Pill inside button */}
            <div className="w-6 h-6 rounded-full bg-pink-400/30 flex items-center justify-center shrink-0">
              <Target className="w-3.5 h-3.5 text-pink-100" />
            </div>

            <span>GO TO YOUR 8-WEEK STUDY PLAN</span>

            <ChevronRight className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-1" />
          </motion.button>

        </motion.div>

      </div>
    </section>
  );
}
