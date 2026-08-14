import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Volume2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Layers,
  RotateCcw,
  Zap,
  Filter,
  Grid,
  Table as TableIcon,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   FULL AUTHORITATIVE BAND 8.5+ IELTS VOCABULARY DATABASE
   ───────────────────────────────────────────────────────────── */
const fullVocabDatabase = [
  // ── 1. WRITING TASK 2: ENVIRONMENT & CLIMATE ──
  {
    id: 'v1',
    phrase: 'Substantial improvement',
    phonetic: '/səbˈstæn.ʃəl ɪmˈpruːv.mənt/',
    type: 'Academic Collocation',
    band: 'Band 8.5+',
    category: 'Environment & Climate',
    definition: 'A large, significant, and noticeable progress or advancement.',
    bangla: 'উল্লেখযোগ্য বা লক্ষণীয় উন্নতি',
    basicWord: 'Big help / Good change',
    basicSentence: 'Planting trees gave a good change to the city air.',
    upgradedSentence: 'Implementing urban green spaces resulted in a substantial improvement in overall air quality.',
    collocates: ['substantial improvement in', 'noticeable improvement', 'markedly improve'],
    example: 'Strict emission regulations led to a substantial improvement in metropolitan air purity over five years.'
  },
  {
    id: 'v2',
    phrase: 'Exacerbate the dilemma',
    phonetic: '/ɪɡˈzæs.ə.beɪt ðə dɪˈlem.ə/',
    type: 'Academic Collocation',
    band: 'Band 8.5+',
    category: 'Environment & Climate',
    definition: 'To make an already difficult problem or situation significantly worse.',
    bangla: 'সমস্যা বা সংকটকে আরও তীব্র বা খারাপ করে তোলা',
    basicWord: 'Make problem worse',
    basicSentence: 'Cutting trees makes the hot weather problem worse.',
    upgradedSentence: 'Unchecked deforestation serves to exacerbate the dilemma of global climate volatility.',
    collocates: ['exacerbate the crisis', 'exacerbate environmental degradation', 'further exacerbate'],
    example: 'Rapid urbanization without green infrastructure will only exacerbate the dilemma of city flash floods.'
  },
  {
    id: 'v3',
    phrase: 'Catastrophic repercussions',
    phonetic: '/ˌkæt.əˈstrɒf.ɪk ˌriː.pəˈkʌʃ.ənz/',
    type: 'Academic Collocation',
    band: 'Band 9.0',
    category: 'Environment & Climate',
    definition: 'Disastrous and far-reaching negative consequences or aftermath.',
    bangla: 'ভয়াবহ বা মারাত্মক পরিণতি',
    basicWord: 'Very bad results',
    basicSentence: 'Global warming will have very bad results for ocean animals.',
    upgradedSentence: 'Rising sea levels pose catastrophic repercussions for coastal marine ecosystems.',
    collocates: ['catastrophic repercussions for', 'severe repercussions', 'dire consequences'],
    example: 'Failing to curb industrial carbon discharge could trigger catastrophic repercussions for future generations.'
  },

  // ── 2. WRITING TASK 2: AI, TECH & INNOVATION ──
  {
    id: 'v4',
    phrase: 'Ubiquitous phenomenon',
    phonetic: '/juːˈbɪk.wɪ.təs fəˈnɒm.ɪ.nən/',
    type: 'Academic Collocation',
    band: 'Band 8.5+',
    category: 'AI & Technology',
    definition: 'Something that is present, appearing, or found everywhere in daily life.',
    bangla: 'সর্বব্যাপী বা সর্বত্র বিদ্যমান ঘটনা',
    basicWord: 'Everywhere thing',
    basicSentence: 'Smartphones are everywhere now.',
    upgradedSentence: 'Smartphones have transitioned into a ubiquitous phenomenon across modern societies.',
    collocates: ['ubiquitous presence', 'ubiquitous in society', 'become ubiquitous'],
    example: 'Artificial intelligence tools are rapidly becoming a ubiquitous phenomenon in contemporary workplaces.'
  },
  {
    id: 'v5',
    phrase: 'Fostering innovation',
    phonetic: '/ˈfɒs.tər.ɪŋ ˌɪn.əˈveɪ.ʃən/',
    type: 'Academic Collocation',
    band: 'Band 8.0+',
    category: 'AI & Technology',
    definition: 'Encouraging, supporting, and promoting the creation of new ideas and methods.',
    bangla: 'উদ্ভাবন এবং নতুন চিন্তাধারা উৎসাহিত করা',
    basicWord: 'Helping new ideas',
    basicSentence: 'Government money helps new tech ideas.',
    upgradedSentence: 'Government research grants play a vital role in fostering innovation within renewable energy sectors.',
    collocates: ['fostering innovation and growth', 'foster technological creativity', 'actively foster'],
    example: 'Educational institutions should prioritize collaborative labs aimed at fostering innovation among young engineers.'
  },
  {
    id: 'v6',
    phrase: 'Paradigmatic shift',
    phonetic: '/ˌpær.ə.dɪɡˈmæt.ɪk ʃɪft/',
    type: 'Advanced Synonym',
    band: 'Band 9.0',
    category: 'AI & Technology',
    definition: 'A fundamental, revolutionary change in approach or underlying assumptions.',
    bangla: 'মৌলিক দৃষ্টিভঙ্গি বা ব্যবস্থার যুগান্তকারী পরিবর্তন',
    basicWord: 'Big change in system',
    basicSentence: 'Remote work changed the normal office work system.',
    upgradedSentence: 'The advent of remote employment represents a paradigmatic shift in workplace dynamics.',
    collocates: ['paradigmatic shift in', 'represent a shift', 'fundamental shift'],
    example: 'Integrating generative AI marks a paradigmatic shift in how software development is conducted worldwide.'
  },

  // ── 3. WRITING TASK 2: EDUCATION & YOUTH ──
  {
    id: 'v7',
    phrase: 'Pivotal role',
    phonetic: '/ˈpɪv.ə.təl rəʊl/',
    type: 'Academic Collocation',
    band: 'Band 8.0+',
    category: 'Education & Society',
    definition: 'A crucial, essential, and central part played by someone or something.',
    bangla: 'অত্যন্ত গুরুত্বপূর্ণ বা কেন্দ্রীয় ভূমিকা',
    basicWord: 'Very important part',
    basicSentence: 'Teachers play a very important part in child building.',
    upgradedSentence: 'Educators play a pivotal role in shaping the cognitive and ethical development of youth.',
    collocates: ['play a pivotal role', 'pivotal factor', 'pivotal position'],
    example: 'Early childhood education performs a pivotal role in narrowing economic achievement gaps.'
  },
  {
    id: 'v8',
    phrase: 'Holistic development',
    phonetic: '/həʊˈlɪs.tɪk dɪˈvel.əp.mənt/',
    type: 'Academic Collocation',
    band: 'Band 8.5+',
    category: 'Education & Society',
    definition: 'Comprehensive growth addressing intellectual, emotional, social, and physical needs.',
    bangla: 'সর্বাঙ্গীন বা সামগ্রিক বিকাশ',
    basicWord: 'Full development',
    basicSentence: 'Sports help students develop fully.',
    upgradedSentence: 'Extracurricular activities are indispensable for fostering the holistic development of students.',
    collocates: ['promote holistic development', 'holistic approach', 'holistic learning environment'],
    example: 'Modern school curricula ought to balance academic rigour with physical activities to ensure holistic development.'
  },
  {
    id: 'v9',
    phrase: 'Insurmountable challenge',
    phonetic: '/ˌɪn.səˈmaʊn.tə.bəl ˈtʃæl.ɪndʒ/',
    type: 'Academic Collocation',
    band: 'Band 8.5+',
    category: 'Education & Society',
    definition: 'A difficulty too great to be overcome or resolved easily.',
    bangla: 'দুর্লঙ্ঘ্য বা অতিক্রান্ত করা কঠিন বাধা',
    basicWord: 'Very hard problem',
    basicSentence: 'High tuition fees are a very hard problem for poor students.',
    upgradedSentence: 'Escalating tuition fees pose an insurmountable challenge for underprivileged students.',
    collocates: ['present an insurmountable challenge', 'insurmountable barrier', 'insurmountable obstacle'],
    example: 'Without international scholarships, study costs remain an insurmountable challenge for brilliant low-income applicants.'
  },

  // ── 4. WRITING TASK 1: TRENDS & GRAPHS ──
  {
    id: 'v10',
    phrase: 'Skyrocketed exponentially',
    phonetic: '/ˈskaɪˌrɒk.ɪt.ɪd ˌek.spəˈnen.ʃəl.i/',
    type: 'Task 1 Descriptor',
    band: 'Band 8.5+',
    category: 'Task 1 Graphs & Trends',
    definition: 'Increased or rose extremely rapidly and dramatically over a given period.',
    bangla: 'দ্রুত এবং আশঙ্কাজনকভাবে বৃদ্ধি পাওয়া',
    basicWord: 'Went up very fast',
    basicSentence: 'The number of online users went up very fast in 2022.',
    upgradedSentence: 'The proportion of online learners skyrocketed exponentially between 2020 and 2022.',
    collocates: ['skyrocketed to a peak of', 'increase exponentially', 'surge dramatically'],
    example: 'Solar energy adoption skyrocketed exponentially, reaching an unprecedented high of 85% in 2025.'
  },
  {
    id: 'v11',
    phrase: 'Plummeted to a low of',
    phonetic: '/ˈplʌm.ɪt.ɪd tuː ə ləʊ ɒv/',
    type: 'Task 1 Descriptor',
    band: 'Band 8.5+',
    category: 'Task 1 Graphs & Trends',
    definition: 'Fell or dropped sharply and steeply to a minimum point.',
    bangla: 'দ্রুতগতিতে সর্বনিম্ন পর্যায়ে নেমে আসা',
    basicWord: 'Went down to low point',
    basicSentence: 'Car sales went down to a low point in winter.',
    upgradedSentence: 'Automobile purchases plummeted to a low of 12,000 units during the fourth quarter.',
    collocates: ['plummeted sharply', 'slumped dramatically', 'hit rock bottom at'],
    example: 'Unemployment figures plummeted to an all-time low of 3.2% following economic recovery policies.'
  },
  {
    id: 'v12',
    phrase: 'Oscillated erratically',
    phonetic: '/ˈɒs.ɪ.leɪt.ɪd ɪˈræt.ɪ.kəl.i/',
    type: 'Task 1 Descriptor',
    band: 'Band 9.0',
    category: 'Task 1 Graphs & Trends',
    definition: 'Swung back and forth unpredictably without a fixed pattern.',
    bangla: 'অস্থির ও অনিয়মিতভাবে ওঠানামা করা',
    basicWord: 'Changed up and down',
    basicSentence: 'Oil prices changed up and down every month.',
    upgradedSentence: 'Crude oil valuations oscillated erratically throughout the fiscal year.',
    collocates: ['oscillate between', 'fluctuate wildly', 'erratic shifts'],
    example: 'Tourist arrival numbers oscillated erratically due to seasonal weather disruptions and travel advisories.'
  },

  // ── 5. SPEAKING PART 2 & 3: IDIOMS & FLUENCY ──
  {
    id: 'v13',
    phrase: 'Double-edged sword',
    phonetic: '/ˈdʌb.əl edʒd sɔːd/',
    type: 'High-Score Idiom',
    band: 'Band 8.0+',
    category: 'Speaking Fluency & Idioms',
    definition: 'Something that has both significant advantages and severe disadvantages.',
    bangla: 'দুমুখী তলোয়ার (যার ভালো ও খারাপ উভয় দিকই আছে)',
    basicWord: 'Good and bad thing',
    basicSentence: 'Social media is a good and bad thing for young people.',
    upgradedSentence: 'Social media platforms are undoubtedly a double-edged sword for teenager mental wellbeing.',
    collocates: ['a double-edged sword', 'prove to be a double-edged sword', 'inherently double-edged'],
    example: 'Tourism acts as a double-edged sword; it boosts local business while polluting natural habitats.'
  },
  {
    id: 'v14',
    phrase: 'Hit the nail on the head',
    phonetic: '/hɪt ðə neɪl ɒn ðə hed/',
    type: 'High-Score Idiom',
    band: 'Band 8.5+',
    category: 'Speaking Fluency & Idioms',
    definition: 'To describe exactly right or express the precise truth about a situation.',
    bangla: 'যথার্থ বা একদম সঠিকভাবে ব্যাখ্যা করা',
    basicWord: 'Said exact correct thing',
    basicSentence: 'My friend said the exact correct reason for exam stress.',
    upgradedSentence: 'My mentor hit the nail on the head when analyzing the root cause of exam anxiety.',
    collocates: ['hit the nail on the head', 'precisely state', 'spot-on analysis'],
    example: 'When the researcher pointed out urban congestion factors, she truly hit the nail on the head.'
  },
  {
    id: 'v15',
    phrase: 'Over the moon',
    phonetic: '/ˈəʊ.vər ðə muːn/',
    type: 'High-Score Idiom',
    band: 'Band 8.0+',
    category: 'Speaking Fluency & Idioms',
    definition: 'Extremely delighted, thrilled, and happy about a positive outcome.',
    bangla: 'অত্যন্ত আনন্দিত বা উল্লসিত',
    basicWord: 'Very happy',
    basicSentence: 'I was very happy when I got my IELTS score.',
    upgradedSentence: 'I was over the moon when I opened my test portal and saw an overall Band 8.5.',
    collocates: ['absolutely over the moon', 'thrilled beyond words', 'elated'],
    example: 'My family was over the moon when I secured a full-ride scholarship to Oxford University.'
  }
];

