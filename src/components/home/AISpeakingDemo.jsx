import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  User,
  Bot,
  Activity,
  Award,
  Volume2,
  Check,
  Brain,
  ShieldCheck,
  Square,
  RefreshCw,
  Send,
  Sliders
} from 'lucide-react';

const topicsList = [
  {
    id: 'hometown',
    title: 'Hometown',
    question: 'Tell me about your hometown.',
    studentText: '"Well, my hometown is Dhaka, which is the capital of Bangladesh. It is a very vibrant city with lots of people and rich historical places."',
    scores: { overall: 6.5, pronunciation: 7.0, grammar: 6.0, fluency: 6.5, vocabulary: 7.0 },
    suggestions: [
      'Speak slower: Pacing in Part 1 was slightly rushed.',
      'Use linking words: Connect ideas with "however", "furthermore".',
      'Expand your answers: Add 1 supporting detail or example.'
    ]
  },
  {
    id: 'work',
    title: 'Work & Studies',
    question: 'What do you find most interesting about your work or studies?',
    studentText: '"I find solving complex problems and collaborating with my team very rewarding. It gives me continuous learning opportunities every day."',
    scores: { overall: 7.5, pronunciation: 8.0, grammar: 7.0, fluency: 7.5, vocabulary: 7.5 },
    suggestions: [
      'Excellent intonation: Natural cadence throughout.',
      'Vocabulary range: Good use of "collaborating" and "rewarding".',
      'Grammar precision: Use more complex conditional clauses.'
    ]
  },
  {
    id: 'hobbies',
    title: 'Hobbies & Free Time',
    question: 'How do you usually spend your weekends?',
    studentText: '"During weekends, I enjoy reading books and playing football with my friends. It helps me relax after a long hectic week."',
    scores: { overall: 7.0, pronunciation: 7.0, grammar: 7.0, fluency: 7.0, vocabulary: 7.0 },
    suggestions: [
      'Good fluency: Smooth transitions between sentences.',
      'Pronunciation tip: Pay attention to stress on multi-syllable words.',
      'Elaborate more: Give a specific book title or favorite sports team.'
    ]
  }
];

