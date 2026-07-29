import React from 'react';
import { motion } from 'framer-motion';
import { Timer, BookOpen, Headphones, Mic, PenTool, CheckCircle2, ArrowUpRight } from 'lucide-react';

/* ── Icon map ── */
const sectionIcons = {
  Reading: BookOpen,
  Listening: Headphones,
  Speaking: Mic,
  Writing: PenTool,
};

const sectionColors = {
  Reading: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 dark:text-blue-400',
    border: 'group-hover:border-blue-500/40',
    glow: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    accentBar: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    tag: 'Academic Passages'
  },
  Listening: {
    bg: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400',
    border: 'group-hover:border-indigo-500/40',
    glow: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    accentBar: 'bg-gradient-to-r from-indigo-500 to-purple-400',
    badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    tag: 'Audio Recordings'
  },
  Speaking: {
    bg: 'bg-[#0097B2]/10 dark:bg-[#0097B2]/20 text-[#0097B2] dark:text-cyan-400',
    border: 'group-hover:border-[#0097B2]/40',
    glow: 'from-[#0097B2]/20 via-teal-500/10 to-transparent',
    accentBar: 'bg-gradient-to-r from-[#0097B2] to-teal-400',
    badge: 'bg-[#0097B2]/10 text-[#0097B2] dark:text-cyan-400 border-[#0097B2]/20',
    tag: 'Live Evaluation'
  },
  Writing: {
    bg: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 dark:text-amber-400',
    border: 'group-hover:border-amber-500/40',
    glow: 'from-amber-500/20 via-rose-500/10 to-transparent',
    accentBar: 'bg-gradient-to-r from-amber-500 to-rose-400',
    badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    tag: 'Report & Essay'
  },
};

/* ── IELTS exam data ── */
const ieltsData = {
  label: 'IELTS',
  fullName: 'International English Language Testing System',
  duration: '2 hours 40 mins',
  description: (
    <>
      <strong>IELTS (International English Language Testing System)</strong> is the world’s most popular English language proficiency test for higher education and global migration. Evaluates real-life skills across <strong className="text-[#1a2b4a] dark:text-white underline decoration-[#0097B2]/40 underline-offset-4">Academic</strong> and <strong>General Training</strong> formats. The total exam time is approximately <span className="font-black text-[#0097B2]">2 hours and 40 minutes</span>.
    </>
  ),
  modules: [
    {
      name: 'Reading',
      questions: '40 Questions',
      time: '60 mins',
      highlights: ['3 Passages', 'Graphic & Text Comprehension'],
      description: 'Test your understanding of main ideas, details, and implied meanings.'
    },
    {
      name: 'Listening',
      questions: '40 Questions',
      time: '30 mins',
      highlights: ['4 Audio Recordings', 'Monologues & Dialogues'],
      description: 'Evaluate listening comprehension across varied native accents.'
    },
    {
      name: 'Speaking',
      questions: '3 Interactive Parts',
      time: '11–14 mins',
      highlights: ['1-on-1 Interview', 'Cue Card Presentation'],
      description: 'Assess fluency, pronunciation, grammar, and vocabulary in real-time.'
    },
    {
      name: 'Writing',
      questions: '2 Tasks',
      time: '60 mins',
      highlights: ['Task 1 Report', 'Task 2 Formal Essay'],
      description: 'Describe chart data & articulate clear arguments in essay format.'
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

export default function ExamOverview() {
  return (
    <section className="relative overflow-hidden bg-slate-50/90 dark:bg-[#09090d] border-t border-slate-200/60 dark:border-zinc-800/80 py-16 lg:py-24">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0097B2]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header Section ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-200/60 dark:border-zinc-800/80 pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0097B2]/10 border border-[#0097B2]/20 text-[#0097B2] text-xs font-black uppercase tracking-wider mb-3">
              <span>Official Test Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              What is <span className="bg-gradient-to-r from-[#0097B2] via-cyan-500 to-[#1a2b4a] dark:to-cyan-300 bg-clip-text text-transparent">IELTS</span>?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
              {ieltsData.description}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-sm self-start md:self-auto shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2]">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">Total Duration</span>
              <span className="text-sm font-black text-slate-900 dark:text-white">{ieltsData.duration}</span>
            </div>
          </motion.div>
        </div>

        {/* ── Subheading ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0097B2]">
              Module Structure
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Explore The 4 IELTS Sections
            </h3>
          </div>
        </div>

        {/* ── Animated Module Cards Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {ieltsData.modules.map((mod) => {
            const Icon = sectionIcons[mod.name] || BookOpen;
            const colors = sectionColors[mod.name] || sectionColors.Reading;

            return (
              <motion.div
                key={mod.name}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                className={`group relative rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200/80 dark:border-zinc-800 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${colors.border}`}
              >
                {/* Accent Top Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${colors.accentBar}`} />

                {/* Subtle Ambient Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                        {colors.tag}
                      </span>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                        {mod.name}
                      </h4>
                    </div>

                    <div className={`w-11 h-11 rounded-2xl ${colors.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-medium mb-5">
                    {mod.description}
                  </p>

                  {/* Highlights Pill List */}
                  <div className="space-y-2 mb-6">
                    {mod.highlights.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0097B2] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Format</span>
                    <span className="text-xs font-black text-slate-800 dark:text-zinc-200">{mod.questions}</span>
                  </div>

                  <span className={`px-3 py-1.5 rounded-xl text-xs font-black border ${colors.badge} shadow-xs flex items-center gap-1`}>
                    <Timer className="w-3 h-3" />
                    {mod.time}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}


