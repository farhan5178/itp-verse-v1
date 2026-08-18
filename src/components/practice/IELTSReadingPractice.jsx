import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Highlighter,
  Clock,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  X,
  Type,
  Check
} from 'lucide-react';

const sampleReadingQuestions = [
  {
    id: 1,
    passageTitle: 'Passage 1: The Resilience of Coral Reefs',
    passageText: `Coral reefs are among the most biologically diverse ecosystems on Earth, occupying less than 0.1% of the ocean floor yet sheltering over 25% of all marine species. However, they are highly sensitive to temperature fluctuations. Marine heatwaves prompt coral bleaching—a stressful process where corals expel the symbiotic algae (zooxanthellae) living in their tissues, turning completely white. Without these algae, corals lose their primary energy source and become vulnerable to mortality. Yet, researchers have observed pockets of extreme tolerance. Some reef species in the Red Sea have displayed resistance to heating, functioning normally in temperatures 2 degrees Celsius above previous thresholds. This has generated hope that selective breeding or targeted protection of these resilient strains could aid reef restoration initiatives worldwide.`,
    prompt: 'Read the passage and select the statement that best aligns with the text.',
    options: [
      { id: 'A', text: 'Bleaching is a healthy process where corals voluntarily shed unwanted algae.' },
      { id: 'B', text: 'All corals across the globe share identical temperature resilience thresholds.' },
      { id: 'C', text: 'Under 0.1% of the ocean floor supports reefs, which host a quarter of all marine organisms.' },
      { id: 'D', text: 'Red Sea corals have shown zero resistance to water temperature increases.' }
    ],
    correctOption: 'C',
    evidence: 'Passage quote: "occupying less than 0.1% of the ocean floor yet sheltering over 25% of all marine species."',
    explanation: 'Option C directly states the statistical fact from the text (less than 0.1% of ocean floor sheltering over 25% / a quarter of marine species).'
  }
];

