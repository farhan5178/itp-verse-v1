import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Mic,
  MicOff,
  Square,
  Clock,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  X,
  Check,
  Award,
  Volume2,
  Play,
  Pause
} from 'lucide-react';

const sampleSpeakingCueCards = [
  {
    id: 1,
    partTitle: 'STEP 1 OF 1: PART 2: DESCRIBE A MEMORABLE TRAVEL DESTINATION',
    promptTitle: 'QUESTION PROMPT',
    promptText: `Describe a beautiful place you visited in your country. You should say: where it is, when you went there, what you did there, and explain why you found it unusually beautiful. Record or type your answer. Try to speak/write for 1-2 minutes.`,
    sampleTranscript: `One of the most breathtaking places I have visited in my country is Saint Martin's Island, located in Bangladesh. I traveled there last winter with my family during the holiday season. The island is renowned for its crystal-clear turquoise waters, pristine coconut groves, and serene atmosphere. During my stay, we went scuba diving to explore the vibrant coral reefs, took long walks along the coastline at sunset, and enjoyed fresh seafood. What made it unusually beautiful was the complete absence of motor vehicles, allowing the natural sounds of gentle ocean waves and wind to create a truly tranquil experience that I will never forget.`
  }
];

export default function IELTSSpeakingPractice({ testDetails, onBack, onNextModule }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcriptText, setTranscriptText] = useState('');
  
  // Prep & Recording Timer (02:56 countdown simulation)
  const [timerSeconds, setTimerSeconds] = useState(176); // 2 mins 56 secs
  
  // AI Evaluation Modal state
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const currentCard = sampleSpeakingCueCards[currentCardIndex];
  const timerIntervalRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  // Countdown timer
  useEffect(() => {
    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerIntervalRef.current);
  }, []);

  // Recording timer & transcript simulation
  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(recordingIntervalRef.current);
    }
    return () => clearInterval(recordingIntervalRef.current);
  }, [isRecording]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscriptText(currentCard.sampleTranscript);
    } else {
      setIsRecording(false);
    }
  };

  const handleClearInput = () => {
    setIsRecording(false);
    setRecordingSeconds(0);
    setTranscriptText('');
    setEvaluationResult(null);
  };

  const handleAnalyzeAnswer = () => {
    if (recordingSeconds === 0 && !transcriptText) {
      alert('Please tap "TAP TO SPEAK" and record your answer for at least 15–30 seconds before analyzing.');
      return;
    }

    setEvaluationResult({
      bandScore: '8.0',
      durationSeconds: recordingSeconds || 75,
      fluencyCoherence: 'Band 8.0',
      lexicalResource: 'Band 7.5',
      grammarAccuracy: 'Band 8.0',
      pronunciation: 'Band 8.0',
      fluencyNotes: [
        'Fluent speech rate with natural pauses between main ideas.',
        'Zero unnatural hesitation or repetitive filler sounds (e.g. "uhm", "like").'
      ],
      vocabularyHighlights: [
        'High-scoring vocabulary used: "crystal-clear turquoise", "pristine coconut groves", "serene atmosphere", "tranquil experience".'
      ],
      pronunciationScore: '92% Clarity • Natural intonation contours'
    });

    setShowEvaluationModal(true);
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
                {testDetails?.book ? `${testDetails.book.title} - ${testDetails.test.name} (Speaking)` : 'IELTS 21 Academic 2026 - Test 1 (Speaking)'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-full text-xs font-black bg-[#0097B2] text-white shadow-md shadow-[#0097B2]/20 flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5" />
              Speaking
            </span>
          </div>
        </div>
      </div>

      {/* ── SPLIT-SCREEN WORKSPACE ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ── LEFT COLUMN: CUE CARD PROMPT & TIMER (Cols 5) ─────────────── */}
          <div className="lg:col-span-5 bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-sm flex flex-col space-y-6">
            
            {/* Step Header & Timer */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-750 pb-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-dark-muted">
                {currentCard.partTitle}
              </span>

              {/* Timer Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-dark-750 text-xs font-mono font-bold text-slate-700 dark:text-dark-text border border-slate-200 dark:border-dark-700">
                <Clock className="w-3.5 h-3.5 text-[#0097B2]" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>
            </div>

            {/* Prompt Card Content */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/10 text-[#0097B2] border border-[#0097B2]/30">
                {currentCard.promptTitle}
              </span>

              <p className="text-sm sm:text-base font-extrabold leading-relaxed text-slate-900 dark:text-white">
                {currentCard.promptText}
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: PRACTICE WORKSPACE MIC RECORDER (Cols 7) ────── */}
          <div className="lg:col-span-7 bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-sm flex flex-col justify-between min-h-[420px] space-y-6">
            
            {/* Practice Workspace Header */}
            <div>
              <div className="border-b border-slate-100 dark:border-dark-750 pb-4 mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  PRACTICE WORKSPACE
                </span>
              </div>

              <p className="text-xs text-center text-slate-500 dark:text-dark-muted font-semibold max-w-md mx-auto mb-8">
                This speaking task is simulated. Allow microphone access or simply tap "Start Simulation" to record answers.
              </p>

              {/* Microphone Recording Circle Trigger */}
              <div className="flex flex-col items-center justify-center my-6">
                <div className="relative">
                  {/* Outer Pulsing Wave Ring when recording */}
                  {isRecording && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 rounded-full bg-[#0097B2]/40"
                    />
                  )}

                  <button
                    onClick={handleToggleRecording}
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
                      isRecording
                        ? 'bg-rose-500 text-white shadow-rose-500/30 ring-4 ring-rose-300 dark:ring-rose-950'
                        : 'bg-[#0097B2] hover:bg-[#00788E] text-white shadow-[#0097B2]/30 hover:scale-105'
                    }`}
                  >
                    {isRecording ? (
                      <Square className="w-8 h-8 fill-white" />
                    ) : (
                      <Mic className="w-10 h-10" />
                    )}
                  </button>
                </div>

                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0097B2] mt-4">
                  {isRecording ? `RECORDING... (${formatTimer(recordingSeconds)})` : 'TAP TO SPEAK'}
                </span>
              </div>

              {/* Recorded Transcript Preview Box */}
              {transcriptText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-h-40 overflow-y-auto shadow-inner"
                >
                  <div className="text-[10px] font-black text-[#0097B2] uppercase tracking-wider mb-1">
                    Live Transcript Preview:
                  </div>
                  "{transcriptText}"
                </motion.div>
              )}
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

      {/* ── AI SPEAKING EVALUATION MODAL ───────────────────────────────── */}
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
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">AI Speaking Evaluation Report</h3>
                    <p className="text-xs text-slate-500 dark:text-dark-muted font-medium">Official IELTS Speaking Criteria Assessment</p>
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
                  <div className="text-xs font-bold text-slate-500 dark:text-dark-muted">Recorded Time</div>
                  <div className="text-xl font-black text-[#0097B2] mt-0.5">
                    {formatTimer(evaluationResult.durationSeconds)}
                  </div>
                </div>
              </div>

              {/* Criteria Sub-Scores Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-700">
                  <div className="text-[10px] text-slate-400 dark:text-dark-muted font-bold uppercase">Fluency & Coherence</div>
                  <div className="font-extrabold text-slate-900 dark:text-white mt-0.5">{evaluationResult.fluencyCoherence}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-700">
                  <div className="text-[10px] text-slate-400 dark:text-dark-muted font-bold uppercase">Lexical Resource</div>
                  <div className="font-extrabold text-slate-900 dark:text-white mt-0.5">{evaluationResult.lexicalResource}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-700">
                  <div className="text-[10px] text-slate-400 dark:text-dark-muted font-bold uppercase">Grammar Range</div>
                  <div className="font-extrabold text-slate-900 dark:text-white mt-0.5">{evaluationResult.grammarAccuracy}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-700">
                  <div className="text-[10px] text-slate-400 dark:text-dark-muted font-bold uppercase">Pronunciation</div>
                  <div className="font-extrabold text-slate-900 dark:text-white mt-0.5">{evaluationResult.pronunciation}</div>
                </div>
              </div>

              {/* Fluency & Vocabulary Highlights */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Fluency & Vocabulary Highlights</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-dark-muted">
                    {evaluationResult.vocabularyHighlights.map((hl, idx) => (
                      <li key={idx}>{hl}</li>
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
