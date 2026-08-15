import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeroOnboarding from '../components/home/HeroOnboarding/index';
import StructuredInteractiveLessons from '../components/home/StructuredInteractiveLessons';
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
  ArrowRight,
  X,
  Search,
  Building2,
  ExternalLink,
  FileText,
  Target,
  HelpCircle,
  BarChart2,
  Zap,
  BookMarked
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

const navbarModulesCards = [
  {
    id: 'lessons',
    title: 'Lessons & Video Modules',
    badge: 'Core Curriculum',
    icon: BookOpen,
    desc: 'Structured interactive video lessons & strategies for Listening, Reading, Writing & Speaking.',
    color: 'from-cyan-500/20 to-[#0097B2]/30 text-[#0097B2] dark:text-cyan-300',
    borderColor: 'border-[#0097B2]/40 hover:border-[#0097B2]',
    btnText: 'Start Lessons',
    actionType: 'navigate',
    href: '/lessons',
  },
  {
    id: 'mock-tests',
    title: 'Official Mock Tests',
    badge: 'Real Exam 1:1',
    icon: FileText,
    desc: 'Real 2-hour 40-minute IDP & British Council full-length test simulator with instant AI band scores.',
    color: 'from-[#004B59]/20 to-[#0097B2]/30 text-[#004B59] dark:text-cyan-300',
    borderColor: 'border-[#004B59]/40 hover:border-[#004B59]',
    btnText: 'Take Full Mock',
    actionType: 'navigate',
    href: '/mock-test',
  },
  {
    id: 'practice',
    title: 'Practice Questions',
    badge: '1,500+ Questions',
    icon: Target,
    desc: 'Topic-wise speed drills, passage breakdown, and instant grammar & fluency corrections.',
    color: 'from-amber-500/20 to-orange-500/20 text-amber-500',
    borderColor: 'border-amber-500/40 hover:border-amber-500',
    btnText: 'Practice Drills',
    actionType: 'navigate',
    href: '/mock-test',
  },
  {
    id: 'vocab',
    title: 'Band 8+ Vocab Chart 🔠',
    badge: 'Lexical Resource',
    icon: HelpCircle,
    desc: 'Master 800+ academic collocations, high-scoring idioms & topic-specific phrase books.',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-500',
    borderColor: 'border-emerald-500/40 hover:border-emerald-500',
    btnText: 'Explore Vocab Chart',
    actionType: 'navigate',
    href: '/vocab-chart',
  },
  {
    id: 'finder',
    title: 'Uni & Scholarship Finder 🌍',
    badge: '500+ Universities',
    icon: GraduationCap,
    desc: 'Discover global university cutoffs and 100% full-ride scholarship matches for your target band.',
    color: 'from-blue-500/20 to-indigo-500/20 text-blue-500',
    borderColor: 'border-blue-500/40 hover:border-blue-500',
    btnText: 'Find Scholarships',
    actionType: 'navigate',
    href: '/university-finder',
  },
  {
    id: 'records',
    title: 'Test Records & Analytics',
    badge: 'Performance Log',
    icon: BarChart2,
    desc: 'View comprehensive band score progression, history analysis & detailed error breakdown.',
    color: 'from-[#0097B2]/20 to-purple-500/20 text-purple-500 dark:text-purple-400',
    borderColor: 'border-purple-500/40 hover:border-purple-500',
    btnText: 'View Test Records',
    actionType: 'navigate',
    href: '/results',
  },
];

