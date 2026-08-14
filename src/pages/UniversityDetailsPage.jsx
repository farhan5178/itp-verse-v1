import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  GraduationCap,
  Award,
  Globe,
  CheckCircle2,
  Calendar,
  Building2,
  BookOpen,
  DollarSign,
  FileText,
  ShieldCheck,
  ExternalLink,
  Users,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Sun,
  CloudSnow,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Bus,
  HeartPulse,
  Compass,
  CheckSquare,
  BarChart3,
  Percent,
  Layers,
  Sparkle
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   FULL AUTHORITATIVE UNIVERSITY & SCHOLARSHIP DATABASE
   ───────────────────────────────────────────────────────────── */
const fullUniversityData = {
  oxford: {
    id: 'oxford',
    name: 'University of Oxford',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=120&auto=format&fit=crop&q=80',
    country: 'United Kingdom',
    flag: '🇬🇧',
    city: 'Oxford',
    location: 'Oxford, Oxfordshire, OX1 2JD, United Kingdom',
    type: 'Public Collegiate Research University',
    publicOrPrivate: 'Public',
    foundedYear: '1096 AD',
    accreditation: 'Privy Council & QAA UK Verified',
    officialWebsite: 'https://www.ox.ac.uk',
    desc: 'The University of Oxford is the oldest university in the English-speaking world. It consists of 39 autonomous constituent colleges and 6 permanent private halls, providing world-class research laboratories, humanities institutes, and tutorial teaching.',
    campusSize: '240 Hectares (City-wide Collegiate Campus)',
    studentCount: '26,500+',
    intlStudentCount: '12,190+',
    intlPercentage: '46%',
    studentFacultyRatio: '3.2 : 1',
    intakes: ['Michaelmas (October)', 'Hilary (January)', 'Trinity (April)'],
    deadlines: {
      undergrad: 'October 15, 2026',
      postgrad: 'December 03, 2026 / January 20, 2027'
    },
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&auto=format&fit=crop&q=80',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',

    // Q. Edwaay Score
    edwaayScore: {
      overall: 9.4,
      academic: 9.9,
      affordability: 6.8,
      jobOpportunities: 9.6,
      intlEnvironment: 9.5,
      costOfLiving: 6.5,
      postStudyOpportunities: 9.3,
      climate: 6.9
    },

    // J. Rankings
    rankings: {
      qs: '#3 QS World Ranking 2026',
      times: '#1 Times Higher Education 2026',
      arwu: '#7 Shanghai ARWU',
      national: '#1 in United Kingdom',
      employability: '#4 Global Employability Ranking',
      trend: [
        { year: '2024', rank: '#3' },
        { year: '2025', rank: '#1' },
        { year: '2026', rank: '#1' }
      ]
    },

    // B. Programs & Degrees
    programs: {
      bachelor: [
        { name: 'BA (Hons) Computer Science', duration: '3 Years', tuition: '£39,010/yr', credits: '360 CATS', entry: 'IELTS 7.5 (7.0 sub), A*AA A-Levels / GPA 4.8+', intake: 'October', deadline: 'Oct 15' },
        { name: 'BA (Hons) Economics & Management', duration: '3 Years', tuition: '£35,260/yr', credits: '360 CATS', entry: 'IELTS 7.5, TSA Test, Top Math background', intake: 'October', deadline: 'Oct 15' },
        { name: 'MBChB Medicine', duration: '6 Years', tuition: '£52,490/yr', credits: '720 CATS', entry: 'IELTS 7.5, BMAT test, Clinical Interview', intake: 'October', deadline: 'Oct 15' }
      ],
      master: [
        { name: 'MSc in Advanced Computer Science', duration: '1 Year', tuition: '£37,510/yr', entry: 'First Class Bachelor (CGPA 3.8/4.0), IELTS 7.5', background: 'CSE / Software Eng', gpa: '3.80 / 4.00', thesis: 'Required', intake: 'October', deadline: 'Jan 20' },
        { name: 'MSc in Financial Economics (MFE)', duration: '1 Year', tuition: '£52,500/yr', entry: 'GMAT 720+ or GRE 325+, IELTS 7.5, 1-yr work exp', background: 'Finance / Economics / Math', gpa: '3.75 / 4.00', thesis: 'Optional', intake: 'October', deadline: 'Jan 08' }
      ],
      phd: [
        { name: 'DPhil in Autonomous Intelligent Systems', duration: '3-4 Years', funding: '100% Fully Funded via EPSRC & Clarendon', proposal: 'Required (2,500 words)', stipend: '£19,237/yr tax-free', deadline: 'Jan 20' }
      ]
    },

    // C. Tuition & Fee Structure
    tuition: {
      intlUndergradPerYear: '$49,500 USD (£39,010)',
      intlPostgradPerYear: '$47,600 USD (£37,510)',
      domesticPerYear: '$11,700 USD (£9,250)',
      additionalFees: [
        { item: 'College Fee & Membership', cost: '£0 (Included in tuition)' },
        { item: 'University Health Surcharge (IHS)', cost: '£776 / year' },
        { item: 'Lab & Supercomputing Pass', cost: '£450 / year' },
        { item: 'Student Union & Athletics Pass', cost: '£120 / year' }
      ],
      estimated4YearDegreeTotal: '$198,000 USD (Tuition Only)'
    },

    // D. Cost of Living (Bangladeshi Student Context)
    costOfLiving: {
      monthly: {
        rent: '$850 (Shared College Room)',
        food: '$350 (Self-catering & Halal grocers)',
        transport: '$60 (Oxford Bus Pass / Bicycle)',
        internetUtilities: '$80',
        insurance: '$65',
        studyPersonal: '$120'
      },
      range: {
        low: '$1,050 / mo',
        avg: '$1,525 / mo',
        high: '$2,100 / mo'
      },
      yearlyTotalLiving: '$18,300 USD / year',
      grandTotalYearlyCost: '$67,800 USD / year (Tuition + Living)',
      bangladeshiContext: 'Oxford is situated in the South-East of England where living costs are higher than Northern UK cities. Bangladeshi students can manage expenses comfortably by securing College Housing which includes subsidized dining hall meal plans.'
    },

    // E. Weather & Climate
    weather: {
      summer: '18°C – 26°C (June – August)',
      winter: '1°C – 7°C (December – February)',
      rainfall: '650 mm / year (Moderate British drizzle)',
      snowfall: 'Occasional light snow (2–5 days/year)',
      daylight: 'Summer: 16.5 hrs | Winter: 7.5 hrs',
      bangladeshiExpectation: 'Temperatures are much cooler than Bangladesh. You will need a heavy winter coat, thermal layers, and waterproof boots for winter months.'
    },

    // F. Jobs & Career Opportunities
    jobs: {
      duringStudy: {
        workRights: '20 Hours / Week during term time (Full-time on holidays)',
        typicalWage: '£12.50 – £15.00 / hour ($16–$19 USD)',
        commonJobs: 'Library Assistant, College Catering, Exam Invigilator, Retail Assistant'
      },
      afterGraduation: {
        employmentRate: '96.4% employed or in higher study within 6 months',
        avgSalary: '£55,000 – £85,000 / year ($70,000–$108,000 USD)',
        topEmployers: ['Google DeepMind', 'Goldman Sachs', 'McKinsey & Co', 'AstraZeneca', 'Microsoft Research'],
        postStudyVisa: 'UK Graduate Route Visa (2 Years full work permit, 3 years for PhD)',
        prPathway: 'Skilled Worker Visa leading to Indefinite Leave to Remain (ILR) in 5 years'
      },
      careerScore: 9.6
    },

    // G. Admission Requirements
    admissionReqs: {
      gpaMin: 'GPA 4.80 / 5.00 (HSC) or 3.75 / 4.00 (Bachelor)',
      ielts: {
        overall: '7.5',
        listening: '7.0',
        reading: '7.0',
        writing: '7.5',
        speaking: '7.0'
      },
      otherTests: 'TSA (Thinking Skills Assessment), MAT (Maths), or BMAT (Medicine)',
      sopRequired: 'Yes (Strict 4,000 character limit)'
    },

    // H. Required Documents Checklist
    documentChecklist: [
      { name: 'Valid Passport (Min 6 months validity)', required: true },
      { name: 'Official High School / Bachelor Transcripts', required: true },
      { name: 'IELTS Academic Official Test Report Form', required: true },
      { name: 'Statement of Purpose (SOP)', required: true },
      { name: '2 Academic Recommendation Letters (LOR)', required: true },
      { name: 'CV / Academic Resume', required: true },
      { name: 'Subject Written Work / Portfolio', required: false },
      { name: 'Financial Bank Solvency Proof', required: true }
    ],

    // I. Application Timeline
    timeline: [
      { step: 'September (Year 1)', title: 'Research & Preparation', desc: 'Choose College & Program. Begin TSA / MAT test practice.' },
      { step: 'October 15', title: 'UCAS Deadline', desc: 'Submit UCAS Application & Personal Statement.' },
      { step: 'November', title: 'Admissions Tests', desc: 'Sit for TSA / MAT subject test at verified exam center.' },
      { step: 'December', title: 'Oxford College Interview', desc: 'Attend 2 to 3 academic interview rounds.' },
      { step: 'January', title: 'Decision Notification', desc: 'Receive Conditional or Unconditional Offer.' },
      { step: 'July – August', title: 'UK Student Visa (CAS)', desc: 'Obtain CAS statement and lodge Tier 4 Student Visa.' }
    ],

    // K. International & Community Info
    community: {
      intlStudentPct: '46%',
      bangladeshiCommunity: 'Active Oxford University Bangladesh Society (OUBS) offering Eid events, freshers guide, and halal food mapping.',
      facilities: 'Central Oxford Mosque 5 mins from campus, Halal dining options in Cowley Road, Multi-faith prayer rooms in colleges.'
    },

    // L. Accommodation & M. Transportation
    housingTrans: {
      housing: [
        { type: 'College Undergraduate Dorm', rent: '£5,500 – £7,800 / academic year (Utilities & Internet included)' },
        { type: 'Private Shared House (Cowley / Jericho)', rent: '£600 – £850 / month' }
      ],
      transport: 'Oxford is Britain’s #1 cycling city. 85% of students use bicycles or walk. Stagecoach bus pass is £45/month.'
    },

    // 2. SCHOLARSHIP DETAILS
    scholarship: {
      name: 'Rhodes & Clarendon Full-Ride Scholarship',
      provider: 'Rhodes Trust & Oxford University Press',
      coverageType: '100% Fully Funded',
      coverageSummary: {
        tuition: '100% Full Waiver',
        livingStipend: '£18,180 / year ($23,500 USD)',
        airfare: 'Included (2 Economy flights)',
        healthInsurance: '100% Paid (IHS Covered)'
      },
      eligibilityGPA: '4.80/5.00 (HSC) or CGPA 3.80/4.00 (Bachelor)',
      bangladeshiMatchExample: {
        userGpa: '4.85 / 5.00',
        requiredGpa: '4.50 / 5.00',
        status: '✅ You meet the academic requirements!'
      },
      competitionLevel: 'Extremely High (Top 0.5% applicants accepted)',
      financialImpact: {
        withoutScholarship: '$67,800 USD / year',
        scholarshipValue: '-$67,800 USD / year',
        outOfPocketRemaining: '$0 USD / year (100% FREE)'
      },
      essayQuestions: [
        'Describe a moment you demonstrated moral leadership in your community. (750 words)',
        'Why is Oxford the essential place to advance your long-term research vision? (500 words)'
      ],
      selectionWeighting: [
        { criteria: 'Academic Excellence', pct: 35 },
        { criteria: 'Moral Leadership & Character', pct: 25 },
        { criteria: 'Personal Statement & Vision', pct: 20 },
        { criteria: 'Interview Performance', pct: 20 }
      ],
      warnings: [
        '⚠️ Separate Rhodes application portal must be submitted before October 15.',
        '⚠️ Requires 3 strong academic reference letters from university professors.',
        '⚠️ Shortlisted candidates must attend a mandatory in-person/virtual interview.'
      ]
    }
  },

  tum: {
    id: 'tum',
    name: 'Technical University of Munich',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&auto=format&fit=crop&q=80',
    country: 'Germany',
    flag: '🇩🇪',
    city: 'Munich',
    location: 'Arcisstraße 21, 80333 München, Germany',
    type: 'Public Technical University',
    publicOrPrivate: 'Public',
    foundedYear: '1868',
    accreditation: 'German Accreditation Council & ASIIN',
    officialWebsite: 'https://www.tum.de',
    desc: 'Technical University of Munich (TUM) is one of Europe’s top institutes of technology. Famous for pioneering engineering, robotics, computer science, and high-tech automotive partnerships with BMW and Siemens.',
    campusSize: '3 Main Campuses (Munich, Garching, Freising)',
    studentCount: '52,000+',
    intlStudentCount: '19,700+',
    intlPercentage: '38%',
    studentFacultyRatio: '8.5 : 1',
    intakes: ['Winter Semester (October)', 'Summer Semester (April)'],
    deadlines: {
      undergrad: 'July 15, 2026 (Winter) / January 15 (Summer)',
      postgrad: 'May 31, 2026'
    },
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&auto=format&fit=crop&q=80',
    matchStatus: 'Guaranteed Match',
    matchColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',

    edwaayScore: {
      overall: 9.1,
      academic: 9.6,
      affordability: 9.5,
      jobOpportunities: 9.7,
      intlEnvironment: 8.9,
      costOfLiving: 7.2,
      postStudyOpportunities: 9.8,
      climate: 7.0
    },

    rankings: {
      qs: '#28 QS World Ranking 2026',
      times: '#30 Times Higher Education',
      arwu: '#47 Shanghai ARWU',
      national: '#1 in Germany',
      employability: '#12 Global Graduate Employability',
      trend: [
        { year: '2024', rank: '#37' },
        { year: '2025', rank: '#28' },
        { year: '2026', rank: '#28' }
      ]
    },

    programs: {
      bachelor: [
        { name: 'BSc Information Technology', duration: '3 Years (6 Sems)', tuition: '€0 / Tuition-Free', credits: '180 ECTS', entry: 'IELTS 6.5, Studienkolleg / HSC + 1-yr Uni', intake: 'October', deadline: 'Jul 15' },
        { name: 'BSc Management & Technology', duration: '3 Years (6 Sems)', tuition: '€0 / Tuition-Free', credits: '180 ECTS', entry: 'IELTS 6.5, Math Aptitude Test', intake: 'October', deadline: 'Jul 15' }
      ],
      master: [
        { name: 'MSc Data Engineering & Analytics', duration: '2 Years (4 Sems)', tuition: '€0 / Tuition-Free', entry: 'BSc Computer Science / Math, IELTS 6.5', background: 'CSE / Math', gpa: '2.5 / 5.0 (German System)', thesis: 'Required', intake: 'October', deadline: 'May 31' },
        { name: 'MSc Robotics, Cognition, Intelligence', duration: '2 Years', tuition: '€0 / Tuition-Free', entry: 'BSc Mechatronics / CSE, GRE optional', background: 'Engineering', gpa: '2.5 / 5.0', thesis: 'Required', intake: 'October', deadline: 'May 31' }
      ],
      phd: [
        { name: 'Doctorate in AI & Machine Learning', duration: '3-4 Years', funding: '100% Salaried Position (TV-L E13 ~€4,200/mo gross)', proposal: 'Required', stipend: '€2,600/mo net salary', deadline: 'Rolling' }
      ]
    },

    tuition: {
      intlUndergradPerYear: '€0 (Tuition-Free Public Education)',
      intlPostgradPerYear: '€0 (Tuition-Free Public Education)',
      domesticPerYear: '€0',
      additionalFees: [
        { item: 'Semester Fee (Student Union & MVV Transit)', cost: '€150 / semester' },
        { item: 'Statutory Health Insurance (TK / AOK)', cost: '€120 / month' },
        { item: 'Uni-Assist Evaluation Fee', cost: '€75 one-time' }
      ],
      estimated4YearDegreeTotal: '€0 (Only €300/yr administrative fee)'
    },

    costOfLiving: {
      monthly: {
        rent: '€550 (Studentenwerk Munich Dorm) / €750 (Private WG)',
        food: '€250 (Supermarkets & Mensa student cafeteria)',
        transport: '€29 (Semesterticket Germany-wide travel pass)',
        internetUtilities: '€50',
        insurance: '€120',
        studyPersonal: '€100'
      },
      range: {
        low: '€850 / mo',
        avg: '€1,100 / mo ($1,200 USD)',
        high: '€1,450 / mo'
      },
      yearlyTotalLiving: '$14,400 USD / year (€13,200)',
      grandTotalYearlyCost: '$14,700 USD / year (Tuition + Living)',
      bangladeshiContext: 'Germany requires a Blocked Account (Sperrkonto) of €11,904 to receive student visa. However, living costs in Munich are easily balanced because tuition is 100% FREE, and students are allowed to work 140 full days per year.'
    },

    weather: {
      summer: '20°C – 30°C (Sunny & Pleasant)',
      winter: '-4°C – 4°C (Snowfall from Dec to March)',
      rainfall: '950 mm / year',
      snowfall: 'Moderate to High snow near Alps',
      daylight: 'Summer: 16 hrs | Winter: 8 hrs',
      bangladeshiExpectation: 'Munich winters have real snow! Make sure to buy snow boots and thermal jackets after arriving in Munich.'
    },

    jobs: {
      duringStudy: {
        workRights: '140 Full Days or 280 Half Days per year (20 hrs/week term)',
        typicalWage: '€14.00 – €18.00 / hour ($15–$20 USD)',
        commonJobs: 'HiWi Student Research Assistant, Werkstudent at BMW / Siemens, Software Tester'
      },
      afterGraduation: {
        employmentRate: '97.2% employed within 6 months',
        avgSalary: '€62,000 – €88,000 / year ($68,000–$96,000 USD)',
        topEmployers: ['BMW Group', 'Siemens AG', 'SAP', 'Infineon', 'Allianz', 'Google Munich'],
        postStudyVisa: 'Germany 18-Month Job Seeking Residence Permit',
        prPathway: 'Permanent Residency (Niederlassungserlaubnis) after 21 months of working with Blue Card'
      },
      careerScore: 9.7
    },

    admissionReqs: {
      gpaMin: 'GPA 4.50 / 5.00 (HSC + 1 Year Uni) or CGPA 3.00 / 4.00',
      ielts: {
        overall: '6.5',
        listening: '6.0',
        reading: '6.0',
        writing: '6.0',
        speaking: '6.0'
      },
      otherTests: 'VPD via Uni-Assist & Aptitude Assessment (Eignungsverfahren)',
      sopRequired: 'Yes (Letter of Motivation in English or German)'
    },

    documentChecklist: [
      { name: 'Valid Passport', required: true },
      { name: 'HSC & SSC Transcripts + Certificates (Attested)', required: true },
      { name: 'Uni-Assist VPD Preliminary Evaluation Document', required: true },
      { name: 'IELTS Academic Test Certificate (Min 6.5)', required: true },
      { name: 'Letter of Motivation', required: true },
      { name: 'Curriculum Vitae (Europass Format CV)', required: true },
      { name: 'Blocked Bank Account Confirmation (€11,904)', required: true }
    ],

    timeline: [
      { step: 'January – March', title: 'Document Attestation & Uni-Assist', desc: 'Attest certificates at Education Ministry & submit to Uni-Assist for VPD.' },
      { step: 'April – May', title: 'TUM Portal Application', desc: 'Submit application via TUMonline portal.' },
      { step: 'June', title: 'Aptitude Test / Admission Offer', desc: 'Receive direct admission offer or online interview invitation.' },
      { step: 'July', title: 'Open Blocked Bank Account', desc: 'Deposit €11,904 in Expatrio / Fintiba blocked account.' },
      { step: 'August', title: 'German Student Visa Appointment', desc: 'Attend German Embassy Dhaka visa interview.' },
      { step: 'October', title: 'Fly to Munich & Semester Start', desc: 'Arrive in Munich, complete city registration (Anmeldung).' }
    ],

    community: {
      intlStudentPct: '38%',
      bangladeshiCommunity: 'Active Bangladeshi Student Association Munich (BSAM) helping with accommodation and airport pickup.',
      facilities: 'Halal dining near Hauptbahnhof, Munich Islamic Center, campus prayer rooms.'
    },

    housingTrans: {
      housing: [
        { type: 'Studentenwerk Public Student Dorm', rent: '€320 – €450 / month (Cheap but waitlist applies)' },
        { type: 'Private Shared Apartment (WG)', rent: '€550 – €750 / month' }
      ],
      transport: 'Monthly €29 Deutschlandticket travel pass gives unlimited train & bus travel across ALL of Germany!'
    },

    scholarship: {
      name: '100% DAAD Public Education & Monthly Stipend',
      provider: 'German Federal Ministry of Education & DAAD',
      coverageType: 'Tuition-Free Public + Monthly Allowance',
      coverageSummary: {
        tuition: '100% Free Tuition (€0)',
        livingStipend: '€934 / month ($1,020 USD)',
        airfare: 'Included (DAAD Travel Allowance)',
        healthInsurance: '100% Paid by DAAD'
      },
      eligibilityGPA: '4.50/5.00 (HSC) or CGPA 3.20/4.00',
      bangladeshiMatchExample: {
        userGpa: '4.80 / 5.00',
        requiredGpa: '4.00 / 5.00',
        status: '✅ Excellent Match! You qualify for DAAD public funding.'
      },
      competitionLevel: 'Moderate (Germany welcomes international STEM talent)',
      financialImpact: {
        withoutScholarship: '$14,700 USD / year',
        scholarshipValue: '-$14,700 USD / year',
        outOfPocketRemaining: '$0 USD / year'
      },
      essayQuestions: [
        'How will studying your degree at TUM contribute to technological progress in your home country? (500 words)'
      ],
      selectionWeighting: [
        { criteria: 'Academic Transcript & Math/Science Grades', pct: 40 },
        { criteria: 'Motivation Letter', pct: 30 },
        { criteria: 'IELTS / Language Proficiency', pct: 15 },
        { criteria: 'CV & Extra-curriculars', pct: 15 }
      ],
      warnings: [
        '⚠️ German Student Visa appointment in Dhaka requires booking 2–3 months in advance.',
        '⚠️ Ensure Uni-Assist VPD evaluation is requested early in February.'
      ]
    }
  }
};

