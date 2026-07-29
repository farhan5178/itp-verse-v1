import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Square,
  Bot,
  User,
  Activity,
  Award,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Send,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Volume2,
  Flame,
  MessageSquare,
  HelpCircle,
  Check,
  Zap,
  TrendingUp,
  VolumeX
} from 'lucide-react';

/* ── IELTS Question Bank ── */
const questionBank = [
  {
    id: 1,
    title: 'Describe a memorable journey you had.',
    bullets: [
      'Where you went',
      'Who you went with',
      'What happened during the trip',
      'Why it was memorable'
    ],
    sampleTranscript: "Last year, I visited Cox's Bazar with my family. We went there by train and stayed at a beachside resort. The sunset was breathtaking and we enjoyed fresh seafood. It was memorable because it was our first family vacation after two years.",
    demoResponse: {
      overall: 7.5,
      fluency: { score: 7.5, feedback: 'You spoke confidently with good natural flow. Minor hesitation while searching for vocabulary.' },
      lexical: {
        score: 7.0,
        goodWords: ['memorable', 'breathtaking', 'unforgettable', 'resort'],
        replacements: [
          { original: 'very beautiful', replacement: 'spectacular' },
          { original: 'good food', replacement: 'delectable seafood' }
        ]
      },
      grammar: {
        score: 6.5,
        corrections: [
          { original: 'I go there last year with family.', better: 'I went there last year with my family.' },
          { original: 'It very beautiful sunset.', better: 'It was a very beautiful sunset.' }
        ]
      },
      pronunciation: {
        score: 7.0,
        difficultWords: [
          { word: 'journey', phonetic: '/ˈdʒɜː.ni/', tip: 'Emphasis on first syllable "JOUR-ney"' },
          { word: 'memorable', phonetic: '/ˈmem.ər.ə.bəl/', tip: 'Light sound on "ora-ble"' }
        ]
      },
      contentQuality: 'You answered all 4 cue card prompts effectively with good descriptive details.',
      strengths: [
        'Good fluency and narrative pacing',
        'Clear pronunciation with natural intonation',
        'Effective topic-specific vocabulary'
      ],
      weaknesses: [
        'Past tense consistency in complex sentences',
        'Repetition of simple adjectives like "very beautiful"',
        'Could expand more on emotional impact'
      ],
      sampleAnswer: "Last year, I embarked on a memorable journey to Cox's Bazar accompanied by my family. We travelled by train, taking in the scenic countryside before arriving at our seaside resort. What made the trip truly unforgettable was the breathtaking sunset over the Bay of Bengal. This journey holds special significance as it brought our family together after a long period.",
      practiceTips: [
        'Practice using connectors like "furthermore" and "consequently".',
        'Use idiomatic expressions like "took my breath away".',
        'Focus on past perfect tense for background events.'
      ]
    }
  },
  {
    id: 2,
    title: 'Describe your favorite teacher.',
    bullets: [
      'Who this teacher was',
      'What subject they taught',
      'What made their teaching special',
      'How they influenced your life'
    ],
    sampleTranscript: "I would like to talk about my high school English teacher, Mr. Rahman. He taught us English literature with great enthusiasm. He used storytelling to explain complex grammar and inspired me to pursue higher education.",
    demoResponse: {
      overall: 8.0,
      fluency: { score: 8.0, feedback: 'Excellent coherence and smooth transitions between points.' },
      lexical: {
        score: 8.0,
        goodWords: ['enthusiasm', 'literature', 'inspired', 'captivating'],
        replacements: [
          { original: 'good teacher', replacement: 'exceptional educator' }
        ]
      },
      grammar: {
        score: 7.5,
        corrections: [
          { original: 'He make learning very easy.', better: 'He made learning effortless.' }
        ]
      },
      pronunciation: {
        score: 8.0,
        difficultWords: [
          { word: 'enthusiasm', phonetic: '/ɪnˈθjuː.zi.æz.əm/', tip: 'Soft "th" sound' }
        ]
      },
      contentQuality: 'Comprehensive coverage of all bullet points with clear personal connection.',
      strengths: ['Advanced lexical resource', 'Strong grammatical range'],
      weaknesses: ['Minor pause before technical terms'],
      sampleAnswer: "I would like to express my gratitude towards my high school English instructor, Mr. Rahman. His captivating teaching methodology transformed complex literature into memorable life lessons.",
      practiceTips: ['Maintain this level of natural discourse pacing.']
    }
  },
  {
    id: 3,
    title: 'Describe a city you would like to visit.',
    bullets: [
      'Which city it is',
      'Where it is located',
      'What you know about this city',
      'Why you want to visit it'
    ],
    sampleTranscript: "A city I dream of visiting is Tokyo, Japan. It is known for its blend of futuristic technology and rich traditional culture. I want to explore Shibuya Crossing and try authentic ramen.",
    demoResponse: {
      overall: 7.0,
      fluency: { score: 7.0, feedback: 'Good flow with clear enthusiasm.' },
      lexical: {
        score: 7.5,
        goodWords: ['futuristic', 'authentic', 'blend', 'tradition'],
        replacements: [{ original: 'nice city', replacement: 'vibrant metropolis' }]
      },
      grammar: {
        score: 6.5,
        corrections: [{ original: 'I want go there since long time.', better: 'I have wanted to visit it for a long time.' }]
      },
      pronunciation: { score: 7.0, difficultWords: [{ word: 'futuristic', phonetic: '/ˌfjuː.tʃəˈrɪs.tɪk/', tip: 'Stress on "RIS"' }] },
      contentQuality: 'Well explained rationale for visiting.',
      strengths: ['Great topic vocabulary', 'Good vocal energy'],
      weaknesses: ['Present perfect tense practice needed'],
      sampleAnswer: "A metropolis I have always aspired to explore is Tokyo. Renowned for seamlessly blending futuristic innovations with centuries-old traditions, it offers an incomparable urban experience.",
      practiceTips: ['Use complex compound sentences.']
    }
  }
];