const mockVocabList = [
  { phrase: 'Substantial improvement', category: 'Writing Task 2', band: 'Band 8.0+', example: 'The implementation of green policies led to a substantial improvement in air quality.' },
  { phrase: 'Pivotal role', category: 'Speaking Part 3', band: 'Band 8.0+', example: 'Higher education plays a pivotal role in personal and economic development.' },
  { phrase: 'Ubiquitous phenomenon', category: 'Academic Reading', band: 'Band 8.5+', example: 'Smartphones have transformed from luxury devices into a ubiquitous phenomenon.' },
  { phrase: 'Exacerbate the dilemma', category: 'Writing Task 2', band: 'Band 8.5+', example: 'Unplanned urban expansion tends to exacerbate the dilemma of traffic congestion.' },
  { phrase: 'Fostering innovation', category: 'Speaking Part 2', band: 'Band 8.0+', example: 'State funding is vital for fostering innovation in scientific research fields.' },
  { phrase: 'Insurmountable challenge', category: 'Academic Writing', band: 'Band 8.5+', example: 'Climate change presents an almost insurmountable challenge for developing nations.' }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [showDashboardContent, setShowDashboardContent] = useState(false);
  const [isUniModalOpen, setIsUniModalOpen] = useState(false);
  const [isVocabModalOpen, setIsVocabModalOpen] = useState(false);
  const [vocabSearchQuery, setVocabSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const handleContinueLearning = () => {
    setShowDashboardContent(true);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCardAction = (module) => {
    if (module.actionType === 'navigate' && module.href) {
      navigate(module.href);
    } else if (module.actionType === 'uni-modal') {
      setIsUniModalOpen(true);
    } else if (module.actionType === 'vocab-modal') {
      setIsVocabModalOpen(true);
    } else if (module.actionType === 'scroll-skills') {
      const el = document.getElementById('structured-lessons') || document.getElementById('skills-progress');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
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

      {/* ── Navbar IELTS Dropdown Modules Cards (Just the cards) ── */}
      <motion.div
        id="navbar-ielts-modules"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white via-cyan-50/20 to-slate-50 dark:from-[#0d242b]/90 dark:via-[#091b20]/90 dark:to-[#061317]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-xl relative overflow-hidden backdrop-blur-xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0097B2]/10 dark:bg-[#0097B2]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {navbarModulesCards.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * index }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                className={`group relative p-6 rounded-2xl bg-white/90 dark:bg-zinc-900/90 border ${module.borderColor} shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer`}
                onClick={() => handleCardAction(module)}
              >
                {/* Accent Backdrop Gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${module.color} rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none`} />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center border border-white/20 shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                      {module.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-[#0097B2] dark:group-hover:text-cyan-300 transition-colors">
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-6 font-medium">
                    {module.desc}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardAction(module);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-900 group-hover:bg-[#0097B2] dark:bg-zinc-800 dark:group-hover:bg-[#0097B2] text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{module.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Gamified Pathway: Structured Interactive Lessons ── */}
      <StructuredInteractiveLessons />

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
                  <GraduationCap className="w-3.5 h-3.5" />
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

      {/* ── Interactive Modal: Band 8+ Vocabulary Chart ── */}
      <AnimatePresence>
        {isVocabModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVocabModalOpen(false)}
              className="absolute inset-0 bg-slate-900/70 dark:bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#091b20] to-[#004B59] text-white border-b border-slate-800 relative">
                <button
                  onClick={() => setIsVocabModalOpen(false)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-500/40 text-xs font-bold text-emerald-300 mb-3">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Band 8+ Lexical Resource Chart 🔠</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  High-Scoring Academic Vocabulary & Collocations
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
                  Boost your Lexical Resource score for IELTS Academic Writing Task 2 & Speaking Part 2/3.
                </p>

                {/* Search Bar */}
                <div className="mt-6 relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={vocabSearchQuery}
                    onChange={(e) => setVocabSearchQuery(e.target.value)}
                    placeholder="Search vocabulary phrases or topic..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              </div>

              {/* Modal Content List */}
              <div className="p-6 overflow-y-auto space-y-4 flex-grow bg-slate-50 dark:bg-dark-900/60">
                {mockVocabList
                  .filter(v => v.phrase.toLowerCase().includes(vocabSearchQuery.toLowerCase()) || v.category.toLowerCase().includes(vocabSearchQuery.toLowerCase()))
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white dark:bg-dark-800 border border-slate-200/80 dark:border-dark-700 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-black text-slate-900 dark:text-white">
                            {item.phrase}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {item.band}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-zinc-300 italic bg-slate-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-slate-100 dark:border-zinc-800">
                        "{item.example}"
                      </p>
                    </div>
                  ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-white dark:bg-dark-800 border-t border-slate-200 dark:border-dark-700 flex justify-between items-center text-xs text-slate-500 dark:text-zinc-400">
                <span>Band 8.0+ Verified Lexical Chart</span>
                <button
                  onClick={() => setIsVocabModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-dark-700 hover:bg-slate-200 dark:hover:bg-dark-700/80 text-slate-800 dark:text-white font-bold transition-all cursor-pointer"
                >
                  Close Chart
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
