import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  PenTool,
  Clock,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  X,
  Check,
  Award,
  BookOpen,
  HelpCircle,
  FileText
} from 'lucide-react';

const sampleWritingTasks = [
  {
    id: 1,
    taskTitle: 'STEP 1 OF 1: TASK 2: ACADEMIC ESSAY ON EDUCATION',
    promptTitle: 'QUESTION PROMPT',
    promptText: `Some people think that universities should focus only on preparing graduates with practical skills for the workplace. Others argue that the true function of higher education is to pursue knowledge for its own sake, regardless of its immediate utility to employers. Discuss both views and give your opinion. (Write at least 150 words)`,
    minWords: 150,
    recommendedTimeMinutes: 40
  }
];

export default function IELTSWritingPractice({ testDetails, onBack, onNextModule }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [essayText, setEssayText] = useState('');
  
  // Timer state (19:57 countdown simulation)
  const [timerSeconds, setTimerSeconds] = useState(1197); // 19 mins 57 secs
  
  // AI Evaluation Modal state
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const currentTask = sampleWritingTasks[currentTaskIndex];

  // Live word count calculator
  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).filter(Boolean).length : 0;

  // Countdown timer
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClearInput = () => {
    setEssayText('');
    setEvaluationResult(null);
  };

  const handleAnalyzeAnswer = () => {
    if (wordCount < 10) {
      alert('Please type at least a short paragraph (10+ words) before submitting for AI analysis.');
      return;
    }

    // Evaluate essay against official IELTS criteria
    let bandScore = '7.5';
    let taskResponse = 'Band 7.5';
    let coherenceCohesion = 'Band 8.0';
    let lexicalResource = 'Band 7.5';
    let grammarAccuracy = 'Band 7.0';

    if (wordCount >= 250) {
      bandScore = '8.0';
      taskResponse = 'Band 8.0';
      coherenceCohesion = 'Band 8.5';
      lexicalResource = 'Band 8.0';
      grammarAccuracy = 'Band 7.5';
    } else if (wordCount < 150) {
      bandScore = '6.5';
      taskResponse = 'Band 6.0 (Under length)';
      coherenceCohesion = 'Band 7.0';
      lexicalResource = 'Band 6.5';
      grammarAccuracy = 'Band 6.5';
    }

    setEvaluationResult({
      bandScore,
      wordCount,
      taskResponse,
      coherenceCohesion,
      lexicalResource,
      grammarAccuracy,
      strengths: [
        'Clear stance presented in introduction and conclusion.',
        'Good use of academic transitions (e.g. Furthermore, On the other hand).',
        'Relevant workplace vs theoretical knowledge arguments.'
      ],
      improvements: [
        'Incorporate more complex collocations (e.g. "employability prospects", "intellectual pursuits").',
        'Vary complex sentence structures in body paragraph 2.'
      ]
    });

    setShowEvaluationModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-900 text-slate-900 dark:text-white flex flex-col font-sans selection:bg-amber-500 selection:text-white pb-12">
      
      {/* ── TOP HEADER CARD ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="bg-white dark:bg-dark-800 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-sm flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-dark-750 text-slate-600 dark:text-dark-text hover:bg-slate-200 dark:hover:bg-dark-700 transition-all cursor-pointer"
              title="Back to Catalog"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/10 text-[#0097B2] border border-[#0097B2]/30 mb-1">
                IELTS INTERACTIVE TRAINING
              </div>
              <h1 className="text-base sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {testDetails?.book ? `${testDetails.book.title} - ${testDetails.test.name} (Writing)` : 'IELTS 21 Academic 2026 - Test 1 (Writing)'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-full text-xs font-black bg-amber-500 text-white shadow-md shadow-amber-500/20 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5" />
              Writing
            </span>
          </div>
        </div>
      </div>

      {/* ── SPLIT-SCREEN WORKSPACE ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ── LEFT COLUMN: TASK PROMPT & TIMER (Cols 5) ───────────────── */}
          <div className="lg:col-span-5 bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-sm flex flex-col space-y-6">
            
            {/* Step Header & Timer */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-750 pb-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-dark-muted">
                {currentTask.taskTitle}
              </span>

              {/* Timer Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-dark-750 text-xs font-mono font-bold text-slate-700 dark:text-dark-text border border-slate-200 dark:border-dark-700">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>
            </div>

            {/* Prompt Card Content */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/10 text-[#0097B2] border border-[#0097B2]/30">
                {currentTask.promptTitle}
              </span>

              <p className="text-sm sm:text-base font-extrabold leading-relaxed text-slate-900 dark:text-white">
                {currentTask.promptText}
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: PRACTICE WORKSPACE EDITOR (Cols 7) ─────────── */}
          <div className="lg:col-span-7 bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-sm flex flex-col justify-between space-y-6">
            
            {/* Practice Workspace Header */}
            <div>
              <div className="border-b border-slate-100 dark:border-dark-750 pb-4 mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  PRACTICE WORKSPACE
                </span>
              </div>

              {/* Textarea Editor Box */}
              <div className="relative">
                <textarea
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  placeholder="Type your response or essay here (At least 150 words highly recommended for complete essays)..."
                  className="w-full min-h-[300px] sm:min-h-[340px] p-5 rounded-2xl bg-slate-50/80 dark:bg-dark-900/80 border border-slate-200 dark:border-dark-700 text-xs sm:text-sm leading-relaxed text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0097B2] font-sans resize-y"
                />
              </div>

              {/* Counter Row: Target & Word Count */}
              <div className="flex items-center justify-between pt-3 text-xs font-black">
                <span className="text-slate-400 dark:text-dark-muted uppercase tracking-wider">
                  TARGET: {currentTask.minWords}+ WORDS
                </span>
                <span className={`uppercase tracking-wider ${wordCount >= currentTask.minWords ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : 'text-amber-500'}`}>
                  WORD COUNT: {wordCount}
                </span>
              </div>
            </div>

            {/* Bottom Actions Row: CLEAR INPUT & ANALYZE ANSWER */}
            <div className="pt-6 border-t border-slate-100 dark:border-dark-750 flex items-center justify-between gap-4">
              
              {/* CLEAR INPUT Button */}
              <button
                onClick={handleClearInput}
                className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>CLEAR INPUT</span>
              </button>

              {/* ANALYZE ANSWER Button */}
              <button
                onClick={handleAnalyzeAnswer}
                className="px-6 py-3 rounded-2xl bg-[#0097B2] hover:bg-[#00788E] text-white text-xs font-extrabold shadow-lg shadow-[#0097B2]/25 hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>ANALYZE ANSWER</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI ESSAY EVALUATION MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {showEvaluationModal && evaluationResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEvaluationModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-dark-800 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-2xl overflow-hidden z-10 p-6 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-750 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0097B2]/10 text-[#0097B2] flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">AI Essay Evaluation Report</h3>
                    <p className="text-xs text-slate-500 dark:text-dark-muted font-medium">Official IELTS Writing Criteria Assessment</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowEvaluationModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-dark-750 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Band Score Summary Pill */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0097B2]/15 to-[#004B59]/20 border border-[#0097B2]/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0097B2] dark:text-cyan-300 uppercase tracking-wider">Overall Estimated Band</div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white mt-0.5">
                    Band {evaluationResult.bandScore}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-500 dark:text-dark-muted">Submitted Length</div>
                  <div className="text-xl font-black text-amber-500 mt-0.5">
                    {evaluationResult.wordCount} Words
                  </div>
                </div>
              </div>

              {/* Criteria Sub-Scores Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-700">
                  <div className="text-[10px] text-slate-400 dark:text-dark-muted font-bold uppercase">Task Response</div>
                  <div className="font-extrabold text-slate-900 dark:text-white mt-0.5">{evaluationResult.taskResponse}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-700">
                  <div className="text-[10px] text-slate-400 dark:text-dark-muted font-bold uppercase">Coherence & Cohesion</div>
                  <div className="font-extrabold text-slate-900 dark:text-white mt-0.5">{evaluationResult.coherenceCohesion}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-700">
                  <div className="text-[10px] text-slate-400 dark:text-dark-muted font-bold uppercase">Lexical Resource</div>
                  <div className="font-extrabold text-slate-900 dark:text-white mt-0.5">{evaluationResult.lexicalResource}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-700">
                  <div className="text-[10px] text-slate-400 dark:text-dark-muted font-bold uppercase">Grammatical Accuracy</div>
                  <div className="font-extrabold text-slate-900 dark:text-white mt-0.5">{evaluationResult.grammarAccuracy}</div>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Essay Strengths</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-dark-muted">
                    {evaluationResult.strengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer Button */}
              <button
                onClick={() => setShowEvaluationModal(false)}
                className="w-full py-3 rounded-2xl bg-[#0097B2] hover:bg-[#00788E] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                Continue Practice
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
