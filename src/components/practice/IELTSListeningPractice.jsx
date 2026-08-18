import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Headphones,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  X,
  MessageSquare
} from 'lucide-react';

// Correct answer key for Questions 1-10
const correctAnswers = {
  1: '10',
  2: 'weather',
  3: 'safety',
  4: 'discount',
  5: 'handbook',
  6: 'certificate',
  7: 'towel',
  8: 'lockers',
  9: 'videos'
};

export default function IELTSListeningPractice({ testDetails, onBack, onNextModule }) {
  // Active listening part tab (1, 2, 3, 4)
  const [activePart, setActivePart] = useState(1);
  
  // Audio state simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 372; // 6:12 total duration in seconds
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  // Audioscript toggle state
  const [showAudioscript, setShowAudioscript] = useState(true);

  // User input answers state
  const [answers, setAnswers] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: ''
  });

  // Modal / Results state
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [scoreResults, setScoreResults] = useState(null);

  // Audio timer simulation
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackSpeed]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (qNum, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qNum]: value
    }));
  };

  const calculateScore = () => {
    let score = 0;
    const details = {};

    Object.keys(correctAnswers).forEach((qNum) => {
      const userAns = (answers[qNum] || '').trim().toLowerCase();
      const correctAns = correctAnswers[qNum].toLowerCase();
      const isCorrect = userAns === correctAns;
      if (isCorrect) score++;

      details[qNum] = {
        userAns: answers[qNum] || '(blank)',
        correctAns: correctAnswers[qNum],
        isCorrect
      };
    });

    let estimatedBand = '5.0';
    if (score >= 9) estimatedBand = '9.0';
    else if (score >= 8) estimatedBand = '8.5';
    else if (score >= 7) estimatedBand = '8.0';
    else if (score >= 6) estimatedBand = '7.5';
    else if (score >= 5) estimatedBand = '7.0';
    else if (score >= 4) estimatedBand = '6.5';
    else if (score >= 3) estimatedBand = '6.0';

    setScoreResults({
      rawScore: score,
      total: Object.keys(correctAnswers).length,
      band: estimatedBand,
      details
    });
    setShowScoreModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-dark-900 text-slate-900 dark:text-white flex flex-col font-sans relative selection:bg-[#0097B2] selection:text-white">
      
      {/* Top Header Bar */}
      <header className="bg-white dark:bg-dark-800 border-b border-slate-200 dark:border-dark-700 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-dark-750 text-slate-700 dark:text-dark-text hover:bg-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            ← Exit Practice
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
              {testDetails?.book ? `${testDetails.book.title} • ${testDetails.test.name}` : 'IELTS Academic Listening Practice'}
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-dark-muted font-semibold">
              Official Cambridge Test Format
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-cyan-500/10 text-[#0097B2] border border-[#0097B2]/30">
            <span className="w-2 h-2 rounded-full bg-[#0097B2] animate-pulse" />
            SECTION 1 OF 4
          </span>
        </div>
      </header>

      {/* Main Split-Screen Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* LEFT COLUMN: Audio Player & Audioscript (Cols 5) */}
        <div className="lg:col-span-5 border-r border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-850 flex flex-col h-full overflow-y-auto">
          
          {/* Part Header & Audio Control Card */}
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-dark-700 space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                PART 1
              </span>
            </div>

            {/* Custom Audio Player Bar */}
            <div className="bg-slate-50 dark:bg-dark-800 p-4 rounded-2xl border border-slate-200 dark:border-dark-700 shadow-inner space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0097B2]/15 text-[#0097B2] flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>

                {/* Play / Pause */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                {/* Scrubber / Progress bar */}
                <div className="flex-1 space-y-1">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={(e) => setCurrentTime(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-dark-700 rounded-lg appearance-none cursor-pointer accent-[#0097B2]"
                  />
                  <div className="flex justify-between text-[11px] font-mono font-bold text-slate-500 dark:text-dark-muted">
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                </div>

                {/* Volume Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg text-slate-500 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Audioscript Accordion Header */}
            <button
              onClick={() => setShowAudioscript(!showAudioscript)}
              className="w-full p-3 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-dark-700 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-dark-text hover:bg-slate-200/80 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#0097B2]" />
                <span>Audioscript</span>
              </div>
              {showAudioscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Audioscript Content Body */}
          <AnimatePresence>
            {showAudioscript && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-4"
              >
                <div className="bg-[#091b20] text-slate-100 p-5 sm:p-6 rounded-2xl border border-slate-700/80 shadow-inner max-h-[380px] sm:max-h-[450px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                  <div className="text-center font-black text-sm text-white tracking-wide pb-3 border-b border-slate-700/80 sticky top-0 bg-[#091b20] z-10">
                    Sailing Club Course Enquiry
                  </div>

                  <div className="space-y-4 text-xs leading-relaxed text-slate-200">
                    <p>
                      <strong className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] block mb-0.5">ANNOUNCER:</strong>
                      Part one. You will hear a man phoning a sailing club to ask about learning to sail. First, you have some time to look at questions 1–6. Now listen carefully and answer questions 1–6.
                    </p>

                    <p>
                      <strong className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block mb-0.5">WOMAN:</strong>
                      Hello, Oyster Bay Sailing Club. How can I help you?
                    </p>

                    <p>
                      <strong className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block mb-0.5">MAN:</strong>
                      Oh, hi. I'd like to find out about sailing courses for beginners.
                    </p>

                    <p>
                      <strong className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block mb-0.5">WOMAN:</strong>
                      No problem. Is it for yourself?
                    </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">MAN:</strong>
                    Yes, I had a look online, but I'm not sure which course would be best.
                  </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">WOMAN:</strong>
                    OK, well you might be interested in our taster days.
                  </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">MAN:</strong>
                    Possibly.
                  </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">WOMAN:</strong>
                    So these are for people who've never sailed before. It's basically an introduction to sailing, to find out whether you enjoy it and want to carry on with it.
                  </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">MAN:</strong>
                    And how much is that?
                  </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">WOMAN:</strong>
                    It's £120 for the day, but it's reduced to £110 each, if there are two of you.
                  </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">MAN:</strong>
                    No, it would just be me.
                  </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">WOMAN:</strong>
                    Oh, that's fine. You'd be in a small group, usually about eight people, but no more than <mark className="bg-amber-200 dark:bg-amber-900/60 px-1 rounded">ten [1]</mark>, and everyone's always very friendly.
                  </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">MAN:</strong>
                    And are there any other suitable courses?
                  </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">WOMAN:</strong>
                    Yes, the other option is the Level 1 course. These are two day weekend courses, and we run those all year round.
                  </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">MAN:</strong>
                    OK, and what do you learn on that course?
                  </p>

                  <p>
                    <strong className="font-sans font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">WOMAN:</strong>
                    This is a mix of theory and practical skills, so you learn about things like the <mark className="bg-amber-200 dark:bg-amber-900/60 px-1 rounded">weather [2]</mark>, which is obviously really important. And also the tides, as well as learning basic sailing skills including <mark className="bg-amber-200 dark:bg-amber-900/60 px-1 rounded">safety [3]</mark> information. You go out into the harbour in special training dinghies...
                  </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Questions Form (Cols 7) */}
        <div className="lg:col-span-7 p-4 sm:p-8 overflow-y-auto space-y-8 bg-slate-50/70 dark:bg-dark-900">
          
          {/* SECTION 1: QUESTIONS 1-6 TABLE COMPLETION */}
          <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-sm space-y-4">
            
            {/* Question Header & Instructions */}
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Questions 1–6
              </h2>
              <p className="text-xs text-slate-600 dark:text-dark-muted font-medium mt-0.5">
                Complete the table below.
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                Write <strong className="underline">ONE WORD AND/OR A NUMBER</strong> for each answer.
              </p>
            </div>

            <div className="text-center font-extrabold text-sm text-slate-900 dark:text-white tracking-wide uppercase pt-2">
              OYSTER BAY SAILING CLUB COURSES
            </div>

            {/* IELTS Table Component */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-dark-700">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-dark-750 text-slate-700 dark:text-dark-text font-black border-b border-slate-200 dark:border-dark-700">
                    <th className="p-3 w-1/4">Name of course</th>
                    <th className="p-3 w-1/3">What you learn</th>
                    <th className="p-3 w-1/4">Cost</th>
                    <th className="p-3">Other information</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-dark-700 text-slate-700 dark:text-slate-300">
                  
                  {/* Row 1: Taster Day */}
                  <tr className="bg-white dark:bg-dark-800">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Taster day</td>
                    <td className="p-3">Introduction to sailing</td>
                    <td className="p-3">£120 if booking one place</td>
                    <td className="p-3">
                      small groups (max{' '}
                      <span className="inline-flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full border border-slate-400 text-slate-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                        <input
                          type="text"
                          value={answers[1] || ''}
                          onChange={(e) => handleInputChange(1, e.target.value)}
                          className="w-20 px-2 py-1 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-300 dark:border-dark-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0097B2] outline-none"
                          placeholder=""
                        />
                      </span>{' '}
                      people)
                    </td>
                  </tr>

                  {/* Row 2: Level 1 */}
                  <tr className="bg-slate-50/50 dark:bg-dark-850">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Level 1</td>
                    <td className="p-3 space-y-2">
                      <div>
                        • basic theory e.g. understanding the{' '}
                        <span className="inline-flex items-center gap-1">
                          <span className="w-4 h-4 rounded-full border border-slate-400 text-slate-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                          <input
                            type="text"
                            value={answers[2] || ''}
                            onChange={(e) => handleInputChange(2, e.target.value)}
                            className="w-24 px-2 py-1 rounded-lg bg-white dark:bg-dark-900 border border-slate-300 dark:border-dark-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0097B2] outline-none"
                            placeholder=""
                          />
                        </span>{' '}
                        and tides
                      </div>
                      <div>
                        • basic sailing skills including{' '}
                        <span className="inline-flex items-center gap-1">
                          <span className="w-4 h-4 rounded-full border border-slate-400 text-slate-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                          <input
                            type="text"
                            value={answers[3] || ''}
                            onChange={(e) => handleInputChange(3, e.target.value)}
                            className="w-24 px-2 py-1 rounded-lg bg-white dark:bg-dark-900 border border-slate-300 dark:border-dark-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0097B2] outline-none"
                            placeholder=""
                          />
                        </span>{' '}
                        information
                      </div>
                    </td>
                    <td className="p-3 space-y-2">
                      <div>• £200</div>
                      <div>
                        •{' '}
                        <span className="inline-flex items-center gap-1">
                          <span className="w-4 h-4 rounded-full border border-slate-400 text-slate-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
                          <input
                            type="text"
                            value={answers[4] || ''}
                            onChange={(e) => handleInputChange(4, e.target.value)}
                            className="w-24 px-2 py-1 rounded-lg bg-white dark:bg-dark-900 border border-slate-300 dark:border-dark-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0097B2] outline-none"
                            placeholder=""
                          />
                        </span>{' '}
                        for club members available
                      </div>
                      <div>
                        • all inclusive (plus a useful{' '}
                        <span className="inline-flex items-center gap-1">
                          <span className="w-4 h-4 rounded-full border border-slate-400 text-slate-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">5</span>
                          <input
                            type="text"
                            value={answers[5] || ''}
                            onChange={(e) => handleInputChange(5, e.target.value)}
                            className="w-24 px-2 py-1 rounded-lg bg-white dark:bg-dark-900 border border-slate-300 dark:border-dark-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0097B2] outline-none"
                            placeholder=""
                          />
                        </span>
                        )
                      </div>
                    </td>
                    <td className="p-3">
                      a{' '}
                      <span className="inline-flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full border border-slate-400 text-slate-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">6</span>
                        <input
                          type="text"
                          value={answers[6] || ''}
                          onChange={(e) => handleInputChange(6, e.target.value)}
                          className="w-24 px-2 py-1 rounded-lg bg-white dark:bg-dark-900 border border-slate-300 dark:border-dark-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0097B2] outline-none"
                          placeholder=""
                        />
                      </span>{' '}
                      at the end of the course for all participants
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 2: QUESTIONS 7-10 NOTES COMPLETION */}
          <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-sm space-y-4">
            
            {/* Question Header & Instructions */}
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Questions 7–10
              </h2>
              <p className="text-xs text-slate-600 dark:text-dark-muted font-medium mt-0.5">
                Complete the notes below.
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                Write <strong className="underline">ONE WORD ONLY</strong> for each answer.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-dark-700 space-y-3">
              <div className="text-center font-extrabold text-sm text-slate-900 dark:text-white tracking-wide uppercase pb-2">
                GENERAL INFORMATION
              </div>

              <ul className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Participants must be able to swim.</span>
                </li>

                <li className="flex items-center gap-2">
                  <span className="font-bold">•</span>
                  <div>
                    Bring suitable clothing, a{' '}
                    <span className="inline-flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full border border-slate-400 text-slate-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">7</span>
                      <input
                        type="text"
                        value={answers[7] || ''}
                        onChange={(e) => handleInputChange(7, e.target.value)}
                        className="w-24 px-2 py-1 rounded-lg bg-white dark:bg-dark-900 border border-slate-300 dark:border-dark-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0097B2] outline-none"
                        placeholder=""
                      />
                    </span>{' '}
                    and toiletries (e.g. shampoo).
                  </div>
                </li>

                <li className="flex items-center gap-2">
                  <span className="font-bold">•</span>
                  <div>
                    Valuables can be stored in{' '}
                    <span className="inline-flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full border border-slate-400 text-slate-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">8</span>
                      <input
                        type="text"
                        value={answers[8] || ''}
                        onChange={(e) => handleInputChange(8, e.target.value)}
                        className="w-24 px-2 py-1 rounded-lg bg-white dark:bg-dark-900 border border-slate-300 dark:border-dark-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0097B2] outline-none"
                        placeholder=""
                      />
                    </span>.
                  </div>
                </li>

                <li className="flex items-center gap-2">
                  <span className="font-bold">•</span>
                  <div>
                    I recommend you watch some{' '}
                    <span className="inline-flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full border border-slate-400 text-slate-600 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center shrink-0">9</span>
                      <input
                        type="text"
                        value={answers[9] || ''}
                        onChange={(e) => handleInputChange(9, e.target.value)}
                        className="w-24 px-2 py-1 rounded-lg bg-white dark:bg-dark-900 border border-slate-300 dark:border-dark-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0097B2] outline-none"
                        placeholder=""
                      />
                    </span>{' '}
                    we use for training.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation & Actions Bar */}
      <div className="sticky bottom-0 bg-white/90 dark:bg-dark-800/90 backdrop-blur-md border-t border-slate-200 dark:border-dark-700 py-3 px-4 sm:px-8 flex items-center justify-between shadow-2xl z-30">
        
        {/* SCORES Trigger Button */}
        <button
          onClick={calculateScore}
          className="px-6 py-2 rounded-full bg-white dark:bg-dark-750 border-2 border-slate-300 dark:border-dark-700 text-slate-700 dark:text-white hover:bg-[#0097B2] hover:text-white font-extrabold text-xs tracking-wider transition-all shadow-xs cursor-pointer flex items-center gap-2"
        >
          <Award className="w-4 h-4" />
          <span>SCORES</span>
        </button>

        {/* Part Selector Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-dark-900 p-1 rounded-full border border-slate-200 dark:border-dark-750">
          {[1, 2, 3, 4].map((partNum) => (
            <button
              key={partNum}
              onClick={() => setActivePart(partNum)}
              className={`w-8 h-8 rounded-full text-xs font-black flex items-center justify-center transition-all cursor-pointer ${
                activePart === partNum
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                  : 'text-slate-600 dark:text-dark-muted hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {partNum === 1 ? `🎧 ${partNum}` : partNum}
            </button>
          ))}
        </div>

        {/* Next Section Button */}
        <button
          onClick={() => onNextModule && onNextModule('reading')}
          className="px-6 py-2 rounded-full bg-white dark:bg-dark-750 border border-slate-200 dark:border-dark-700 text-slate-700 dark:text-white font-bold text-xs transition-all shadow-xs cursor-pointer flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-dark-700"
        >
          <span>Reading</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating AI Helper Chat Button Bottom Right */}
      <button
        onClick={() => alert('AI IELTS Tutor Assistant: Need help with Listening Part 1 keywords or spelling rules?')}
        className="fixed bottom-16 right-6 w-12 h-12 rounded-full bg-[#0097B2] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-40 cursor-pointer group"
        title="AI IELTS Assistant"
      >
        <span className="w-3 h-3 rounded-full bg-rose-500 border-2 border-white absolute top-0 right-0 animate-ping" />
        <span className="w-3 h-3 rounded-full bg-rose-500 border-2 border-white absolute top-0 right-0" />
        <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </button>

      {/* Score Modal */}
      <AnimatePresence>
        {showScoreModal && scoreResults && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScoreModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-dark-800 rounded-3xl border border-slate-200 dark:border-dark-700 shadow-2xl overflow-hidden z-10 p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-dark-750 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Listening Section Result</h3>
                    <p className="text-xs text-slate-500 dark:text-dark-muted font-medium">Official IELTS Raw Score & Band Estimation</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowScoreModal(false)}
                  className="p-1.5 rounded-full bg-slate-100 dark:bg-dark-750 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Band Score Pill */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0097B2]/15 to-[#004B59]/20 border border-[#0097B2]/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0097B2] dark:text-cyan-300 uppercase tracking-wider">Estimated Band Score</div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white mt-0.5">
                    Band {scoreResults.band}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-500 dark:text-dark-muted">Raw Correct Answers</div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {scoreResults.rawScore} / {scoreResults.total}
                  </div>
                </div>
              </div>

              {/* Individual Question Answer Breakdown */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                <div className="text-xs font-black text-slate-700 dark:text-dark-text uppercase tracking-wider mb-2">Answer Key Review</div>
                {Object.keys(scoreResults.details).map((qNum) => {
                  const item = scoreResults.details[qNum];
                  return (
                    <div
                      key={qNum}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                        item.isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200'
                          : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50 text-rose-900 dark:text-rose-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                        <span className="font-bold">Q{qNum}:</span>
                        <span>Your answer: <strong className="font-black">{item.userAns}</strong></span>
                      </div>
                      {!item.isCorrect && (
                        <div className="text-[11px] font-semibold text-slate-500 dark:text-dark-muted">
                          Correct: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{item.correctAns}</strong>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setShowScoreModal(false)}
                className="w-full py-3 rounded-xl bg-[#0097B2] hover:bg-[#00788E] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                Close & Continue Review
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
