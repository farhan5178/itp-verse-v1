import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, AlertTriangle, ChevronLeft, ChevronRight, Bookmark, CheckCircle2, HelpCircle, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';
import IELTSAcademicSeries from '../components/practice/IELTSAcademicSeries';
import IELTSListeningPractice from '../components/practice/IELTSListeningPractice';
import IELTSReadingPractice from '../components/practice/IELTSReadingPractice';
import IELTSWritingPractice from '../components/practice/IELTSWritingPractice';
import IELTSSpeakingPractice from '../components/practice/IELTSSpeakingPractice';

// Sample mock test questions
const sampleQuestions = [
  {
    id: 1,
    question: "If a train travels 320 miles in 4 hours, what is its average speed in miles per hour?",
    options: ["70 mph", "75 mph", "80 mph", "85 mph"],
    correct: 2
  },
  {
    id: 2,
    question: "Identify the antonym of the word 'BENEVOLENT'.",
    options: ["Kind", "Malevolent", "Generous", "Friendly"],
    correct: 1
  },
  {
    id: 3,
    question: "Solve the equation: 3x - 7 = 14. What is the value of x?",
    options: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    id: 4,
    question: "Which of the following is the prime factorization of 36?",
    options: ["2^2 * 3^2", "2 * 3^3", "2^3 * 3", "4 * 9"],
    correct: 0
  },
  {
    id: 5,
    question: "Complete the analogy: Book is to Reading as Fork is to ________.",
    options: ["Cooking", "Cutting", "Eating", "Stirring"],
    correct: 2
  },
  {
    id: 6,
    question: "If 15% of a number is 45, what is the number?",
    options: ["150", "200", "300", "450"],
    correct: 2
  },
  {
    id: 7,
    question: "What is the next number in the sequence: 2, 6, 12, 20, 30, ...?",
    options: ["36", "40", "42", "45"],
    correct: 2
  },
  {
    id: 8,
    question: "Select the sentence with correct subject-verb agreement.",
    options: [
      "Neither the manager nor the employees was present.",
      "Neither the manager nor the employees were present.",
      "Neither the manager or the employees was present.",
      "Neither the manager nor the employees is present."
    ],
    correct: 1
  },
  {
    id: 9,
    question: "What is the primary function of chlorophyll during photosynthesis?",
    options: [
      "Absorb light energy",
      "Release carbon dioxide",
      "Produce nitrogen",
      "Store water in roots"
    ],
    correct: 0
  },
  {
    id: 10,
    question: "Which term describes a word that has the same or nearly the same meaning as another word?",
    options: ["Antonym", "Homonym", "Synonym", "Acronym"],
    correct: 2
  }
];

