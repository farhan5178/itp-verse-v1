import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  PenTool,
  BookMarked,
  GraduationCap,
  Calendar,
  BookOpenCheck,
  Headphones,
  MessageSquareQuote,
  Highlighter,
  Layers,
  Trophy,
  Award,
  CheckCircle2,
  Search,
  X,
  Zap,
  Flame,
  ShieldCheck,
  Volume2,
  RotateCw,
  Crown,
  ChevronRight,
  ChevronLeft,
  Star,
  Play,
  Pause,
  Check,
  Cpu,
  BarChart3,
  ArrowUpRight,
  LayoutGrid,
  SlidersHorizontal,
  Activity
} from 'lucide-react';

/* ── 12 Features Master Data ── */
const FEATURES = [
  {
    id: 'ai-speaking',
    title: 'AI Speaking',
    category: 'ai',
    categoryLabel: 'AI Power Tools',
    badgeLabel: 'AI Tool',
    icon: Mic,
    color: {
      theme: 'cyan',
      bg: 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
      border: 'hover:border-cyan-500/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-cyan-500/20 via-teal-500/10 to-transparent',
      badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/20',
      bar: 'bg-gradient-to-r from-cyan-500 to-teal-400',
      accentText: 'text-cyan-500'
    },
    shortDesc: 'Practice real-time interactive IELTS speaking interviews with intelligent voice AI.',
    fullDesc: 'Simulate full Part 1, 2, & 3 IELTS Speaking tests with real-time conversational AI. Get instant feedback on cadence, pauses, filler words, and accent clarity.',
    highlights: ['Part 1, 2 & 3 Simulations', 'Real-time Voice Synthesis', 'Cadence & Pause Detection'],
    demoType: 'audio'
  },
  {
    id: 'ai-writing-eval',
    title: 'AI Writing Evaluation',
    category: 'ai',
    categoryLabel: 'AI Power Tools',
    badgeLabel: 'AI Tool',
    icon: PenTool,
    color: {
      theme: 'amber',
      bg: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
      border: 'hover:border-amber-500/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-amber-500/20 via-orange-500/10 to-transparent',
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20',
      bar: 'bg-gradient-to-r from-amber-500 to-orange-400',
      accentText: 'text-amber-500'
    },
    shortDesc: 'Instant official IELTS rubric scoring for Task 1 report and Task 2 essay submissions.',
    fullDesc: 'Get comprehensive evaluations across Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range with exact Band Score estimations.',
    highlights: ['Task 1 & Task 2 Rubrics', 'Sub-Score Breakdown', 'Estimated Band Score (1-9)'],
    demoType: 'score'
  },
  {
    id: 'vocab-builder',
    title: 'Vocabulary Builder',
    category: 'core',
    categoryLabel: 'Core Learning',
    badgeLabel: 'Core',
    icon: BookMarked,
    color: {
      theme: 'emerald',
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      border: 'hover:border-emerald-500/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
      bar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
      accentText: 'text-emerald-500'
    },
    shortDesc: 'Master 5,000+ curated IELTS academic vocabulary words, collocations, and idioms.',
    fullDesc: 'Build high-band vocabulary tailored to frequent IELTS exam topics like Environment, Technology, Education, and Society with audio pronunciations and contextual sentences.',
    highlights: ['5,000+ Exam Words', 'Topic-Wise Categorization', 'Audio Pronunciation & Synonyms'],
    demoType: 'wordCard'
  },
  {
    id: 'grammar-lessons',
    title: 'Grammar Lessons',
    category: 'core',
    categoryLabel: 'Core Learning',
    badgeLabel: 'Core',
    icon: GraduationCap,
    color: {
      theme: 'indigo',
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
      border: 'hover:border-indigo-500/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-indigo-500/20 via-blue-500/10 to-transparent',
      badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/20',
      bar: 'bg-gradient-to-r from-indigo-500 to-blue-400',
      accentText: 'text-indigo-500'
    },
    shortDesc: 'Structured byte-sized grammar modules tailored for complex sentence structures.',
    fullDesc: 'Master advanced tenses, passive structures, conditional sentences, and relative clauses designed specifically to boost your Lexical and Grammatical Band score.',
    highlights: ['Complex Sentence Patterns', 'Common Error Corrections', 'Interactive Quizzes'],
    demoType: 'grammar'
  },
  {
    id: 'daily-practice',
    title: 'Daily Practice',
    category: 'routine',
    categoryLabel: 'Routines & Gamification',
    badgeLabel: 'Routine',
    icon: Calendar,
    color: {
      theme: 'rose',
      bg: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400',
      border: 'hover:border-rose-500/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-rose-500/20 via-pink-500/10 to-transparent',
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/20',
      bar: 'bg-gradient-to-r from-rose-500 to-pink-400',
      accentText: 'text-rose-500'
    },
    shortDesc: 'Keep your momentum with 10-minute daily micro-drills and streak rewards.',
    fullDesc: 'Never lose your focus. Daily personalized mini-drills across all four skill modules keep your study habit active while earning streak multipliers and extra XP.',
    highlights: ['10-Min Micro Drills', 'Streak Counter & Reminders', 'Daily XP Multipliers'],
    demoType: 'streak'
  },
  {
    id: 'reading-tests',
    title: 'Reading Tests',
    category: 'tests',
    categoryLabel: 'Practice & Tests',
    badgeLabel: 'Test',
    icon: BookOpenCheck,
    color: {
      theme: 'blue',
      bg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
      border: 'hover:border-blue-500/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-blue-500/20 via-sky-500/10 to-transparent',
      badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20',
      bar: 'bg-gradient-to-r from-blue-500 to-sky-400',
      accentText: 'text-blue-500'
    },
    shortDesc: 'Full-length Academic & General Reading modules with timer & instant explanations.',
    fullDesc: 'Simulate authentic IELTS reading interface with passage highlight tools, split screen reading, interactive question types, and step-by-step logic explanations.',
    highlights: ['Split-Screen Exam Interface', 'True/False/Not Given Drills', 'Detailed Logic Explanations'],
    demoType: 'reading'
  },
  {
    id: 'listening-tests',
    title: 'Listening Tests',
    category: 'tests',
    categoryLabel: 'Practice & Tests',
    badgeLabel: 'Test',
    icon: Headphones,
    color: {
      theme: 'violet',
      bg: 'bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400',
      border: 'hover:border-violet-500/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-violet-500/20 via-purple-500/10 to-transparent',
      badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-500/20',
      bar: 'bg-gradient-to-r from-violet-500 to-purple-400',
      accentText: 'text-violet-500'
    },
    shortDesc: 'Realistic audio recordings with British, Australian, & American native accents.',
    fullDesc: 'Train your ears with diverse global accents, variable playback speed, synchronized transcript highlights, and automated answer verification.',
    highlights: ['Multi-Accent Audio Packs', 'Synced Text Transcript', 'Speed Control (0.8x - 1.5x)'],
    demoType: 'listening'
  },
  {
    id: 'speaking-feedback',
    title: 'Speaking Feedback',
    category: 'ai',
    categoryLabel: 'AI Power Tools',
    badgeLabel: 'AI Feedback',
    icon: MessageSquareQuote,
    color: {
      theme: 'teal',
      bg: 'bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400',
      border: 'hover:border-teal-500/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-teal-500/20 via-emerald-500/10 to-transparent',
      badge: 'bg-teal-500/10 text-teal-600 dark:text-teal-300 border-teal-500/20',
      bar: 'bg-gradient-to-r from-teal-500 to-emerald-400',
      accentText: 'text-teal-500'
    },
    shortDesc: 'Detailed metrics on fluency, pronunciation, grammar, and lexical accuracy.',
    fullDesc: 'Visual breakdown of phoneme mistakes, words per minute (WPM), hesitation markers, and tailored phonetic drills to achieve native-like speech fluency.',
    highlights: ['Fluency & WPM Metrics', 'Phonetic Sound Analysis', 'Vocabulary Range Score'],
    demoType: 'speakingFeedback'
  },
  {
    id: 'writing-feedback',
    title: 'Writing Feedback',
    category: 'ai',
    categoryLabel: 'AI Power Tools',
    badgeLabel: 'AI Feedback',
    icon: Highlighter,
    color: {
      theme: 'fuchsia',
      bg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400',
      border: 'hover:border-fuchsia-500/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-fuchsia-500/20 via-pink-500/10 to-transparent',
      badge: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300 border-fuchsia-500/20',
      bar: 'bg-gradient-to-r from-fuchsia-500 to-pink-400',
      accentText: 'text-fuchsia-500'
    },
    shortDesc: 'Sentence-by-sentence inline edits, vocabulary upgrades, and structural hints.',
    fullDesc: 'Discover exactly where your essays lose points. See side-by-side original vs band 8+ sentence rewrites, coherence linkage improvements, and grammar fixes.',
    highlights: ['Inline Error Highlights', 'Band 8+ Sentence Rewrites', 'Coherence & Transition Tips'],
    demoType: 'writingDiff'
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    category: 'core',
    categoryLabel: 'Core Learning',
    badgeLabel: 'SRS Core',
    icon: Layers,
    color: {
      theme: 'purple',
      bg: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
      border: 'hover:border-purple-500/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20',
      bar: 'bg-gradient-to-r from-purple-500 to-indigo-400',
      accentText: 'text-purple-500'
    },
    shortDesc: 'Smart Spaced Repetition System (SRS) for maximum long-term memory retention.',
    fullDesc: 'Review vocabulary, idioms, and writing templates efficiently with our intelligent SRS algorithm that calculates optimal recall intervals for guaranteed memory retention.',
    highlights: ['Spaced Repetition Algorithm', '15,000+ Deck Cards', 'Interactive Flip Review'],
    demoType: 'flashcard'
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard',
    category: 'routine',
    categoryLabel: 'Routines & Gamification',
    badgeLabel: 'Gamification',
    icon: Trophy,
    color: {
      theme: 'yellow',
      bg: 'bg-amber-400/10 dark:bg-amber-400/20 text-amber-500 dark:text-amber-300',
      border: 'hover:border-amber-400/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-amber-400/20 via-yellow-500/10 to-transparent',
      badge: 'bg-amber-400/10 text-amber-600 dark:text-amber-300 border-amber-400/20',
      bar: 'bg-gradient-to-r from-amber-400 to-yellow-300',
      accentText: 'text-amber-500'
    },
    shortDesc: 'Compete weekly with thousands of IELTS candidates worldwide to claim top ranks.',
    fullDesc: 'Climb leagues from Bronze to Diamond as you complete lessons, practice sessions, and mock tests. Win exclusive badges and community recognition.',
    highlights: ['Weekly Global Leagues', 'Tier Badges & Avatar Frames', 'Friend & Country Leaderboards'],
    demoType: 'podium'
  },
  {
    id: 'certificates',
    title: 'Certificates',
    category: 'routine',
    categoryLabel: 'Routines & Gamification',
    badgeLabel: 'Rewards',
    icon: Award,
    color: {
      theme: 'sky',
      bg: 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400',
      border: 'hover:border-sky-500/50 border-slate-200/80 dark:border-zinc-800',
      glow: 'from-sky-500/20 via-blue-500/10 to-transparent',
      badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-300 border-sky-500/20',
      bar: 'bg-gradient-to-r from-sky-500 to-blue-400',
      accentText: 'text-sky-500'
    },
    shortDesc: 'Earn official verifiable certificates of readiness and module masteries.',
    fullDesc: 'Showcase your diagnostic benchmark scores and course achievements with digital certificates that feature unique verification QR codes ready for LinkedIn sharing.',
    highlights: ['Verifiable QR Validation', 'LinkedIn 1-Click Sharing', 'Band Readiness Seal'],
    demoType: 'certificate'
  }
];

