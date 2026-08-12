import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate subscription process
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-cyan-50/20 to-slate-50 dark:from-dark-900 dark:via-[#091b20]/40 dark:to-dark-900 py-20 lg:py-24 border-t border-slate-200/80 dark:border-dark-700/80 transition-colors duration-300">
      {/* Dynamic Background Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#0097B2]/10 dark:bg-[#0097B2]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-10 w-72 h-72 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl sm:rounded-[2.5rem] bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl border border-slate-200/90 dark:border-dark-700 p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl shadow-[#0097B2]/10 dark:shadow-none"
        >
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#0097B2]/20 to-transparent rounded-bl-full pointer-events-none -z-0" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Section Tag Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0097B2]/10 dark:bg-[#0097B2]/20 border border-[#0097B2]/20 dark:border-[#0097B2]/40 text-xs font-black tracking-wider uppercase text-[#0097B2] dark:text-cyan-300 mb-4"
            >
              <Mail className="w-3.5 h-3.5 text-[#0097B2] dark:text-cyan-300" />
              <span>14. Newsletter</span>
            </motion.div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              Stay Updated
            </h2>

            {/* Description Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 font-medium max-w-xl mx-auto leading-relaxed mb-8">
              Free IELTS tips every week.
            </p>

            {/* Subscription Form / Success State */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto"
                >
                  <div className="flex flex-col sm:flex-row items-stretch gap-3 p-2 rounded-2xl sm:rounded-full bg-slate-100/90 dark:bg-dark-900/90 border border-slate-200 dark:border-dark-700 shadow-inner focus-within:ring-2 focus-within:ring-[#0097B2] focus-within:border-transparent transition-all">
                    <div className="relative flex-grow flex items-center px-4 py-2 sm:py-0">
                      <Mail className="w-5 h-5 text-slate-400 dark:text-zinc-500 shrink-0" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder="Enter your email address..."
                        className="w-full pl-3 pr-2 py-2 bg-transparent text-slate-900 dark:text-white text-sm sm:text-base placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-7 py-3.5 rounded-xl sm:rounded-full bg-gradient-to-r from-[#0097B2] to-[#004B59] hover:from-[#00829a] hover:to-[#003843] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#0097B2]/25 flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0 disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>

                  {error && (
                    <p className="mt-2 text-xs font-semibold text-red-500 dark:text-red-400 text-left pl-4">
                      {error}
                    </p>
                  )}

                  {/* Micro-perks list */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-zinc-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      Weekly Band 8.0 Cheat Sheets
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0097B2] shrink-0" />
                      No spam, unsubscribe anytime
                    </span>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 max-w-md mx-auto text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    You're on the list!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
                    We've sent a welcome email to <strong className="text-emerald-600 dark:text-emerald-400">{email}</strong>. Check your inbox every Monday for fresh IELTS tips!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