export default function IELTSReadingPractice({ testDetails, onBack, onNextModule }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Toolbar customization states
  const [useSerifFont, setUseSerifFont] = useState(false);
  const [fontSize, setFontSize] = useState('base'); // 'sm' | 'base' | 'lg'
  const [isHighlightMode, setIsHighlightMode] = useState(false);
  
  // Reading Timer state (02:31 format)
  const [timerSeconds, setTimerSeconds] = useState(151); // 2 mins 31 secs
  
  // Explanation Modal state
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const currentQ = sampleReadingQuestions[currentQIndex];

  // Timer countdown simulation
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
    setSelectedOption(null);
    setAnalysisResult(null);
  };

  const handleAnalyzeAnswer = () => {
    if (!selectedOption) {
      alert('Please select an option (A, B, C, or D) before analyzing.');
      return;
    }
    const isCorrect = selectedOption === currentQ.correctOption;
    setAnalysisResult({
      isCorrect,
      selected: selectedOption,
      correct: currentQ.correctOption,
      evidence: currentQ.evidence,
      explanation: currentQ.explanation
    });
    setShowAnalysisModal(true);
  };

  // Font size class mapping
  const getFontSizeClass = () => {
    if (fontSize === 'sm') return 'text-xs sm:text-sm leading-relaxed';
    if (fontSize === 'lg') return 'text-base sm:text-lg leading-loose';
    return 'text-sm sm:text-base leading-relaxed';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-900 text-slate-900 dark:text-white flex flex-col font-sans selection:bg-[#0097B2] selection:text-white pb-12">
      
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
                {testDetails?.book ? `${testDetails.book.title} - ${testDetails.test.name} (Reading)` : 'IELTS 21 Academic 2026 - Test 1 (Reading)'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-full text-xs font-black bg-[#0097B2] text-white shadow-md shadow-[#0097B2]/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Reading
            </span>
          </div>
        </div>
      </div>

      {/* ── SUB-HEADER / READING ARENA TOOLBAR ───────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4">
        <div className="bg-white dark:bg-dark-800 px-4 sm:px-6 py-3 rounded-2xl border border-slate-200 dark:border-dark-700 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-dark-text uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#0097B2]" />
            <span>IELTS ACADEMIC READING ARENA</span>
          </div>

          {/* Controls: Serif toggle | Font Size | Highlight */}
          <div className="flex items-center gap-3 flex-wrap">
            
            {/* Serif Font Button */}
            <button
              onClick={() => setUseSerifFont(!useSerifFont)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                useSerifFont
                  ? 'bg-[#0097B2] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-dark-750 text-slate-600 dark:text-dark-muted hover:bg-slate-200'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>SERIF FONT</span>
            </button>

            {/* Font Size Pills */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-dark-750 p-1 rounded-xl text-[11px] font-black">
              <span className="text-slate-400 dark:text-dark-muted px-1">SIZE:</span>
              {['sm', 'base', 'lg'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`px-2 py-0.5 rounded-lg uppercase cursor-pointer transition-all ${
                    fontSize === sz
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                      : 'text-slate-600 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Highlight Tool */}
            <button
              onClick={() => setIsHighlightMode(!isHighlightMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                isHighlightMode
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-dark-750 text-slate-600 dark:text-dark-muted hover:bg-slate-200'
              }`}
            >
              <Highlighter className="w-3.5 h-3.5" />
              <span>HIGHLIGHT SELECTION</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── SPLIT-SCREEN WORKSPACE ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ── LEFT COLUMN: OFFICIAL REFERENCE TEXT (Cols 6) ───────────── */}
          <div className="lg:col-span-6 bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-sm flex flex-col space-y-6">
            
            {/* Header & Reading Clock */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-750 pb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-dark-muted">
                OFFICIAL REFERENCE TEXT
              </span>

              {/* Timer Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-dark-750 text-xs font-mono font-bold text-slate-700 dark:text-dark-text border border-slate-200 dark:border-dark-700">
                <Clock className="w-3.5 h-3.5 text-[#0097B2]" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>
            </div>

            {/* Passage Content Box */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {currentQ.passageTitle}
              </h2>

              <div
                className={`text-slate-700 dark:text-slate-300 ${getFontSizeClass()} ${
                  useSerifFont ? 'font-serif' : 'font-sans'
                }`}
              >
                {currentQ.passageText}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: PRACTICE WORKSPACE (Cols 6) ─────────────── */}
          <div className="lg:col-span-6 bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-sm flex flex-col justify-between space-y-6">
            
            {/* Practice Workspace Header */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-750 pb-4 mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  PRACTICE WORKSPACE
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/30">
                  QUESTION PROMPT
                </span>
              </div>

              {/* Question Instructions Prompt */}
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mb-6 leading-snug">
                {currentQ.prompt}
              </h3>

              {/* Options Cards (A, B, C, D) */}
              <div className="space-y-3.5">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedOption(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer group ${
                        isSelected
                          ? 'bg-[#0097B2]/10 border-[#0097B2] text-slate-900 dark:text-white ring-2 ring-[#0097B2] shadow-sm'
                          : 'bg-slate-50/80 dark:bg-dark-900/60 border-slate-200 dark:border-dark-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-dark-600'
                      }`}
                    >
                      {/* Circle Letter Badge */}
                      <span
                        className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0 border transition-all ${
                          isSelected
                            ? 'bg-[#0097B2] border-[#0097B2] text-white'
                            : 'bg-white dark:bg-dark-800 border-slate-300 dark:border-dark-700 text-slate-500 dark:text-dark-muted group-hover:border-[#0097B2]'
                        }`}
                      >
                        {opt.id}
                      </span>

                      <span className="text-xs sm:text-sm font-semibold leading-relaxed pt-0.5">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
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

      {/* ── AI ANSWER ANALYSIS MODAL ───────────────────────────────────── */}
      <AnimatePresence>
        {showAnalysisModal && analysisResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAnalysisModal(false)}
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
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      analysisResult.isCorrect
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-rose-500/10 text-rose-500'
                    }`}
                  >
                    {analysisResult.isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {analysisResult.isCorrect ? 'Correct Answer!' : 'Incorrect Option'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-dark-muted font-medium">
                      Official IELTS Reading Analysis
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAnalysisModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-dark-750 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Selection Summary Pill */}
              <div
                className={`p-4 rounded-2xl border ${
                  analysisResult.isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50'
                    : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-1">
                  Selected: Option ({analysisResult.selected})
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                  Correct Answer: <strong className="font-extrabold text-[#0097B2]">Option ({analysisResult.correct})</strong>
                </div>
              </div>

              {/* Passage Evidence Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-700 space-y-2">
                <div className="text-xs font-black text-[#0097B2] dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Passage Text Evidence</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-mono italic">
                  {analysisResult.evidence}
                </p>
                <p className="text-xs text-slate-600 dark:text-dark-muted pt-1 border-t border-slate-200 dark:border-dark-750">
                  {analysisResult.explanation}
                </p>
              </div>

              {/* Modal Footer Button */}
              <button
                onClick={() => setShowAnalysisModal(false)}
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
