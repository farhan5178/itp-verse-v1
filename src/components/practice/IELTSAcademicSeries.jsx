import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Sparkles,
  Search,
  X,
  Play,
  Clock,
  HelpCircle,
  Award
} from 'lucide-react';

// Comprehensive dataset of Cambridge IELTS Academic Series Books 21 down to 1
const booksData = Array.from({ length: 21 }, (_, i) => {
  const number = 21 - i;
  const baseYear = 2026 - i;
  
  // Custom border gradient schemes matching the visual reference
  const gradients = [
    'from-rose-500 via-pink-500 to-amber-500',
    'from-[#0097B2] via-cyan-500 to-blue-600',
    'from-purple-500 via-indigo-500 to-cyan-500',
    'from-emerald-500 via-teal-500 to-[#004B59]',
    'from-amber-500 via-orange-500 to-red-500',
    'from-indigo-600 via-purple-600 to-pink-500',
  ];

  const borderGradient = gradients[i % gradients.length];

  return {
    id: number,
    number,
    title: `IELTS ${number} Academic ${baseYear}`,
    series: 'CAMBRIDGE IELTS SERIES',
    year: baseYear,
    isNew: number >= 19,
    testsCount: 4,
    badgeText: '4 ACADEMIC TESTS',
    gradient: borderGradient,
    tests: [
      { id: 1, name: 'Test 1' },
      { id: 2, name: 'Test 2' },
      { id: 3, name: 'Test 3' },
      { id: 4, name: 'Test 4' }
    ]
  };
});

const sectionTypes = [
  {
    id: 'listening',
    name: 'Listening',
    icon: Headphones,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60',
    borderColor: 'border-emerald-200 dark:border-emerald-800/60',
    accent: '#10b981',
    questions: '40 Questions • 4 Audio Sections',
    time: '30 Minutes (+ 10m transfer)'
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: BookOpen,
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60',
    borderColor: 'border-cyan-200 dark:border-cyan-800/60',
    accent: '#0097B2',
    questions: '40 Questions • 3 Academic Passages',
    time: '60 Minutes'
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: PenTool,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60',
    borderColor: 'border-amber-200 dark:border-amber-800/60',
    accent: '#f59e0b',
    questions: '2 Tasks (Task 1 Report & Task 2 Essay)',
    time: '60 Minutes'
  },
  {
    id: 'speaking',
    name: 'Speaking',
    icon: Mic,
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-50 dark:bg-pink-950/40 hover:bg-pink-100 dark:hover:bg-pink-900/60',
    borderColor: 'border-pink-200 dark:border-pink-800/60',
    accent: '#ec4899',
    questions: '3 Parts (Intro, Cue Card & Discussion)',
    time: '11 - 14 Minutes'
  }
];

