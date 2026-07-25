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
    if (pct >= 85) return { text: "Outstanding performance!", color: "text-brand-emerald" };
    if (pct >= 70) return { text: "Great job! Keep practicing to secure an edge.", color: "text-brand-blue" };
    if (pct >= 50) return { text: "Passed, but there is substantial room to improve.", color: "text-brand-purple" };
    return { text: "Review the subject matter and retake the test.", color: "text-red-400" };
  };

  const feedback = getScoreFeedback(score);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Score overview header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-3xl text-center mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -z-10" />
        <h1 className="text-3xl font-bold text-white mb-2">Test Performance Report</h1>
        <p className="text-dark-muted mb-6">Diagnostic Aptitude Simulation</p>

        {/* Circular SVG Progress Ring */}
        <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="68"
              className="stroke-dark-700 fill-none"
              strokeWidth="10"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="68"
              className="stroke-brand-purple fill-none"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 68}
              initial={{ strokeDashoffset: 2 * Math.PI * 68 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 68 * (1 - score / 100) }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-extrabold text-white">{score}%</span>
            <span className="text-xs text-dark-muted uppercase font-bold tracking-wider mt-1">Score</span>
          </div>
        </div>

        <h2 className={`text-xl font-bold mb-6 ${feedback.color}`}>{feedback.text}</h2>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8 text-sm">
          <div className="p-3 bg-dark-900/50 rounded-xl border border-dark-700/60">
            <p className="text-dark-muted">Correct</p>
            <p className="text-lg font-bold text-brand-emerald mt-1">{correctCount}</p>
          </div>
          <div className="p-3 bg-dark-900/50 rounded-xl border border-dark-700/60">
            <p className="text-dark-muted">Incorrect</p>
            <p className="text-lg font-bold text-red-400 mt-1">{totalQuestions - correctCount}</p>
          </div>
          <div className="p-3 bg-dark-900/50 rounded-xl border border-dark-700/60">
            <p className="text-dark-muted">Total Questions</p>
            <p className="text-lg font-bold text-brand-blue mt-1">{totalQuestions}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-xl border border-dark-700 text-sm font-semibold text-white hover:bg-dark-800 transition-all flex items-center justify-center space-x-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </button>
          <button
            onClick={handleRetake}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-sm font-semibold text-white shadow-md shadow-brand-purple/10 hover:shadow-brand-purple/20 transition-all flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Simulation</span>
          </button>
        </div>
      </motion.div>

      {/* Answer Key / Review Panel */}
      {questions.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl">
          <h2 className="text-xl font-bold text-white mb-6">Detailed Answer Key Analysis</h2>
          <div className="space-y-6">
            {questions.map((q, qIdx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correct;
              const hasAnswered = userAns !== undefined;

              return (
                <div key={q.id} className="p-4 rounded-2xl bg-dark-900/40 border border-dark-700/50 space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold text-dark-muted">Question {qIdx + 1}</span>
                    {hasAnswered ? (
                      isCorrect ? (
                        <span className="text-xs text-brand-emerald font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="text-xs text-red-400 font-bold flex items-center space-x-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect</span>
                        </span>
                      )
                    ) : (
                      <span className="text-xs text-dark-muted font-bold flex items-center space-x-1">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Unanswered</span>
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-medium text-white">{q.question}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                    <div>
                      <span className="text-dark-muted">Your Answer: </span>
                      <span className={hasAnswered ? (isCorrect ? 'text-brand-emerald font-bold' : 'text-red-400 font-bold') : 'text-dark-muted font-semibold'}>
                        {hasAnswered ? q.options[userAns] : 'Not Answered'}
                      </span>
                    </div>
                    <div>
                      <span className="text-dark-muted">Correct Answer: </span>
                      <span className="text-brand-emerald font-bold">{q.options[q.correct]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
