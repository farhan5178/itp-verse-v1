import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  Volume2,
  X,
  ChevronRight,
  HelpCircle,
  MessageSquare,
  Scale,
  CreditCard,
  Globe,
  Sparkles,
  Zap,
  Star,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Crown
} from 'lucide-react';

const LEVELS_DATA = [
  {
    id: 1,
    levelNumber: 1,
    title: 'Level 1',
    subtitle: 'Foundation Essentials (Band 5.0 - 5.5 / Score 400 - 480)',
    unlocked: true,
    isLevelPaid: false,
    units: [
      {
        id: 'l1-u1',
        unitNumber: 1,
        title: 'Unit 1',
        subtitle: 'Getting Started',
        icon: MessageSquare,
        iconBg: 'from-purple-500/20 to-indigo-500/20 text-purple-600 dark:text-purple-400',
        completed: true,
        isPaid: false,
        summary: 'Essential greetings, classroom expressions, and foundational English sentence patterns.',
        lessonCount: 4,
        duration: '15 mins',
        quizQuestion: {
          question: 'Which of the following is the correct formal response to "How do you do?"',
          options: ['I am doing fine, thanks!', 'How do you do?', 'Nice to meet you too.', 'Yes, I do.'],
          correctIndex: 1,
          explanation: '"How do you do?" is a formal greeting, traditionally answered with "How do you do?" rather than describing your health.'
        }
      },
      {
        id: 'l1-u2',
        unitNumber: 2,
        title: 'Unit 2',
        subtitle: 'Numbers & Quantities (0-99)',
        icon: CreditCard,
        iconBg: 'from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400',
        completed: true,
        isPaid: false,
        summary: 'Master listening & writing numbers, dates, prices, and cardinal vs ordinal quantities.',
        lessonCount: 5,
        duration: '20 mins',
        quizQuestion: {
          question: 'In academic listening, how is the year 1905 usually pronounced?',
          options: ['Nineteen hundred five', 'Nineteen oh five', 'One thousand nine hundred five', 'Nineteen and five'],
          correctIndex: 1,
          explanation: 'Years with a zero in the tens place (like 1905) are standardly spoken as "nineteen oh five" in academic English audio.'
        }
      },
      {
        id: 'l1-u3',
        unitNumber: 3,
        title: 'Unit 3',
        subtitle: 'Practicing Intonation & Tones',
        icon: Scale,
        iconBg: 'from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400',
        completed: false,
        isPaid: false,
        summary: 'Learn rising vs falling pitch patterns in questions and statements for natural speaking fluency.',
        lessonCount: 6,
        duration: '25 mins',
        quizQuestion: {
          question: 'A Yes/No question ("Are you attending the lecture?") typically ends with:',
          options: ['Rising intonation', 'Falling intonation', 'Flat monotone intonation', 'Dropping pitch mid-sentence'],
          correctIndex: 0,
          explanation: 'Direct Yes/No questions in standard English feature rising intonation at the end of the clause.'
        }
      },
      {
        id: 'l1-u4',
        unitNumber: 4,
        title: 'Unit 4',
        subtitle: 'Introducing Yourself & Background',
        icon: CreditCard,
        iconBg: 'from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400',
        completed: false,
        isPaid: false,
        summary: 'Structure 1-minute intro responses regarding your major, hometown, and career goals.',
        lessonCount: 4,
        duration: '18 mins',
        quizQuestion: {
          question: 'Select the most natural academic phrase for introducing your study field:',
          options: ['I study computer since 2 years.', 'I am currently majoring in Computer Science.', 'My learn subject is Computer Science.', 'Computer Science is my study job.'],
          correctIndex: 1,
          explanation: '"I am currently majoring in [Field]" is the idiomatic standard in academic contexts.'
        }
      },
      {
        id: 'l1-u5',
        unitNumber: 5,
        title: 'Unit 5',
        subtitle: 'Vowels & Phonetic Sounds I',
        icon: MessageSquare,
        iconBg: 'from-indigo-500/20 to-blue-500/20 text-indigo-600 dark:text-indigo-400',
        completed: false,
        isPaid: false,
        summary: 'Distinguish subtle vowel contrasts (e.g. ship vs sheep, bit vs beat) to prevent listening errors.',
        lessonCount: 5,
        duration: '22 mins',
        quizQuestion: {
          question: 'Identify the word with a long vowel /iː/:',
          options: ['Sit', 'Seat', 'Set', 'Sat'],
          correctIndex: 1,
          explanation: '"Seat" contains the tense long /iː/ vowel, whereas "sit" uses the short lax /ɪ/.'
        }
      },
      {
        id: 'l1-u6',
        unitNumber: 6,
        title: 'Unit 6',
        subtitle: 'Global Languages & Cultures',
        icon: Globe,
        iconBg: 'from-cyan-500/20 to-teal-500/20 text-cyan-600 dark:text-cyan-400',
        completed: false,
        isPaid: false,
        summary: 'Explore academic passages discussing linguistic diversity, dialects, and global communication.',
        lessonCount: 6,
        duration: '30 mins',
        quizQuestion: {
          question: 'What is the main topic of most introductory sociolinguistics passages?',
          options: ['How language variation connects to social identity and geography.', 'How to memorize dictionary definitions alphabetically.', 'The exact number of words in computer programming.', 'How to spell difficult ancient names.'],
          correctIndex: 0,
          explanation: 'Sociolinguistics examines how social factors, identity, and regional background shape language use.'
        }
      },

      /* ── Level 1 Paid Units (7, 8, 9) ── */
      { id: 'l1-u7', unitNumber: 7, title: 'Unit 7', subtitle: 'Advanced Grammar & High-Band Syntax', icon: Sparkles, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Inverted sentences and complex relative clauses.' },
      { id: 'l1-u8', unitNumber: 8, title: 'Unit 8', subtitle: 'Academic Passage Speed Mapping', icon: BookOpen, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Fast paragraph mapping under 20-min timers.' },
      { id: 'l1-u9', unitNumber: 9, title: 'Unit 9', subtitle: 'Live AI Voice Benchmark & Report', icon: Trophy, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Live voice speech evaluation and score report.' }
    ]
  },
  {
    id: 2,
    levelNumber: 2,
    title: 'Level 2',
    subtitle: 'Elementary Mastery (Band 6.0 / Score 480 - 520)',
    unlocked: true,
    isLevelPaid: true,
    units: [
      { id: 'l2-u1', unitNumber: 1, title: 'Unit 1', subtitle: 'Subject-Verb Agreement Rules (Pro)', icon: BookOpen, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Complex subject-verb patterns.' },
      { id: 'l2-u2', unitNumber: 2, title: 'Unit 2', subtitle: 'Active vs Passive Transformations (Pro)', icon: Scale, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Academic passive voice conversion.' },
      { id: 'l2-u3', unitNumber: 3, title: 'Unit 3', subtitle: 'Campus Life Listening Scenarios (Pro)', icon: MessageSquare, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Office hour conversations and policies.' },
      { id: 'l2-u4', unitNumber: 4, title: 'Unit 4', subtitle: 'Sentence Connectors & Transitions (Pro)', icon: Sparkles, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Cohesive devices.' },
      { id: 'l2-u5', unitNumber: 5, title: 'Unit 5', subtitle: 'Academic Vocabulary Decks I (Pro)', icon: Zap, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: AWL 100 core vocabulary.' },
      { id: 'l2-u6', unitNumber: 6, title: 'Unit 6', subtitle: 'Graph & Table Reading Essentials (Pro)', icon: Globe, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Numerical trends in charts.' },
      { id: 'l2-u7', unitNumber: 7, title: 'Unit 7', subtitle: 'Complex Sentence Transformations (Pro)', icon: Sparkles, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Sentence pattern transformations.' },
      { id: 'l2-u8', unitNumber: 8, title: 'Unit 8', subtitle: 'Advanced Chart Overview Mastery (Pro)', icon: BookOpen, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Writing Task 1 overviews.' },
      { id: 'l2-u9', unitNumber: 9, title: 'Unit 9', subtitle: 'Live AI Audio Dictation Benchmark (Pro)', icon: Trophy, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Audio speed dictation evaluation.' }
    ]
  },
  {
    id: 3,
    levelNumber: 3,
    title: 'Level 3',
    subtitle: 'Intermediate Proficiency (Band 6.5 - 7.0 / Score 520 - 560)',
    unlocked: true,
    isLevelPaid: true,
    units: [
      { id: 'l3-u1', unitNumber: 1, title: 'Unit 1', subtitle: 'Relative & Reduced Clauses (Pro)', icon: BookOpen, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Reduced participle clauses.' },
      { id: 'l3-u2', unitNumber: 2, title: 'Unit 2', subtitle: 'Academic Lecture Dictation (Pro)', icon: MessageSquare, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Biology & history lecture note taking.' },
      { id: 'l3-u3', unitNumber: 3, title: 'Unit 3', subtitle: 'True / False / Not Given Logic (Pro)', icon: Scale, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Verification statement logic.' },
      { id: 'l3-u4', unitNumber: 4, title: 'Unit 4', subtitle: 'Structure & Written Expression (Pro)', icon: CreditCard, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Parallel structure errors.' },
      { id: 'l3-u5', unitNumber: 5, title: 'Unit 5', subtitle: 'Inference Questions in Reading (Pro)', icon: Sparkles, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Deduce unstated facts.' },
      { id: 'l3-u6', unitNumber: 6, title: 'Unit 6', subtitle: 'Task 2 Argument Essay Blueprint (Pro)', icon: Globe, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: 4-paragraph essay blueprints.' },
      { id: 'l3-u7', unitNumber: 7, title: 'Unit 7', subtitle: 'Advanced Paraphrasing Drills (Pro)', icon: Sparkles, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Synonym replacement drills.' },
      { id: 'l3-u8', unitNumber: 8, title: 'Unit 8', subtitle: 'Task 2 Band 8.0 Essay Rewrites (Pro)', icon: BookOpen, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Sentence upgrades with AI.' },
      { id: 'l3-u9', unitNumber: 9, title: 'Unit 9', subtitle: 'Multi-Accent Audio Simulator (Pro)', icon: Trophy, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Multi-accent listening drills.' }
    ]
  },
  {
    id: 4,
    levelNumber: 4,
    title: 'Level 4',
    subtitle: 'Advanced Academic Competency (Band 7.5 / Score 560 - 600)',
    unlocked: true,
    isLevelPaid: true,
    units: [
      { id: 'l4-u1', unitNumber: 1, title: 'Unit 1', subtitle: 'Conditionals & Inversion (Pro)', icon: BookOpen, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Inverted conditionals.' },
      { id: 'l4-u2', unitNumber: 2, title: 'Unit 2', subtitle: 'Multi-Speaker Campus Dialogues (Pro)', icon: MessageSquare, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: 3-speaker campus conversations.' },
      { id: 'l4-u3', unitNumber: 3, title: 'Unit 3', subtitle: 'Passage Heading Matching (Pro)', icon: Scale, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Paragraph themes.' },
      { id: 'l4-u4', unitNumber: 4, title: 'Unit 4', subtitle: 'High-Level Lexical Collocations (Pro)', icon: CreditCard, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Band 8.0+ collocations.' },
      { id: 'l4-u5', unitNumber: 5, title: 'Unit 5', subtitle: 'Scientific & Humanities Passages (Pro)', icon: Sparkles, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Technical jargon context clues.' },
      { id: 'l4-u6', unitNumber: 6, title: 'Unit 6', subtitle: 'Speaking Cue Card Storytelling (Pro)', icon: Globe, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: 2-minute presentations.' },
      { id: 'l4-u7', unitNumber: 7, title: 'Unit 7', subtitle: 'Scientific Technical Decoding (Pro)', icon: Sparkles, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Advanced astrophysics decoding.' },
      { id: 'l4-u8', unitNumber: 8, title: 'Unit 8', subtitle: 'Cue Card Speaking Speed AI (Pro)', icon: BookOpen, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: WPM & intonation scoring.' },
      { id: 'l4-u9', unitNumber: 9, title: 'Unit 9', subtitle: 'Full Reading Mock Simulator (Pro)', icon: Trophy, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: 3 reading passages 60-min timer.' }
    ]
  },
  {
    id: 5,
    levelNumber: 5,
    title: 'Level 5',
    subtitle: 'Expert Fluency (Band 8.0 / Score 600 - 640)',
    unlocked: true,
    isLevelPaid: true,
    units: [
      { id: 'l5-u1', unitNumber: 1, title: 'Unit 1', subtitle: 'Advanced Subjunctive & Modals (Pro)', icon: BookOpen, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Subjunctive mood.' },
      { id: 'l5-u2', unitNumber: 2, title: 'Unit 2', subtitle: 'Speed Reading & Time Strategy (Pro)', icon: MessageSquare, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: 20-min passage strategy.' },
      { id: 'l5-u3', unitNumber: 3, title: 'Unit 3', subtitle: 'Distractor Detection in Audio (Pro)', icon: Scale, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Audio self-corrections.' },
      { id: 'l5-u4', unitNumber: 4, title: 'Unit 4', subtitle: 'Cohesive Paragraph Development (Pro)', icon: CreditCard, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: PEEL paragraph structure.' },
      { id: 'l5-u5', unitNumber: 5, title: 'Unit 5', subtitle: 'Idiomatic & Phrasal Precision (Pro)', icon: Sparkles, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Academic phrasal verbs.' },
      { id: 'l5-u6', unitNumber: 6, title: 'Unit 6', subtitle: 'Speaking Part 3 Abstract Discussion (Pro)', icon: Globe, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Societal themes discussion.' },
      { id: 'l5-u7', unitNumber: 7, title: 'Unit 7', subtitle: 'Native Idiomatic Phrasebooks (Pro)', icon: Sparkles, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Band 8.5+ native idioms.' },
      { id: 'l5-u8', unitNumber: 8, title: 'Unit 8', subtitle: 'Live AI Part 3 Examiner Mock (Pro)', icon: BookOpen, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Live adaptive voice interview.' },
      { id: 'l5-u9', unitNumber: 9, title: 'Unit 9', subtitle: 'Full 4-Module IELTS Benchmark (Pro)', icon: Trophy, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: 2h 40m full exam simulation.' }
    ]
  },
  {
    id: 6,
    levelNumber: 6,
    title: 'Level 6',
    subtitle: 'Mastery Benchmark (Band 8.5 - 9.0 / Score 640 - 677)',
    unlocked: true,
    isLevelPaid: true,
    units: [
      { id: 'l6-u1', unitNumber: 1, title: 'Unit 1', subtitle: 'Full Diagnostic Mock Simulation (Pro)', icon: Trophy, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: 1:1 full simulation.' },
      { id: 'l6-u2', unitNumber: 2, title: 'Unit 2', subtitle: 'Speed Accuracy Drills (Pro)', icon: Zap, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: 50 structure items under 30 mins.' },
      { id: 'l6-u3', unitNumber: 3, title: 'Unit 3', subtitle: 'Complex Synthesis & Summarization (Pro)', icon: BookOpen, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Research synthesis.' },
      { id: 'l6-u4', unitNumber: 4, title: 'Unit 4', subtitle: 'Band 9.0 Lexical Resource Polish (Pro)', icon: Star, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Academic register perfection.' },
      { id: 'l6-u5', unitNumber: 5, title: 'Unit 5', subtitle: 'Live AI Examiner Interview (Pro)', icon: MessageSquare, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: 14-min voice examination.' },
      { id: 'l6-u6', unitNumber: 6, title: 'Unit 6', subtitle: 'Official Readiness Certification (Pro)', icon: Award, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Verified readiness seal.' },
      { id: 'l6-u7', unitNumber: 7, title: 'Unit 7', subtitle: 'Mastery Score Prediction Report (Pro)', icon: Sparkles, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Band score percentile ranking.' },
      { id: 'l6-u8', unitNumber: 8, title: 'Unit 8', subtitle: 'Official University Admission Match (Pro)', icon: BookOpen, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: Direct 1-on-1 advisor match.' },
      { id: 'l6-u9', unitNumber: 9, title: 'Unit 9', subtitle: 'Edwaay Official Master Certificate (Pro)', icon: Trophy, iconBg: 'from-amber-500/30 to-yellow-500/30 text-amber-500', completed: false, isPaid: true, summary: 'Pro module: LinkedIn & PDF master certificate.' }
    ]
  }
];

export default function StructuredInteractiveLessons() {
  const navigate = useNavigate();
  const [activeLevelId, setActiveLevelId] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [proModalUnit, setProModalUnit] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [completedUnits, setCompletedUnits] = useState({ 'l1-u1': true, 'l1-u2': true });

  const currentLevel = LEVELS_DATA.find((l) => l.id === activeLevelId) || LEVELS_DATA[0];

  const handleUnitClick = (unit) => {
    if (unit.isPaid) {
      setProModalUnit(unit);
    } else {
      setSelectedUnit(unit);
      setShowResult(false);
    }
  };

  const handleOptionSelect = (optionIndex) => {
    if (!selectedUnit) return;
    setUserAnswers((prev) => ({
      ...prev,
      [selectedUnit.id]: optionIndex
    }));
    setShowResult(true);
  };

  const handleMarkComplete = (unitId) => {
    setCompletedUnits((prev) => ({
      ...prev,
      [unitId]: true
    }));
    setSelectedUnit(null);
  };

  const selectedAnswerIndex = selectedUnit ? userAnswers[selectedUnit.id] : undefined;
  const isAnswered = selectedAnswerIndex !== undefined;
  const isCorrect = selectedUnit && isAnswered && selectedAnswerIndex === selectedUnit.quizQuestion.correctIndex;

  return (
    <section id="structured-lessons" className="py-12 sm:py-16 lg:py-20 bg-slate-50/60 dark:bg-dark-900/60 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0097B2]/10 dark:bg-[#0097B2]/15 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Top Header Section (Matching Screenshot) ── */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          {/* Top Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E6F5F7] dark:bg-[#0097B2]/20 border border-[#0097B2]/30 text-[#0097B2] dark:text-cyan-300 text-xs font-black uppercase tracking-wider mb-4 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>IELTS / TOEFL GAMIFIED PATHWAY</span>
          </motion.div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            Structured Interactive Lessons
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
            Level 1 (Units 1–6) is 100% Free! Upgrade to Edwaay Pro to unlock Units 7–9 & Levels 2–6.
          </p>
        </div>

        {/* ── Horizontal Level Stepper Bar ── */}
        <div className="relative mb-8 sm:mb-12">
          {/* Connecting Horizontal Line */}
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 dark:bg-dark-700 -z-0" />

          <div className="flex items-center justify-between max-w-2xl mx-auto px-2 relative z-10">
            {LEVELS_DATA.map((lvl) => {
              const isActive = lvl.id === activeLevelId;
              const isPaidLvl = lvl.isLevelPaid;
              const levelCompleted = !isPaidLvl && lvl.units.filter(u => !u.isPaid).every((u) => completedUnits[u.id]);

              return (
                <button
                  key={lvl.id}
                  onClick={() => setActiveLevelId(lvl.id)}
                  className="group flex flex-col items-center cursor-pointer focus:outline-none"
                >
                  {/* Stepper Circle Indicator */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                      isActive
                        ? isPaidLvl
                          ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 border-2 border-amber-300 shadow-lg scale-110 text-slate-950 font-black'
                          : 'bg-white dark:bg-dark-800 border-2 border-[#0097B2] shadow-lg scale-110'
                        : isPaidLvl
                        ? 'bg-slate-100 dark:bg-dark-800 border-2 border-amber-500/40 hover:border-amber-400'
                        : 'bg-white dark:bg-dark-800 border-2 border-slate-300 dark:border-dark-700 hover:border-[#0097B2]/60'
                    }`}
                  >
                    {/* Active Indicator or Lock */}
                    {isPaidLvl ? (
                      <Lock className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-500'}`} />
                    ) : isActive ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-[#0097B2] animate-pulse" />
                    ) : levelCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-dark-700 group-hover:bg-[#0097B2]/50 transition-colors" />
                    )}
                  </div>

                  {/* Level Label */}
                  <span
                    className={`text-xs font-bold mt-2 transition-colors relative flex items-center gap-1 ${
                      isActive
                        ? isPaidLvl
                          ? 'text-amber-500 font-black'
                          : 'text-[#0097B2] dark:text-cyan-400 font-extrabold'
                        : isPaidLvl
                        ? 'text-amber-600/80 dark:text-amber-400/80'
                        : 'text-slate-500 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}
                  >
                    <span>L{lvl.levelNumber}</span>
                    {isPaidLvl && <Crown className="w-3 h-3 text-amber-500" />}

                    {/* Active Underline Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeLevelUnderline"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                          isPaidLvl ? 'bg-amber-500' : 'bg-[#0097B2]'
                        }`}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Level Header Card (Cyan for Free L1, Gold Gradient for Paid L2-L6) ── */}
        <motion.div
          key={currentLevel.id}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`relative rounded-3xl p-6 sm:p-8 mb-10 shadow-xl overflow-hidden text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            currentLevel.isLevelPaid
              ? 'bg-gradient-to-r from-[#1c1404] via-[#2c1d06] to-[#120a01] border border-amber-400/60 shadow-amber-500/20'
              : 'bg-gradient-to-r from-[#0097B2] via-[#008ba4] to-[#004B59]'
          }`}
        >
          {/* Subtle Ambient Light Overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight drop-shadow-xs">
                {currentLevel.title}
              </h3>
              {currentLevel.isLevelPaid ? (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Crown className="w-3.5 h-3.5" />
                  <span>PRO LEVEL — All 9 Units Paid</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-white border border-white/30">
                  Units 1–6 Free • Units 7–9 Pro
                </span>
              )}
            </div>
            <p className="text-xs sm:text-base font-semibold drop-shadow-xs text-zinc-200">
              {currentLevel.subtitle}
            </p>
          </div>

          {/* Right Ribbon / Medal Badge Icon */}
          <div className={`relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner backdrop-blur-md border ${
            currentLevel.isLevelPaid
              ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
              : 'bg-white/15 border-white/25 text-white'
          }`}>
            {currentLevel.isLevelPaid ? <Lock className="w-8 h-8 sm:w-9 sm:h-9" /> : <Award className="w-8 h-8 sm:w-9 sm:h-9" />}
          </div>
        </motion.div>

        {/* ── Units Grid (3 Columns x 3 Rows = 9 Total Units per Level) ── */}
        <div className="relative mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {currentLevel.units.map((unit, idx) => {
              const IconComp = unit.icon;
              const isUnitCompleted = completedUnits[unit.id];
              const isPaidUnit = unit.isPaid;

              return (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => handleUnitClick(unit)}
                  className="flex flex-col items-center text-center cursor-pointer group relative"
                >
                  {/* Paid / Pro Badge Header Tag */}
                  {isPaidUnit && (
                    <div className="absolute -top-3.5 z-20 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md border border-amber-300">
                      <Crown className="w-3 h-3 text-slate-950" />
                      <span>PRO PAID</span>
                    </div>
                  )}

                  {/* Circular Node Container with Dual Ring Accent */}
                  <div className="relative mb-4">
                    {/* Outer Decorative Ring */}
                    <div
                      className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center p-1.5 transition-all duration-300 shadow-md ${
                        isPaidUnit
                          ? 'bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 shadow-amber-500/20 ring-4 ring-amber-400/20'
                          : isUnitCompleted
                          ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-emerald-500/20 ring-4 ring-emerald-500/20'
                          : 'bg-gradient-to-tr from-slate-200 via-cyan-100 to-slate-200 dark:from-dark-700 dark:via-[#122D36] dark:to-dark-700 group-hover:from-[#0097B2] group-hover:to-[#004B59] group-hover:shadow-lg group-hover:shadow-[#0097B2]/25'
                      }`}
                    >
                      {/* Inner White/Dark Circle */}
                      <div className="w-full h-full rounded-full bg-white dark:bg-dark-800 flex items-center justify-center relative shadow-inner border border-slate-100 dark:border-dark-750 overflow-hidden">
                        {isPaidUnit ? (
                          <div className="flex flex-col items-center justify-center text-amber-500">
                            <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 group-hover:scale-110 transition-transform" />
                            <span className="text-[9px] font-black uppercase text-amber-600 dark:text-amber-400 mt-1">LOCKED</span>
                          </div>
                        ) : isUnitCompleted ? (
                          <div className="flex flex-col items-center justify-center text-emerald-500">
                            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
                          </div>
                        ) : (
                          <div className={`p-4 rounded-2xl bg-gradient-to-br ${unit.iconBg} transition-transform group-hover:scale-110 duration-300`}>
                            <IconComp className="w-8 h-8 sm:w-10 sm:h-10" />
                          </div>
                        )}

                        {/* Top-Right Badge Number */}
                        <div className={`absolute top-0 right-0 translate-x-1 -translate-y-1 w-7 h-7 rounded-full text-white text-xs font-black flex items-center justify-center border-2 border-white dark:border-dark-800 shadow-sm ${
                          isPaidUnit ? 'bg-amber-500' : 'bg-[#0097B2]'
                        }`}>
                          {unit.unitNumber}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Unit Title */}
                  <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-[#0097B2] dark:group-hover:text-cyan-400 transition-colors mb-0.5 flex items-center gap-1">
                    <span>{unit.title}</span>
                    {isPaidUnit && <Lock className="w-3.5 h-3.5 text-amber-500" />}
                  </h4>

                  {/* Unit Subtitle */}
                  <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 max-w-[180px] leading-tight">
                    {unit.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ── TAKE MOCK TEST Floating CTA Pill ── */}
          <div className="flex justify-center my-10 relative z-20">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/mock-test')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0097B2] to-cyan-500 hover:from-[#00788E] hover:to-[#0097B2] text-white text-sm font-black uppercase tracking-wider shadow-lg shadow-[#0097B2]/35 cursor-pointer flex items-center gap-2 transition-all border border-white/30"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>TAKE MOCK TEST</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* ── Interactive Free Unit Quiz Modal ── */}
        <AnimatePresence>
          {selectedUnit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedUnit(null)}
                className="absolute inset-0 bg-slate-900/70 dark:bg-black/80 backdrop-blur-md"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="p-6 bg-gradient-to-r from-slate-900 via-[#091b20] to-[#004B59] text-white relative">
                  <button
                    onClick={() => setSelectedUnit(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0097B2]/30 border border-[#0097B2]/40 text-xs font-bold text-cyan-300 mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{currentLevel.title} • {selectedUnit.title} (Free Unit)</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    {selectedUnit.subtitle}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 font-medium">
                    {selectedUnit.summary}
                  </p>
                </div>

                {/* Modal Body / Interactive Quiz Question */}
                <div className="p-6 overflow-y-auto space-y-5 bg-slate-50 dark:bg-dark-900/60">
                  <div className="p-4 rounded-2xl bg-white dark:bg-dark-800 border border-slate-200/80 dark:border-dark-750 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-zinc-400">
                      <span>Concept Knowledge Quiz</span>
                      <span>1 Question</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                      {selectedUnit.quizQuestion?.question}
                    </h4>

                    {/* Options Grid */}
                    <div className="space-y-2 pt-2">
                      {selectedUnit.quizQuestion?.options.map((opt, oIdx) => {
                        const isSelected = selectedAnswerIndex === oIdx;
                        const isCorrectOpt = oIdx === selectedUnit.quizQuestion.correctIndex;

                        let btnClasses = 'border-slate-200 dark:border-dark-700 bg-white dark:bg-dark-800 hover:border-[#0097B2] text-slate-800 dark:text-zinc-200';
                        if (showResult) {
                          if (isCorrectOpt) {
                            btnClasses = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold';
                          } else if (isSelected && !isCorrectOpt) {
                            btnClasses = 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleOptionSelect(oIdx)}
                            className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${btnClasses}`}
                          >
                            <span>{opt}</span>
                            {showResult && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback Box */}
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        <p className="font-extrabold mb-0.5">
                          {isCorrect ? '🎉 Correct Answer!' : '❌ Incorrect choice'}
                        </p>
                        <p>{selectedUnit.quizQuestion?.explanation}</p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-white dark:bg-dark-800 border-t border-slate-200 dark:border-dark-700 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedUnit(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-dark-700 hover:bg-slate-200 text-slate-700 dark:text-zinc-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => handleMarkComplete(selectedUnit.id)}
                    className="px-5 py-2 rounded-xl bg-[#0097B2] hover:bg-[#00788E] text-white text-xs font-extrabold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Unit</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── PRO PAID UNITS Upgrade Modal ── */}
        <AnimatePresence>
          {proModalUnit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setProModalUnit(null)}
                className="absolute inset-0 bg-slate-900/80 dark:bg-black/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-gradient-to-b from-[#091b20] via-[#0d242b] to-[#061317] border border-amber-400/50 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col text-white"
              >
                {/* Header */}
                <div className="p-6 text-center relative border-b border-amber-400/20">
                  <button
                    onClick={() => setProModalUnit(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30 text-slate-950">
                    <Crown className="w-9 h-9" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                    PRO LEVEL {currentLevel.levelNumber} • UNIT {proModalUnit.unitNumber}
                  </span>

                  <h3 className="text-2xl font-black tracking-tight mt-2 text-white">
                    Unlock Level {currentLevel.levelNumber} & Paid Units
                  </h3>
                  <p className="text-xs text-zinc-300 max-w-sm mx-auto mt-1 font-medium">
                    "{proModalUnit.subtitle}" requires Edwaay Pro Subscription.
                  </p>
                </div>

                {/* Features List */}
                <div className="p-6 space-y-3 bg-white/5">
                  <div className="flex items-center gap-3 text-xs font-bold text-zinc-200">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Unlock Levels 2 to 6 & all Paid Units (48 Pro Units)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-zinc-200">
                    <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Advanced Band 8.0+ Lexical Decks & Task 2 Essay Rewrites</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-zinc-200">
                    <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Unlimited AI Voice Speech Evaluation & Practice Drills</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-zinc-200">
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>Official University Admission Readiness Certificate</span>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="p-6 space-y-3 text-center border-t border-amber-400/20">
                  <button
                    onClick={() => {
                      alert('Redirecting to Edwaay Pro Subscription checkout...');
                      setProModalUnit(null);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/30 hover:opacity-95 cursor-pointer flex items-center justify-center gap-2 transition-all"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Upgrade to Pro — $19 / month</span>
                  </button>

                  <button
                    onClick={() => setProModalUnit(null)}
                    className="text-xs text-zinc-400 hover:text-white font-bold cursor-pointer"
                  >
                    Return to Free Level 1 Units
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
