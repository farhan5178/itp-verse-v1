import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, LayoutDashboard, RotateCcw, AlertCircle, HelpCircle } from 'lucide-react';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve test submission summary from Router State
  const { score = 0, correctCount = 0, totalQuestions = 0, answers = {}, questions = [] } = location.state || {};

  const handleRetake = () => {
    navigate('/mock-test');
  };

  const getScoreFeedback = (pct) => {
    if (pct >= 85) return { text: "Outstanding performance!", color: "text-emerald-600 dark:text-emerald-400" };
    if (pct >= 70) return { text: "Great job! Keep practicing to secure an edge.", color: "text-[#0097B2] dark:text-cyan-300" };
    if (pct >= 50) return { text: "Passed, but there is substantial room to improve.", color: "text-amber-600 dark:text-amber-400" };
    return { text: "Review the subject matter and retake the test.", color: "text-rose-500 dark:text-rose-400" };
  };

  const feedback = getScoreFeedback(score);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061317] text-slate-900 dark:text-[#E6F5F7] transition-colors duration-300 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Score overview header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-3xl text-center mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0097B2]/10 rounded-full blur-3xl -z-10" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
            Test Performance Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium mb-6">
            Diagnostic Aptitude Simulation
          </p>

          {/* Circular SVG Progress Ring */}
          <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="68"
                className="stroke-slate-200 dark:stroke-dark-700 fill-none"
                strokeWidth="10"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="68"
                className="stroke-[#0097B2] fill-none"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 68}
                initial={{ strokeDashoffset: 2 * Math.PI * 68 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 68 * (1 - score / 100) }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-slate-900 dark:text-white">{score}%</span>
              <span className="text-[10px] text-slate-400 dark:text-zinc-400 uppercase font-black tracking-wider mt-0.5">Score</span>
            </div>
          </div>

          <h2 className={`text-lg sm:text-xl font-black mb-6 ${feedback.color}`}>{feedback.text}</h2>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 dark:bg-dark-900/50 rounded-2xl border border-slate-200 dark:border-dark-700/60">
              <p className="text-slate-500 dark:text-zinc-400 font-medium">Correct</p>
              <p className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1">{correctCount}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-dark-900/50 rounded-2xl border border-slate-200 dark:border-dark-700/60">
              <p className="text-slate-500 dark:text-zinc-400 font-medium">Incorrect</p>
              <p className="text-base sm:text-lg font-black text-rose-500 dark:text-rose-400 mt-1">{totalQuestions - correctCount}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-dark-900/50 rounded-2xl border border-slate-200 dark:border-dark-700/60">
              <p className="text-slate-500 dark:text-zinc-400 font-medium">Total Questions</p>
              <p className="text-base sm:text-lg font-black text-[#0097B2] dark:text-cyan-300 mt-1">{totalQuestions}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-dark-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-dark-800 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </button>
            <button
              onClick={handleRetake}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0097B2] to-[#004B59] text-xs sm:text-sm font-bold text-white shadow-md shadow-[#0097B2]/20 hover:opacity-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Simulation</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
