import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, Sparkles, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

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
      <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-zinc-900/80 border border-slate-200/60 dark:border-zinc-800/80 text-xs font-medium text-slate-500 dark:text-zinc-400">
        <Sparkles className="w-3 h-3 text-[#f72585] animate-pulse" />
        <span>Official Partner of</span>
        <span className="font-extrabold bg-gradient-to-r from-[#f72585] to-[#d91a70] bg-clip-text text-transparent">idp</span>
        <span className="font-black text-slate-800 dark:text-zinc-100">IELTS</span>
      </div>
    );
  }
  if (exam === 'TOEFL') {
    return (
      <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-zinc-900/80 border border-slate-200/60 dark:border-zinc-800/80 text-xs font-medium text-slate-500 dark:text-zinc-400">
        <Sparkles className="w-3 h-3 text-[#f72585] animate-pulse" />
        <span>Official Partner of</span>
        <span className="font-bold text-[#f72585] dark:text-[#ff5fa0]">ETS TOEFL Academy</span>
      </div>
    );
  }
  return (
    <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-zinc-900/80 border border-slate-200/60 dark:border-zinc-800/80 text-xs font-medium text-slate-500 dark:text-zinc-400">
      <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" />
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
  const { isLoggedIn, user, logout, openAuthModal, login } = useAuth();

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
    <header className="w-full sticky top-0 z-50 transition-colors duration-300 font-sans backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border-b border-slate-200/70 dark:border-zinc-800/80 shadow-sm">

      {/* ══ TIER 1 — Main bar ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Left group: Logo + Exam selector segment + Partner Badge */}
        <div className="flex items-center space-x-3 sm:space-x-5">

          {/* Logo */}
          <Link
            to="/"
            id="nav-logo"
            className="flex items-center cursor-pointer group flex-shrink-0 transition-transform active:scale-95"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#f72585] to-[#d91a70] flex items-center justify-center shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-xs tracking-tighter">ITP</span>
              </div>
              <span className="text-xl font-black tracking-tight leading-none">
                <span style={{ color: '#f72585' }}>ITP</span>
                <span className="text-slate-900 dark:text-white">verse</span>
              </span>
            </div>
          </Link>

          {/* Divider */}
          <div className="h-5 w-px bg-slate-200 dark:bg-zinc-800 hidden sm:block" />

          {/* Interactive Exam Selector Track */}
          <div className="flex items-center bg-slate-100/90 dark:bg-zinc-900/90 p-1 rounded-full border border-slate-200/70 dark:border-zinc-800" id="exam-selector-container">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider px-2 hidden xl:inline">
              Exam:
            </span>
            {['IELTS', 'TOEFL', 'PTE'].map((exam) => {
              const isSelected = activeExam === exam;
              return (
                <button
                  key={exam}
                  id={`btn-exam-${exam}`}
                  onClick={() => handleExamSwitch(exam)}
                  className={`relative px-3.5 py-1 text-xs font-extrabold rounded-full transition-colors duration-200 z-10 ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeExamIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f72585] to-[#d91a70] shadow-md shadow-pink-500/25 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {exam}
                </button>
              );
            })}
          </div>

          {/* Partner Badge */}
          <PartnerBadge exam={activeExam} />
        </div>

        {/* Right group: Navigation Links, CTA, Profile, Theme Toggle */}
        <div className="hidden md:flex items-center space-x-3 xl:space-x-4">
          <div className="flex items-center space-x-1 bg-slate-100/60 dark:bg-zinc-900/60 p-1 rounded-full border border-slate-200/50 dark:border-zinc-800/60">
            <button
              onClick={() => setActiveTab('reviews')}
              className="px-3 py-1 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white dark:hover:bg-zinc-800"
            >
              Reviews
            </button>
            <Link
              to="/blog"
              className="px-3 py-1 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full hover:bg-white dark:hover:bg-zinc-800"
            >
              Blog
            </Link>
            <Link
              to="/community"
              className="px-3 py-1 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full hover:bg-white dark:hover:bg-zinc-800"
            >
              Community
            </Link>
          </div>

          {/* Plans CTA Button */}
          <button
            id="purchase-btn"
            onClick={() => setActiveTab('plans')}
            className="relative group overflow-hidden px-5 py-2 rounded-full text-xs font-bold text-white transition-all duration-200 active:scale-95 cursor-pointer shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/35"
            style={{ background: 'linear-gradient(135deg, #f72585, #d91a70)' }}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Plans</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">🏷️</span>
            </span>
          </button>

          {/* User Auth Profile / Login Button */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-800 dark:text-zinc-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{user?.name?.split(' ')[0] || 'Student'}</span>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 flex items-center justify-center text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              id="profile-btn"
              onClick={openAuthModal}
              className="px-4 py-2 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs font-bold text-slate-800 dark:text-zinc-200 hover:border-pink-500/50 hover:text-[#f72585] dark:hover:text-[#ff5fa0] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#f72585]" />
              <span>Sign In</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 flex items-center justify-center text-slate-600 dark:text-zinc-300 hover:border-pink-500/50 hover:text-[#f72585] dark:hover:text-[#ff5fa0] transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center space-x-2">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="p-2 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-300 hover:text-red-500"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-3 py-1 rounded-full bg-[#f72585] text-white text-xs font-bold"
            >
              Sign In
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-300"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ══ TIER 2 — Contextual Sub-nav tabs ══ */}
      {!hiddenSubNav && (
        <div className="w-full bg-slate-50/80 dark:bg-zinc-950/80 border-t border-slate-200/60 dark:border-zinc-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              id="nav-tabs"
              className="flex space-x-1 h-11 items-center overflow-x-auto scrollbar-none py-1"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex-shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-[#f72585] dark:text-[#ff5fa0]'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200/50 dark:hover:bg-zinc-900/50'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSubNavTab"
                        className="absolute inset-0 rounded-full bg-pink-500/10 dark:bg-pink-500/15 border border-pink-500/30"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
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
            className="md:hidden bg-white/95 dark:bg-zinc-950/95 border-b border-slate-200 dark:border-zinc-800 overflow-hidden backdrop-blur-lg"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              {/* Exam Switcher in Mobile Drawer */}
              <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800">
                <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest px-2">Exam:</span>
                <div className="flex items-center space-x-1">
                  {['IELTS', 'TOEFL', 'PTE'].map((exam) => (
                    <button
                      key={exam}
                      onClick={() => { handleExamSwitch(exam); setIsOpen(false); }}
                      className={`px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all ${
                        activeExam === exam
                          ? 'bg-[#f72585] text-white shadow-md shadow-pink-500/30'
                          : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {exam}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-nav tab links in Mobile Drawer */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setIsOpen(false); }}
                    className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === tab.id
                        ? 'bg-pink-50 dark:bg-pink-950/40 text-[#f72585] dark:text-[#ff5fa0] border border-pink-200 dark:border-pink-900/50'
                        : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Additional Actions */}
              <div className="pt-3 flex flex-col space-y-2 border-t border-slate-100 dark:border-zinc-800">
                <div className="flex items-center justify-between px-2">
                  <Link to="/blog" onClick={() => setIsOpen(false)} className="text-xs font-bold text-slate-600 dark:text-zinc-300 hover:text-[#f72585]">Blog</Link>
                  <Link to="/community" onClick={() => setIsOpen(false)} className="text-xs font-bold text-slate-600 dark:text-zinc-300 hover:text-[#f72585]">Community</Link>
                </div>
                <button
                  onClick={() => { setActiveTab('plans'); setIsOpen(false); }}
                  className="w-full bg-gradient-to-r from-[#f72585] to-[#d91a70] text-white py-2.5 rounded-xl text-xs font-extrabold shadow-md shadow-pink-500/25"
                >
                  Plans 🏷️
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
