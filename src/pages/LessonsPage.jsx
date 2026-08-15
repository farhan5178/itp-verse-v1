import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Sparkles, Home, ChevronRight } from 'lucide-react';
import StructuredInteractiveLessons from '../components/home/StructuredInteractiveLessons';

export default function LessonsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Interactive Lessons & Curriculum | Edwaay';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-900 text-slate-900 dark:text-dark-text transition-colors duration-300">
      {/* ── Page Hero Header ────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#061317] via-[#091b20] to-[#0d242b] text-white py-12 sm:py-16 border-b border-[#1a3944] overflow-hidden">
        {/* Background Glowing Orb */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0097B2]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Breadcrumbs & Back Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
              <Link to="/" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                Dashboard
              </Link>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span className="text-cyan-300 font-bold">Lessons Pathway</span>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          {/* Hero Banner Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0097B2]/20 border border-[#0097B2]/30 text-cyan-300 text-xs font-black uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Core Interactive Curriculum</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              TOEFL & IELTS{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
                Gamified Lessons Pathway
              </span>
            </h1>

            <p className="text-xs sm:text-base text-zinc-300 leading-relaxed font-medium">
              Master essential grammar rules, vocabulary collocations, reading precision, and listening scenarios through step-by-step interactive units.
            </p>
          </div>

        </div>
      </section>

      {/* ── Main Interactive Lessons Component ─────────────────────── */}
      <main className="py-6">
        <StructuredInteractiveLessons />
      </main>
    </div>
  );
}
