import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Volume2,
  Bookmark,
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Download,
  RotateCcw,
  Zap,
  Filter,
  CheckCircle2,
  Play,
  Shuffle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   AUTHORITATIVE MATRIX VOCABULARY DATABASE (10 THEMES x 4 POS)
   ───────────────────────────────────────────────────────────── */
const matrixVocabData = [
  // 1. Science & Nature
  {
    category: 'Science & Nature',
    verbs: {
      word: 'Substantiate',
      ipa: "/səb'stænʃieɪt/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'VERBS',
      badge: 'IELTS RECOMMENDED',
      definition: 'Provide solid empirical evidence to support or prove the truth of an academic thesis.',
      banglaTitle: 'প্রমাণ করা / সত্যতা সাব্যস্ত করা',
      banglaDesc: 'কোন দাবির সম্পর্কে নির্ভরযোগ্য প্রমাণ বা তথ্য উপস্থাপন করে সত্যতা নিশ্চিত করা।',
      example: 'The laboratory generated satellite models to substantiate their tropospheric ozone depletion formula.',
      synonyms: ['Validate', 'Corroborate', 'Verify']
    },
    nouns: {
      word: 'Phenomenon',
      ipa: "/fə'nɒmɪnən/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'NOUNS',
      badge: 'TOEFL ACADEMIC',
      definition: 'A fact or situation that is observed to exist or happen, especially one whose cause is in question.',
      banglaTitle: 'ঘটনা / প্রাকৃতিক প্রতিক্রিয়া',
      banglaDesc: 'পর্যবেক্ষণযোগ্য কোনো বিশেষ ঘটনা বা প্রাকৃতিক প্রকাশ।',
      example: 'Aurora borealis remains one of the most stunning atmospheric phenomena on Earth.',
      synonyms: ['Occurrence', 'Event', 'Marvel']
    },
    adjectives: {
      word: 'Empirical',
      ipa: "/ɪm'pɪrɪkl/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'ADJECTIVES',
      badge: 'TOEFL ACADEMIC',
      definition: 'Based on, concerned with, or verifiable by observation or experience rather than theory.',
      banglaTitle: 'অভিজ্ঞতালব্ধ / পর্যবেক্ষণমূলক',
      banglaDesc: 'বাস্তব পরীক্ষা ও পর্যবেক্ষণের ওপর ভিত্তি করে তৈরি প্রমাণ।',
      example: 'The research team relied heavily on empirical data gathered over a decade of fieldwork.',
      synonyms: ['Observational', 'Factual', 'Experimental']
    },
    adverbs: {
      word: 'Methodically',
      ipa: "/mə'θɒdɪkli/",
      tag: 'P',
      tagType: 'pte',
      pos: 'ADVERBS',
      badge: 'PTE MASTERY',
      definition: 'In an orderly, systematic, and logical manner according to a strict procedure.',
      banglaTitle: 'পদ্ধতিগতভাবে / সুশৃঙ্খলভাবে',
      banglaDesc: 'কোনো কাজ নিয়মমাফিক ও শৃঙ্খলার সাথে সম্পন্ন করা।',
      example: 'The archeologist methodically cataloged every ancient artifact recovered from the excavation.',
      synonyms: ['Systematically', 'Meticulously', 'Orderly']
    }
  },

  // 2. Tech & Innovation
  {
    category: 'Tech & Innovation',
    verbs: {
      word: 'Catalyze',
      ipa: "/'kætəlaɪz/",
      tag: 'P',
      tagType: 'pte',
      pos: 'VERBS',
      badge: 'PTE MASTERY',
      definition: 'Cause an action or process to begin or accelerate significantly.',
      banglaTitle: 'উত্তেজিত বা ত্বরান্বিত করা',
      banglaDesc: 'কোন পরিবর্তন বা প্রক্রিয়াকে দ্রুত বাড়িয়ে তোলা।',
      example: 'The investment in artificial intelligence will catalyze digital transformation across logistics.',
      synonyms: ['Accelerate', 'Instigate', 'Prompt']
    },
    nouns: {
      word: 'Paradigm',
      ipa: "/'pærədaɪm/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'NOUNS',
      badge: 'TOEFL ACADEMIC',
      definition: 'A typical example, pattern, or overarching model of something.',
      banglaTitle: 'মডেল / মানদণ্ড কাঠামো',
      banglaDesc: 'চিন্তাভাবনা বা ব্যবস্থার সাধারণ আদর্শ কাঠামো।',
      example: 'Cloud computing established a new paradigm for enterprise software infrastructure.',
      synonyms: ['Model', 'Archetype', 'Prototype']
    },
    adjectives: {
      word: 'Redundant',
      ipa: "/rɪ'dʌndənt/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'ADJECTIVES',
      badge: 'IELTS RECOMMENDED',
      definition: 'Not or no longer needed or useful; superfluous in context.',
      banglaTitle: 'অতিরিক্ত / অপ্রয়োজনীয়',
      banglaDesc: 'যা আর প্রয়োজনীয় নয় বা বাড়তি হয়ে উঠেছে।',
      example: 'Automated software routines rendered manual data entry redundant.',
      synonyms: ['Superfluous', 'Unnecessary', 'Excessive']
    },
    adverbs: {
      word: 'Seamlessly',
      ipa: "/'siːmləsli/",
      tag: 'P',
      tagType: 'pte',
      pos: 'ADVERBS',
      badge: 'PTE MASTERY',
      definition: 'Smoothly and continuously, with no apparent gaps, spaces, or difficulties.',
      banglaTitle: 'নির্বিঘ্নে / স্বাচ্ছন্দ্যে',
      banglaDesc: 'কোনোরকম বাধা বা সমস্যা ছাড়া নিখুঁতভাবে সমন্বিত হওয়া।',
      example: 'The new application integrates seamlessly with legacy operating systems.',
      synonyms: ['Smoothly', 'Flawlessly', 'Effortlessly']
    }
  },

  // 3. Economy & Work
  {
    category: 'Economy & Work',
    verbs: {
      word: 'Fluctuate',
      ipa: "/'flʌktʃueɪt/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'VERBS',
      badge: 'IELTS RECOMMENDED',
      definition: 'Rise and fall irregularly in number, value, or amount.',
      bangla: 'ওঠানামা করা / পরিবর্তিত হওয়া',
      banglaTitle: 'ওঠানামা করা / পরিবর্তিত হওয়া',
      banglaDesc: 'মূল্য বা সংখ্যার অনিয়মিত পরিবর্তন ঘটা।',
      example: 'Fuel prices fluctuate unpredictably based on international geopolitical conflicts.',
      synonyms: ['Oscillate', 'Vary', 'Waver']
    },
    nouns: {
      word: 'Surplus',
      ipa: "/'sɜːpləs/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'NOUNS',
      badge: 'TOEFL ACADEMIC',
      definition: 'An amount of something left over when requirements have been met.',
      banglaTitle: 'উদ্বৃত্ত / বাড়তি সম্পদ',
      banglaDesc: 'প্রয়োজনের অতিরিক্ত বা অবশিষ্টাংশ।',
      example: 'The nation registered a trade surplus due to record-breaking agricultural exports.',
      synonyms: ['Excess', 'Abundance', 'Remainder']
    },
    adjectives: {
      word: 'Lucrative',
      ipa: "/'luːkrətɪv/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'ADJECTIVES',
      badge: 'IELTS RECOMMENDED',
      definition: 'Producing a great deal of profit; financially rewarding.',
      banglaTitle: 'লাভজনক / অর্থকরী',
      banglaDesc: 'যা থেকে প্রচুর মুনাফা বা অর্থ পাওয়া যায়।',
      example: 'Software engineering remains a highly lucrative career path for university graduates.',
      synonyms: ['Profitable', 'Remunerative', 'Gainful']
    },
    adverbs: {
      word: 'Exponentially',
      ipa: "/ˌekspə'nenʃəli/",
      tag: 'P',
      tagType: 'pte',
      pos: 'ADVERBS',
      badge: 'PTE MASTERY',
      definition: 'At an increasingly rapid rate in proportion to the growing total size.',
      banglaTitle: 'আশঙ্কাজনক দ্রুতগতিতে',
      banglaDesc: 'ক্রমাগত দ্বিগুণ বা বহুগুণ হারে বৃদ্ধি পাওয়া।',
      example: 'E-commerce sales expanded exponentially during global retail shift.',
      synonyms: ['Rapidly', 'Dramatically', 'Swiftly']
    }
  },

  // 4. Society & Culture
  {
    category: 'Society & Culture',
    verbs: {
      word: 'Assimilate',
      ipa: "/ə'sɪmɪleɪt/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'VERBS',
      badge: 'TOEFL ACADEMIC',
      definition: 'Take in and fully understand information, ideas, or absorb into a cultural group.',
      banglaTitle: 'আত্মস্থ করা / মানিয়ে নেওয়া',
      banglaDesc: 'নতুন সংস্কৃতি বা জ্ঞান পূর্ণাঙ্গভাবে গ্রহণ করা।',
      example: 'Immigrants often strive to assimilate into new cultural norms while preserving traditions.',
      synonyms: ['Absorb', 'Integrate', 'Incorporate']
    },
    nouns: {
      word: 'Hegemony',
      ipa: "/hɪ'ɡeməni/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'NOUNS',
      badge: 'IELTS RECOMMENDED',
      definition: 'Leadership or dominance, especially by one country or social group over others.',
      banglaTitle: 'আধিপত্য / কর্তৃত্ব',
      banglaDesc: 'অন্য রাষ্ট্র বা গোষ্ঠীর ওপর প্রভাব বিস্তার ও শাসন ক্ষমতা।',
      example: 'Global trade agreements often challenge unilateral economic hegemony.',
      synonyms: ['Dominance', 'Supremacy', 'Control']
    },
    adjectives: {
      word: 'Prevalent',
      ipa: "/'prevələnt/",
      tag: 'P',
      tagType: 'pte',
      pos: 'ADJECTIVES',
      badge: 'PTE MASTERY',
      definition: 'Widespread in a particular area or at a particular time.',
      banglaTitle: 'প্রচলিত / বহুল বিস্তৃত',
      banglaDesc: 'চারপাশে যা সচরাচর দেখা যায়।',
      example: 'Hybrid work policies have become increasingly prevalent in modern corporate culture.',
      synonyms: ['Widespread', 'Rife', 'Pervasive']
    },
    adverbs: {
      word: 'Invariably',
      ipa: "/ɪn'veəriəbli/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'ADVERBS',
      badge: 'IELTS RECOMMENDED',
      definition: 'In every case or on every occasion; always without exception.',
      banglaTitle: 'সবদাই / অপরিবর্তনীয়ভাবে',
      banglaDesc: 'যা কোনো ব্যতিক্রম ছাড়াই সবসময় ঘটে।',
      example: 'Procrastination invariably leads to increased stress before major examination deadlines.',
      synonyms: ['Always', 'Consistently', 'Without fail']
    }
  },

  // 5. Education & Arts
  {
    category: 'Education & Arts',
    verbs: {
      word: 'Delineate',
      ipa: "/dɪ'lɪnieɪt/",
      tag: 'P',
      tagType: 'pte',
      pos: 'VERBS',
      badge: 'PTE MASTERY',
      definition: 'Describe or portray something precisely in detail.',
      banglaTitle: 'স্পষ্টভাবে তুলে ধরা / বর্ণনা করা',
      banglaDesc: 'কোনো বিষয় সুন্দরভাবে মানচিত্র বা বিবরণে রূপ দেওয়া।',
      example: 'The academic syllabus clearly delineates the expectations for final dissertation projects.',
      synonyms: ['Outline', 'Depict', 'Define']
    },
    nouns: {
      word: 'Aesthetic',
      ipa: "/iːs'θetɪk/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'NOUNS',
      badge: 'TOEFL ACADEMIC',
      definition: 'A set of principles underlying and guiding the work of a particular artist or artistic movement.',
      banglaTitle: 'নান্দনিকতা / সৌন্দর্যবোধ',
      banglaDesc: 'শিল্পের সৌন্দর্য ও শৈল্পিক মানদণ্ডের অনুভূতি।',
      example: 'The minimalist aesthetic of modern architecture emphasizes natural lighting and clear spaces.',
      synonyms: ['Beauty', 'Artistry', 'Style']
    },
    adjectives: {
      word: 'Erudite',
      ipa: "/'erʊdaɪt/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'ADJECTIVES',
      badge: 'IELTS RECOMMENDED',
      definition: 'Having or showing great knowledge or learning; scholarly.',
      banglaTitle: 'পণ্ডিত / বিজ্ঞ / বিদ্বান',
      banglaDesc: 'প্রচুর পড়াশোনা ও জ্ঞানের অধিকারী ব্যক্তি।',
      example: 'The professor delivered an erudite lecture on ancient classical literature.',
      synonyms: ['Scholarly', 'Learned', 'Intellectual']
    },
    adverbs: {
      word: 'Profoundly',
      ipa: "/prə'faʊndli/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'ADVERBS',
      badge: 'TOEFL ACADEMIC',
      definition: 'To a profound, deep, or intense degree; greatly.',
      banglaTitle: 'গভীরভাবে / অত্যন্ত সংবেদনশীলভাবে',
      banglaDesc: 'খুবই মানসিকভাবে বা গভীরভাবে প্রভাবিত করা।',
      example: 'Philosophical poetry can profoundly impact how students view social morality.',
      synonyms: ['Deeply', 'Immensely', 'Thoroughly']
    }
  },

  // 6. Health & Psychology
  {
    category: 'Health & Psychology',
    verbs: {
      word: 'Alleviate',
      ipa: "/ə'liːvieɪt/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'VERBS',
      badge: 'IELTS RECOMMENDED',
      definition: 'Make suffering, deficiency, or a problem less severe.',
      banglaTitle: 'উপশম করা / হ্রাস করা',
      banglaDesc: 'যন্ত্রণা বা কষ্ট কিছুটা কমিয়ে আনা।',
      example: 'Regular mindfulness exercises can alleviate symptoms of chronic anxiety.',
      synonyms: ['Relieve', 'Mitigate', 'Ease']
    },
    nouns: {
      word: 'Cognition',
      ipa: "/kɒɡ'nɪʃn/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'NOUNS',
      badge: 'TOEFL ACADEMIC',
      definition: 'The mental action or process of acquiring knowledge and understanding through thought.',
      banglaTitle: 'জ্ঞানীয় ক্ষমতা / উপলব্ধি',
      banglaDesc: 'চিন্তা ও অভিজ্ঞতার মাধ্যমে জ্ঞানার্জনের মানসিক ক্ষমতা।',
      example: 'Sleep deprivation significantly impairs human cognition and short-term memory retention.',
      synonyms: ['Perception', 'Reasoning', 'Understanding']
    },
    adjectives: {
      word: 'Chronic',
      ipa: "/'krɒnɪk/",
      tag: 'P',
      tagType: 'pte',
      pos: 'ADJECTIVES',
      badge: 'PTE MASTERY',
      definition: 'Persisting for a long time or constantly recurring in health condition.',
      banglaTitle: 'দীর্ঘস্থায়ী / স্থায়ী রোগ',
      banglaDesc: 'যা দীর্ঘদিন ধরে চলতে থাকে বা বারবার ফিরে আসে।',
      example: 'Physical therapy provides long-term relief for patients suffering from chronic back pain.',
      synonyms: ['Persistent', 'Long-lasting', 'Incurable']
    },
    adverbs: {
      word: 'Adversely',
      ipa: "/'ædvɜːsli/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'ADVERBS',
      badge: 'IELTS RECOMMENDED',
      definition: 'In a harmful, negative, or unfavourable manner.',
      banglaTitle: 'প্রতিকূলভাবে / নেতিবাচকভাবে',
      banglaDesc: 'এমনভাবে যা ক্ষতিকর বা ক্ষতিকর প্রভাব ফেলে।',
      example: 'Mental exhaustion adversely affects decision-making speed during competitive examinations.',
      synonyms: ['Negatively', 'Harmfully', 'Unfavourably']
    }
  },

  // 7. Law & Public Policy
  {
    category: 'Law & Public Policy',
    verbs: {
      word: 'Sanction',
      ipa: "/'sæŋkʃn/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'VERBS',
      badge: 'TOEFL ACADEMIC',
      definition: 'Give official permission or approval for an action.',
      banglaTitle: 'অনুমোদন দেওয়া / আইনি সম্মতি',
      banglaDesc: 'সরকারি বা আইনি অনুমোদন প্রদান করা।',
      example: 'The parliament voted to sanction new environmental protection guidelines.',
      synonyms: ['Authorize', 'Approve', 'Endorse']
    },
    nouns: {
      word: 'Jurisdiction',
      ipa: "/ˌdʒʊərɪs'dɪkʃn/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'NOUNS',
      badge: 'IELTS RECOMMENDED',
      definition: 'The official power to make legal decisions and judgments over an area.',
      banglaTitle: 'বিচারক্ষেত্র / এখতিয়ার',
      banglaDesc: 'আইনি সিদ্ধান্ত নেওয়ার নির্দিষ্ট সীমানা বা ক্ষমতা।',
      example: 'International waters fall outside the sovereign jurisdiction of any single nation.',
      synonyms: ['Authority', 'Control', 'Domain']
    },
    adjectives: {
      word: 'Mandatory',
      ipa: "/'mændətəri/",
      tag: 'P',
      tagType: 'pte',
      pos: 'ADJECTIVES',
      badge: 'PTE MASTERY',
      definition: 'Required by law or rules; compulsory for all participants.',
      banglaTitle: 'বাধ্যতামূলক / আবশ্যিক',
      banglaDesc: 'আইন বা নিয়ম অনুযায়ী যা সবার করা আবশ্যক।',
      example: 'Attending safety orientation is mandatory for all laboratory staff members.',
      synonyms: ['Compulsory', 'Obligatory', 'Required']
    },
    adverbs: {
      word: 'Unilaterally',
      ipa: "/ˌjuːnɪ'lætrəli/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'ADVERBS',
      badge: 'IELTS RECOMMENDED',
      definition: 'Used to indicate that an action or decision is taken by one party without agreement from others.',
      banglaTitle: 'একতরফাভাবে',
      banglaDesc: 'অন্য কারো সাথে পরামর্শ না করে একাই সিদ্ধান্ত নেওয়া।',
      example: 'The organization chose to unilaterally alter trade tariffs without consulting regional partners.',
      synonyms: ['Independently', 'Solely', 'Single-handedly']
    }
  },

  // 8. Media & Comms
  {
    category: 'Media & Comms',
    verbs: {
      word: 'Disseminate',
      ipa: "/dɪ'semɪneɪt/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'VERBS',
      badge: 'IELTS RECOMMENDED',
      definition: 'Spread information, knowledge, or news widely to a large audience.',
      banglaTitle: 'প্রচার করা / বিস্তার করা',
      banglaDesc: 'তথ্য বা সংবাদ ব্যাপকভাবে জনগণের মাঝে ছড়িয়ে দেওয়া।',
      example: 'Public health authorities use digital channels to quickly disseminate urgent safety alerts.',
      synonyms: ['Broadcast', 'Circulate', 'Propagate']
    },
    nouns: {
      word: 'Bias',
      ipa: "/'baɪəs/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'NOUNS',
      badge: 'TOEFL ACADEMIC',
      definition: 'Inclination or prejudice for or against one person or group, especially in a way considered unfair.',
      banglaTitle: 'পক্ষপাত / পূর্বপ্রবণতা',
      banglaDesc: 'অযৌক্তিক বা পক্ষপাতমূলক মনোভাব।',
      example: 'Journalists are required to minimize personal bias when reporting international news.',
      synonyms: ['Prejudice', 'Partiality', 'Favouritism']
    },
    adjectives: {
      word: 'Credible',
      ipa: "/'kredəbl/",
      tag: 'P',
      tagType: 'pte',
      pos: 'ADJECTIVES',
      badge: 'PTE MASTERY',
      definition: 'Able to be believed; convincing and trustworthy source.',
      banglaTitle: 'বিশ্বস্ত / গ্রহণযোগ্য',
      banglaDesc: 'যাকে বিশ্বাস করা যায় বা যা নির্ভর করার যোগ্য।',
      example: 'Academic essays must utilize credible peer-reviewed citations to build strong arguments.',
      synonyms: ['Trustworthy', 'Believable', 'Reliable']
    },
    adverbs: {
      word: 'Ambiguously',
      ipa: "/æm'bɪɡjuəsli/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'ADVERBS',
      badge: 'TOEFL ACADEMIC',
      definition: 'In a way that is open to more than one interpretation; vaguely.',
      banglaTitle: 'দ্ব্যর্থকভাবে / অস্পষ্টভাবে',
      banglaDesc: 'একাধিক অর্থ প্রকাশ করে এমন অস্পষ্ট মন্তব্য।',
      example: 'The contract terms were phrased ambiguously, leading to subsequent legal disputes.',
      synonyms: ['Vaguely', 'Equivocally', 'Unclearly']
    }
  },

  // 9. Energy & Ecology
  {
    category: 'Energy & Ecology',
    verbs: {
      word: 'Mitigate',
      ipa: "/'mɪtɪɡeɪt/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'VERBS',
      badge: 'IELTS RECOMMENDED',
      definition: 'Make less severe, serious, or painful.',
      banglaTitle: 'প্রশমিত করা / তীব্রতা কমানো',
      banglaDesc: 'ক্ষতি বা বিপদের আশঙ্কা কমিয়ে আনা।',
      example: 'Reforestation initiatives help mitigate the severe impacts of atmospheric carbon accumulation.',
      synonyms: ['Reduce', 'Moderate', 'Alleviate']
    },
    nouns: {
      word: 'Depletion',
      ipa: "/dɪ'pliːʃn/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'NOUNS',
      badge: 'TOEFL ACADEMIC',
      definition: 'Reduction in the number or quantity of natural resources.',
      banglaTitle: 'ক্ষয় / শূন্যতা',
      banglaDesc: 'প্রাকৃতিক সম্পদের অনিয়মিত ব্যবহারের ফলে হ্রাস।',
      example: 'The depletion of ozone protection increases solar ultraviolet radiation reaching Earth.',
      synonyms: ['Exhaustion', 'Reduction', 'Diminution']
    },
    adjectives: {
      word: 'Sustainable',
      ipa: "/sə'steɪnəbl/",
      tag: 'P',
      tagType: 'pte',
      pos: 'ADJECTIVES',
      badge: 'PTE MASTERY',
      definition: 'Able to be maintained at a certain rate or level without exhausting resources.',
      banglaTitle: 'টেকসই / টেকসই জীবনধারা',
      banglaDesc: 'পরিবেশের ক্ষতি না করে দীর্ঘদিন ধরে বজায় রাখার উপযোগী।',
      example: 'Solar energy provides a sustainable power alternative to fossil fuel consumption.',
      synonyms: ['Eco-friendly', 'Renewable', 'Viable']
    },
    adverbs: {
      word: 'Irreversibly',
      ipa: "/ˌɪrɪ'vɜːsəbli/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'ADVERBS',
      badge: 'IELTS RECOMMENDED',
      definition: 'In a way that cannot be undone, changed back, or reversed.',
      banglaTitle: 'অপরিবর্তনীয়ভাবে',
      banglaDesc: 'যা কখনোই আবার আগের অবস্থায় ফিরিয়ে আনা যাবে না।',
      example: 'Glacial melting threatens to irreversibly alter global oceanic currents.',
      synonyms: ['Permanently', 'Irretrievably', 'Finalized']
    }
  },

  // 10. Philosophy & Mind
  {
    category: 'Philosophy & Mind',
    verbs: {
      word: 'Surmise',
      ipa: "/sə'maɪz/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'VERBS',
      badge: 'IELTS RECOMMENDED',
      definition: 'Suppose that something is true without having solid evidence to confirm it.',
      banglaTitle: 'অনুমান করা / আঁচ করা',
      banglaDesc: 'সম্পূর্ণ প্রমাণ না থাকলেও কোনো সিদ্ধান্তে পৌঁছানো।',
      example: 'Philosophers surmise that consciousness stems from complex neurological network patterns.',
      synonyms: ['Conjecture', 'Deduce', 'Guess']
    },
    nouns: {
      word: 'Premise',
      ipa: "/'premɪs/",
      tag: 'T',
      tagType: 'toefl',
      pos: 'NOUNS',
      badge: 'TOEFL ACADEMIC',
      definition: 'A previous statement or proposition from which another is inferred as a conclusion.',
      banglaTitle: 'মূল ভিত্তি / অনুমান বাক্য',
      banglaDesc: 'যে ধারণার ওপর নির্ভর করে যুক্তির সিদ্ধান্ত নেওয়া হয়।',
      example: 'The essay is built on the logical premise that education drives economic mobility.',
      synonyms: ['Proposition', 'Hypothesis', 'Assumption']
    },
    adjectives: {
      word: 'Inherent',
      ipa: "/ɪn'hɪərənt/",
      tag: 'P',
      tagType: 'pte',
      pos: 'ADJECTIVES',
      badge: 'PTE MASTERY',
      definition: 'Existing in something as a permanent, essential, or characteristic attribute.',
      banglaTitle: 'সহজাত / অন্তর্নিহিত',
      banglaDesc: 'স্বাভাবিকভাবে বা জন্মগতভাবে কোনো জিনিসের মূল বৈশিষ্ট্য।',
      example: 'Every scientific discovery carries an inherent responsibility for ethical deployment.',
      synonyms: ['Intrinsic', 'Innate', 'Essential']
    },
    adverbs: {
      word: 'Empirically',
      ipa: "/ɪm'pɪrɪkli/",
      tag: 'I',
      tagType: 'ielts',
      pos: 'ADVERBS',
      badge: 'IELTS RECOMMENDED',
      definition: 'By means of observation or experiment rather than theory.',
      banglaTitle: 'পরীক্ষামূলকভাবে / প্রমাণ সাপেক্ষে',
      banglaDesc: 'বাস্তব পরীক্ষা ও প্রমাণের সাহায্যে।',
      example: 'Psychological theories must be empirically tested before gaining global academic consensus.',
      synonyms: ['Experimentally', 'Factually', 'Demonstrably']
    }
  }
];

