import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  GraduationCap,
  BookMarked,
  BookOpenCheck,
  Headphones,
  PenTool,
  Mic,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Target,
  Zap,
  ArrowDown
} from 'lucide-react';

const ROADMAP_STEPS = [
  {
    stepNumber: 1,
    week: 'Week 1',
    title: 'Grammar Mastery',
    subtitle: 'Foundation & Complex Sentence Structures',
    icon: GraduationCap,
    baseRotation: -2.5,
    cardTheme: {
      bg: 'bg-[#09090e] text-white border-indigo-500/40 shadow-2xl shadow-indigo-950/60',
      pill: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      iconBg: 'bg-gradient-to-br from-indigo-500/20 to-blue-500/10 text-indigo-400 border border-indigo-500/30',
      accent: 'text-indigo-400',
      bulletIcon: 'text-indigo-400',
      bar: 'bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400',
      btn: 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/30'
    },
    duration: '6 Hours / Week',
    targetScore: 'Grammar Band 7.0+',
    description: 'Master essential sentence structures, active/passive voice, relative clauses, and complex connectors to eliminate grammatical penalty.',
    highlights: [
      'Complex & Compound Sentence Patterns',
      'Tense Consistency & Conditionals',
      'Top 20 Common Grammar Error Fixes'
    ],
    sampleTask: 'Transform simple sentences into Band 8.0+ compound-complex structures.'
  },
  {
    stepNumber: 2,
    week: 'Week 2',
    title: 'Vocabulary Surge',
    subtitle: 'Academic Words & Collocations',
    icon: BookMarked,
    baseRotation: 2.5,
    cardTheme: {
      bg: 'bg-[#041a14] text-emerald-100 border-emerald-500/40 shadow-2xl shadow-emerald-950/60',
      pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      iconBg: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30',
      accent: 'text-emerald-400',
      bulletIcon: 'text-emerald-400',
      bar: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-300',
      btn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30'
    },
    duration: '7 Hours / Week',
    targetScore: 'Lexical Band 7.5+',
    description: 'Expand your vocabulary with 1,000+ topic-specific IELTS academic words, phrasal verbs, and high-band collocations.',
    highlights: [
      'Environment, Tech & Society Word Decks',
      'Precise Synonym Replacement Drills',
      'Audio Pronunciation & Spaced Repetition'
    ],
    sampleTask: 'Master 150 topic collocations for Education & Globalization essays.'
  },
  {
    stepNumber: 3,
    week: 'Week 3',
    title: 'Reading Precision',
    subtitle: 'Speed Skimming & Passage Mapping',
    icon: BookOpenCheck,
    baseRotation: -2,
    cardTheme: {
      bg: 'bg-[#061826] text-sky-100 border-sky-500/40 shadow-2xl shadow-sky-950/60',
      pill: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      iconBg: 'bg-gradient-to-br from-sky-500/20 to-cyan-500/10 text-sky-400 border border-sky-500/30',
      accent: 'text-sky-400',
      bulletIcon: 'text-sky-400',
      bar: 'bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300',
      btn: 'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-lg shadow-sky-600/30'
    },
    duration: '8 Hours / Week',
    targetScore: 'Reading Band 8.0+',
    description: 'Develop rapid skimming, scanning, and passage mapping techniques to conquer True/False/Not Given & Heading Matching.',
    highlights: [
      'Keyword Location & Synonym Tracking',
      'True / False / Not Given Logic Guide',
      '60-Min Speed Allocation Strategy'
    ],
    sampleTask: 'Complete 3 Academic Reading passages under strict 60-minute exam timer.'
  },
  {
    stepNumber: 4,
    week: 'Week 4',
    title: 'Listening Mastery',
    subtitle: 'Multi-Accent Audio Training',
    icon: Headphones,
    baseRotation: 2.5,
    cardTheme: {
      bg: 'bg-[#120924] text-purple-100 border-purple-500/40 shadow-2xl shadow-purple-950/60',
      pill: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      iconBg: 'bg-gradient-to-br from-purple-500/20 to-violet-500/10 text-purple-400 border border-purple-500/30',
      accent: 'text-purple-400',
      bulletIcon: 'text-purple-400',
      bar: 'bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-300',
      btn: 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-lg shadow-purple-600/30'
    },
    duration: '6 Hours / Week',
    targetScore: 'Listening Band 8.5+',
    description: 'Train your ears with authentic British, Australian, and North American accents while identifying speech distractors.',
    highlights: [
      'Sections 1-4 Monologues & Dialogues',
      'Distractor & Paraphrase Detection',
      'Synced Transcript Playback at 1.25x'
    ],
    sampleTask: 'Achieve 35/40 correct answers on Section 3 & 4 academic audio tracks.'
  },
  {
    stepNumber: 5,
    week: 'Week 5',
    title: 'Writing Excellence',
    subtitle: 'Task 1 Reports & Task 2 Essays',
    icon: PenTool,
    baseRotation: -2.5,
    cardTheme: {
      bg: 'bg-[#1c1204] text-amber-100 border-amber-500/40 shadow-2xl shadow-amber-950/60',
      pill: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      iconBg: 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 text-amber-400 border border-amber-500/30',
      accent: 'text-amber-400',
      bulletIcon: 'text-amber-400',
      bar: 'bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-300',
      btn: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg shadow-amber-600/30'
    },
    duration: '10 Hours / Week',
    targetScore: 'Writing Band 7.5+',
    description: 'Craft Band 8.0+ Task 1 chart overviews and structured Task 2 argumentative essays with instant AI feedback.',
    highlights: [
      'Task 1 Line, Bar, Map & Process Formats',
      'Task 2 4-Paragraph Essay Templates',
      'AI Sentence-by-Sentence Rewrites'
    ],
    sampleTask: 'Submit 2 full essays for instant AI band scoring & lexical feedback.'
  },
  {
    stepNumber: 6,
    week: 'Week 6',
    title: 'Speaking Fluency',
    subtitle: 'Live AI Voice Cue Card Interviews',
    icon: Mic,
    baseRotation: 2,
    cardTheme: {
      bg: 'bg-[#031b20] text-cyan-100 border-cyan-500/40 shadow-2xl shadow-cyan-950/60',
      pill: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      iconBg: 'bg-gradient-to-br from-cyan-500/20 to-teal-500/10 text-cyan-400 border border-cyan-500/30',
      accent: 'text-cyan-400',
      bulletIcon: 'text-cyan-400',
      bar: 'bg-gradient-to-r from-[#0097B2] via-cyan-400 to-teal-300',
      btn: 'bg-gradient-to-r from-[#0097B2] to-teal-600 hover:from-[#0097B2] hover:to-teal-500 text-white shadow-lg shadow-[#0097B2]/30'
    },
    duration: '8 Hours / Week',
    targetScore: 'Speaking Band 8.0+',
    description: 'Practice real-time Part 1 intro, Part 2 cue cards, and Part 3 discussion with interactive conversational voice AI.',
    highlights: ['Part 1, 2 & 3 Interactive AI Examiner', 'Fluency, Pause Rate & WPM Scoring', 'Phonetic Sound Accuracy'],
    sampleTask: 'Deliver a 2-minute uninterrupted Cue Card presentation with natural intonation.'
  },
  {
    stepNumber: 7,
    week: 'Benchmark',
    title: 'Diagnostic Mock Test',
    subtitle: 'Full 2h 40m Exam Simulation',
    icon: BarChart3,
    baseRotation: -2,
    cardTheme: {
      bg: 'bg-[#20050d] text-rose-100 border-rose-500/40 shadow-2xl shadow-rose-950/60',
      pill: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      iconBg: 'bg-gradient-to-br from-rose-500/20 to-pink-500/10 text-rose-400 border border-rose-500/30',
      accent: 'text-rose-400',
      bulletIcon: 'text-rose-400',
      bar: 'bg-gradient-to-r from-rose-500 via-pink-400 to-red-400',
      btn: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg shadow-rose-600/30'
    },
    duration: 'Full Simulation',
    targetScore: 'Target Band 8.0 Diagnostic',
    description: 'Sit for a complete 2 hour 40 minute timed IDP format mock exam to measure your real test performance across all 4 skills.',
    highlights: ['Real Exam Timer & Strict Rubrics', 'Detailed 4-Module Score Breakdown', 'Weak Area Actionable Report'],
    sampleTask: 'Complete all 4 test sections in one sitting and generate your official benchmark.'
  },
  {
    stepNumber: 8,
    week: 'Victory',
    title: 'Exam Ready Guaranteed',
    subtitle: 'Official Band 8.0+ Target Secured',
    icon: ShieldCheck,
    baseRotation: 0,
    cardTheme: {
      bg: 'bg-gradient-to-b from-[#181503] via-[#09090b] to-[#181503] text-white border-amber-400/80 ring-2 ring-amber-400/60 shadow-2xl shadow-amber-500/40',
      pill: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
      iconBg: 'bg-gradient-to-br from-amber-400/30 to-yellow-500/20 text-amber-300 border border-amber-400/40',
      accent: 'text-amber-300',
      bulletIcon: 'text-amber-400',
      bar: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500',
      btn: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black hover:opacity-90 shadow-xl shadow-amber-500/40'
    },
    duration: 'Exam Day Readiness',
    targetScore: 'Official Band 8.0+ Target',
    description: 'Congratulations! You have completed the 6-week curriculum and diagnostic mock test. You are officially ready for your IDP IELTS exam.',
    highlights: ['Official Readiness Verification Seal', 'LinkedIn Shareable Readiness Badge', 'Final Test Day Strategy Checklist'],
    sampleTask: 'Walk into your official test center with 100% confidence.'
  }
];