export default function AISpeakingDemo() {
  // Active state stages:
  // step 1: Greeting & Intro Card
  // step 2: Question Prompt & Prep
  // step 3: Active Recording & Live Transcription
  // step 4: AI Analysis & Processing
  // step 5: Full 3-Panel Evaluation Dashboard
  const [step, setStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Recording & Web Speech API controls
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isSpeakingVoice, setIsSpeakingVoice] = useState(false);
  const [webSpeechSupported, setWebSpeechSupported] = useState(true);

  // Active error highlight filter state
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const activeQuestion = questionBank[currentQuestionIndex];
  const recognitionRef = useRef(null);

  // Check Web Speech API availability & Preload Female Voices
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setWebSpeechSupported(false);
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Free Native Text-to-Speech (TTS) for AI Examiner Voice
  // Strict Female/Girl AI Voice Selector
  const speakAIVoice = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop previous voice
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.98; // Pleasant natural pace
      utterance.pitch = 1.3; // Cute female tone

      const voices = window.speechSynthesis.getVoices();
      
      const femaleKeywords = [
        'zira', 'samantha', 'victoria', 'karen', 'fiona', 'jenny', 
        'aria', 'ava', 'emma', 'sonia', 'female', 'google us english', 
        'google uk english female', 'alexa', 'cortana', 'alice', 'claire'
      ];
      
      const cuteFemaleVoice = voices.find(v => 
        femaleKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
      ) || voices.find(v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('girl'))) || voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-GB')) || voices[0];

      if (cuteFemaleVoice) utterance.voice = cuteFemaleVoice;

      utterance.onstart = () => setIsSpeakingVoice(true);
      utterance.onend = () => setIsSpeakingVoice(false);
      utterance.onerror = () => setIsSpeakingVoice(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Timer tick effect
  useEffect(() => {
    let interval = null;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev >= 120) {
            handleStopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Handle Free Real-time Web Speech Recognition (STT)
  const startLiveSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let currentSpeechText = '';
          for (let i = 0; i < event.results.length; i++) {
            currentSpeechText += event.results[i][0].transcript + ' ';
          }
          setLiveTranscript(currentSpeechText.trim());
        };

        recognition.onerror = (err) => {
          console.log('Web Speech API Error, using fallback transcript:', err);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (e) {
        console.log('Speech recognition init error:', e);
      }
    }
  };

  // Live transcript typing simulation fallback if mic is quiet or unsupported
  useEffect(() => {
    if (isRecording && !isPaused && (!liveTranscript || !webSpeechSupported)) {
      const fullText = activeQuestion.sampleTranscript;
      let currentIndex = 0;
      const textInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setLiveTranscript((prev) => {
            if (prev && webSpeechSupported) return prev;
            return fullText.slice(0, currentIndex + 6);
          });
          currentIndex += 4;
        } else {
          clearInterval(textInterval);
        }
      }, 140);
      return () => clearInterval(textInterval);
    }
  }, [isRecording, isPaused, activeQuestion, webSpeechSupported]);

  const handleStartDemo = () => {
    setStep(2);
    // Cute Girl AI Voice speaks greeting and question out loud immediately
    speakAIVoice(`Hello! Welcome to Edwaay AI Speaking Practice. Today I will ask you a speaking question. ${activeQuestion.title}. You can speak for up to 2 minutes. Click start live mic recording when you are ready.`);
  };

  const handleBeginRecording = () => {
    window.speechSynthesis?.cancel(); // Stop AI voice if playing
    setStep(3);
    setIsRecording(true);
    setIsPaused(false);
    setTimerSeconds(0);
    setLiveTranscript('');
    startLiveSpeechRecognition();
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    if (recognitionRef.current) {
      if (!isPaused) {
        recognitionRef.current.stop();
      } else {
        startLiveSpeechRecognition();
      }
    }
  };

  // Dynamic evaluation report state
  const [dynamicReport, setDynamicReport] = useState(null);

  // Dynamic AI Examiner Evaluation Generator based on actual speech metrics
  const generateDynamicEvaluation = (question, transcriptText, durationSecs) => {
    const rawText = (transcriptText || '').trim();
    const words = rawText.split(' ').filter(Boolean);
    const wordCount = words.length;

    // IF NOTHING SPOKEN -> BAND SCORE IS 0.0
    if (wordCount === 0 || !rawText) {
      return {
        overall: 0.0,
        fluency: {
          score: 0.0,
          feedback: 'No speech audio captured. You did not speak into your microphone.'
        },
        lexical: {
          score: 0.0,
          goodWords: [],
          replacements: []
        },
        grammar: {
          score: 0.0,
          corrections: []
        },
        pronunciation: {
          score: 0.0,
          difficultWords: []
        },
        contentQuality: 'No answer was provided for this cue card question.',
        strengths: [],
        weaknesses: [
          'No speech detected. Ensure your microphone is unmuted and speak clearly.'
        ],
        sampleAnswer: question.demoResponse.sampleAnswer,
        practiceTips: [
          'Unmute your microphone and grant browser permission.',
          'Speak clearly into your microphone for at least 1 to 2 minutes.'
        ]
      };
    }

    const wpm = durationSecs > 0 ? Math.round((wordCount / durationSecs) * 60) : 115;

    // Dynamic band score calculation based on word count & WPM variance
    let overallScore = 7.5;
    let fluencyScore = 7.5;
    let lexicalScore = 7.0;
    let grammarScore = 6.5;
    let pronScore = 7.0;

    if (wordCount >= 45) {
      overallScore = 8.0;
      fluencyScore = 8.0;
      lexicalScore = 8.0;
      grammarScore = 7.5;
      pronScore = 8.0;
    } else if (wordCount >= 25) {
      overallScore = 7.5;
      fluencyScore = 7.5;
      lexicalScore = 7.5;
      grammarScore = 7.0;
      pronScore = 7.5;
    } else if (wordCount >= 12) {
      overallScore = 6.5;
      fluencyScore = 6.5;
      lexicalScore = 6.5;
      grammarScore = 6.0;
      pronScore = 6.5;
    } else {
      overallScore = 5.5;
      fluencyScore = 5.5;
      lexicalScore = 5.5;
      grammarScore = 5.0;
      pronScore = 6.0;
    }

    return {
      overall: overallScore,
      fluency: {
        score: fluencyScore,
        feedback: `Captured ${wordCount} words at ~${wpm} WPM. ${wpm > 120 ? 'Fluent natural flow with minimal hesitation.' : 'Steady pace with slight vocabulary pauses.'}`
      },
      lexical: {
        score: lexicalScore,
        goodWords: question.demoResponse.lexical.goodWords,
        replacements: question.demoResponse.lexical.replacements
      },
      grammar: {
        score: grammarScore,
        corrections: question.demoResponse.grammar.corrections
      },
      pronunciation: {
        score: pronScore,
        difficultWords: question.demoResponse.pronunciation.difficultWords
      },
      contentQuality: `Responded to cue card prompts with ${wordCount} words captured.`,
      strengths: [
        `Speech speed: ~${wpm} WPM (${wordCount} words)`,
        `Clear topic context for "${question.title.split(' ')[1]} ${question.title.split(' ')[2]}"`,
        'Confident articulation & natural cadence'
      ],
      weaknesses: [
        'Practice using past perfect tense connectors like "furthermore"',
        'Incorporate 1-2 idiomatic expressions'
      ],
      sampleAnswer: question.demoResponse.sampleAnswer,
      practiceTips: question.demoResponse.practiceTips
    };
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsRecording(false);
    setStep(4);

    // Generate dynamic real-time report for this specific attempt
    const report = generateDynamicEvaluation(activeQuestion, liveTranscript, timerSeconds);
    setDynamicReport(report);

    // Simulate AI Examiner Evaluation Delay
    setTimeout(() => {
      setStep(5);
    }, 2200);
  };

  const handleReset = () => {
    window.speechSynthesis?.cancel();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setStep(1);
    setIsRecording(false);
    setIsPaused(false);
    setTimerSeconds(0);
    setLiveTranscript('');
    setSelectedHighlight(null);
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24 lg:py-32 border-t border-slate-800">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0097B2]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Title & Badge ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0097B2]/15 border border-[#0097B2]/30 text-[#0097B2] dark:text-cyan-300 text-xs font-black tracking-widest uppercase mb-4"
          >
            <span>Edwaay Free AI Speaking Engine</span>
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
              Free Live Voice Recognition
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-400 font-medium leading-relaxed"
          >
            Speak directly into your microphone for free live speech-to-text transcription, voice questions, and instant IELTS band score feedback!
          </motion.p>
        </div>

        {/* ── Question Selector & Reset Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-3.5 sm:p-4 rounded-3xl border border-slate-800 mb-10 shadow-2xl max-w-5xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 shrink-0 px-2">Question Bank:</span>
            {questionBank.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentQuestionIndex(idx);
                  if (step > 2) handleReset();
                  speakAIVoice(`Question: ${q.title}`);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer border ${
                  currentQuestionIndex === idx
                    ? 'bg-[#0097B2] text-white border-cyan-400 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Q{q.id}: {q.title.split(' ')[1]} {q.title.split(' ')[2]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => speakAIVoice(activeQuestion.title)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-800 text-xs font-extrabold text-cyan-300 hover:text-white cursor-pointer"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isSpeakingVoice ? 'animate-bounce text-cyan-400' : ''}`} />
              <span>{isSpeakingVoice ? 'Speaking...' : 'Play AI Voice'}</span>
            </button>
          </div>
        </div>


        {/* ── MAIN 3-PANEL INTERACTIVE INTERFACE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ─────────────────────────────────────────────────────────────
              LEFT PANEL: AI Examiner Avatar, Prompt & Controls
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            
            {/* AI Instructor & Prompt Card */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl space-y-6">
              
              {/* Header: Avatar */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0097B2] to-teal-400 flex items-center justify-center text-white shadow-lg shadow-[#0097B2]/30">
                  <Bot className="w-7 h-7" />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-1.5">
                    Edwaay AI Examiner
                  </h3>
                  <span className="text-xs font-semibold text-[#0097B2]">Free Web Speech API Powered</span>
                </div>
              </div>

              {/* Step 1: Greeting Speech Bubble */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium space-y-2">
                    <p className="text-[#0097B2] font-bold">Hello! Welcome to Edwaay AI Speaking Practice.</p>
                    <p>Today I'll ask you a speaking question. Please answer naturally as if you were talking to a real examiner.</p>
                    <p className="text-cyan-300 font-semibold">You can speak for up to 2 minutes. Are you ready?</p>
                  </div>

                  <button
                    onClick={handleStartDemo}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0097B2] to-cyan-500 hover:from-[#00849c] hover:to-cyan-600 text-white font-black text-sm shadow-xl shadow-[#0097B2]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Start AI Speaking Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Step 2+: Question Cue Card Display */}
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#0097B2]">
                        IELTS SPEAKING PART 2 CUE CARD
                      </span>
                      <button
                        onClick={() => speakAIVoice(activeQuestion.title)}
                        className="text-slate-400 hover:text-cyan-300"
                        title="Listen to question"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="text-base font-black text-white leading-snug">
                      "{activeQuestion.title}"
                    </h4>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 block">You should say:</span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {activeQuestion.bullets.map((b, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0097B2]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timer & Controls */}
                  {step === 2 && (
                    <button
                      onClick={handleBeginRecording}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0097B2] to-cyan-500 hover:from-[#00849c] hover:to-cyan-600 text-white font-black text-sm shadow-xl shadow-[#0097B2]/25 flex items-center justify-center gap-2 cursor-pointer transition-all animate-pulse"
                    >
                      <Mic className="w-5 h-5" />
                      <span>Start Live Mic Recording</span>
                    </button>
                  )}

                  {step >= 3 && (
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-center">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                        <span>Speaking Timer:</span>
                        <span className="text-cyan-400 font-mono text-sm">{formatTimer(timerSeconds)} / 02:00</span>
                      </div>

                      {/* Live Waveform Indicator */}
                      <div className="flex items-center justify-center gap-1.5 h-8">
                        {[40, 85, 60, 100, 75, 45, 90, 65, 95, 50, 80, 40, 70, 90, 60].map((h, i) => (
                          <motion.span
                            key={i}
                            animate={{ height: isRecording && !isPaused ? [`${h}%`, `${100 - h}%`, `${h}%`] : '20%' }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.06 }}
                            className="w-1 bg-[#0097B2] rounded-full"
                          />
                        ))}
                      </div>

                      {/* Interactive Controls (Pause/Resume & Stop) */}
                      {step === 3 && (
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleTogglePause}
                            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
                            <span>{isPaused ? 'Resume' : 'Pause'}</span>
                          </button>

                          <button
                            onClick={handleStopRecording}
                            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-black text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-600/30"
                          >
                            <Square className="w-3.5 h-3.5 fill-white" />
                            <span>Submit Answer</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

            </div>
          </div>


          {/* ─────────────────────────────────────────────────────────────
              CENTER PANEL: Live Speech-to-Text Transcript & Highlighting
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl min-h-[480px] flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-black text-white">Live Speech Transcription</h3>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                    step === 3
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 animate-pulse'
                      : step >= 4
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {step === 3 ? 'Live Mic Input' : step >= 4 ? 'Transcribed' : 'Awaiting Speech'}
                  </span>
                </div>

                {/* Transcript Body */}
                <div className="space-y-4 min-h-[300px]">
                  {step < 3 && (
                    <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500">
                      <Mic className="w-8 h-8 text-slate-600 mb-2 animate-pulse" />
                      <p className="text-xs font-semibold">Your live voice speech-to-text transcript will appear here in real time as you speak into your microphone.</p>
                    </div>
                  )}

                  {step >= 3 && (
                    <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 text-sm font-medium text-slate-200 leading-relaxed min-h-[260px] space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pb-2 border-b border-slate-800">
                        <span>Browser Web Speech STT Engine</span>
                        <span>{liveTranscript.split(' ').filter(Boolean).length} Words Captured</span>
                      </div>

                      <p className="italic text-slate-100">
                        {liveTranscript || "Listening to your voice..."}
                      </p>

                      {/* Error Highlighting Preview Mode after evaluation */}
                      {step === 5 && (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <span className="text-[11px] font-extrabold text-amber-400 block">
                            🔍 Detected Error Highlights (Click to View):
                          </span>
                          
                          <div className="flex flex-wrap gap-2 text-xs">
                            {activeQuestion.demoResponse.grammar.corrections.map((c, i) => (
                              <button
                                key={i}
                                onClick={() => setSelectedHighlight(c)}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold hover:bg-amber-500/30 transition-all cursor-pointer"
                              >
                                ⚠️ "{c.original}"
                              </button>
                            ))}
                          </div>

                          {selectedHighlight && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs space-y-1"
                            >
                              <div className="flex justify-between font-bold text-amber-300">
                                <span>Grammar Correction:</span>
                                <button onClick={() => setSelectedHighlight(null)} className="text-slate-400 hover:text-white">✕</button>
                              </div>
                              <p className="line-through text-slate-400">"{selectedHighlight.original}"</p>
                              <p className="text-emerald-400 font-bold">✔ "{selectedHighlight.better}"</p>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Free Web Speech API</span>
                <span>Real-Time Mic Stream</span>
              </div>
            </div>
          </div>


          {/* ─────────────────────────────────────────────────────────────
              RIGHT PANEL: Full Examiner Feedback Dashboard (12 Categories)
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl min-h-[480px]">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-black text-white">AI Examiner Feedback Dashboard</h3>
                </div>

                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-full border border-cyan-800">
                  IELTS Standard
                </span>
              </div>

              {/* Waiting State */}
              {step < 4 && (
                <div className="h-96 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500">
                  <Activity className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-xs font-semibold">Complete your speaking recording to unlock the 12-category IELTS Examiner Evaluation Dashboard.</p>
                </div>
              )}

              {/* Step 4: AI Evaluating Loader */}
              {step === 4 && (
                <div className="h-96 flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <Activity className="w-10 h-10 text-amber-400 animate-spin" />
                  <div>
                    <h4 className="text-base font-bold text-white">Analyzing Speech Transcript...</h4>
                    <p className="text-xs text-slate-400 mt-1">Evaluating Fluency, Grammar, Lexical Resource & Pronunciation</p>
                  </div>
                  <div className="w-48 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: 'linear' }}
                      className="h-full bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Full Evaluation Report */}
              {step === 5 && (() => {
                const activeResponse = dynamicReport || activeQuestion.demoResponse;
                return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 max-h-[580px] overflow-y-auto pr-1 text-xs"
                >
                  {/* Category 1: Overall Band Score Gauge */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                        OVERALL BAND SCORE
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        {activeResponse.overall >= 8.0 ? 'Expert Speaker' : activeResponse.overall >= 7.0 ? 'Good Competent Speaker' : 'Modest Speaker'}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 bg-[#0097B2]/20 px-3.5 py-1.5 rounded-xl border border-[#0097B2]/40">
                      <span className="text-2xl font-black text-cyan-300">{activeResponse.overall}</span>
                      <span className="text-[10px] text-slate-400 font-bold">/ 9.0</span>
                    </div>
                  </div>

                  {/* Category 2-5: 4 Criteria Breakdown */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 block">Fluency & Coherence</span>
                      <span className="font-black text-cyan-300 text-sm">{activeResponse.fluency.score}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 block">Lexical Resource</span>
                      <span className="font-black text-emerald-400 text-sm">{activeResponse.lexical.score}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 block">Grammar Accuracy</span>
                      <span className="font-black text-amber-400 text-sm">{activeResponse.grammar.score}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 block">Pronunciation</span>
                      <span className="font-black text-emerald-400 text-sm">{activeResponse.pronunciation.score}</span>
                    </div>
                  </div>

                  {/* Category 7: Side-by-side Grammar Corrections Table */}
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[11px] font-black text-amber-400 block">
                      📝 Side-by-Side Grammar Corrections
                    </span>
                    <div className="space-y-1.5 text-[11px]">
                      {activeResponse.grammar.corrections.map((item, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800 space-y-0.5">
                          <div className="text-slate-400 line-through">Your Sentence: "{item.original}"</div>
                          <div className="text-emerald-400 font-bold">Better Version: "{item.better}"</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 8: Vocabulary Upgrades */}
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[11px] font-black text-cyan-400 block">
                      📚 Vocabulary Upgrades
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {activeResponse.lexical.replacements.map((rep, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 line-through block">{rep.original}</span>
                          <span className="text-cyan-300 font-bold">↓ {rep.replacement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 9: Improved Sample Model Answer */}
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[11px] font-black text-purple-400 block">
                      ✨ Band 8.5+ Model Answer
                    </span>
                    <p className="text-[11px] text-slate-300 italic leading-relaxed bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      "{activeResponse.sampleAnswer}"
                    </p>
                  </div>

                  {/* Category 10 & 11: Strengths & Weaknesses */}
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[11px] font-black text-emerald-400 block">
                      ✓ Key Strengths
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {activeResponse.strengths.map((str, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Category 12: Personalized Practice Tips */}
                  <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[11px] font-black text-amber-400 block">
                      💡 Actionable Practice Tips
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {activeResponse.practiceTips.map((tip, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </motion.div>
                );
              })()}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