export default function UniversityDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Active Tab state for 7 rich decision tabs
  const [activeTab, setActiveTab] = useState('overview');

  const uni = fullUniversityData[id] || fullUniversityData.oxford;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061317] text-slate-900 dark:text-[#E6F5F7] transition-colors duration-300 pb-24">
      
      {/* ── Top Cover Image Hero Header ── */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-900">
        <img
          src={uni.image}
          alt={uni.name}
          className="w-full h-full object-cover filter brightness-[0.65] dark:brightness-[0.55] blur-[0.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061317] via-slate-950/40 to-black/60" />

        {/* Floating Top Controls */}
        <div className="absolute top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20">
          <Link
            to="/university-finder"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-black hover:bg-black/80 transition-all cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to University Finder</span>
          </Link>

          <span className={`px-4 py-1.5 rounded-full text-xs font-black border uppercase tracking-wider shadow-lg backdrop-blur-md ${uni.matchColor}`}>
            {uni.matchStatus}
          </span>
        </div>

        {/* Title & Key Badges Overlay */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-20 max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-3xl">{uni.flag}</span>
            <span className="text-xs font-black text-cyan-300 uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/30">
              {uni.city}, {uni.country}
            </span>
            <span className="text-xs font-black text-emerald-400 bg-emerald-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30">
              {uni.rankings.qs}
            </span>
            <span className="text-xs font-bold text-amber-300 bg-amber-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
              Edwaay Score: ⭐ {uni.edwaayScore.overall} / 10
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            {uni.name}
          </h1>
        </div>
      </div>


      {/* ── 7 INTERACTIVE DECISION TABS NAVIGATION BAR ── */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#091b20]/95 backdrop-blur-xl border-b border-slate-200 dark:border-zinc-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {[
              { id: 'overview', label: '📊 Overview & Score', icon: BarChart3 },
              { id: 'programs', label: '🎓 Programs & Degrees', icon: GraduationCap },
              { id: 'tuition', label: '💰 Tuition & Living Cost', icon: DollarSign },
              { id: 'admissions', label: '📋 Admissions & Reqs', icon: FileText },
              { id: 'career', label: '💼 Career & Visa', icon: Briefcase },
              { id: 'scholarship', label: '🏆 100% Scholarship', icon: Award },
              { id: 'campus', label: '🏛️ Campus & Community', icon: Building2 }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#0097B2] to-[#004B59] text-white shadow-md shadow-[#0097B2]/20'
                    : 'bg-slate-100 dark:bg-[#0d242b] text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-[#00252d]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* ── TAB 1: OVERVIEW & EDWAAY SCORE ── */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* A. University Overview Header & Basic Info */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                A. University Overview at a Glance
              </h2>
              <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-medium mb-6">
                {uni.desc}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <p className="text-slate-500 dark:text-zinc-400 font-semibold mb-1">Institution Type</p>
                  <p className="font-black text-slate-900 dark:text-white">{uni.type}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <p className="text-slate-500 dark:text-zinc-400 font-semibold mb-1">Founded Year</p>
                  <p className="font-black text-slate-900 dark:text-white">{uni.foundedYear}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <p className="text-slate-500 dark:text-zinc-400 font-semibold mb-1">Campus Size</p>
                  <p className="font-black text-slate-900 dark:text-white">{uni.campusSize}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <p className="text-slate-500 dark:text-zinc-400 font-semibold mb-1">Student Population</p>
                  <p className="font-black text-slate-900 dark:text-white">{uni.studentCount} ({uni.intlPercentage} Intl)</p>
                </div>
              </div>
            </div>

            {/* Q. ⭐ Edwaay University Score & Category Breakdown */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-cyan-50/20 to-slate-50 dark:from-[#0d242b] dark:to-[#061317] border border-[#0097B2]/30 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0097B2]/15 text-[#0097B2] dark:text-cyan-300 text-xs font-black uppercase mb-2">
                    <Star className="w-3.5 h-3.5 fill-[#0097B2]" />
                    <span>Q. EDWAAY UNIVERSITY SCORE</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    Overall Decision Score: <span className="text-[#0097B2] dark:text-cyan-300">{uni.edwaayScore.overall} / 10</span>
                  </h3>
                </div>

                <a
                  href={uni.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-2xl bg-[#0097B2] hover:bg-[#00788E] text-white text-xs font-black flex items-center gap-2 shrink-0 shadow-md cursor-pointer"
                >
                  <span>Official University Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                {[
                  { label: 'Academic Excellence', score: uni.edwaayScore.academic },
                  { label: 'Affordability', score: uni.edwaayScore.affordability },
                  { label: 'Job Opportunities', score: uni.edwaayScore.jobOpportunities },
                  { label: 'Intl Environment', score: uni.edwaayScore.intlEnvironment },
                  { label: 'Cost of Living', score: uni.edwaayScore.costOfLiving },
                  { label: 'Post-Study Opportunities', score: uni.edwaayScore.postStudyOpportunities },
                  { label: 'Climate & Weather', score: uni.edwaayScore.climate }
                ].map((sc, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-200/80 dark:border-zinc-800">
                    <p className="text-slate-500 dark:text-zinc-400 font-semibold mb-2">{sc.label}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-base text-slate-900 dark:text-white">{sc.score} / 10</span>
                      <div className="w-16 bg-slate-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#0097B2] h-full rounded-full" style={{ width: `${sc.score * 10}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* J. University Rankings & Trend */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#0097B2]" /> J. World University Rankings & Trend
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800 text-xs">
                  <p className="text-slate-500 dark:text-zinc-400 font-semibold">QS World Ranking</p>
                  <p className="font-black text-base text-[#0097B2] mt-1">{uni.rankings.qs}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800 text-xs">
                  <p className="text-slate-500 dark:text-zinc-400 font-semibold">Times Higher Education</p>
                  <p className="font-black text-base text-emerald-500 mt-1">{uni.rankings.times}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800 text-xs">
                  <p className="text-slate-500 dark:text-zinc-400 font-semibold">Global Employability</p>
                  <p className="font-black text-base text-cyan-400 mt-1">{uni.rankings.employability}</p>
                </div>
              </div>

              {/* Ranking Trend Graph */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                <p className="text-xs font-bold text-slate-700 dark:text-zinc-300 mb-3">3-Year Ranking Progress Trend:</p>
                <div className="flex items-center gap-4 text-xs font-black">
                  {uni.rankings.trend.map((tr, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-slate-400">{tr.year} →</span>
                      <span className="px-3 py-1 rounded-xl bg-[#0097B2]/20 text-[#0097B2] border border-[#0097B2]/30">{tr.rank}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        )}


        {/* ── TAB 2: PROGRAMS & DEGREES ── */}
        {activeTab === 'programs' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                B. Available Degree Programs & Cutoffs
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium mb-6">
                Explore Bachelor's, Master's, and PhD research tracks with exact tuition, duration, and IELTS cutoffs.
              </p>

              {/* Bachelor's Programs */}
              <div className="mb-8">
                <h3 className="text-base font-black text-[#0097B2] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" /> Bachelor's Degrees
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {uni.programs.bachelor.map((prog, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <h4 className="font-black text-sm text-slate-900 dark:text-white">{prog.name}</h4>
                        <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-bold">{prog.duration}</span>
                      </div>
                      <p className="text-emerald-500 font-extrabold">Tuition: {prog.tuition}</p>
                      <p className="text-slate-600 dark:text-zinc-300"><strong>Entry:</strong> {prog.entry}</p>
                      <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 dark:border-zinc-800">
                        <span>Intake: {prog.intake}</span>
                        <span>Deadline: {prog.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Master's Programs */}
              <div className="mb-8">
                <h3 className="text-base font-black text-emerald-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Master's Degrees
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {uni.programs.master.map((prog, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <h4 className="font-black text-sm text-slate-900 dark:text-white">{prog.name}</h4>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">{prog.duration}</span>
                      </div>
                      <p className="text-emerald-500 font-extrabold">Tuition: {prog.tuition}</p>
                      <p className="text-slate-600 dark:text-zinc-300"><strong>GPA Req:</strong> {prog.gpa} (Thesis: {prog.thesis})</p>
                      <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 dark:border-zinc-800">
                        <span>Intake: {prog.intake}</span>
                        <span>Deadline: {prog.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PhD Track */}
              <div>
                <h3 className="text-base font-black text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Doctorate & PhD Research
                </h3>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 space-y-2 text-xs">
                  {uni.programs.phd.map((prog, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="font-black text-sm text-slate-900 dark:text-white">{prog.name} ({prog.duration})</h4>
                      <p className="text-emerald-400 font-bold">Funding: {prog.funding}</p>
                      <p className="text-slate-400">Monthly Stipend: <strong>{prog.stipend}</strong></p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}


        {/* ── TAB 3: TUITION & COST OF LIVING ── */}
        {activeTab === 'tuition' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* C. Tuition Fees Calculator */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                C. Tuition Fees & Degree Cost Calculator
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 text-xs">
                  <p className="text-slate-500 dark:text-zinc-400 font-semibold">International Undergrad / Year</p>
                  <p className="font-black text-lg text-[#0097B2] mt-1">{uni.tuition.intlUndergradPerYear}</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 text-xs">
                  <p className="text-slate-500 dark:text-zinc-400 font-semibold">International Postgrad / Year</p>
                  <p className="font-black text-lg text-emerald-500 mt-1">{uni.tuition.intlPostgradPerYear}</p>
                </div>
                <div className="p-5 rounded-2xl bg-cyan-50/50 dark:bg-[#0097B2]/15 border border-[#0097B2]/40 text-xs">
                  <p className="text-[#0097B2] dark:text-cyan-300 font-bold">Estimated 4-Year Tuition Total</p>
                  <p className="font-black text-xl text-slate-900 dark:text-white mt-1">{uni.tuition.estimated4YearDegreeTotal}</p>
                </div>
              </div>
            </div>

            {/* D. Cost of Living (Bangladeshi Student Focus) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-cyan-50/20 to-slate-50 dark:from-[#0d242b] dark:to-[#061317] border border-[#0097B2]/30 shadow-xl">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                D. Estimated Cost of Living (Bangladeshi Student Context)
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium mb-6">
                Calculated monthly budget breakdown for housing, food, travel, and personal expenses.
              </p>

              {/* Monthly Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-6">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Accommodation</span>
                  <p className="font-black text-slate-900 dark:text-white mt-1">{uni.costOfLiving.monthly.rent}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Food & Groceries</span>
                  <p className="font-black text-slate-900 dark:text-white mt-1">{uni.costOfLiving.monthly.food}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Local Transport</span>
                  <p className="font-black text-slate-900 dark:text-white mt-1">{uni.costOfLiving.monthly.transport}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Utilities & WiFi</span>
                  <p className="font-black text-slate-900 dark:text-white mt-1">{uni.costOfLiving.monthly.internetUtilities}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Health Insurance</span>
                  <p className="font-black text-slate-900 dark:text-white mt-1">{uni.costOfLiving.monthly.insurance}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Personal / Books</span>
                  <p className="font-black text-slate-900 dark:text-white mt-1">{uni.costOfLiving.monthly.studyPersonal}</p>
                </div>
              </div>

              {/* Grand Total Cost Card */}
              <div className="p-6 rounded-3xl bg-[#0097B2] text-white space-y-2 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-cyan-100 uppercase tracking-wider">ESTIMATED GRAND TOTAL YEARLY EXPENSE</p>
                    <p className="text-3xl font-black">{uni.costOfLiving.grandTotalYearlyCost}</p>
                  </div>
                  <p className="text-xs bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl font-extrabold text-white shrink-0">
                    Tuition + Living Included
                  </p>
                </div>
                <p className="text-xs text-cyan-100 pt-2 border-t border-white/20 leading-relaxed font-medium">
                  🇧🇩 {uni.costOfLiving.bangladeshiContext}
                </p>
              </div>
            </div>

            {/* E. Weather & Climate */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" /> E. Weather & Climate (Bangladeshi Student Guide)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">Summer Temp</span>
                  <p className="font-black text-slate-900 dark:text-white mt-1">{uni.weather.summer}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">Winter Temp</span>
                  <p className="font-black text-slate-900 dark:text-white mt-1">{uni.weather.winter}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-bold">Rain & Snow</span>
                  <p className="font-black text-slate-900 dark:text-white mt-1">{uni.weather.rainfall}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-bold">Daylight Hours</span>
                  <p className="font-black text-slate-900 dark:text-white mt-1">{uni.weather.daylight}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-slate-800 dark:text-amber-200 font-medium">
                <strong>What to expect as a Bangladeshi student:</strong> {uni.weather.bangladeshiExpectation}
              </div>
            </div>

          </motion.div>
        )}


        {/* ── TAB 4: ADMISSIONS & REQUIRED DOCUMENTS ── */}
        {activeTab === 'admissions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* G. Admission Requirements */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                G. Admission Requirements & Minimum Scores
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 space-y-3 text-xs">
                  <h3 className="font-black text-sm text-[#0097B2]">Academic GPA Cutoffs</h3>
                  <p className="text-slate-700 dark:text-zinc-200 font-semibold">{uni.admissionReqs.gpaMin}</p>
                  <p className="text-slate-500 dark:text-zinc-400">Additional Entrance Tests: <strong>{uni.admissionReqs.otherTests}</strong></p>
                </div>

                {/* IELTS Cutoffs Breakdown */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 space-y-3 text-xs">
                  <h3 className="font-black text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" /> English Language Cutoffs (IELTS)
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-center font-bold">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#091b20]">
                      <span className="text-[10px] text-slate-400">Overall</span>
                      <p className="text-base text-slate-900 dark:text-white font-black">{uni.admissionReqs.ielts.overall}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-[#091b20]">
                      <span className="text-[10px] text-slate-400">Listening</span>
                      <p className="text-base text-slate-900 dark:text-white font-black">{uni.admissionReqs.ielts.listening}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-[#091b20]">
                      <span className="text-[10px] text-slate-400">Writing</span>
                      <p className="text-base text-slate-900 dark:text-white font-black">{uni.admissionReqs.ielts.writing}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* H. Required Documents Checklist */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                H. Required Document Checklist (Mandatory vs Optional)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {uni.documentChecklist.map((doc, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex items-center justify-between ${
                      doc.required
                        ? 'bg-slate-50 dark:bg-[#091b20] border-slate-200 dark:border-zinc-800'
                        : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30'
                    }`}
                  >
                    <span className="font-bold text-slate-800 dark:text-zinc-200">{doc.name}</span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase shrink-0 ${
                        doc.required
                          ? 'bg-emerald-500/20 text-emerald-500'
                          : 'bg-amber-500/20 text-amber-500'
                      }`}
                    >
                      {doc.required ? 'Required' : 'Recommended'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* I. Application Timeline Roadmap */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
                I. Step-by-Step Application Timeline Roadmap
              </h2>

              <div className="space-y-4">
                {uni.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800 text-xs">
                    <span className="w-8 h-8 rounded-xl bg-[#0097B2] text-white font-black flex items-center justify-center shrink-0 text-xs">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-[#0097B2]">{step.step}</span>
                        <span className="font-black text-slate-900 dark:text-white">• {step.title}</span>
                      </div>
                      <p className="text-slate-600 dark:text-zinc-300 mt-1 font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}


        {/* ── TAB 5: CAREER & VISA ── */}
        {activeTab === 'career' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* F. Jobs & Career Opportunities */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  F. Jobs & Post-Graduation Career Opportunities
                </h2>
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs">
                  Career Score: 🏆 {uni.jobs.careerScore} / 10
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* During Study */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 space-y-3">
                  <h3 className="font-black text-sm text-[#0097B2] flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Part-Time Student Work Rights
                  </h3>
                  <p><strong>Allowed Hours:</strong> {uni.jobs.duringStudy.workRights}</p>
                  <p><strong>Average Student Wage:</strong> <span className="text-emerald-500 font-black">{uni.jobs.duringStudy.typicalWage}</span></p>
                  <p className="text-slate-500 dark:text-zinc-400"><strong>Popular On-Campus / Off-Campus Jobs:</strong> {uni.jobs.duringStudy.commonJobs}</p>
                </div>

                {/* After Graduation */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 space-y-3">
                  <h3 className="font-black text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Graduate Employment & PR Rights
                  </h3>
                  <p><strong>Employment Rate:</strong> <span className="font-black text-emerald-500">{uni.jobs.afterGraduation.employmentRate}</span></p>
                  <p><strong>Average Graduate Salary:</strong> <span className="font-black text-slate-900 dark:text-white">{uni.jobs.afterGraduation.avgSalary}</span></p>
                  <p><strong>Post-Study Work Permit:</strong> {uni.jobs.afterGraduation.postStudyVisa}</p>
                  <p className="text-slate-600 dark:text-emerald-300"><strong>PR Pathway:</strong> {uni.jobs.afterGraduation.prPathway}</p>
                </div>
              </div>
            </div>

          </motion.div>
        )}


        {/* ── TAB 6: 100% SCHOLARSHIP DETAILS ── */}
        {activeTab === 'scholarship' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* Scholarship Header Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white dark:to-[#0d242b] border border-emerald-500/40 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-black mb-3">
                <Award className="w-4 h-4" />
                <span>{uni.scholarship.coverageType}</span>
              </div>

              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                {uni.scholarship.name}
              </h2>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-6">
                Provider: {uni.scholarship.provider}
              </p>

              {/* Coverage Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-6">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Tuition Coverage</span>
                  <p className="font-black text-emerald-500 text-sm mt-1">{uni.scholarship.coverageSummary.tuition}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Living Allowance</span>
                  <p className="font-black text-slate-900 dark:text-white text-sm mt-1">{uni.scholarship.coverageSummary.livingStipend}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">International Airfare</span>
                  <p className="font-black text-slate-900 dark:text-white text-sm mt-1">{uni.scholarship.coverageSummary.airfare}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Health Insurance</span>
                  <p className="font-black text-emerald-500 text-sm mt-1">{uni.scholarship.coverageSummary.healthInsurance}</p>
                </div>
              </div>

              {/* K. Actual Financial Impact Calculator */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
                <h3 className="text-sm font-black text-cyan-400 uppercase tracking-widest">
                  K. Actual Financial Impact Calculator (Without vs With Scholarship)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Cost Without Scholarship:</span>
                    <p className="text-lg font-black text-rose-400">{uni.scholarship.financialImpact.withoutScholarship}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Scholarship Value Deducted:</span>
                    <p className="text-lg font-black text-emerald-400">{uni.scholarship.financialImpact.scholarshipValue}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Net Out-Of-Pocket Cost:</span>
                    <p className="text-2xl font-black text-cyan-300">{uni.scholarship.financialImpact.outOfPocketRemaining}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selection Weighting & Essay Requirements */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg space-y-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0097B2]" /> Selection Criteria & Essay Prompts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div>
                  <h4 className="font-black text-slate-800 dark:text-white mb-3">Committee Selection Weighting:</h4>
                  <div className="space-y-2">
                    {uni.scholarship.selectionWeighting.map((w, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-[#091b20]">
                        <span className="font-semibold">{w.criteria}</span>
                        <span className="font-black text-[#0097B2]">{w.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-slate-800 dark:text-white mb-3">Required Essay Prompts:</h4>
                  <div className="space-y-2">
                    {uni.scholarship.essayQuestions.map((q, idx) => (
                      <p key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-200 font-medium">
                        ✍️ {q}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        )}


        {/* ── TAB 7: CAMPUS LIFE & COMMUNITY ── */}
        {activeTab === 'campus' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg space-y-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                K & O. Campus Life, Accommodation & Bangladeshi Student Community
              </h2>

              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-xs space-y-2">
                <h3 className="font-black text-emerald-600 dark:text-emerald-400 text-sm">🇧🇩 Bangladeshi Student Community & Support:</h3>
                <p className="text-slate-700 dark:text-zinc-200 font-medium">{uni.community.bangladeshiCommunity}</p>
                <p className="text-slate-500 dark:text-zinc-400"><strong>Halal Food & Facilities:</strong> {uni.community.facilities}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {uni.housingTrans.housing.map((h, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800">
                    <p className="font-black text-slate-900 dark:text-white">{h.type}</p>
                    <p className="text-emerald-500 font-bold mt-1">{h.rent}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