export default function MockTest() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('series'); // 'series' | 'testing' | 'listening' | 'reading' | 'writing' | 'speaking'
  const [activeTestDetails, setActiveTestDetails] = useState(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes total timer
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = viewMode === 'series'
      ? 'IELTS Academic Series Practice | Edwaay'
      : viewMode === 'listening'
      ? 'IELTS Listening Practice | Edwaay'
      : viewMode === 'reading'
      ? 'IELTS Academic Reading Arena | Edwaay'
      : viewMode === 'writing'
      ? 'IELTS Academic Writing Practice | Edwaay'
      : viewMode === 'speaking'
      ? 'IELTS Speaking Simulator | Edwaay'
      : 'Diagnostic Aptitude Simulation | Edwaay';
  }, [viewMode]);

  // Timer Countdown logic
  useEffect(() => {
    if (viewMode !== 'testing') return;

    if (timeLeft <= 0) {
      submitExam();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, viewMode]);

  const handleStartPracticeSection = (params) => {
    setActiveTestDetails(params);
    if (params.section.id === 'listening') {
      setViewMode('listening');
    } else if (params.section.id === 'reading') {
      setViewMode('reading');
    } else if (params.section.id === 'writing') {
      setViewMode('writing');
    } else if (params.section.id === 'speaking') {
      setViewMode('speaking');
    } else {
      setViewMode('testing');
    }
    setCurrentIdx(0);
    setAnswers({});
    setMarked({});
    setTimeLeft(600);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [sampleQuestions[currentIdx].id]: optionIndex
    }));
  };

  const toggleMarked = () => {
    const id = sampleQuestions[currentIdx].id;
    setMarked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const submitExam = () => {
    // Calculate final score percentage
    let correctCount = 0;
    sampleQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / sampleQuestions.length) * 100);

    navigate('/results', {
      state: {
        score: scorePct,
        correctCount,
        totalQuestions: sampleQuestions.length,
        answers,
        questions: sampleQuestions,
        testDetails: activeTestDetails
      }
    });
  };

  const currentQuestion = sampleQuestions[currentIdx];
  const isTimeCritical = timeLeft < 120; // less than 2 minutes

  if (viewMode === 'listening') {
    return (
      <IELTSListeningPractice
        testDetails={activeTestDetails}
        onBack={() => setViewMode('series')}
        onNextModule={(next) => setViewMode(next === 'reading' ? 'reading' : 'series')}
      />
    );
  }

  if (viewMode === 'reading') {
    return (
      <IELTSReadingPractice
        testDetails={activeTestDetails}
        onBack={() => setViewMode('series')}
        onNextModule={(next) => setViewMode(next || 'series')}
      />
    );
  }

  if (viewMode === 'writing') {
    return (
      <IELTSWritingPractice
        testDetails={activeTestDetails}
        onBack={() => setViewMode('series')}
        onNextModule={(next) => setViewMode(next || 'series')}
      />
    );
  }

  if (viewMode === 'speaking') {
    return (
      <IELTSSpeakingPractice
        testDetails={activeTestDetails}
        onBack={() => setViewMode('series')}
        onNextModule={(next) => setViewMode(next || 'series')}
      />
    );
  }

  if (viewMode === 'series') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-dark-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          
          {/* Practice Mode Switcher Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-dark-800 p-4 rounded-2xl border border-slate-200 dark:border-dark-700 shadow-sm mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-400 dark:text-dark-muted uppercase tracking-wider">Practice View Mode:</span>
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-dark-900 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('series')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    viewMode === 'series'
                      ? 'bg-[#0097B2] text-white shadow-sm'
                      : 'text-slate-600 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  📚 Cambridge IELTS 21-1 Series
                </button>
                <button
                  onClick={() => setViewMode('testing')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    viewMode === 'testing'
                      ? 'bg-[#0097B2] text-white shadow-sm'
                      : 'text-slate-600 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  ⚡ Full Diagnostic Mock Exam
                </button>
              </div>
            </div>

            <div className="text-xs font-medium text-slate-500 dark:text-dark-muted flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Selecting any section launches practice mode immediately</span>
            </div>
          </div>
        </div>

        {/* IELTS Academic Series Practice Component */}
        <IELTSAcademicSeries onStartPractice={handleStartPracticeSection} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061317] text-slate-900 dark:text-[#E6F5F7] transition-colors duration-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Test Control Bar */}
        <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('series')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-dark-750 transition-all cursor-pointer"
              title="Return to IELTS Series Catalog"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                {activeTestDetails
                  ? `${activeTestDetails.book.title} - ${activeTestDetails.test.name} (${activeTestDetails.section.name})`
                  : 'Diagnostic Aptitude Simulation'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                {activeTestDetails
                  ? `Official Cambridge Exam Practice Mode (${activeTestDetails.mode.toUpperCase()})`
                  : '10 Questions | 1 Minute per Question average'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Timer */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border ${
              isTimeCritical
                ? 'bg-rose-500/10 border-rose-500/40 text-rose-500 dark:text-rose-400 animate-pulse'
                : 'bg-slate-100 dark:bg-dark-800 border-slate-200 dark:border-dark-700 text-[#0097B2] dark:text-cyan-300'
            }`}>
              <Timer className="w-5 h-5" />
              <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0097B2] to-[#004B59] font-black text-sm text-white hover:opacity-90 transition-all shadow-md shadow-[#0097B2]/20 cursor-pointer"
            >
              Submit Test
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Question Pane */}
          <div className="lg:col-span-2 flex flex-col min-h-[500px]">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl flex-1 flex flex-col justify-between">
              {/* Question Header */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black text-[#0097B2] dark:text-cyan-400 uppercase tracking-wider">
                    Question {currentIdx + 1} of {sampleQuestions.length}
                  </span>
                  <button
                    onClick={toggleMarked}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      marked[currentQuestion.id]
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400'
                        : 'bg-slate-100 dark:bg-dark-800 border-slate-200 dark:border-dark-700 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${marked[currentQuestion.id] ? 'fill-current' : ''}`} />
                    <span>{marked[currentQuestion.id] ? 'Bookmarked' : 'Bookmark'}</span>
                  </button>
                </div>

                {/* Question Text */}
                <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-6 leading-relaxed">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((opt, oIdx) => {
                    const isSelected = answers[currentQuestion.id] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(oIdx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                          isSelected
                            ? 'bg-[#E6F5F7] dark:bg-[#0097B2]/20 border-[#0097B2] text-slate-900 dark:text-white font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-dark-900/40 border-slate-200/80 dark:border-dark-700/50 hover:bg-slate-100 dark:hover:bg-dark-850 hover:border-[#0097B2]/50 text-slate-700 dark:text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                            isSelected
                              ? 'bg-[#0097B2] text-white'
                              : 'bg-slate-200 dark:bg-dark-800 text-slate-700 dark:text-zinc-400 group-hover:bg-[#0097B2]/20'
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="text-xs sm:text-sm font-bold">{opt}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-[#0097B2]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-dark-700/60 mt-6">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(prev => prev - 1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-dark-700 text-xs sm:text-sm text-slate-800 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-dark-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-1.5">
                  {answers[currentQuestion.id] !== undefined ? (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Saved</span>
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium flex items-center space-x-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Not Answered</span>
                    </span>
                  )}
                </div>

                <button
                  disabled={currentIdx === sampleQuestions.length - 1}
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  className="px-4 py-2.5 rounded-xl bg-[#0097B2] hover:bg-[#00788E] text-xs sm:text-sm text-white font-bold disabled:opacity-30 transition-all flex items-center space-x-1 cursor-pointer shadow-md"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Navigation Grid sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-3xl">
              <h3 className="font-black text-slate-900 dark:text-white mb-4">Question Navigator</h3>

              {/* Question list indicator dots */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                {sampleQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIdx;
                  const isAnswered = answers[q.id] !== undefined;
                  const isMarked = marked[q.id];

                  let btnStyle = "bg-slate-100 dark:bg-dark-900 border-slate-200 dark:border-dark-750 text-slate-600 dark:text-zinc-400";
                  if (isAnswered) btnStyle = "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-bold";
                  if (isMarked) btnStyle = "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold";
                  if (isCurrent) btnStyle += " ring-2 ring-[#0097B2] ring-offset-2 ring-offset-slate-50 dark:ring-offset-dark-900";

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Progress indicators summary */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-dark-700/60 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Total Questions:</span>
                  <span className="text-slate-900 dark:text-white font-black">{sampleQuestions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Answered:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">{Object.keys(answers).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">Bookmarked:</span>
                  <span className="text-amber-600 dark:text-amber-400 font-black">{Object.values(marked).filter(Boolean).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showSubmitModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/70 dark:bg-black/80 backdrop-blur-md"
                onClick={() => setShowSubmitModal(false)}
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 p-6 rounded-3xl w-full max-w-md relative z-10 text-center shadow-2xl"
              >
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Submit Mock Test?</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mb-6 font-medium">
                  Are you sure you want to submit your mock test? You have answered {Object.keys(answers).length} out of {sampleQuestions.length} questions.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-dark-700 text-xs sm:text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-dark-700 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitExam}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0097B2] to-[#004B59] text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#0097B2]/20 transition-all cursor-pointer"
                  >
                    Confirm Submit
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