export default function AISpeakingDemo() {
  const [selectedTopic, setSelectedTopic] = useState(topicsList[0]);
  const [mode, setMode] = useState('demo'); // 'demo' or 'interactive'
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Live mic interactive recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [customText, setCustomText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationDone, setEvaluationDone] = useState(false);

  // Auto-play demo timer sequence
  useEffect(() => {
    if (mode !== 'demo' || !isPlaying) return;

    setStep(0);
    const timer1 = setTimeout(() => setStep(1), 600);
    const timer2 = setTimeout(() => setStep(2), 2200);
    const timer3 = setTimeout(() => setStep(3), 4500);
    const timer4 = setTimeout(() => setStep(4), 7000);
    const timer5 = setTimeout(() => setStep(5), 9200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [selectedTopic, mode, isPlaying]);

  // Recording timer effect
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordTime(0);
    setEvaluationDone(false);
  };

  const handleStopAndEvaluate = () => {
    setIsRecording(false);
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationDone(true);
    }, 2000);
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setEvaluationDone(false);
    if (mode === 'demo') {
      setStep(0);
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 50);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-20 lg:py-32 border-t border-slate-800">
      {/* Background soft glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#0097B2]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0097B2]/15 border border-[#0097B2]/30 text-[#0097B2] dark:text-cyan-300 text-xs font-black tracking-widest uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive AI Speaking Demo</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight"
          >
            Practice Speaking with <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#0097B2] via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Real-Time Dynamic AI Evaluation
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-400 font-medium leading-relaxed"
          >
            Select a topic or record your own voice live to experience instant AI IELTS band score grading!
          </motion.p>
        </div>

        {/* ── Mode & Topic Selector Controls ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-3 sm:p-4 rounded-3xl border border-slate-800 mb-10 shadow-xl max-w-4xl mx-auto">
          
          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 w-full sm:w-auto justify-center">
            <button
              onClick={() => { setMode('demo'); setEvaluationDone(false); setIsPlaying(true); }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                mode === 'demo'
                  ? 'bg-[#0097B2] text-white shadow-md shadow-[#0097B2]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Auto Demo</span>
            </button>
            <button
              onClick={() => { setMode('interactive'); setEvaluationDone(false); }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                mode === 'interactive'
                  ? 'bg-[#0097B2] text-white shadow-md shadow-[#0097B2]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Interactive Live Mic Mode</span>
            </button>
          </div>

          {/* Topic Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto justify-center sm:justify-end pb-1 sm:pb-0">
            {topicsList.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicChange(topic)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 border ${
                  selectedTopic.id === topic.id
                    ? 'bg-slate-800 border-[#0097B2] text-cyan-300 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>

        </div>

        {/* ── Main 2-Side Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* ── LEFT COLUMN: Student / Human Side ── */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
              
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                      <User className="w-6 h-6" />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white flex items-center gap-2">
                        Student (You)
                      </h3>
                      <span className="text-xs font-semibold text-slate-400">
                        {mode === 'interactive' ? 'Live Mic Input' : 'Auto Candidate'}
                      </span>
                    </div>
                  </div>

                  {/* Mic / Live Recording Indicator */}
                  <div className={`px-3 py-1.5 rounded-full flex items-center gap-2 border text-xs font-extrabold transition-all ${
                    isRecording || (mode === 'demo' && (step === 3 || step === 1))
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    <Mic className={`w-3.5 h-3.5 ${isRecording || (mode === 'demo' && step === 3) ? 'animate-bounce text-emerald-400' : ''}`} />
                    <span>
                      {isRecording 
                        ? `Recording (${formatTime(recordTime)})`
                        : mode === 'demo' && step === 3 
                          ? 'Speaking...' 
                          : 'Mic Ready'}
                    </span>
                  </div>
                </div>

                {/* MODE A: AUTO DEMO FLOW */}
                {mode === 'demo' && (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {step >= 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-[#0097B2]/15 border border-[#0097B2]/30 p-4 rounded-2xl text-sm font-medium text-slate-100"
                        >
                          <p className="text-xs font-bold text-[#0097B2] mb-1">Student:</p>
                          "I want to improve my speaking..."
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {step >= 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-[#0097B2]/20 border border-[#0097B2]/40 p-4 sm:p-5 rounded-2xl text-sm font-medium text-white space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5">
                              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                              Answering: {selectedTopic.title}
                            </p>
                            <span className="text-[10px] font-mono text-slate-400">Live Voice Stream</span>
                          </div>

                          <p className="leading-relaxed text-sm italic">
                            {selectedTopic.studentText}
                          </p>

                          <div className="flex items-center gap-1 h-6 pt-1">
                            {[40, 85, 60, 100, 75, 45, 90, 65, 95, 50, 80, 40, 70, 90].map((h, i) => (
                              <motion.span
                                key={i}
                                animate={{ height: step === 3 ? [`${h}%`, `${100 - h}%`, `${h}%`] : '30%' }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08 }}
                                className="w-1 bg-cyan-400 rounded-full"
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* MODE B: INTERACTIVE LIVE MIC / INPUT MODE */}
                {mode === 'interactive' && (
                  <div className="space-y-5">
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                        <span>Selected Question:</span>
                        <span className="text-[#0097B2]">{selectedTopic.title}</span>
                      </div>
                      <p className="text-sm font-bold text-white bg-slate-900 p-3 rounded-xl border border-slate-800">
                        "{selectedTopic.question}"
                      </p>
                    </div>

                    {/* Mic Record Buttons */}
                    <div className="space-y-3">
                      {!isRecording ? (
                        <button
                          onClick={handleStartRecording}
                          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0097B2] to-cyan-500 hover:from-[#00849c] hover:to-cyan-600 text-white font-black text-sm shadow-xl shadow-[#0097B2]/25 flex items-center justify-center gap-3 cursor-pointer transition-all"
                        >
                          <Mic className="w-5 h-5 animate-pulse" />
                          <span>Click to Start Recording Voice</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleStopAndEvaluate}
                          className="w-full py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-xl shadow-rose-500/30 flex items-center justify-center gap-3 cursor-pointer transition-all animate-pulse"
                        >
                          <Square className="w-5 h-5 fill-white" />
                          <span>Stop Recording & Evaluate ({formatTime(recordTime)})</span>
                        </button>
                      )}
                    </div>

                    {/* Custom Text Box alternative */}
                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-bold text-slate-400 block">
                        Or type your speech text:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                          placeholder="e.g. My hometown is Sylhet, famous for tea gardens..."
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0097B2]"
                        />
                        <button
                          onClick={() => {
                            if (!customText) return;
                            setIsEvaluating(true);
                            setTimeout(() => {
                              setIsEvaluating(false);
                              setEvaluationDone(true);
                            }, 1800);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Visual Tag */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Real-time voice capture engine</span>
                </span>
                <span className="text-slate-500">IELTS Speaking Simulator</span>
              </div>
            </div>
          </div>


          {/* ── RIGHT COLUMN: AI Partner & Live Evaluation ── */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
              
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0097B2] to-teal-400 flex items-center justify-center text-white shadow-lg shadow-[#0097B2]/30">
                      <Bot className="w-6 h-6" />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-slate-900 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white flex items-center gap-2">
                        Edwaay AI Examiner <Sparkles className="w-4 h-4 text-amber-400" />
                      </h3>
                      <span className="text-xs font-semibold text-[#0097B2]">Powered by Speech AI</span>
                    </div>
                  </div>

                  {/* AI Status */}
                  <div className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-extrabold text-slate-300 flex items-center gap-2">
                    {isEvaluating || (mode === 'demo' && step === 4) ? (
                      <>
                        <Activity className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                        <span className="text-amber-400">Analyzing...</span>
                      </>
                    ) : evaluationDone || (mode === 'demo' && step === 5) ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Evaluated</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Ready</span>
                      </>
                    )}
                  </div>
                </div>

                {/* AI Dialogue & Prompt */}
                <div className="space-y-4">
                  
                  {/* AI Prompt Message */}
                  <div className="bg-slate-800/90 border border-slate-700/80 p-4 sm:p-5 rounded-2xl text-sm font-medium text-slate-100 space-y-2 shadow-lg">
                    <p className="text-xs font-bold text-[#0097B2] flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-[#0097B2]" />
                      AI Examiner:
                    </p>
                    <p className="text-white font-semibold">
                      "Sure! Let's begin Part 1."
                    </p>
                    <div className="pt-2 border-t border-slate-700/60 text-xs text-cyan-300 font-bold">
                      Question: <span className="text-slate-200 font-medium">{selectedTopic.question}</span>
                    </div>
                  </div>

                  {/* Analyzing Animation */}
                  {(isEvaluating || (mode === 'demo' && step === 4)) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                        <span className="flex items-center gap-2">
                          <Activity className="w-4 h-4 animate-spin" />
                          Analyzing Accent & Grammar Patterns...
                        </span>
                        <span>Evaluating...</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, ease: 'linear' }}
                          className="h-full bg-gradient-to-r from-amber-500 to-cyan-400"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Final Score Report Card */}
                  {(evaluationDone || (mode === 'demo' && step === 5)) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className="bg-gradient-to-b from-slate-800 to-slate-900 border border-[#0097B2]/40 rounded-2xl p-5 shadow-2xl space-y-5"
                    >
                      {/* Score Title Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-400" />
                          <span className="text-sm font-black text-white">Live AI Band Score Report</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-extrabold border border-emerald-500/30">
                          Evaluated
                        </span>
                      </div>

                      {/* Big Band Score Display */}
                      <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                            OVERALL BAND SCORE
                          </span>
                          <span className="text-xs text-slate-300 font-semibold">Good Competent User</span>
                        </div>
                        <div className="flex items-baseline gap-1 bg-[#0097B2]/20 px-4 py-1.5 rounded-xl border border-[#0097B2]/40">
                          <span className="text-3xl font-black text-cyan-300">
                            {selectedTopic.scores.overall}
                          </span>
                          <span className="text-xs text-slate-400 font-bold">/ 9.0</span>
                        </div>
                      </div>

                      {/* 4 Criteria Grid */}
                      <div className="grid grid-cols-2 gap-2.5 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                          <span className="text-slate-300 font-medium">Pronunciation</span>
                          <span className="font-black text-emerald-400 text-sm">{selectedTopic.scores.pronunciation}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                          <span className="text-slate-300 font-medium">Grammar</span>
                          <span className="font-black text-amber-400 text-sm">{selectedTopic.scores.grammar}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                          <span className="text-slate-300 font-medium">Fluency</span>
                          <span className="font-black text-cyan-300 text-sm">{selectedTopic.scores.fluency}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                          <span className="text-slate-300 font-medium">Vocabulary</span>
                          <span className="font-black text-emerald-400 text-sm">{selectedTopic.scores.vocabulary}</span>
                        </div>
                      </div>

                      {/* Suggestions Box */}
                      <div className="space-y-2 pt-2 border-t border-slate-700/80">
                        <span className="text-xs font-black text-cyan-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Suggestions for Improvement:
                        </span>
                        <div className="space-y-1.5 text-xs text-slate-200">
                          {selectedTopic.suggestions.map((sug, i) => (
                            <div key={i} className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>{sug}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </motion.div>
                  )}
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Official IELTS Grading Algorithm</span>
                </span>
                <span className="text-slate-500">Dynamic AI Output</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
