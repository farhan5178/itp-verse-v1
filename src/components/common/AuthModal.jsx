import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const deriveDisplayName = (nameInput, emailInput) => {
    if (nameInput && nameInput.trim()) {
      const trimmed = nameInput.trim();
      return trimmed.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    }
    if (emailInput && emailInput.trim()) {
      const prefix = emailInput.trim().split('@')[0];
      if (prefix) {
        return prefix
          .split(/[\._\-]/)
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');
      }
    }
    return 'Farhan';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = deriveDisplayName(name, email);
    login({
      name: displayName,
      email: email.trim() || 'farhan@gmail.com',
      targetExam: 'IELTS',
      targetScore: '8.0',
    });
  };

  const handleFarhanLogin = () => {
    login({
      name: 'Farhan',
      email: 'farhan@gmail.com',
      targetExam: 'IELTS',
      targetScore: '8.5',
    });
  };

  const handleDemoLogin = () => {
    login({
      name: 'Sarah Connor',
      email: 'sarah.c@edwaay.com',
      targetExam: 'IELTS',
      targetScore: '8.5',
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-md bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header Graphic Gradient */}
          <div className="relative p-6 bg-gradient-to-br from-[#0097B2] via-[#00788E] to-[#004B59] text-white">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-3 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Edwaay Student Portal</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <p className="text-xs text-white/80 mt-1">
              {mode === 'login'
                ? 'Sign in to access your personalized AI avatar tutor & test metrics.'
                : 'Start your journey to top band IELTS, TOEFL & PTE scores.'}
            </p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">

            {/* Mode Switcher Pills */}
            <div className="flex bg-slate-100 dark:bg-zinc-900 p-1 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'login'
                    ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Quick Demo Login Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleFarhanLogin}
                className="py-2.5 px-3 rounded-xl bg-[#E6F5F7] dark:bg-[#0097B2]/20 border border-[#0097B2]/30 text-[#0097B2] dark:text-[#1AB0CB] text-xs font-extrabold flex items-center justify-center gap-1.5 hover:bg-[#0097B2]/15 transition-all cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>farhan@gmail.com</span>
              </button>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="py-2.5 px-3 rounded-xl bg-[#E6F5F7] dark:bg-[#004B59]/30 border border-[#004B59]/40 text-[#004B59] dark:text-[#1AB0CB] text-xs font-extrabold flex items-center justify-center gap-1.5 hover:bg-[#004B59]/20 transition-all cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sarah (Demo)</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-slate-200 dark:border-zinc-800 w-full" />
              <span className="bg-white dark:bg-zinc-950 px-3 text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500">
                or sign in with email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Johnson"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#0097B2]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farhan@gmail.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#0097B2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#0097B2]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0097B2] to-[#004B59] text-white text-xs font-black shadow-lg shadow-[#0097B2]/25 hover:shadow-[#0097B2]/35 transition-all cursor-pointer"
              >
                {mode === 'login' ? 'Sign In to Portal' : 'Create Account & Start'}
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-slate-500 dark:text-zinc-400">
              <span>Need help? Contact support or try the demo test mode.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
