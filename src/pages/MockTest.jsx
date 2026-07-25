import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, AlertTriangle, ChevronLeft, ChevronRight, Bookmark, CheckCircle2, HelpCircle } from 'lucide-react';

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
    question: "Which word best completes the sentence: 'The CEO's speech was remarkably ________, keeping the audience engaged from start to finish.'",
    options: ["Tedious", "Eloquent", "Vague", "Prosaic"],
    correct: 1
  },
  {
    id: 9,
    question: "If a rectangle has a length of 12 cm and a width of 5 cm, what is its perimeter?",
    options: ["17 cm", "34 cm", "60 cm", "72 cm"],
    correct: 1
  },
  {
    id: 10,
    question: "What is the probability of rolling a sum of 7 with two standard six-sided dice?",
    options: ["1/6", "1/12", "1/36", "5/36"],
    correct: 0
  }
];

export default function MockTest() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionIndex }
  const [marked, setMarked] = useState({}); // { questionId: boolean }
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      submitExam();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx) => {
    setAnswers(prev => ({
      ...prev,
      [sampleQuestions[currentIdx].id]: optIdx
    }));
  };

  const toggleMarked = () => {
    const qId = sampleQuestions[currentIdx].id;
    setMarked(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const submitExam = () => {
    // Calculate final scores
    let correctCount = 0;
    sampleQuestions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / sampleQuestions.length) * 100);
    navigate('/results', {
      state: {
        score,
        correctCount,
        totalQuestions: sampleQuestions.length,
        answers,
        questions: sampleQuestions
      }
    });
  };

  const currentQuestion = sampleQuestions[currentIdx];
  const isTimeCritical = timeLeft < 120; // less than 2 minutes

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Test Control Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Diagnostic Aptitude Simulation</h1>
          <p className="text-xs text-dark-muted">10 Questions | 1 Minute per Question average</p>
        </div>

        <div className="flex items-center space-x-6">
          {/* Timer */}
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border ${
            isTimeCritical ? 'bg-red-500/10 border-red-500/40 text-red-400 animate-pulse' : 'bg-dark-800 border-dark-700 text-brand-purple'
          }`}>
            <Timer className="w-5 h-5" />
            <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue font-bold text-sm text-white hover:opacity-90 transition-all shadow-md shadow-brand-purple/10"
          >
            Submit Test
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Question Pane */}
        <div className="lg:col-span-2 flex flex-col min-h-[500px]">
          <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col justify-between">
            {/* Question Header */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-dark-muted uppercase">Question {currentIdx + 1} of {sampleQuestions.length}</span>
                <button
                  onClick={toggleMarked}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    marked[currentQuestion.id]
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                      : 'bg-dark-800 border-dark-700/60 text-dark-muted hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${marked[currentQuestion.id] ? 'fill-current' : ''}`} />
                  <span>{marked[currentQuestion.id] ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>

              {/* Question Text */}
              <h2 className="text-lg md:text-xl font-medium text-white mb-6 leading-relaxed">
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
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'bg-brand-purple/10 border-brand-purple text-white'
                          : 'bg-dark-900/40 border-dark-700/50 hover:bg-dark-850 hover:border-dark-600 text-dark-muted hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                          isSelected ? 'bg-brand-purple text-white' : 'bg-dark-800 text-dark-muted group-hover:bg-dark-700'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="text-sm font-medium">{opt}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-purple" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-dark-700/40 mt-6">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="px-4 py-2.5 rounded-xl border border-dark-700 text-sm text-white font-medium hover:bg-dark-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-1.5">
                {answers[currentQuestion.id] !== undefined ? (
                  <span className="text-xs text-brand-emerald font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Saved</span>
                  </span>
                ) : (
                  <span className="text-xs text-dark-muted font-medium flex items-center space-x-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Not Answered</span>
                  </span>
                )}
              </div>

              <button
                disabled={currentIdx === sampleQuestions.length - 1}
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-sm text-white font-medium border border-dark-700 disabled:opacity-30 transition-all flex items-center space-x-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Navigation Grid sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="font-bold text-white mb-4">Question Navigator</h3>

            {/* Question list indicator dots */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {sampleQuestions.map((q, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = answers[q.id] !== undefined;
                const isMarked = marked[q.id];

                let btnStyle = "bg-dark-900 border-dark-750 text-dark-muted";
                if (isAnswered) btnStyle = "bg-brand-emerald/10 border-brand-emerald/40 text-brand-emerald";
                if (isMarked) btnStyle = "bg-amber-500/10 border-amber-500/40 text-amber-400";
                if (isCurrent) btnStyle += " ring-2 ring-brand-purple ring-offset-2 ring-offset-dark-900";

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-11 rounded-lg border text-sm font-semibold flex items-center justify-center transition-all ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Progress indicators summary */}
            <div className="space-y-3 pt-4 border-t border-dark-700/40 text-xs">
              <div className="flex justify-between">
                <span className="text-dark-muted">Total Questions:</span>
                <span className="text-white font-bold">{sampleQuestions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-muted">Answered:</span>
                <span className="text-brand-emerald font-bold">{Object.keys(answers).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-muted">Bookmarked:</span>
                <span className="text-amber-400 font-bold">{Object.values(marked).filter(Boolean).length}</span>
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
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setShowSubmitModal(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel p-6 rounded-3xl w-full max-w-md relative z-10 text-center"
            >
              <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Submit Mock Test?</h3>
              <p className="text-sm text-dark-muted mb-6">
                Are you sure you want to submit your mock test? You have answered {Object.keys(answers).length} out of {sampleQuestions.length} questions.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-3 rounded-xl border border-dark-700 text-sm font-semibold text-white hover:bg-dark-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={submitExam}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-sm font-semibold text-white shadow-lg shadow-brand-purple/10 transition-all"
                >
                  Confirm Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