export default function IELTSAcademicSeries({ onStartPractice }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, latest (21-16), mid (15-10), early (9-1)
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [practiceMode, setPracticeMode] = useState('timed'); // timed, untimed, ai

  // Filter books based on active tab and search query
  const filteredBooks = booksData.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.number.toString().includes(searchQuery) ||
      book.year.toString().includes(searchQuery);

    if (!matchesSearch) return false;

    if (activeTab === 'latest') return book.number >= 16;
    if (activeTab === 'mid') return book.number >= 10 && book.number <= 15;
    if (activeTab === 'early') return book.number <= 9;
    return true;
  });

  const handleOpenLauncher = (book, test, section) => {
    if (onStartPractice) {
      onStartPractice({
        book,
        test,
        section,
        mode: 'timed'
      });
    } else {
      setSelectedBook(book);
      setSelectedTest(test);
      setSelectedSection(section);
    }
  };

  const handleConfirmStart = () => {
    if (onStartPractice && selectedBook && selectedTest && selectedSection) {
      onStartPractice({
        book: selectedBook,
        test: selectedTest,
        section: selectedSection,
        mode: practiceMode
      });
    } else {
      alert(`Starting ${selectedBook.title} - ${selectedTest.name}: ${selectedSection.name} (${practiceMode.toUpperCase()} mode)`);
      setSelectedBook(null);
    }
  };

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-dark-900/50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200 dark:border-dark-750">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                IELTS Academic Series Practice
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-cyan-500/10 text-[#0097B2] border border-[#0097B2]/30 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#0097B2]" />
                LIVE PRACTICE
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-dark-muted max-w-3xl">
              Explore official books from <strong className="text-slate-900 dark:text-white font-semibold">IELTS 21</strong> down to <strong className="text-slate-900 dark:text-white font-semibold">IELTS 1</strong>. Click on Listening, Reading, Writing, or Speaking to start a section.
            </p>
          </div>

          {/* Top Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-white dark:bg-dark-800 p-3 rounded-2xl border border-slate-200 dark:border-dark-700 shadow-sm self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-dark-muted font-medium">Cambridge Library</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">21 Books • 84 Full Tests</div>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-dark-800 p-4 rounded-2xl border border-slate-200 dark:border-dark-700 shadow-sm">
          
          {/* Tab Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Series (21-1)' },
              { id: 'latest', label: 'IELTS 21 - 16 (Latest)' },
              { id: 'mid', label: 'IELTS 15 - 10' },
              { id: 'early', label: 'IELTS 9 - 1' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0097B2] text-white shadow-md shadow-[#0097B2]/20'
                    : 'bg-slate-100 dark:bg-dark-750 text-slate-600 dark:text-dark-muted hover:bg-slate-200 dark:hover:bg-dark-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search IELTS 21, 2026..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white dark:bg-dark-800 rounded-3xl border border-slate-200/90 dark:border-dark-700 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col group"
            >
              {/* Left Dynamic Color Stripe Accent */}
              <div className={`absolute top-0 left-0 bottom-0 w-2.5 bg-gradient-to-b ${book.gradient}`} />

              {/* Card Header */}
              <div className="pt-6 px-6 sm:px-8 pb-4 pl-8 sm:pl-10 flex items-start justify-between border-b border-slate-100 dark:border-dark-750/80">
                <div className="flex items-center gap-4">
                  
                  {/* Circle Book Number Badge */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-rose-400/40 text-rose-600 dark:text-rose-400 font-black text-lg sm:text-xl flex items-center justify-center bg-rose-50/80 dark:bg-rose-950/30 shrink-0 shadow-inner">
                    {book.number}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        {book.title}
                      </h3>
                      {book.isNew && (
                        <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0 animate-bounce" />
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-400 dark:text-dark-muted tracking-wider uppercase">
                      {book.series}
                    </p>
                  </div>
                </div>

                {/* Badge Top Right */}
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-100 dark:bg-dark-750 text-slate-600 dark:text-dark-muted border border-slate-200 dark:border-dark-700 shrink-0 tracking-wider">
                  {book.badgeText}
                </span>
              </div>

              {/* Card Body - 4 Test Matrix Grid */}
              <div className="p-4 sm:p-6 pl-6 sm:pl-8 flex-grow">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {book.tests.map((test) => (
                    <div
                      key={test.id}
                      className="bg-slate-50/80 dark:bg-dark-900/60 rounded-2xl p-3 border border-slate-200/60 dark:border-dark-750 flex flex-col items-center hover:border-slate-300 dark:hover:border-dark-700 transition-all"
                    >
                      {/* Test Title Header */}
                      <div className="text-xs font-black text-slate-700 dark:text-zinc-300 mb-2.5 flex items-center gap-1">
                        <span>{test.name}</span>
                      </div>

                      {/* 4 Skill Section Buttons */}
                      <div className="w-full space-y-1.5">
                        {sectionTypes.map((sec) => {
                          const IconComp = sec.icon;
                          return (
                            <button
                              key={sec.id}
                              onClick={() => handleOpenLauncher(book, test, sec)}
                              className={`w-full py-2 px-2.5 rounded-xl border ${sec.borderColor} ${sec.bgColor} ${sec.color} flex items-center gap-2 text-xs font-bold transition-all cursor-pointer transform active:scale-95 group/btn`}
                              title={`Start ${book.title} ${test.name} - ${sec.name}`}
                            >
                              <IconComp className="w-3.5 h-3.5 shrink-0 group-hover/btn:scale-110 transition-transform" />
                              <span className="truncate">{sec.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-dark-800 rounded-3xl border border-slate-200 dark:border-dark-700">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">No IELTS Series Found</h3>
            <p className="text-xs text-slate-500 dark:text-dark-muted mt-1">
              Try adjusting your search criteria or switching filter tabs.
            </p>
          </div>
        )}
      </div>

      {/* Practice Launcher Modal */}
      <AnimatePresence>
        {selectedBook && selectedTest && selectedSection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBook(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-dark-800 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-2xl overflow-hidden z-10"
            >
              {/* Header Banner */}
              <div className="p-6 bg-gradient-to-r from-slate-900 via-[#091b20] to-[#004B59] text-white relative">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0097B2]/30 border border-[#0097B2]/40 text-xs font-bold text-cyan-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cambridge Official Exam Prep</span>
                </div>

                <h3 className="text-xl font-black">{selectedBook.title}</h3>
                <p className="text-xs text-cyan-200/80 mt-0.5">
                  {selectedTest.name} • <strong className="text-white">{selectedSection.name} Section</strong>
                </p>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-5">
                
                {/* Section Overview Box */}
                <div className={`p-4 rounded-2xl border ${selectedSection.borderColor} ${selectedSection.bgColor} flex items-start gap-4`}>
                  <div className={`p-3 rounded-xl bg-white dark:bg-dark-800 ${selectedSection.color} shadow-sm`}>
                    <selectedSection.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {selectedSection.name} Module Overview
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-dark-muted mt-0.5">
                      {selectedSection.questions}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-zinc-300 mt-2">
                      <Clock className="w-3.5 h-3.5 text-[#0097B2]" />
                      <span>{selectedSection.time}</span>
                    </div>
                  </div>
                </div>

                {/* Practice Mode Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-2">
                    Select Practice Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'timed', label: 'Timed Exam', desc: 'Real exam clock' },
                      { id: 'untimed', label: 'Practice Mode', desc: 'No time limit' },
                      { id: 'ai', label: 'AI Evaluation', desc: 'Instant feedback' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setPracticeMode(mode.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          practiceMode === mode.id
                            ? 'border-[#0097B2] bg-[#0097B2]/10 text-slate-900 dark:text-white ring-2 ring-[#0097B2]'
                            : 'border-slate-200 dark:border-dark-700 bg-slate-50 dark:bg-dark-900 text-slate-600 dark:text-dark-muted hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-black">{mode.label}</div>
                        <div className="text-[10px] text-slate-400 dark:text-dark-muted">{mode.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="w-1/3 py-3 rounded-xl border border-slate-200 dark:border-dark-700 text-xs font-bold text-slate-600 dark:text-dark-muted hover:bg-slate-100 dark:hover:bg-dark-750 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmStart}
                    className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-[#0097B2] to-[#004B59] text-white text-xs font-extrabold shadow-lg shadow-[#0097B2]/25 hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Practice Section</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
