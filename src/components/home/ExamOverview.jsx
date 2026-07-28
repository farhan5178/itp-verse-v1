import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, BookOpen, Headphones, Mic, PenTool } from 'lucide-react';

/* ── Icon map ── */
const sectionIcons = {
  Reading: BookOpen,
  Listening: Headphones,
  Speaking: Mic,
  Writing: PenTool,
  'Speaking & Writing': Mic,
};

const sectionColors = {
  Reading:  { bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-500', badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  Listening:{ bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-500', badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' },
  Speaking: { bg: 'bg-[#0097B2]/5 dark:bg-[#0097B2]/10', text: 'text-[#0097B2]', badge: 'bg-[#0097B2]/10 text-[#0097B2] border-[#0097B2]/20' },
  Writing:  { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-500', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  'Speaking & Writing': { bg: 'bg-[#0097B2]/5 dark:bg-[#0097B2]/10', text: 'text-[#0097B2]', badge: 'bg-[#0097B2]/10 text-[#0097B2] border-[#0097B2]/20' },
};

/* ── Full exam data ── */
const examData = {
  IELTS: {
    label: 'IELTS',
    fullName: 'International English Language Testing System',
    duration: '2 hours 40 mins',
    description: (
      <>
        <strong>IELTS (International English Language Testing System)</strong> is one of the globally recognized English proficiency tests taken by millions worldwide for education and immigration purposes. IELTS offers two modules: <strong className="text-[#1a2b4a] dark:text-white underline decoration-[#0097B2]/40 underline-offset-2">IELTS Academic</strong> (for undergraduate or postgraduate study) and <strong>IELTS General Training</strong> (for work or immigration). Additionally, <strong>IELTS for UKVI</strong> (United Kingdom Visa &amp; Immigration) is specifically for proving English proficiency for UK visa and immigration purposes. The IELTS Academic module consists of four sections and takes approximately <span className="font-black text-[#0097B2]">2 hours and 40 minutes</span> to complete.
      </>
    ),
    modules: [
      { name: 'Reading', questions: '40', questionsLabel: 'No. of Questions', time: '60 mins', footer: '3 ACADEMIC PASSAGES' },
      { name: 'Listening', questions: '40', questionsLabel: 'No. of Questions', time: '30 mins', footer: '4 AUDIO MONOLOGUES / CONV' },
      { name: 'Speaking', questions: '3 parts', questionsLabel: 'No. of Questions', time: '11 – 14 mins', footer: 'FACE-TO-FACE EVALUATION' },
      { name: 'Writing', questions: '2 tasks', questionsLabel: 'No. of Questions', time: '60 mins', footer: 'TASK 1 REPORT & TASK 2 ESSAY' },
    ],
  },
  TOEFL: {
    label: 'TOEFL',
    fullName: 'Test of English as a Foreign Language',
    duration: 'approx. 2 hours',
    description: (
      <>
        <strong>TOEFL iBT (Test of English as a Foreign Language – Internet Based Test)</strong> is the trusted academic English evaluation accepted by more than 12,000 universities worldwide. Fully computer-delivered with synchronized task combinations mimicking physical university lectures. The TOEFL iBT measures your ability to use and understand English at the university level and evaluates how well you combine your <strong>listening, reading, speaking, and writing</strong> skills. The test takes approximately <span className="font-black text-[#0097B2]">2 hours</span> to complete.
      </>
    ),
    modules: [
      { name: 'Reading', questions: '20', questionsLabel: 'No. of Questions', time: '35 mins', footer: '2 ACADEMIC PASSAGES' },
      { name: 'Listening', questions: '28', questionsLabel: 'No. of Questions', time: '36 mins', footer: '5 LECTURES & CONVERSATIONS' },
      { name: 'Speaking', questions: '4 tasks', questionsLabel: 'No. of Tasks', time: '16 mins', footer: 'INTEGRATED & INDEPENDENT' },
      { name: 'Writing', questions: '2 tasks', questionsLabel: 'No. of Tasks', time: '29 mins', footer: 'INTEGRATED & ACADEMIC ESSAY' },
    ],
  },
  PTE: {
    label: 'PTE',
    fullName: 'Pearson Test of English Academic',
    duration: 'approx. 2 hours',
    description: (
      <>
        <strong>PTE Academic (Pearson Test of English)</strong> is a faster, highly convenient computer-based test trusted by governments and colleges globally. It utilizes state-of-the-art unbiased automated AI scoring mechanics to evaluate all key English skills. PTE Academic measures your <strong>speaking, writing, reading, and listening</strong> abilities in a single session. Results are typically available within <span className="font-black text-[#0097B2]">2 business days</span>, making it one of the fastest standardized English tests.
      </>
    ),
    modules: [
      { name: 'Speaking & Writing', questions: '7 types', questionsLabel: 'Task Types', time: '54 – 67 mins', footer: 'READ ALOUD, ESSAY & MORE' },
      { name: 'Reading', questions: '5 types', questionsLabel: 'Task Types', time: '29 – 30 mins', footer: 'FILL IN BLANKS & MCQ' },
      { name: 'Listening', questions: '8 types', questionsLabel: 'Task Types', time: '30 – 43 mins', footer: 'DICTATION & SUMMARIZE' },
    ],
  },
};

const tabs = Object.keys(examData);

export default function ExamOverview() {
  const [activeExam, setActiveExam] = useState('IELTS');
  const exam = examData[activeExam];

  return (
    <section className="bg-slate-50/80 dark:bg-[#0c0c0f] border-t border-slate-100 dark:border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

        {/* ── Tab Switcher ── */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveExam(tab)}
                className={`
                  px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer
                  ${activeExam === tab
                    ? 'bg-gradient-to-r from-[#0097B2] to-[#004B59] text-white shadow-md shadow-[#0097B2]/20'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-800'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeExam}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── Header ── */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0097B2] mb-2">
                  Exam Overview
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  What is <span className="text-[#1a2b4a] dark:text-white">{exam.label}</span>?
                </h2>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm self-start">
                <Timer className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
                <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">Total Duration:</span>
                <span className="text-xs font-black text-slate-900 dark:text-white">{exam.duration}</span>
              </div>
            </div>

            {/* ── Description Paragraph ── */}
            <div className="mb-12">
              <p className="text-sm sm:text-[15px] text-slate-600 dark:text-zinc-300 leading-[1.85] font-medium max-w-4xl">
                {exam.description}
              </p>
            </div>

            {/* ── Module Breakdown Heading ── */}
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 mb-6">
              Test Structure &amp; Module Breakdown
            </p>

            {/* ── Module Cards Grid ── */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${exam.modules.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4`}>
              {exam.modules.map((mod, idx) => {
                const Icon = sectionIcons[mod.name] || BookOpen;
                const colors = sectionColors[mod.name] || sectionColors.Reading;

                return (
                  <motion.div
                    key={mod.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-slate-300/60 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-base font-black text-slate-900 dark:text-white">{mod.name}</h3>
                      <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        <Icon className={`w-4.5 h-4.5 ${colors.text}`} />
                      </div>
                    </div>

                    {/* Questions Row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500">{mod.questionsLabel}</span>
                      <span className="text-sm font-black text-slate-900 dark:text-white">{mod.questions}</span>
                    </div>

                    {/* Time Row */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500">Expected time</span>
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-black border ${colors.badge}`}>
                        {mod.time}
                      </span>
                    </div>

                    {/* Footer Description */}
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-zinc-500 border-t border-slate-100 dark:border-zinc-800 pt-3">
                      {mod.footer}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