export default function VocabChartPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBand, setSelectedBand] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table' | 'flashcards' | 'upgrade'
  
  // Local persistence for bookmarked / mastered items
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('itp_mastered_vocab');
      return saved ? JSON.parse(saved) : ['v1', 'v7'];
    } catch (e) {
      return ['v1', 'v7'];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('itp_bookmarked_vocab');
      return saved ? JSON.parse(saved) : ['v2', 'v4'];
    } catch (e) {
      return ['v2', 'v4'];
    }
  });

  // Flashcard mode active card index
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Audio Pronunciation handler using Web Speech API
  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // cancel previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // pleasant natural speed
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMastered = (id) => {
    setMasteredIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('itp_mastered_vocab', JSON.stringify(next));
      return next;
    });
  };

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('itp_bookmarked_vocab', JSON.stringify(next));
      return next;
    });
  };

  // Filtered dataset
  const filteredVocab = fullVocabDatabase.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesBand = selectedBand === 'All' || item.band === selectedBand;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesSearch =
      item.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bangla.includes(searchQuery) ||
      item.basicWord.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesBand && matchesType && matchesSearch;
  });

  const categories = ['All', 'Environment & Climate', 'AI & Technology', 'Education & Society', 'Task 1 Graphs & Trends', 'Speaking Fluency & Idioms'];
  const bands = ['All', 'Band 8.0+', 'Band 8.5+', 'Band 9.0'];
  const types = ['All', 'Academic Collocation', 'High-Score Idiom', 'Advanced Synonym', 'Task 1 Descriptor'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061317] text-slate-900 dark:text-[#E6F5F7] transition-colors duration-300 pb-24">
      
      {/* ── TOP HERO HEADER SECTION ── */}
      <section className="relative py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-white via-cyan-50/40 to-slate-50 dark:from-[#091b20] dark:via-[#061317] dark:to-[#061317] border-b border-slate-200/80 dark:border-[#0097B2]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0097B2]/10 dark:bg-[#0097B2]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F5F7] dark:bg-[#0097B2]/15 border border-[#0097B2]/30 text-[#0097B2] dark:text-cyan-300 text-xs font-black tracking-widest uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BAND 8.5+ LEXICAL RESOURCE HUB 🔠</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                Master High-Scoring Academic <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#0097B2] via-cyan-500 to-[#004B59] bg-clip-text text-transparent">
                  Vocabulary, Collocations & Idioms
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
                Elevate your Writing Task 1/2 and Speaking Part 1-3 scores with native collocations, Band 6.0 vs Band 8.5+ phrase upgrades, audio pronunciations, and interactive flashcards.
              </p>
            </div>

            {/* Quick Stats Widget */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-xl flex items-center gap-6 shrink-0 backdrop-blur-xl">
              <div className="text-center">
                <p className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-wider">Total Terms</p>
                <p className="text-2xl font-black text-[#0097B2] mt-0.5">{fullVocabDatabase.length}</p>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-zinc-800" />
              <div className="text-center">
                <p className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-wider">Mastered</p>
                <p className="text-2xl font-black text-emerald-500 mt-0.5">{masteredIds.length}</p>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-zinc-800" />
              <div className="text-center">
                <p className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-wider">Bookmarked</p>
                <p className="text-2xl font-black text-amber-500 mt-0.5">{bookmarkedIds.length}</p>
              </div>
            </div>
          </div>

          {/* ── LIVE SEARCH & MODE TOGGLE BAR ── */}
          <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg backdrop-blur-xl">
            
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search phrase, English definition, Bangla meaning or basic word (e.g., 'pivotal', 'সমস্যা', 'important')..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
              />
            </div>

            {/* View Mode Switches */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              {[
                { id: 'grid', label: 'Grid Cards 📑', icon: Grid },
                { id: 'upgrade', label: 'Band 6.0 vs 8.5+ Upgrade ⚡', icon: Zap },
                { id: 'flashcards', label: 'Flashcard Mode 🎴', icon: RotateCcw },
                { id: 'table', label: 'Table View 📊', icon: TableIcon }
              ].map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => {
                    setViewMode(mode.id);
                    setIsFlipped(false);
                  }}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
                    viewMode === mode.id
                      ? 'bg-gradient-to-r from-[#0097B2] to-[#004B59] text-white shadow-md shadow-[#0097B2]/20'
                      : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  <mode.icon className="w-3.5 h-3.5" />
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── MULTI-LEVEL FILTER PILLS BAR ── */}
          <div className="mt-4 space-y-2 text-xs">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <span className="font-black text-slate-400 uppercase tracking-widest shrink-0 text-[10px]">Topic:</span>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
                    selectedCategory === c
                      ? 'bg-[#0097B2] text-white shadow-xs'
                      : 'bg-white dark:bg-[#0d242b] text-slate-600 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-800 hover:bg-slate-100'
                  }`}
                >
                  {c === 'All' ? '🌍 All Topics' : c}
                </button>
              ))}
            </div>

            {/* Target Band Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <span className="font-black text-slate-400 uppercase tracking-widest shrink-0 text-[10px]">Band Score:</span>
              {bands.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBand(b)}
                  className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-all ${
                    selectedBand === b
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-white dark:bg-[#0d242b] text-slate-600 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-800 hover:bg-slate-100'
                  }`}
                >
                  {b === 'All' ? '⭐ All Bands' : b}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ── MAIN CONTENT DISPLAY AREA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* ── MODE 1: GRID CARDS VIEW ── */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVocab.length === 0 ? (
              <div className="col-span-full text-center py-16 p-8 rounded-3xl bg-white dark:bg-[#0d242b]/80 border border-slate-200 dark:border-zinc-800">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Vocabulary Terms Found</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  Try adjusting your search keywords or switching filters to 'All Topics'.
                </p>
              </div>
            ) : (
              filteredVocab.map((item, idx) => {
                const isMastered = masteredIds.includes(item.id);
                const isBookmarked = bookmarkedIds.includes(item.id);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group relative rounded-3xl bg-white dark:bg-[#0d242b] border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden p-6"
                  >
                    {/* Top Badges & Actions */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          {item.band}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Speak Audio Pronunciation */}
                          <button
                            type="button"
                            onClick={() => handleSpeak(item.phrase)}
                            title="Listen Pronunciation"
                            className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-[#0097B2] hover:text-white text-slate-600 dark:text-zinc-300 transition-all cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Bookmark Toggle */}
                          <button
                            type="button"
                            onClick={() => toggleBookmark(item.id)}
                            title="Bookmark"
                            className={`p-2 rounded-xl border transition-all cursor-pointer ${
                              isBookmarked
                                ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                                : 'bg-slate-100 dark:bg-zinc-800 text-slate-400 border-slate-200 dark:border-zinc-700'
                            }`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                          </button>

                          {/* Mastered Toggle */}
                          <button
                            type="button"
                            onClick={() => toggleMastered(item.id)}
                            title="Mark as Mastered"
                            className={`p-2 rounded-xl border transition-all cursor-pointer ${
                              isMastered
                                ? 'bg-emerald-500 text-white border-emerald-500'
                                : 'bg-slate-100 dark:bg-zinc-800 text-slate-400 border-slate-200 dark:border-zinc-700'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Term & Phonetic */}
                      <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-[#0097B2] dark:group-hover:text-cyan-300 transition-colors">
                        {item.phrase}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400 dark:text-zinc-400 mt-0.5">
                        {item.phonetic} • <span className="italic text-[#0097B2] font-semibold">{item.type}</span>
                      </p>

                      {/* Bangla Translation Badge */}
                      <div className="mt-3 p-2.5 rounded-xl bg-cyan-50/60 dark:bg-[#0097B2]/15 border border-[#0097B2]/30 text-xs font-bold text-[#004B59] dark:text-cyan-200 flex items-center gap-2">
                        <span>🇧🇩</span>
                        <span>{item.bangla}</span>
                      </div>

                      {/* English Definition */}
                      <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium leading-relaxed mt-3">
                        {item.definition}
                      </p>

                      {/* ⚡ Band 6.0 vs Band 8.5+ Upgrade Box */}
                      <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200/80 dark:border-zinc-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-rose-500 font-extrabold line-through">Band 6.0: "{item.basicWord}"</span>
                          <span className="text-emerald-500 font-black">Band 8.5+ Upgrade</span>
                        </div>
                        <p className="text-[11.5px] text-slate-800 dark:text-zinc-200 italic font-medium leading-normal bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800">
                          "{item.upgradedSentence}"
                        </p>
                      </div>
                    </div>

                    {/* Collocates & Category Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[10.5px] text-slate-400">
                      <span className="font-semibold">{item.category}</span>
                      <span className="font-bold text-[#0097B2]">{item.collocates[0]}</span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        )}


        {/* ── MODE 2: BAND 6.0 vs BAND 8.5+ UPGRADE MODE ⚡ ── */}
        {viewMode === 'upgrade' && (
          <div className="space-y-4 max-w-5xl mx-auto">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#091b20] to-[#004B59] text-white shadow-xl flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400 fill-current" /> Instant IELTS Sentence Upgrader
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Replace overused basic vocabulary with high-band collocations to boost Lexical Resource in Writing & Speaking.
                </p>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
                +1.5 Band Jump
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredVocab.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl bg-white dark:bg-[#0d242b] border border-slate-200/80 dark:border-[#0097B2]/30 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-slate-900 dark:text-white">{item.phrase}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-black">{item.band}</span>
                        <span className="text-xs text-slate-400">({item.bangla})</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{item.definition}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSpeak(item.upgradedSentence)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-[#0097B2] hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <Volume2 className="w-4 h-4" /> Listen Audio
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Basic Sentence */}
                    <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 text-rose-950 dark:text-rose-200">
                      <div className="flex items-center justify-between font-black mb-1.5 text-rose-600 dark:text-rose-400">
                        <span>❌ Band 6.0 Basic Sentence</span>
                        <span>Basic: "{item.basicWord}"</span>
                      </div>
                      <p className="font-medium leading-relaxed italic">
                        "{item.basicSentence}"
                      </p>
                    </div>

                    {/* Upgraded Sentence */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-950 dark:text-emerald-200">
                      <div className="flex items-center justify-between font-black mb-1.5 text-emerald-600 dark:text-emerald-400">
                        <span>✅ Band 8.5+ Upgraded Sentence</span>
                        <span>Collocation Focus</span>
                      </div>
                      <p className="font-bold leading-relaxed italic">
                        "{item.upgradedSentence}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* ── MODE 3: FLASHCARD MODE 🎴 ── */}
        {viewMode === 'flashcards' && (
          <div className="max-w-xl mx-auto py-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="px-3 py-1 rounded-full bg-[#0097B2]/15 text-[#0097B2] text-xs font-black uppercase">
                Interactive Memory Recall
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Flashcard {flashcardIdx + 1} of {filteredVocab.length}
              </h3>
            </div>

            {filteredVocab.length === 0 ? (
              <div className="text-center py-12">No flashcards match search.</div>
            ) : (
              <div>
                {/* 3D Flip Card */}
                <motion.div
                  key={flashcardIdx}
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full h-80 rounded-3xl bg-white dark:bg-[#0d242b] border border-slate-200/80 dark:border-[#0097B2]/40 shadow-2xl p-8 flex flex-col justify-between items-center text-center cursor-pointer transition-all relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 text-xs font-bold text-slate-400">
                    Click to {isFlipped ? 'see Word' : 'reveal Details'} 🔄
                  </div>

                  <AnimatePresence mode="wait">
                    {!isFlipped ? (
                      /* FRONT SIDE */
                      <motion.div
                        key="front"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        className="my-auto space-y-3"
                      >
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 font-extrabold text-xs">
                          {filteredVocab[flashcardIdx]?.band}
                        </span>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                          {filteredVocab[flashcardIdx]?.phrase}
                        </h2>
                        <p className="text-xs font-mono text-slate-400">
                          {filteredVocab[flashcardIdx]?.phonetic}
                        </p>
                      </motion.div>
                    ) : (
                      /* BACK SIDE */
                      <motion.div
                        key="back"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -90 }}
                        className="my-auto space-y-3 text-xs"
                      >
                        <div className="p-2.5 rounded-xl bg-[#0097B2]/15 text-[#0097B2] font-black text-sm">
                          🇧🇩 {filteredVocab[flashcardIdx]?.bangla}
                        </div>
                        <p className="text-slate-700 dark:text-zinc-200 font-medium">
                          {filteredVocab[flashcardIdx]?.definition}
                        </p>
                        <p className="text-emerald-500 font-bold italic bg-slate-50 dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-800">
                          "{filteredVocab[flashcardIdx]?.upgradedSentence}"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="text-[11px] font-bold text-[#0097B2]">
                    Topic: {filteredVocab[flashcardIdx]?.category}
                  </div>
                </motion.div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    type="button"
                    disabled={flashcardIdx === 0}
                    onClick={() => {
                      setFlashcardIdx((prev) => Math.max(0, prev - 1));
                      setIsFlipped(false);
                    }}
                    className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 text-xs font-bold disabled:opacity-40 cursor-pointer"
                  >
                    ← Previous
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSpeak(filteredVocab[flashcardIdx]?.phrase)}
                    className="p-3.5 rounded-2xl bg-[#0097B2] text-white shadow-md cursor-pointer"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    disabled={flashcardIdx === filteredVocab.length - 1}
                    onClick={() => {
                      setFlashcardIdx((prev) => Math.min(filteredVocab.length - 1, prev + 1));
                      setIsFlipped(false);
                    }}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0097B2] to-[#004B59] text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
                  >
                    Next Flashcard →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}


        {/* ── MODE 4: TABLE VIEW 📊 ── */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto rounded-3xl bg-white dark:bg-[#0d242b] border border-slate-200/80 dark:border-[#0097B2]/30 shadow-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-[#091b20] border-b border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 uppercase font-black tracking-wider text-[10px]">
                  <th className="p-4">Target Phrase</th>
                  <th className="p-4">Phonetic</th>
                  <th className="p-4">Bangla Meaning</th>
                  <th className="p-4">Definition</th>
                  <th className="p-4">Band Score</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
                {filteredVocab.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                    <td className="p-4 font-black text-slate-900 dark:text-white text-sm">
                      {item.phrase}
                    </td>
                    <td className="p-4 font-mono text-slate-400">{item.phonetic}</td>
                    <td className="p-4 font-bold text-[#0097B2]">{item.bangla}</td>
                    <td className="p-4 text-slate-600 dark:text-zinc-300 font-medium max-w-xs">{item.definition}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-500 font-bold text-[10px]">
                        {item.band}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-500">{item.category}</td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleSpeak(item.phrase)}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-[#0097B2] hover:text-white text-slate-600 dark:text-zinc-300 transition-all cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </section>

    </div>
  );
}