/* ── Filter Tab Definitions ── */
const CATEGORIES = [
  { key: 'all', label: 'All Features' },
  { key: 'ai', label: 'AI Power Tools' },
  { key: 'tests', label: 'Practice & Tests' },
  { key: 'core', label: 'Core Learning' },
  { key: 'routine', label: 'Routines & Gamification' }
];

export default function FeaturesSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalFeature, setActiveModalFeature] = useState(null);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [activePlayback, setActivePlayback] = useState(false);
  
  /* View Mode: 'slider' vs 'grid' */
  const [viewMode, setViewMode] = useState('slider');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  /* Dynamically Compute Category Counts */
  const categoryCounts = useMemo(() => {
    const counts = { all: FEATURES.length, ai: 0, tests: 0, core: 0, routine: 0 };
    FEATURES.forEach((f) => {
      if (counts[f.category] !== undefined) counts[f.category]++;
    });
    return counts;
  }, []);

  /* Filter Logic */
  const filteredFeatures = useMemo(() => {
    return FEATURES.filter((feat) => {
      const matchesCategory = selectedCategory === 'all' || feat.category === selectedCategory;
      const matchesSearch =
        feat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feat.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feat.fullDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  /* Reset Current Index when category or search changes */
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory, searchQuery]);

  /* Auto-Play Carousel Timer */
  useEffect(() => {
    if (viewMode === 'slider' && isAutoPlaying && filteredFeatures.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredFeatures.length);
      }, 3500);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [viewMode, isAutoPlaying, filteredFeatures.length]);

  const handleNext = () => {
    if (filteredFeatures.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredFeatures.length);
  };

  const handlePrev = () => {
    if (filteredFeatures.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredFeatures.length) % filteredFeatures.length);
  };

  return (
    <section id="features-section" className="relative z-10 overflow-hidden bg-slate-50/80 dark:bg-[#07070b] py-20 lg:py-28 border-t border-slate-200/60 dark:border-zinc-800/80">
      
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[600px] bg-[#0097B2]/5 dark:bg-[#0097B2]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0097B2]/10 border border-[#0097B2]/20 text-[#0097B2] dark:text-cyan-400 text-xs font-black uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Complete IELTS Prep Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Everything You Need To Score{' '}
            <span className="bg-gradient-to-r from-[#0097B2] via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
              Band 8.0+
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
            Explore our 12 core powered features built specifically for IELTS test takers. Slide through or toggle view mode for interactive demos.
          </p>

          {/* View Mode Switcher (Slider vs Grid) */}
          <div className="mt-6 inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'slider'
                  ? 'bg-[#0097B2] text-white shadow-md shadow-[#0097B2]/25'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Animated Slider</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#0097B2] text-white shadow-md shadow-[#0097B2]/25'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* ── Controls: Category Filter Tabs & Search Bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200/60 dark:border-zinc-800/80">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.key;
              const count = categoryCounts[cat.key] || 0;
              return (
                <button
                  type="button"
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#0097B2] text-white shadow-lg shadow-[#0097B2]/25 scale-105'
                      : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-800'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search features..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#0097B2] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* ── 1. ANIMATED CAROUSEL SLIDER VIEW ── */}
        {viewMode === 'slider' && filteredFeatures.length > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Slider Navigation Arrows */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                  Slide {currentIndex + 1} of {filteredFeatures.length}
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#0097B2]/10 text-[#0097B2]">
                  {isAutoPlaying ? '▶ Auto Sliding' : '⏸ Paused'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-700 dark:text-zinc-200 hover:bg-[#0097B2] hover:text-white dark:hover:bg-[#0097B2] transition-all shadow-sm cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-700 dark:text-zinc-200 hover:bg-[#0097B2] hover:text-white dark:hover:bg-[#0097B2] transition-all shadow-sm cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Carousel Viewport Window (Shows 1 main featured card + side peek or multi-cards) */}
            <div className="overflow-hidden py-4 px-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 60, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {/* Show up to 3 sliding items starting from currentIndex */}
                  {[0, 1, 2].map((offset) => {
                    const featIndex = (currentIndex + offset) % filteredFeatures.length;
                    const feat = filteredFeatures[featIndex];
                    if (!feat) return null;

                    const IconComponent = feat.icon;
                    const color = feat.color;
                    const isMainCard = offset === 0;

                    return (
                      <motion.div
                        key={feat.id}
                        whileHover={{ y: -8 }}
                        className={`group relative rounded-3xl bg-white dark:bg-zinc-900/95 border p-7 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                          isMainCard ? 'ring-2 ring-[#0097B2]/40 shadow-xl' : 'opacity-90'
                        } ${color.border}`}
                        onClick={() => {
                          setActiveModalFeature(feat);
                          setIsFlashcardFlipped(false);
                          setActivePlayback(false);
                        }}
                      >
                        {/* Accent Top Bar */}
                        <div className={`absolute top-0 left-0 right-0 h-2 ${color.bar}`} />

                        {/* Hover Ambient Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${color.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                        <div>
                          {/* Top Row: Icon + Ready Tag */}
                          <div className="flex items-center justify-between mb-5">
                            <div className={`w-14 h-14 rounded-2xl ${color.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                              <IconComponent className="w-7 h-7" />
                            </div>

                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Ready</span>
                            </div>
                          </div>

                          {/* Feature Title */}
                          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-[#0097B2] dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                            <span>{feat.title}</span>
                            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#0097B2] dark:text-cyan-400 shrink-0" />
                          </h3>

                          {/* Short Description */}
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed font-medium mb-6">
                            {feat.shortDesc}
                          </p>

                          {/* Highlights Checklist */}
                          <div className="space-y-2 mb-6">
                            {feat.highlights.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-zinc-300">
                                <Check className="w-4 h-4 text-[#0097B2] shrink-0" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer Row */}
                        <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between gap-2 overflow-hidden">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border whitespace-nowrap truncate max-w-[120px] shrink-0 ${color.badge}`}>
                            {feat.badgeLabel || feat.categoryLabel}
                          </span>

                          <span className="text-xs font-black text-[#0097B2] dark:text-cyan-400 group-hover:underline flex items-center gap-1 shrink-0">
                            <span>Interactive Demo</span>
                            <ChevronRight className="w-4 h-4 shrink-0" />
                          </span>
                        </div>

                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {filteredFeatures.map((_, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-[#0097B2] shadow-sm shadow-[#0097B2]/30'
                      : 'w-2.5 bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        )}

        {/* ── 2. STANDARD GRID VIEW MODE ── */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFeatures.map((feat) => {
              const IconComponent = feat.icon;
              const color = feat.color;

              return (
                <motion.div
                  layout
                  key={feat.id}
                  whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
                  className={`group relative rounded-3xl bg-white dark:bg-zinc-900/95 border p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${color.border}`}
                  onClick={() => {
                    setActiveModalFeature(feat);
                    setIsFlashcardFlipped(false);
                    setActivePlayback(false);
                  }}
                >
                  {/* Accent Line Header Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${color.bar}`} />

                  {/* Gradient Glow Effect on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${color.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div>
                    {/* Top Row: Icon + Check Pill */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl ${color.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-extrabold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>Ready</span>
                      </div>
                    </div>

                    {/* Feature Title */}
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-[#0097B2] dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                      <span>{feat.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#0097B2] dark:text-cyan-400 shrink-0" />
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-medium mb-6 line-clamp-2">
                      {feat.shortDesc}
                    </p>

                    {/* Feature Highlights Checklist */}
                    <div className="space-y-2 mb-6">
                      {feat.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-[#0097B2] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA Row */}
                  <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between gap-2 overflow-hidden">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border whitespace-nowrap truncate max-w-[120px] shrink-0 ${color.badge}`}>
                      {feat.badgeLabel || feat.categoryLabel}
                    </span>

                    <span className="text-xs font-black text-[#0097B2] dark:text-cyan-400 group-hover:underline flex items-center gap-1 shrink-0">
                      <span>Interactive Demo</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    </span>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty Search Result Fallback */}
        {filteredFeatures.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800">
            <Search className="w-10 h-10 text-slate-400 dark:text-zinc-600 mx-auto mb-3" />
            <h4 className="text-lg font-black text-slate-800 dark:text-zinc-200">No matching features found</h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Try clearing your search query or switching categories.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#0097B2] text-white text-xs font-black cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* ── Feature Interactive Preview Modal ── */}
      <AnimatePresence>
        {activeModalFeature && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
            onClick={() => setActiveModalFeature(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl overflow-hidden z-[101]"
            >
              {/* Top Accent line */}
              <div className={`absolute top-0 left-0 right-0 h-2 ${activeModalFeature.color.bar}`} />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalFeature(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl ${activeModalFeature.color.bg} flex items-center justify-center shrink-0`}>
                  {React.createElement(activeModalFeature.icon, { className: 'w-7 h-7' })}
                </div>
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${activeModalFeature.color.badge}`}>
                    {activeModalFeature.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                    {activeModalFeature.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body Description */}
              <p className="text-sm text-slate-600 dark:text-zinc-300 font-medium leading-relaxed mb-6">
                {activeModalFeature.fullDesc}
              </p>

              {/* Mini Interactive Preview Component based on demoType */}
              <div className="mb-6 p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-zinc-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-3">
                  Live Interactive Feature Card Preview
                </span>

                {/* 1. Audio Demo */}
                {activeModalFeature.demoType === 'audio' && (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActivePlayback(!activePlayback)}
                        className="w-10 h-10 rounded-full bg-[#0097B2] text-white flex items-center justify-center shadow-md shadow-[#0097B2]/30 cursor-pointer hover:scale-105 transition-transform"
                      >
                        <Play className={`w-4 h-4 fill-white ml-0.5 ${activePlayback ? 'animate-bounce' : ''}`} />
                      </button>
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-white block">AI Examiner Speaking Simulation</span>
                        <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-medium">"Describe a memorable journey you took recently..."</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`w-1 h-4 bg-cyan-500 rounded-full ${activePlayback ? 'animate-pulse' : ''}`} />
                      <span className={`w-1 h-6 bg-cyan-400 rounded-full ${activePlayback ? 'animate-pulse delay-75' : ''}`} />
                      <span className={`w-1 h-3 bg-cyan-500 rounded-full ${activePlayback ? 'animate-pulse delay-150' : ''}`} />
                    </div>
                  </div>
                )}

                {/* 2. Score Breakdown */}
                {activeModalFeature.demoType === 'score' && (
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 block">Overall</span>
                      <span className="text-xl font-black text-amber-500">8.0</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 block">Task Resp.</span>
                      <span className="text-xl font-black text-emerald-500">8.5</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 block">Coherence</span>
                      <span className="text-xl font-black text-[#0097B2]">8.0</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 block">Grammar</span>
                      <span className="text-xl font-black text-indigo-500">7.5</span>
                    </div>
                  </div>
                )}

                {/* 3. Word Card */}
                {activeModalFeature.demoType === 'wordCard' && (
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">Ubiquitous</span>
                      <span className="text-xs font-bold text-slate-400 dark:text-zinc-500">/juːˈbɪk.wə.təs/ • adj</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium italic">"Present, appearing, or found everywhere."</p>
                    <span className="text-[11px] text-slate-400 dark:text-zinc-500 mt-2 block font-semibold">Synonyms: Omnipresent, Pervasive</span>
                  </div>
                )}

                {/* 4. Flashcard Flip */}
                {activeModalFeature.demoType === 'flashcard' && (
                  <div
                    onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                    className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-purple-500/30 text-center cursor-pointer hover:border-purple-500 transition-all select-none"
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-black mb-3">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{isFlashcardFlipped ? 'Answer Side (Click to Flip)' : 'Front Side (Click to Flip)'}</span>
                    </div>
                    {!isFlashcardFlipped ? (
                      <div>
                        <p className="text-lg font-black text-slate-800 dark:text-white">"Exacerbate"</p>
                        <p className="text-xs text-slate-400 mt-1">Tap card to reveal definition & Band 8 collocation</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-bold">Definition & Usage:</p>
                        <p className="text-xs text-slate-700 dark:text-zinc-200 mt-1 font-medium italic">"To make a problem or negative situation worse. (e.g. Traffic congestion exacerbates urban pollution)."</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Daily Practice Streak */}
                {activeModalFeature.demoType === 'streak' && (
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
                        <span className="text-sm font-black text-slate-900 dark:text-white">14-Day Active Streak</span>
                      </div>
                      <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full">+150 XP Today</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-full w-[85%]" />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">Daily Target: 3 / 4 Micro-Drills Completed (85%)</p>
                  </div>
                )}

                {/* 6. Reading Passage Preview */}
                {activeModalFeature.demoType === 'reading' && (
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300">
                      <span>Passage 3: Climate Resilience</span>
                      <span className="text-blue-500 font-black">20:00 Timer</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 text-[11px] text-slate-600 dark:text-zinc-400 font-medium">
                      Q1: The author asserts that renewable energy adoption will decrease carbon tax revenue.
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-lg bg-blue-500 text-white text-[10px] font-bold">TRUE</span>
                      <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 text-[10px] font-bold">FALSE</span>
                      <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 text-[10px] font-bold">NOT GIVEN</span>
                    </div>
                  </div>
                )}

                {/* 7. Listening Multi-Accent Preview */}
                {activeModalFeature.demoType === 'listening' && (
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-[#0097B2] dark:text-cyan-400 flex items-center gap-1.5">
                        <Volume2 className="w-4 h-4 text-violet-500" />
                        <span>Audio Track #4: British Accent Dialogue</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] font-black">1.25x Speed</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 italic">"The university library extends its opening hours during exam weeks..."</p>
                  </div>
                )}

                {/* 8. Speaking Feedback Breakdown */}
                {activeModalFeature.demoType === 'speakingFeedback' && (
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                      <span className="text-[10px] text-slate-400 font-bold block">WPM Speed</span>
                      <span className="text-base font-black text-teal-500">145 WPM</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                      <span className="text-[10px] text-slate-400 font-bold block">Pause Rate</span>
                      <span className="text-base font-black text-emerald-500">Low (2%)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                      <span className="text-[10px] text-slate-400 font-bold block">Phoneme Score</span>
                      <span className="text-base font-black text-cyan-400">8.5 Band</span>
                    </div>
                  </div>
                )}

                {/* 9. Writing Diff Comparison */}
                {activeModalFeature.demoType === 'writingDiff' && (
                  <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-[#0097B2]/30 space-y-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                      <strong>Original:</strong> "People think pollution is bad because of cars."
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <strong>Band 8.0+:</strong> "It is widely contended that vehicular emissions contribute significantly to environmental degradation."
                    </div>
                  </div>
                )}

                {/* 10. Leaderboard Podium */}
                {activeModalFeature.demoType === 'podium' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs">
                      <span className="font-black text-amber-600 dark:text-amber-300">🥇 #1 Alex M. (USA)</span>
                      <span className="font-bold text-slate-700 dark:text-zinc-200">2,450 XP</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs">
                      <span className="font-black text-slate-700 dark:text-zinc-300">🥈 #2 Sarah K. (UK)</span>
                      <span className="font-bold text-slate-700 dark:text-zinc-200">2,120 XP</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0097B2]/10 border border-[#0097B2]/30 text-xs">
                      <span className="font-black text-[#0097B2] dark:text-cyan-400">🥉 #3 You (Scholar)</span>
                      <span className="font-bold text-[#0097B2]">1,980 XP</span>
                    </div>
                  </div>
                )}

                {/* 11. Certificates Seal */}
                {activeModalFeature.demoType === 'certificate' && (
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-sky-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-900 dark:text-white block">Official Band 8.0 Readiness Seal</span>
                        <span className="text-[10px] text-slate-400 font-bold">Issued by ITP-Verse Academic Board</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-sky-500 text-white text-[10px] font-black">Verified QR</span>
                  </div>
                )}

                {/* Fallback Checklist */}
                {!['audio', 'score', 'wordCard', 'flashcard', 'streak', 'reading', 'listening', 'speakingFeedback', 'writingDiff', 'podium', 'certificate', 'grammar'].includes(activeModalFeature.demoType) && (
                  <div className="space-y-2">
                    {activeModalFeature.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#0097B2]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer CTA */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalFeature(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalFeature(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#0097B2] hover:bg-[#00839b] text-white text-xs font-black shadow-lg shadow-[#0097B2]/25 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Feature</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