/* Ultra-Smooth Liquid Vanishing Card Component */
function VanishingCard({ step, index, totalSteps, smoothProgress }) {
  const IconComponent = step.icon;
  const theme = step.cardTheme;
  const isLast = index === totalSteps - 1;

  // Continuous Step scroll thresholds
  const start = index / totalSteps;
  const end = (index + 1) / totalSteps;
  const fadeStart = start + (0.7 / totalSteps);

  // Silky 60fps Liquid Physics Transforms
  const y = useTransform(
    smoothProgress,
    [start, end],
    isLast ? ['0%', '0%'] : ['0%', '-140%']
  );

  const opacity = useTransform(
    smoothProgress,
    [start, fadeStart, end],
    isLast ? [1, 1, 1] : [1, 0.98, 0]
  );

  const scale = useTransform(
    smoothProgress,
    [start, end],
    isLast ? [1, 1] : [1, 0.88]
  );

  const rotate = useTransform(
    smoothProgress,
    [start, end],
    isLast ? [0, 0] : [step.baseRotation, step.baseRotation - 14]
  );

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        rotate,
        zIndex: totalSteps - index,
        willChange: 'transform, opacity'
      }}
      className="absolute inset-0 flex items-center justify-center p-4 transform-gpu pointer-events-auto"
    >
      <div className={`group relative w-full max-w-lg rounded-[36px] sm:rounded-[44px] p-6 sm:p-9 shadow-2xl border backdrop-blur-2xl transition-transform duration-200 ${theme.bg}`}>
        
        {/* Accent Top Bar */}
        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${theme.bar} rounded-t-[44px]`} />

        {/* Top Icon Box */}
        <div className="flex justify-center mb-5">
          <div className={`w-18 h-18 sm:w-22 sm:h-22 rounded-3xl ${theme.iconBg} flex items-center justify-center shadow-xl transition-transform group-hover:scale-105 duration-300`}>
            <IconComponent className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>
        </div>

        {/* Top Pill Badge: Week & Step */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className={`text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-xs ${theme.pill}`}>
            {step.week} • Step {step.stepNumber} of 8
          </span>
        </div>

        {/* Hero Bold Title */}
        <div className="text-center mb-4">
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-none mb-1.5 bg-gradient-to-b from-white to-slate-200 bg-clip-text text-transparent">
            {step.title}
          </h3>
          <p className="text-xs sm:text-sm font-bold opacity-80">
            {step.subtitle}
          </p>
        </div>

        {/* Paragraph Description */}
        <p className="text-xs sm:text-sm font-medium leading-relaxed text-center opacity-90 mb-5 max-w-md mx-auto line-clamp-3">
          {step.description}
        </p>

        {/* Highlights Checklist */}
        <div className="space-y-2 mb-5 max-w-md mx-auto">
          {step.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-left">
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${theme.bulletIcon}`} />
              <span className="truncate">{h}</span>
            </div>
          ))}
        </div>

        {/* Target Milestone Box */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10 mb-5 text-center shadow-inner">
          <span className={`text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 mb-0.5 ${theme.accent}`}>
            <Zap className="w-3.5 h-3.5" />
            <span>Target Milestone</span>
          </span>
          <p className="text-xs sm:text-sm font-extrabold italic opacity-95 line-clamp-2">
            "{step.sampleTask}"
          </p>
        </div>

        {/* Bottom Meta & Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-xs font-black opacity-85">
            <Clock className="w-4 h-4 text-[#0097B2]" />
            <span>{step.duration}</span>
          </div>

          <button
            type="button"
            className={`px-5 py-2.5 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 ${theme.btn}`}
          >
            <span>Explore {step.title.split(' ')[0]}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </motion.div>
  );
}

export default function StudyRoadmap() {
  const containerRef = useRef(null);

  /* Scroll Progress Tracker across 600vh scroll runway */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  /* Low Stiffness & High Damping for Liquid Ultra-Smooth Continuous Inertia Glide */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 28,
    mass: 1.2,
    restDelta: 0.0001
  });

  return (
    <section
      ref={containerRef}
      id="study-roadmap"
      className="relative bg-slate-900/90 dark:bg-[#050508] border-t border-slate-800/80 min-h-[550vh]"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-20 left-1/3 w-[650px] h-[650px] bg-[#0097B2]/10 dark:bg-[#0097B2]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[550px] h-[550px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* ── STICKY VIEWPORT CONTAINER ── */}
      <div className="sticky top-0 h-screen flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto shrink-0 z-20">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0097B2]/10 border border-[#0097B2]/30 text-[#0097B2] dark:text-cyan-400 text-xs font-black uppercase tracking-wider mb-2 shadow-xs">
            <Target className="w-3.5 h-3.5" />
            <span>Liquid Scroll Vanishing Card Stack</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Your 8-Step{' '}
            <span className="bg-gradient-to-r from-[#0097B2] via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              IELTS Card Runway
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-1">
            Scroll down continuously to watch top cards glide up smoothly as the next week takes center stage.
          </p>

          <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-extrabold text-cyan-400 animate-bounce">
            <span>Scroll Down To Unstack Runway</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* ── FIXED POSITIONAL CARD STACK VIEWPORT ── */}
        <div className="relative flex-grow w-full max-w-lg mx-auto my-2">
          {ROADMAP_STEPS.map((step, index) => (
            <VanishingCard
              key={step.stepNumber}
              step={step}
              index={index}
              totalSteps={ROADMAP_STEPS.length}
              smoothProgress={smoothProgress}
            />
          ))}
        </div>

        {/* Bottom Helper Progress Bar */}
        <div className="text-center shrink-0 z-20">
          <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
            Scroll Through Week 1 to 6 & Diagnostic Mock Test
          </span>
        </div>

      </div>
    </section>
  );
}
