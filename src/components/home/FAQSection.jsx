import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const faqItems = [
  {
    id: 1,
    question: 'Is AI Speaking free?',
    answer: 'Yes! Every candidate gets free daily AI Speaking evaluation credits to practice pronunciation, fluency, and vocabulary feedback. Premium members unlock unlimited speaking practice and detailed sentence-by-sentence analysis.',
    category: 'General',
  },
  {
    id: 2,
    question: 'Which exams are supported?',
    answer: 'ITPverse primarily focuses on TOEFL ITP (Level 1 & Level 2), IELTS Academic & General Training, and TOEFL iBT preparation with section-specific practice modules and realistic exam simulators.',
    category: 'Exams',
  },
  {
    id: 3,
    question: 'Can I practice on mobile?',
    answer: 'Absolutely. ITPverse is completely responsive across mobile smartphones, tablets, laptops, and desktops. You can record speaking responses and take mock practice tests directly from your browser on any mobile device.',
    category: 'General',
  },
  {
    id: 4,
    question: 'How accurate is the score prediction?',
    answer: 'Our AI diagnostic engine uses standardized ETS & IELTS grading criteria with over 95% predictive accuracy compared to actual official exam results, based on thousands of real candidate performance datasets.',
    category: 'Features',
  },
  {
    id: 5,
    question: 'Do I get certificates?',
    answer: 'Yes! Upon completing full-length simulated mock tests or finishing personalized study roadmaps, you receive verified digital performance certificates that highlight your section scores and proficiency level.',
    category: 'Features',
  },
  {
    id: 6,
    question: 'Can beginners use ITPverse?',
    answer: 'Yes, ITPverse is designed for all proficiency levels from A2 to C2. Our diagnostic test assesses your baseline score and creates a step-by-step personalized roadmap tailored specifically to your target score.',
    category: 'General',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { openAuthModal } = useAuth();

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-cyan-50/20 to-slate-50 dark:from-dark-900 dark:via-[#091b20]/60 dark:to-dark-900 py-20 lg:py-28 border-t border-slate-200/80 dark:border-dark-700/80 transition-colors duration-300">
      
      {/* Background ambient brand glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#0097B2]/10 dark:bg-[#0097B2]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#004B59]/10 dark:bg-[#004B59]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Title Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E6F5F7] to-cyan-100/70 dark:from-[#0097B2]/20 dark:to-[#004B59]/30 border border-[#0097B2]/30 text-xs font-black uppercase tracking-wider text-[#0097B2] dark:text-cyan-300 shadow-sm mb-4"
          >
            <HelpCircle className="w-4 h-4 text-[#0097B2] dark:text-cyan-300" />
            <span>12. FREQUENTLY ASKED QUESTIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-headline"
          >
            Got Questions? We Have{' '}
            <span className="bg-gradient-to-r from-[#0097B2] via-cyan-500 to-[#004B59] dark:from-cyan-300 dark:via-[#0097B2] dark:to-teal-200 bg-clip-text text-transparent">
              Answers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-dark-muted font-medium max-w-2xl mx-auto"
          >
            Everything you need to know about our AI speaking feedback, practice tests, and exam preparation platform.
          </motion.p>

          {/* Search Filter Input */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-md mx-auto relative"
          >
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#0097B2] dark:text-cyan-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions (e.g. AI speaking, mobile, certificates)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-dark-800 border border-slate-200/90 dark:border-dark-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-[#0097B2]/50 shadow-sm transition-all duration-200"
              />
            </div>
          </motion.div>
        </div>

        {/* ── FAQ Accordion List ── */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-gradient-to-br from-white via-cyan-50/40 to-[#E6F5F7]/40 dark:from-[#0d242b] dark:via-[#091b20] dark:to-[#061317] border-[#0097B2]/50 shadow-lg ring-1 ring-[#0097B2]/30'
                      : 'bg-white/90 dark:bg-dark-800/90 border-slate-200/90 dark:border-dark-700 hover:border-[#0097B2]/40 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-headline leading-snug flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#0097B2] dark:bg-cyan-400 shrink-0" />
                      {faq.question}
                    </span>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#0097B2] text-white rotate-180 shadow-xs'
                        : 'bg-slate-100 dark:bg-dark-700 text-slate-600 dark:text-dark-muted'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-slate-200/60 dark:border-dark-700/60 text-xs sm:text-sm text-slate-600 dark:text-dark-muted font-normal leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-dark-700">
              <p className="text-sm font-semibold text-slate-500 dark:text-dark-muted">
                No matching questions found for "{searchQuery}".
              </p>
            </div>
          )}
        </div>

        {/* ── Support Help Banner CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 via-[#004B59] to-slate-900 dark:from-[#091b20] dark:via-[#004B59] dark:to-[#091b20] border border-[#0097B2]/40 p-8 shadow-2xl text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0097B2]/20 border border-[#0097B2]/40 text-[#0097B2] dark:text-cyan-300 mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white font-headline mb-2">
              Still Have Questions?
            </h3>

            <p className="text-xs sm:text-sm text-cyan-100/80 max-w-lg mx-auto mb-6 font-medium">
              Start practicing today with free diagnostic tests or talk to our academic support advisors.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={openAuthModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#0097B2] to-[#00788E] hover:from-[#1AB0CB] hover:to-[#0097B2] shadow-lg hover:shadow-cyan-500/30 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <span>Start Free Practice</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
