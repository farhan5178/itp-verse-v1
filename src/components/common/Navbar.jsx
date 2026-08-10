import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogIn, LogOut, BookOpen, FileText, Target, HelpCircle, GraduationCap, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import EdwaayLogo from './EdwaayLogo';

const ieltsDropdownItems = [
  { id: 'lessons', label: 'Lessons', icon: BookOpen, href: '/dashboard' },
  { id: 'mock-tests', label: 'Mock Tests', icon: FileText, href: '/mock-test' },
  { id: 'practice', label: 'Practice Questions', icon: Target, href: '/mock-test' },
  { id: 'vocab', label: 'Vocab Chart 🔠', icon: HelpCircle, href: '/dashboard' },
  { id: 'finder', label: 'Uni & Scholarship Finder 🌍', icon: GraduationCap, href: '/dashboard' },
  { id: 'records', label: 'Test Records', icon: BarChart2, href: '/results' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isIeltsOpen, setIsIeltsOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, user, logout, openAuthModal } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsIeltsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300 font-sans backdrop-blur-xl bg-white/85 dark:bg-zinc-950/85 border-b border-slate-200/80 dark:border-zinc-800/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* ── LEFT: Logo ────────────────────────────────────────────── */}
        <Link
          to="/"
          id="nav-logo"
          className="flex items-center cursor-pointer group flex-shrink-0 transition-transform active:scale-95"
        >
          <EdwaayLogo size="md" />
        </Link>

        {/* ── MIDDLE: Home | IELTS Dropdown | Community ───────────────── */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/60 dark:bg-zinc-900/60 p-1.5 rounded-full border border-slate-200/60 dark:border-zinc-800/60">
          
          {/* 1. Home */}
          <Link
            to="/"
            className={`px-4 py-1.5 text-xs sm:text-sm font-extrabold rounded-full transition-all duration-200 ${
              location.pathname === '/'
                ? 'bg-white dark:bg-zinc-800 text-[#0097B2] dark:text-[#1AB0CB] shadow-xs'
                : 'text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50'
            }`}
          >
            Home
          </Link>

          {/* 2. IELTS Dropdown (Animated Trigger for High Click Through) */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setIsIeltsOpen(true)}
            onMouseLeave={() => setIsIeltsOpen(false)}
          >
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsIeltsOpen(!isIeltsOpen)}
              className={`relative flex items-center gap-2.5 px-4 py-1.5 text-xs sm:text-sm font-extrabold rounded-full backdrop-blur-xl transition-all duration-300 cursor-pointer group/ielts ${
                isIeltsOpen || location.pathname.includes('/mock') || location.pathname.includes('/lessons')
                  ? 'bg-[#0097B2] text-white shadow-lg shadow-[#0097B2]/30 border border-[#0097B2]'
                  : 'bg-white/80 dark:bg-zinc-900/80 text-slate-800 dark:text-zinc-100 border border-slate-200/90 dark:border-zinc-700/80 shadow-sm hover:shadow-md hover:shadow-[#0097B2]/15 hover:border-[#0097B2]/50 hover:bg-white dark:hover:bg-zinc-800'
              }`}
            >
              {/* Soft Pulsing Ambient Backdrop Ring */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0097B2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0097B2]"></span>
              </span>

              {/* IELTS Primary Text Label */}
              <span className="relative z-10 font-black tracking-wide text-slate-900 dark:text-white group-hover/ielts:text-[#0097B2] dark:group-hover/ielts:text-[#1AB0CB] transition-colors">
                IELTS
              </span>

              {/* Minimal Text Pill Tag */}
              <span className="relative z-10 px-1.5 py-0.5 text-[9px] font-black tracking-widest uppercase rounded-full bg-[#0097B2]/10 dark:bg-[#0097B2]/20 text-[#0097B2] dark:text-[#1AB0CB] group-hover/ielts:bg-[#0097B2] group-hover/ielts:text-white transition-all">
                PREP
              </span>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isIeltsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, type: 'spring', stiffness: 350, damping: 25 }}
                  className="absolute top-full left-0 mt-2 w-64 p-2 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-slate-200/90 dark:border-zinc-800 rounded-2xl shadow-xl z-50 space-y-1"
                >
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 border-b border-slate-100 dark:border-zinc-900 mb-1">
                    IELTS Modules
                  </div>
                  {ieltsDropdownItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        to={item.href}
                        onClick={() => setIsIeltsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-200 hover:bg-[#E6F5F7] dark:hover:bg-[#0097B2]/20 hover:text-[#0097B2] dark:hover:text-[#1AB0CB] transition-all group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-zinc-900 group-hover:bg-[#0097B2] group-hover:text-white text-slate-500 dark:text-zinc-400 flex items-center justify-center transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Community */}
          <Link
            to="/dashboard"
            className={`px-4 py-1.5 text-xs sm:text-sm font-extrabold rounded-full transition-all duration-200 ${
              location.pathname === '/dashboard'
                ? 'bg-white dark:bg-zinc-800 text-[#0097B2] dark:text-[#1AB0CB] shadow-xs'
                : 'text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50'
            }`}
          >
            Community
          </Link>
        </nav>

        {/* ── RIGHT: Plans | Sign In | Theme Toggle ─────────────────── */}
        <div className="hidden md:flex items-center space-x-3">
          
          {/* Plans Button */}
          <Link
            to="/dashboard"
            id="purchase-btn"
            className="relative group overflow-hidden px-5 py-2 rounded-full text-xs font-black text-white transition-all duration-200 active:scale-95 cursor-pointer shadow-md shadow-[#0097B2]/25 hover:shadow-lg hover:shadow-[#0097B2]/35 border-t border-white/20"
            style={{ background: 'linear-gradient(135deg, #0097B2 0%, #004B59 100%)' }}
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Plans</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">🏷️</span>
            </span>
          </Link>

          {/* Sign In / Profile */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-extrabold text-slate-800 dark:text-zinc-200 shadow-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{user?.name?.split(' ')[0] || 'Student'}</span>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 flex items-center justify-center text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-all cursor-pointer shadow-xs"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              id="profile-btn"
              onClick={openAuthModal}
              className="px-4 py-2 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs font-bold text-slate-800 dark:text-zinc-200 hover:border-[#0097B2]/50 hover:text-[#0097B2] dark:hover:text-[#1AB0CB] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5 text-[#0097B2]" />
              <span>Sign In</span>
            </button>
          )}

          {/* Night / Day Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 flex items-center justify-center text-slate-600 dark:text-zinc-300 hover:border-[#0097B2]/50 hover:text-[#0097B2] dark:hover:text-[#1AB0CB] transition-all cursor-pointer shadow-xs"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
        </div>

        {/* ── Mobile Controls ────────────────────────────────────────── */}
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
              className="px-3.5 py-1.5 rounded-full bg-[#0097B2] text-white text-xs font-bold shadow-xs"
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

      {/* ── Mobile Menu Drawer ──────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-zinc-950/95 border-b border-slate-200 dark:border-zinc-800 overflow-hidden backdrop-blur-xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-900"
              >
                Home
              </Link>

              {/* Mobile IELTS Section */}
              <div className="space-y-1 pl-2 border-l-2 border-[#0097B2]/30">
                <span className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 px-2">IELTS Modules</span>
                {ieltsDropdownItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-[#E6F5F7] dark:hover:bg-[#0097B2]/20 hover:text-[#0097B2]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/community"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-900"
              >
                Community
              </Link>

              <div className="pt-2 border-t border-slate-100 dark:border-zinc-900">
                <Link
                  to="/plans"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-gradient-to-r from-[#0097B2] to-[#004B59] text-white py-2.5 rounded-xl text-xs font-extrabold shadow-md shadow-[#0097B2]/25"
                >
                  Plans 🏷️
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