export default function VocabChartPage() {
  const navigate = useNavigate();

  // Active top Sub-tab
  const [activeMainTab, setActiveMainTab] = useState('chart'); // 'chart' | 'synonyms' | 'downloads'

  // Accent & Speed Controls
  const [accent, setAccent] = useState('US'); // 'US' | 'UK' | 'AU'
  const [speed, setSpeed] = useState(0.9);

  // Active Exam Filter Pill
  const [examFilter, setExamFilter] = useState('ALL EXAMS'); // 'ALL EXAMS' | 'IELTS' | 'TOEFL' | 'PTE'

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Word Object for Inspector Panel (Default to 'Substantiate')
  const [selectedWord, setSelectedWord] = useState(matrixVocabData[0].verbs);

  // Bookmarks state with localStorage persistence
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('itp_matrix_bookmarks');
      return saved ? JSON.parse(saved) : ['Substantiate'];
    } catch (e) {
      return ['Substantiate'];
    }
  });

  const toggleBookmark = (wordTitle) => {
    setBookmarks((prev) => {
      const next = prev.includes(wordTitle)
        ? prev.filter((w) => w !== wordTitle)
        : [...prev, wordTitle];
      localStorage.setItem('itp_matrix_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  // TTS Pronunciation Handler
  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speed;
      utterance.pitch = 1.0;
      if (accent === 'UK') utterance.lang = 'en-GB';
      else if (accent === 'AU') utterance.lang = 'en-AU';
      else utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061317] text-slate-900 dark:text-[#E6F5F7] transition-colors duration-300 pb-24 font-sans">
      
      {/* ── TOP SUB-TABS NAVIGATION BAR ── */}
      <div className="bg-white dark:bg-[#091b20] border-b border-slate-200 dark:border-zinc-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 text-sm font-bold">
            <button
              onClick={() => setActiveMainTab('chart')}
              className={`py-4 px-2 border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
                activeMainTab === 'chart'
                  ? 'border-[#0097B2] text-[#0097B2] dark:text-cyan-300'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Vocab Chart</span>
            </button>

            <button
              onClick={() => setActiveMainTab('synonyms')}
              className={`py-4 px-2 border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
                activeMainTab === 'synonyms'
                  ? 'border-[#0097B2] text-[#0097B2] dark:text-cyan-300'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Synonym Pairs</span>
            </button>

            <button
              onClick={() => setActiveMainTab('downloads')}
              className={`py-4 px-2 border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
                activeMainTab === 'downloads'
                  ? 'border-[#0097B2] text-[#0097B2] dark:text-cyan-300'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Word Downloads</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* ── HERO HEADER TITLE & SUBTITLE ── */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Interactive <span className="relative inline-block text-[#0097B2] dark:text-cyan-300">
              Vocabulary Chart
              <svg className="absolute left-0 -bottom-2 w-full h-3 text-[#0097B2]/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
            Learn high-frequency English vocabularies systematically like a native speaker. Click any grid cell to play native audio pronunciations, study contextual definitions, and master targeted exams.
          </p>
        </div>

        {/* ── SEARCH & ACCENT / SPEED CONTROL BAR ── */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg backdrop-blur-xl mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search word, definition, exam or theme..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
            />
          </div>

          {/* Accent & Speed Controls */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-bold">
            {/* Accent Selector */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">ACCENT:</span>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800">
                {['US', 'UK', 'AU'].map((acc) => (
                  <button
                    key={acc}
                    type="button"
                    onClick={() => setAccent(acc)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      accent === acc
                        ? 'bg-[#0097B2] text-white shadow-xs'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {acc === 'UK' ? 'GB UK' : acc === 'AU' ? 'AU AU' : 'US US'}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Slider */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">SPEED:</span>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-24 accent-[#0097B2] cursor-pointer"
              />
              <span className="font-mono text-[#0097B2]">{speed}x</span>
            </div>
          </div>
        </div>

        {/* ── EXAM FILTER PILLS BAR ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 text-xs font-black">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'ALL EXAMS', label: 'ALL EXAMS', color: 'bg-slate-900 text-white' },
              { id: 'IELTS', label: '🔴 IELTS CORE', color: 'bg-rose-500/10 text-rose-500 border border-rose-500/30' },
              { id: 'TOEFL', label: '🟢 TOEFL ACADEMIC', color: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' },
              { id: 'PTE', label: '🟡 PTE MASTERY', color: 'bg-amber-500/10 text-amber-500 border border-amber-500/30' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setExamFilter(f.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap cursor-pointer transition-all ${
                  examFilter === f.id
                    ? 'bg-[#0097B2] text-white shadow-md'
                    : 'bg-white dark:bg-[#0d242b] text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate('/mock-test')}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#0097B2] to-[#004B59] text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>🔀 TEST ME!</span>
          </button>
        </div>


        {/* ── 2-COLUMN MAIN LAYOUT: MATRIX GRID (LEFT) & INSPECTOR PANEL (RIGHT) ── */}
        {activeMainTab === 'chart' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── LEFT SIDE: INTERACTIVE MATRIX GRID TABLE (8 COLS) ── */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-3xl bg-white dark:bg-[#0d242b] border border-slate-200/80 dark:border-[#0097B2]/30 shadow-xl overflow-hidden">
                
                {/* Header Row */}
                <div className="grid grid-cols-5 bg-[#0097B2] text-white font-black text-[11px] tracking-wider uppercase text-center p-3">
                  <div className="text-left pl-2">THEME CATEGORY</div>
                  <div>VERBS</div>
                  <div>NOUNS</div>
                  <div>ADJECTIVES</div>
                  <div>ADVERBS</div>
                </div>

                {/* Matrix Rows */}
                <div className="divide-y divide-slate-100 dark:divide-zinc-800/80">
                  {matrixVocabData.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-5 items-stretch min-h-[64px]">
                      
                      {/* Theme Category Name */}
                      <div className="p-3 bg-slate-50/80 dark:bg-[#091b20] border-r border-slate-100 dark:border-zinc-800 text-[11px] font-black text-[#0097B2] dark:text-cyan-300 flex items-center">
                        {row.category}
                      </div>

                      {/* 4 Cell Columns: Verbs, Nouns, Adjectives, Adverbs */}
                      {[row.verbs, row.nouns, row.adjectives, row.adverbs].map((item, cellIdx) => {
                        const isSelected = selectedWord.word === item.word;
                        const isMatchFilter = examFilter === 'ALL EXAMS' || item.badge.includes(examFilter);
                        const isMatchSearch = !searchQuery || item.word.toLowerCase().includes(searchQuery.toLowerCase());

                        return (
                          <div
                            key={cellIdx}
                            onClick={() => {
                              setSelectedWord(item);
                              playAudio(item.word);
                            }}
                            className={`p-2.5 border-r last:border-r-0 border-slate-100 dark:border-zinc-800 flex flex-col justify-between cursor-pointer transition-all duration-200 relative group ${
                              isSelected
                                ? 'bg-[#E6F5F7] dark:bg-[#0097B2]/25 border-2 border-[#0097B2] shadow-sm'
                                : isMatchFilter && isMatchSearch
                                ? 'bg-white dark:bg-[#0d242b] hover:bg-cyan-50/50 dark:hover:bg-[#0097B2]/10'
                                : 'opacity-30 bg-slate-50 dark:bg-zinc-900'
                            }`}
                          >
                            <div>
                              {/* Word Title */}
                              <p className={`text-xs font-black ${isSelected ? 'text-[#0097B2] dark:text-cyan-300' : 'text-slate-900 dark:text-white'}`}>
                                {item.word}
                              </p>
                              {/* Phonetic */}
                              <p className="text-[9.5px] font-mono text-slate-400 dark:text-zinc-500 mt-0.5 truncate">
                                {item.ipa}
                              </p>
                            </div>

                            {/* Tag Badge Pill */}
                            <div className="flex justify-end mt-1">
                              <span className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center text-white ${
                                item.tagType === 'ielts' ? 'bg-rose-500' : item.tagType === 'toefl' ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}>
                                {item.tag}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  ))}
                </div>

                {/* Footer Controls & Mock Test CTA */}
                <div className="p-4 bg-slate-50 dark:bg-[#091b20] border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0097B2] animate-pulse" />
                    <span>ⓘ Click any cell to play native audio & inspect details.</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/mock-test')}
                    className="px-6 py-2.5 rounded-full bg-[#0097B2] hover:bg-[#00788E] text-white font-black shadow-md cursor-pointer transition-all"
                  >
                    TAKE MOCK TEST
                  </button>
                </div>

              </div>
            </div>


            {/* ── RIGHT SIDE: SELECTED WORD INSPECTOR PANEL (5 COLS) ── */}
            <div className="lg:col-span-5 sticky top-24">
              <motion.div
                key={selectedWord.word}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b] border border-slate-200/80 dark:border-[#0097B2]/30 shadow-2xl space-y-6"
              >
                {/* Header Badges & Bookmark */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-[10px] font-black uppercase">
                      {selectedWord.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 text-[10px] font-black uppercase">
                      {selectedWord.pos}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleBookmark(selectedWord.word)}
                    className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                      bookmarks.includes(selectedWord.word)
                        ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-400 border-slate-200 dark:border-zinc-700'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarks.includes(selectedWord.word) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Headword & IPA Key */}
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {selectedWord.word}
                  </h2>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    IPA Key: <span className="text-[#0097B2] font-bold">{selectedWord.ipa}</span>
                  </p>
                </div>

                {/* Listen Pronunciation Audio Box */}
                <div className="p-4 rounded-2xl bg-[#E6F5F7] dark:bg-[#0097B2]/15 border border-[#0097B2]/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => playAudio(selectedWord.word)}
                      className="w-10 h-10 rounded-xl bg-[#0097B2] text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <div>
                      <p className="text-xs font-black text-[#004B59] dark:text-cyan-300">Listen Pronunciation</p>
                      <p className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-bold">
                        DIALECT: {accent} ACCENT ({speed}X)
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#091b20] text-[#0097B2] text-[10px] font-black uppercase border border-[#0097B2]/30">
                    {accent} VOICE
                  </span>
                </div>

                {/* English Meaning & Definition */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">MEANING & DEFINITION</span>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-200 font-medium leading-relaxed">
                    {selectedWord.definition}
                  </div>
                </div>

                {/* Bengali Explanation Box (বাংলা অর্থ ও ব্যাখ্যা) */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 space-y-2 text-xs">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-black text-[10.5px]">
                    BENGALI EXPLANATION (বাংলা অর্থ ও ব্যাখ্যা)
                  </span>
                  <p className="font-black text-sm text-emerald-800 dark:text-emerald-200">
                    {selectedWord.banglaTitle}
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-300/80 font-medium leading-relaxed">
                    {selectedWord.banglaDesc}
                  </p>
                </div>

                {/* Example of Sentence */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                    <span>EXAMPLE OF SENTENCE</span>
                    <button
                      type="button"
                      onClick={() => playAudio(selectedWord.example)}
                      className="text-[#0097B2] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      ▶ READ ALOUD
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800 text-xs text-slate-800 dark:text-zinc-200 italic font-semibold leading-relaxed">
                    "{selectedWord.example}"
                  </div>
                </div>

                {/* High Score Synonyms */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">HIGH SCORE SYNONYMS</span>
                  <div className="flex flex-wrap gap-2 text-xs font-bold">
                    {selectedWord.synonyms.map((syn, synIdx) => (
                      <span
                        key={synIdx}
                        onClick={() => playAudio(syn)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-50/70 dark:bg-[#0097B2]/20 text-[#0097B2] dark:text-cyan-300 border border-[#0097B2]/30 flex items-center gap-1 cursor-pointer hover:bg-[#0097B2] hover:text-white transition-all"
                      >
                        ⭐ {syn}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center text-[10.5px] font-bold text-slate-400">
                  <span>Total Bookmarks: {bookmarks.length} words</span>
                  <span>Category: {selectedWord.category}</span>
                </div>

              </motion.div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
