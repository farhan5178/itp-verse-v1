import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeroOnboarding from '../components/home/HeroOnboarding/index';
import {
  BookOpen,
  Trophy,
  Timer,
  LineChart,
  Play,
  Calendar,
  Mic,
  PenTool,
  Headphones,
  Globe,
  GraduationCap,
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  Search,
  Building2,
  ExternalLink
} from 'lucide-react';

const mockUniversities = [
  {
    id: 'oxford',
    name: 'University of Oxford',
    country: 'United Kingdom',
    flag: '🇬🇧',
    minBand: '7.5+',
    scholarship: '100% Rhodes Full Scholarship',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    tuition: 'Fully Funded',
    deadline: 'Oct 15, 2026',
  },
  {
    id: 'tum',
    name: 'Technical University of Munich',
    country: 'Germany',
    flag: '🇩🇪',
    minBand: '6.5+',
    scholarship: '100% DAAD Tuition-Free Public',
    matchStatus: 'Guaranteed Match',
    matchColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    tuition: '€0 / Tuition-Free',
    deadline: 'Jul 15, 2026',
  },
  {
    id: 'toronto',
    name: 'University of Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    minBand: '7.0+',
    scholarship: 'Lester B. Pearson Full Ride',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    tuition: 'Fully Funded',
    deadline: 'Jan 18, 2027',
  },
  {
    id: 'harvard',
    name: 'Harvard University',
    country: 'United States',
    flag: '🇺🇸',
    minBand: '7.5+',
    scholarship: 'Presidential Need-Based 100%',
    matchStatus: 'Target Stretch',
    matchColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    tuition: 'Fully Funded',
    deadline: 'Nov 01, 2026',
  },
  {
    id: 'melbourne',
    name: 'University of Melbourne',
    country: 'Australia',
    flag: '🇦🇺',
    minBand: '6.5+',
    scholarship: 'Melbourne International Award',
    matchStatus: 'Guaranteed Match',
    matchColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    tuition: 'AUD $10,000 Grant',
    deadline: 'Nov 30, 2026',
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    country: 'United Kingdom',
    flag: '🇬🇧',
    minBand: '7.5+',
    scholarship: 'Gates Cambridge Full Scholarship',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    tuition: 'Fully Funded',
    deadline: 'Dec 03, 2026',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [showDashboardContent, setShowDashboardContent] = useState(true);
  const [isUniModalOpen, setIsUniModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const handleContinueLearning = () => {
    setShowDashboardContent(true);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const stats = [
    { label: 'Estimated IELTS Band', value: '7.5 / 9.0', icon: Trophy, color: 'text-[#0097B2]' },
    { label: 'Modules Completed', value: '28 Tests', icon: BookOpen, color: 'text-amber-500' },
    { label: 'Practice Time', value: '34.5 hrs', icon: Timer, color: 'text-emerald-500' },
    { label: 'Target Band Goal', value: 'Band 8.0', icon: LineChart, color: 'text-[#004B59]' },
  ];

  const ieltsModules = [
    { name: 'Listening Module', progress: 85, band: 'Band 8.0', color: 'bg-[#004B59]', count: '45 sections completed • 40 Qs average', icon: Headphones },
    { name: 'Reading Module', progress: 78, band: 'Band 7.5', color: 'bg-emerald-500', count: '18 academic passages done • 60 mins avg', icon: BookOpen },
    { name: 'Writing Task 1 & 2', progress: 65, band: 'Band 7.0', color: 'bg-gradient-to-r from-[#0097B2] to-[#004B59]', count: '14 AI graded essays • Lexical feedback ready', icon: PenTool },
    { name: 'Speaking Cue Cards', progress: 80, band: 'Band 7.5', color: 'bg-[#0097B2]', count: '22 AI audio simulations • Fluency 8.0', icon: Mic },
  ];

  const activeTests = [
    {
      id: 'ielts-mock-1',
      title: 'IELTS Academic Full Simulation #1',
      duration: '2 Hours 40 Mins',
      questions: 'Listening, Reading, Writing & Speaking',
      difficulty: 'IDP Standard',
      subject: 'Full Mock Test',
      bestScore: 'Band 7.5'
    },
    {
      id: 'ielts-writing-2',
      title: 'IELTS Writing Task 2: Opinion Essay Practice',
      duration: '40 Mins',
      questions: '1 Essay (250+ Words)',
      difficulty: 'Band 8.0 Level',
      subject: 'Writing Focus',
      bestScore: 'Band 7.0'
    },
    {
      id: 'ielts-speaking-card',
      title: 'IELTS Speaking Part 2 & 3 Cue Card Simulator',
      duration: '14 Mins',
      questions: '3 Parts Live AI Examiner',
      difficulty: 'Adaptive AI',
      subject: 'Speaking Focus',
      bestScore: 'Band 8.0'
    },
    {
      id: 'ielts-reading-acad',
      title: 'IELTS Academic Reading Passage 3 Speed Drill',
      duration: '20 Mins',
      questions: '14 True/False/Not Given Qs',
      difficulty: 'Hard',
      subject: 'Reading Focus',
      bestScore: 'Band 7.5'
    }
  ];

  const filteredUniversities = mockUniversities.filter((uni) => {
    const matchesCountry = selectedCountry === 'All' || uni.country === selectedCountry;
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uni.scholarship.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uni.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="pb-12">
      {/* Personalized AI Avatar Onboarding */}
      <HeroOnboarding onContinue={handleContinueLearning} />

      <AnimatePresence>
        {showDashboardContent && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
          >

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl mb-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-200/80 dark:border-zinc-800"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0097B2]/10 rounded-full blur-3xl -z-10" />
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0097B2]/10 border border-[#0097B2]/20 text-xs font-bold text-[#0097B2] mb-3">
            <span>🎧 IDP IELTS Academic Prep</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
            Welcome Back, IELTS Scholar!
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-xs sm:text-sm max-w-xl">
            You are currently on track for <strong className="text-slate-900 dark:text-white font-black">Band 7.5+</strong>. Practice your weak modules to reach Band 8.0 before your exam date.
          </p>
        </div>
        <button
          onClick={() => navigate('/mock-test')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#0097B2] via-[#00788E] to-[#004B59] text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-[#0097B2]/25 hover:shadow-[#0097B2]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Launch IELTS Simulator</span>
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel p-5 rounded-2xl flex items-center space-x-4 border border-slate-200/80 dark:border-zinc-800"
            >
              <div className={`p-3 bg-slate-100 dark:bg-dark-700/60 rounded-xl ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-dark-muted font-medium">{stat.label}</p>
                <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Featured Section: Find Universities & Scholarships ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl mb-8 relative overflow-hidden border border-[#0097B2]/30 bg-gradient-to-r from-cyan-500/10 via-[#0097B2]/10 to-[#004B59]/20"
      >
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#0097B2]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0097B2]/20 border border-[#0097B2]/40 text-xs font-black text-[#0097B2] dark:text-cyan-300">
              <Globe className="w-3.5 h-3.5" />
              <span>Find Universities & Scholarships</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Discover Global Universities & Full Scholarships
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
              Based on your estimated <strong className="text-[#0097B2] dark:text-cyan-300">IELTS Band 7.5+</strong> score, explore 500+ top universities in USA, UK, Canada, Australia & Germany with 100% full-ride scholarship matches and tuition-free public options.
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700 dark:text-zinc-300 pt-1">
              <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-[#0097B2]" /> 500+ Global Partners</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-500" /> Full-Ride Scholarships</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Band Cutoff Matching</span>
            </div>
          </div>

          <button
            onClick={() => setIsUniModalOpen(true)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0097B2] via-[#00788E] to-[#004B59] hover:from-[#00829a] hover:to-[#003843] text-sm font-black text-white shadow-xl shadow-[#0097B2]/30 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2.5 cursor-pointer shrink-0 group"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
            <span>Start My Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Active IELTS Mock Tests */}
        <div className="lg:col-span-2 space-y-8">

          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Active IELTS Mock Exams</h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Real IDP test pattern with instant AI band scores</p>
              </div>
              <span className="text-xs text-[#0097B2] font-bold hover:underline cursor-pointer">View All</span>
            </div>

            <div className="space-y-4">
              {activeTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-900/50 hover:bg-slate-100/60 dark:hover:bg-zinc-800/60 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0097B2]/10 text-[#0097B2]">
                        {test.subject}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                        {test.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{test.title}</h3>
                    <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-zinc-400">
                      <span className="flex items-center space-x-1">
                        <Timer className="w-3.5 h-3.5 text-[#0097B2]" />
                        <span>{test.duration}</span>
                      </span>
                      <span>{test.questions}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Best Score</p>
                      <p className="text-sm font-black text-emerald-500">{test.bestScore}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/mock-test?id=${test.id}`)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0097B2] to-[#004B59] text-xs font-bold text-white shadow-md shadow-[#0097B2]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Test</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 4 IELTS Modules Breakdown & Exam Timeline */}
        <div className="space-y-8">

          {/* IELTS 4 Modules Breakdown */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">IELTS 4-Module Progress</h2>
            <div className="space-y-5">
              {ieltsModules.map((sub, index) => {
                const Icon = sub.icon;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#0097B2]" />
                        <span>{sub.name}</span>
                      </span>
                      <span className="text-[#0097B2] font-black text-xs px-2 py-0.5 rounded-md bg-[#0097B2]/10">{sub.band}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sub.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.15 }}
                        className={`h-full ${sub.color}`}
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">{sub.count}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* IELTS Exam Timeline */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">Official IELTS Schedule</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-xl border border-slate-200/60 dark:border-zinc-800">
                <Calendar className="w-5 h-5 text-[#0097B2] mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Official IDP IELTS Exam</h4>
                  <p className="text-[11px] text-[#0097B2] font-bold">Target Date: August 15, 2026</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-xl border border-slate-200/60 dark:border-zinc-800">
                <Mic className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Live AI Speaking Cue Card Test</h4>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">Scheduled: Today, 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-xl border border-slate-200/60 dark:border-zinc-800">
                <PenTool className="w-5 h-5 text-[#a855f7] mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">IELTS Academic Task 2 Review</h4>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">Scheduled: Tomorrow, 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Interactive Modal: Your University & Scholarship Match Journey ── */}
      <AnimatePresence>
        {isUniModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUniModalOpen(false)}
              className="absolute inset-0 bg-slate-900/70 dark:bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#091b20] to-[#004B59] text-white border-b border-slate-800 relative">
                <button
                  onClick={() => setIsUniModalOpen(false)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0097B2]/30 border border-[#0097B2]/40 text-xs font-bold text-cyan-300 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start My Journey • University & Scholarship Match</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Your Global Admission & Scholarship Matches
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
                  Matched for your estimated score: <strong className="text-cyan-300 font-bold">IELTS Band 7.5</strong>
                </p>

                {/* Filter Controls */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-grow">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search university, scholarship or country..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {['All', 'United Kingdom', 'Germany', 'Canada', 'United States', 'Australia'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCountry(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                          selectedCountry === c
                            ? 'bg-[#0097B2] text-white shadow-md'
                            : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                        }`}
                      >
                        {c === 'All' ? '🌍 All Countries' : c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Body / Universities List */}
              <div className="p-6 overflow-y-auto space-y-4 flex-grow bg-slate-50 dark:bg-dark-900/60">
                {filteredUniversities.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 dark:text-zinc-400 text-sm">
                    No universities found matching your search query. Try resetting filters.
                  </div>
                ) : (
                  filteredUniversities.map((uni) => (
                    <div
                      key={uni.id}
                      className="p-5 rounded-2xl bg-white dark:bg-dark-800 border border-slate-200/80 dark:border-dark-700 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{uni.flag}</span>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                            {uni.name}
                          </h3>
                          <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                            • {uni.country}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-dark-700 text-slate-700 dark:text-zinc-300 font-bold">
                            IELTS Min: {uni.minBand}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20 flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            {uni.scholarship}
                          </span>
                          <span className={`px-2.5 py-1 rounded-lg font-bold border ${uni.matchColor}`}>
                            {uni.matchStatus}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-dark-700">
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Tuition Status</p>
                          <p className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400">{uni.tuition}</p>
                        </div>

                        <button
                          onClick={() => alert(`Starting application process for ${uni.name}...`)}
                          className="px-4 py-2.5 rounded-xl bg-[#0097B2] hover:bg-[#00788E] text-white text-xs font-bold shadow-md flex items-center space-x-1.5 cursor-pointer transition-all"
                        >
                          <span>Apply Now</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-white dark:bg-dark-800 border-t border-slate-200 dark:border-dark-700 flex justify-between items-center text-xs text-slate-500 dark:text-zinc-400">
                <span>Showing {filteredUniversities.length} Verified Partner Universities</span>
                <button
                  onClick={() => setIsUniModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-dark-700 hover:bg-slate-200 dark:hover:bg-dark-700/80 text-slate-800 dark:text-white font-bold transition-all cursor-pointer"
                >
                  Close Explorer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
