import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Sub-nav tab definitions per exam ──────────────────────────────
const examTabs = {
  IELTS: [
    { id: 'home', label: 'Home' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'mock-tests', label: 'Mock Tests' },
    { id: 'practice', label: 'Practice Questions' },
    { id: 'vocab', label: 'Vocab Chart 🔠' },
    { id: 'finder', label: 'Uni & Scholarship Finder 🌍' },
    { id: 'records', label: 'Test Records' },
    { id: 'plans', label: 'Plans 🏷️' },
  ],
  TOEFL: [
    { id: 'mock-tests', label: 'Mock Tests' },
    { id: 'practice', label: 'Practice Questions' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'vocab', label: 'Vocab Chart 🔠' },
    { id: 'finder', label: 'Uni & Scholarship Finder 🌍' },
    { id: 'records', label: 'Test Records' },
    { id: 'plans', label: 'Plans 🏷️' },
  ],
  PTE: [
    { id: 'home', label: 'Home' },
    { id: 'mock-tests', label: 'Mock Tests' },
    { id: 'vocab', label: 'Vocab Chart 🔠' },
    { id: 'finder', label: 'Uni & Scholarship Finder 🌍' },
    { id: 'records', label: 'Test Records' },
    { id: 'plans', label: 'Plans 🏷️' },
  ],
};

// ── Partner badge per exam ──────────────────────────────────────────
function PartnerBadge({ exam }) {
  if (exam === 'IELTS') {
    return (
      <div className="hidden md:flex items-center space-x-1 text-xs font-medium text-slate-500 dark:text-zinc-400">
        <span>Official Partner of</span>
        <span className="font-extrabold bg-gradient-to-r from-red-500 to-indigo-600 bg-clip-text text-transparent">idp</span>
        <span className="font-black text-slate-700 dark:text-zinc-200">IELTS</span>
      </div>
    );
  }
  if (exam === 'TOEFL') {
    return (
      <div className="hidden md:flex items-center space-x-1 text-xs font-medium text-slate-500 dark:text-zinc-400">
        <span>Official Partner of</span>
        <span className="font-bold text-teal-600 dark:text-teal-400">ETS TOEFL Academy</span>
      </div>
    );
  }
  return (
    <div className="hidden md:flex items-center space-x-1 text-xs font-medium text-slate-500 dark:text-zinc-400">
      <span>Official Partner of</span>
      <span className="font-bold text-orange-500">Pearson PTE Global</span>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [activeExam, setActiveExam] = useState('IELTS');
  const [activeTab, setActiveTab] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const handleExamSwitch = (exam) => {
    setActiveExam(exam);
    // default to 'mock-tests' for TOEFL/PTE, 'home' for IELTS
    setActiveTab(exam === 'IELTS' ? 'home' : 'mock-tests');
  };

  const tabs = examTabs[activeExam];
  const hiddenSubNav = location.pathname === '/community' || location.pathname === '/blog';

  return (
    <header className="w-full bg-white dark:bg-zinc-950 shadow-sm dark:shadow-zinc-900/50 sticky top-0 z-50 transition-colors duration-300">

      {/* ══ TIER 1 — Main bar ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Left group: Logo + divider + Exam selector + divider + Partner */}
        <div className="flex items-center space-x-4 sm:space-x-6">

          {/* Logo */}
          <Link
            to="/"
            id="nav-logo"
            className="flex items-center cursor-pointer group flex-shrink-0"
          >
            <span className="text-2xl font-black tracking-tight leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <span style={{ color: '#f72585' }}>ITP</span>
              <span className="text-slate-900 dark:text-white">verse</span>
            </span>
          </Link>

          {/* Divider */}
          <div className="h-5 w-px bg-slate-200 dark:bg-zinc-700 hidden sm:block" />

          {/* Exam Selector Pills */}
          <div className="flex items-center space-x-1" id="exam-selector-container">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mr-1 hidden sm:inline">
              Exam:
            </span>
            {['IELTS', 'TOEFL', 'PTE'].map((exam) => (
              <button
                key={exam}
                id={`btn-exam-${exam}`}
                onClick={() => handleExamSwitch(exam)}
                className={`px-3 py-1 text-xs font-black rounded-full transition-all duration-200 ${
                  activeExam === exam
                    ? 'text-white shadow-sm'
                    : 'bg-surface-3 dark:bg-dark-surface-2 text-ink-muted dark:text-zinc-300 hover:bg-brand-muted dark:hover:bg-brand/10 hover:text-brand'
                }`}
                style={activeExam === exam ? { background: 'linear-gradient(135deg,#f72585,#d91a70)', boxShadow: '0 4px 12px rgba(247,37,133,0.30)' } : {}}
              >
                {exam}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-slate-200 dark:bg-zinc-700 hidden md:block" />

          {/* Partner Badge */}
          <PartnerBadge exam={activeExam} />
        </div>

        {/* Right group: Reviews, Blog, Community, Plans, Profile, Theme */}
        <div className="hidden lg:flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setActiveTab('reviews')}
            className="text-ink-muted dark:text-zinc-400 hover:text-brand dark:hover:text-brand-light text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            Reviews
          </button>
          <Link
            to="/blog"
            className="text-ink-muted dark:text-zinc-400 hover:text-brand dark:hover:text-brand-light text-xs font-semibold tracking-wide transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/community"
            className="text-ink-muted dark:text-zinc-400 hover:text-brand dark:hover:text-brand-light text-xs font-semibold tracking-wide transition-colors"
          >
            Community
          </Link>

          {/* Plans CTA */}
          <button
            id="purchase-btn"
            onClick={() => setActiveTab('plans')}
            className="btn-primary text-xs px-5 py-2 cursor-pointer"
          >
            Plans
          </button>

          {/* Profile Icon */}
          <button
            id="profile-btn"
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile right controls */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ══ TIER 2 — Sub-nav tabs (context based) ══ */}
      {!hiddenSubNav && (
        <div className="w-full bg-surface dark:bg-dark-base border-t border-surface-3 dark:border-dark-border transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              id="nav-tabs"
              className="flex space-x-6 h-11 items-center overflow-x-auto scrollbar-none"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 text-xs font-semibold pb-0.5 border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-brand text-brand dark:text-brand-light dark:border-brand-light'
                      : 'border-transparent text-ink-muted dark:text-zinc-400 hover:text-ink dark:hover:text-zinc-200 hover:border-surface-3 dark:hover:border-zinc-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ══ Mobile Drawer ══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-5 space-y-1">
              {/* Exam Pills on Mobile */}
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exam:</span>
                {['IELTS', 'TOEFL', 'PTE'].map((exam) => (
                  <button
                    key={exam}
                    onClick={() => { handleExamSwitch(exam); setIsOpen(false); }}
                    className={`px-3 py-1 text-xs font-black rounded-full transition-all ${
                      activeExam === exam
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300'
                    }`}
                  >
                    {exam}
                  </button>
                ))}
              </div>

              {/* Tab links on Mobile */}
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
                      : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <div className="pt-3 flex flex-col space-y-2 border-t border-slate-100 dark:border-zinc-800">
                <Link to="/blog" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-zinc-300">Blog</Link>
                <Link to="/community" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-zinc-300">Community</Link>
                <button className="mx-4 bg-blue-600 text-white py-2 rounded-full text-sm font-bold">Plans</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
