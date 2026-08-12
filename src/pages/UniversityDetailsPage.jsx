import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Sparkles
} from 'lucide-react';

const universityDetailsData = {
  oxford: {
    id: 'oxford',
    name: 'University of Oxford',
    country: 'United Kingdom',
    flag: '🇬🇧',
    minBand: '7.5+',
    ranking: '#1 World University Ranking (Times Higher Ed)',
    location: 'Oxford, Oxfordshire, England',
    acceptanceRate: '17.5%',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&auto=format&fit=crop&q=80',
    desc: 'Established in 1096, Oxford is the oldest university in the English-speaking world. It operates a collegiate system offering world-class research labs and faculty.',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    
    // Section 1: University Details
    uniOverview: {
      established: '1096 AD',
      studentCount: '26,000+',
      internationalStudents: '46%',
      topPrograms: ['Computer Science', 'Medicine', 'Law', 'Philosophy & Politics (PPE)', 'Economics'],
      cutoffBreakdown: {
        overall: '7.5',
        listening: '7.0',
        reading: '7.0',
        writing: '7.5',
        speaking: '7.0'
      },
      highlights: [
        'World #1 research impact across STEM, Humanities & Social Sciences',
        'Tutorial system with 1-on-1 personalized professor sessions',
        'Over 100 library systems including the famous Bodleian Library',
        'Global network of 350,000+ distinguished alumni leaders'
      ]
    },

    // Section 2: Scholarship Details
    scholarshipInfo: {
      name: 'Rhodes & Clarendon Full-Ride Scholarship',
      type: '100% Fully Funded Merit Award',
      coverage: '100% Tuition Fees + Living Stipend',
      stipendAmount: '£18,180 per year tax-free stipend',
      deadline: 'October 15, 2026',
      eligibility: [
        'Minimum Overall IELTS score of 7.5 (no sub-score below 7.0)',
        'Bachelor degree with First Class Honors or CGPA > 3.75/4.0',
        'Demonstrated leadership potential and commitment to social impact',
        'Personal statement & 3 academic reference letters'
      ],
      benefits: [
        'Full university & college tuition fee coverage for entire program',
        'Annual living allowance (£1,515 per month)',
        'Economy class return airfare to home country',
        'Health insurance surcharge & visa application fee coverage'
      ]
    }
  },

  tum: {
    id: 'tum',
    name: 'Technical University of Munich',
    country: 'Germany',
    flag: '🇩🇪',
    minBand: '6.5+',
    ranking: '#28 QS World Ranking | #1 German University',
    location: 'Munich, Bavaria, Germany',
    acceptanceRate: '24%',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&auto=format&fit=crop&q=80',
    desc: 'Europe’s leading institute of technology, TUM combines top-tier research in engineering, robotics, and AI with strong industrial partnerships.',
    matchStatus: 'Guaranteed Match',
    matchColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    
    uniOverview: {
      established: '1868',
      studentCount: '50,000+',
      internationalStudents: '38%',
      topPrograms: ['Automotive Engineering', 'Data Science & AI', 'Robotics', 'Management & Technology'],
      cutoffBreakdown: {
        overall: '6.5',
        listening: '6.0',
        reading: '6.0',
        writing: '6.0',
        speaking: '6.0'
      },
      highlights: [
        'Zero tuition fees at state public universities in Bavaria',
        'Direct career pathways with BMW, Siemens, SAP, and Airbus',
        'State-of-the-art high-tech research campuses in Garching',
        'English-taught Bachelor & Master programs'
      ]
    },

    scholarshipInfo: {
      name: '100% DAAD Tuition-Free Public Grant',
      type: 'Government Public Funding + DAAD Monthly Grant',
      coverage: '€0 Tuition Fee + €934/mo Monthly Allowance',
      stipendAmount: '€934 per month + Health & Travel Support',
      deadline: 'July 15, 2026',
      eligibility: [
        'Minimum Overall IELTS score of 6.5',
        'Recognized high school certificate or 1-year Studienkolleg completion',
        'Strong academic transcript in Mathematics & Science subjects',
        'Motivational letter detailing research interests'
      ],
      benefits: [
        '100% Tuition-free public university education (€0 fees)',
        'Monthly DAAD stipend of €934 for living expenses',
        'Full health, accident, and personal liability insurance coverage',
        'Free public transport travel pass across Munich'
      ]
    }
  },

  toronto: {
    id: 'toronto',
    name: 'University of Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    minBand: '7.0+',
    ranking: '#21 QS World Ranking | #1 in Canada',
    location: 'Toronto, Ontario, Canada',
    acceptanceRate: '43%',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
    desc: 'Canada’s flagship research university situated in vibrant downtown Toronto, renowned for groundbreaking discoveries in insulin, stem cells, and AI.',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    
    uniOverview: {
      established: '1827',
      studentCount: '95,000+',
      internationalStudents: '28%',
      topPrograms: ['Computer Engineering', 'Biomedical Science', 'Finance', 'Architecture', 'AI & Machine Learning'],
      cutoffBreakdown: {
        overall: '7.0',
        listening: '6.5',
        reading: '6.5',
        writing: '6.5',
        speaking: '6.5'
      },
      highlights: [
        'Post-Graduation Work Permit (PGWP) guaranteed for 3 years',
        'Over $2 billion annual research funding pool',
        'Three historic campuses: St. George, Mississauga, and Scarborough',
        'Direct co-op internships with top tech giants in Toronto'
      ]
    },

    scholarshipInfo: {
      name: 'Lester B. Pearson International Full Ride',
      type: '100% Full-Ride Prestigious Award',
      coverage: '100% Tuition + Books + Full Residence & Meals',
      stipendAmount: 'Full cost of study & living for 4 years',
      deadline: 'January 18, 2027',
      eligibility: [
        'Minimum Overall IELTS score of 7.0 (no sub-band below 6.5)',
        'Nominated by applicant high school guidance counsellor',
        'Exceptional academic achievement and creative leadership',
        'Final year high school student planning to enter undergraduate studies'
      ],
      benefits: [
        'Full undergraduate tuition fee coverage for 4 full academic years',
        'Full accommodation in university residence halls',
        'Full meal plan and textbook / incidental fee allowance',
        'Annual travel grant for international home visits'
      ]
    }
  },

  harvard: {
    id: 'harvard',
    name: 'Harvard University',
    country: 'United States',
    flag: '🇺🇸',
    minBand: '7.5+',
    ranking: '#4 QS World Ranking | Ivy League Premier',
    location: 'Cambridge, Massachusetts, USA',
    acceptanceRate: '3.4%',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&auto=format&fit=crop&q=80',
    desc: 'The oldest institution of higher learning in the US, Harvard is world famous for academic rigor, transformative leadership, and pioneering global innovation.',
    matchStatus: 'Target Stretch',
    matchColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    
    uniOverview: {
      established: '1636',
      studentCount: '23,000+',
      internationalStudents: '25%',
      topPrograms: ['Economics', 'Government & International Relations', 'Computer Science', 'Pre-Med', 'Business'],
      cutoffBreakdown: {
        overall: '7.5',
        listening: '7.5',
        reading: '7.5',
        writing: '7.5',
        speaking: '7.5'
      },
      highlights: [
        'Over $53 Billion endowment fund backing 100% need-blind aid',
        'World’s largest university library system with 20 million volumes',
        'Over 40 Nobel laureates and 8 US Presidents among alumni',
        'Guaranteed research grants for undergraduate innovation projects'
      ]
    },

    scholarshipInfo: {
      name: 'Presidential Need-Based 100% Financial Aid',
      type: '100% Full Need-Met Grant (No Student Loans)',
      coverage: '100% Tuition + Room + Board + Travel Allowance',
      stipendAmount: 'Full financial package based on family income',
      deadline: 'November 01, 2026',
      eligibility: [
        'Minimum Overall IELTS score of 7.5',
        'Family income below $85,000 USD/year qualifies for 100% FREE attendance',
        'High school transcripts with top percentile rank & SAT/ACT optional',
        'Holistic review of essays, extracurricular achievements, and recommendations'
      ],
      benefits: [
        'Zero tuition fee charge for families earning under $85,000/year',
        'Full coverage for housing, food, books, and personal expenses',
        'Annual travel allowance covering round-trip airfare from home country',
        'No obligation to take out any student loans'
      ]
    }
  },

  melbourne: {
    id: 'melbourne',
    name: 'University of Melbourne',
    country: 'Australia',
    flag: '🇦🇺',
    minBand: '6.5+',
    ranking: '#14 QS World Ranking | #1 in Australia',
    location: 'Melbourne, Victoria, Australia',
    acceptanceRate: '70%',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    desc: 'Australia’s leading research university located in the cultural capital Melbourne, famous for high graduate employability and flexible curriculum.',
    matchStatus: 'Guaranteed Match',
    matchColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    
    uniOverview: {
      established: '1853',
      studentCount: '54,000+',
      internationalStudents: '44%',
      topPrograms: ['Biomedical Science', 'Civil Engineering', 'Commerce & Accounting', 'Law', 'Environmental Science'],
      cutoffBreakdown: {
        overall: '6.5',
        listening: '6.0',
        reading: '6.0',
        writing: '6.0',
        speaking: '6.0'
      },
      highlights: [
        'Post-study work visa rights up to 4 to 5 years in Australia',
        'Top 10 globally for graduate employability rating',
        'Beautiful historic Parkville campus 5 minutes from Melbourne CBD',
        'Industry internship placements integrated into degree programs'
      ]
    },

    scholarshipInfo: {
      name: 'Melbourne International High Achiever Grant',
      type: 'Tuition Fee Remittance Award',
      coverage: 'AUD $10,000 to 100% Tuition Fee Waiver',
      stipendAmount: 'Up to $110,000 AUD total over degree duration',
      deadline: 'November 30, 2026',
      eligibility: [
        'Minimum Overall IELTS score of 6.5',
        'Top 1% high school results or equivalent A-Levels / IB Diploma',
        'Unconditional offer of admission to an undergraduate degree',
        'Automatic consideration upon submitting standard admission application'
      ],
      benefits: [
        '100% fee remission for full duration of undergraduate degree OR',
        '$10,000 AUD tuition fee reduction in first year of study',
        'Priority access to University of Melbourne student accommodation',
        'Alumni mentor pairing upon enrollment'
      ]
    }
  },

  cambridge: {
    id: 'cambridge',
    name: 'University of Cambridge',
    country: 'United Kingdom',
    flag: '🇬🇧',
    minBand: '7.5+',
    ranking: '#2 QS World Ranking | Collegiate Excellence',
    location: 'Cambridge, Cambridgeshire, England',
    acceptanceRate: '15.7%',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&auto=format&fit=crop&q=80',
    desc: 'Founded in 1209, Cambridge is a world leader in scientific discovery, mathematics, and humanities, boasting 121 Nobel Laureates.',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    
    uniOverview: {
      established: '1209 AD',
      studentCount: '24,000+',
      internationalStudents: '40%',
      topPrograms: ['Mathematics (Tripos)', 'Engineering', 'Natural Sciences', 'Computer Science', 'Architecture'],
      cutoffBreakdown: {
        overall: '7.5',
        listening: '7.0',
        reading: '7.0',
        writing: '7.0',
        speaking: '7.0'
      },
      highlights: [
        '121 Nobel Prize winners affiliated with Cambridge',
        'World famous Cavendish Laboratory & Silicon Fen tech cluster',
        'Supervision learning system with top global professors',
        '31 autonomous constituent colleges providing rich student life'
      ]
    },

    scholarshipInfo: {
      name: 'Gates Cambridge International Full Scholarship',
      type: '100% Full Cost International Scholar Award',
      coverage: '100% Tuition Fees + Maintenance Allowance + Airfare',
      stipendAmount: '£20,000 per year maintenance allowance',
      deadline: 'December 03, 2026',
      eligibility: [
        'Minimum Overall IELTS score of 7.5',
        'Citizenship of any country outside the United Kingdom',
        'Outstanding academic record and intellectual ability',
        'Capacity to use knowledge for the betterment of society'
      ],
      benefits: [
        'Full university composition fee and college fees paid',
        'Maintenance allowance of £20,000 per annum',
        'One economy single airfare at beginning and end of course',
        'Inbound visa costs & Immigration Health Surcharge reimbursement'
      ]
    }
  },

  nus: {
    id: 'nus',
    name: 'National University of Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    minBand: '7.0+',
    ranking: '#8 QS World Ranking | #1 in Asia',
    location: 'Kent Ridge, Singapore',
    acceptanceRate: '12%',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&auto=format&fit=crop&q=80',
    desc: 'Singapore’s flagship university, NUS offers global education & innovation hubs in Asia with strong industry connections to tech giants.',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    
    uniOverview: {
      established: '1905',
      studentCount: '40,000+',
      internationalStudents: '32%',
      topPrograms: ['Computer Science & Software', 'Civil & Environmental Eng.', 'Business Analytics', 'Biomedical Sciences'],
      cutoffBreakdown: {
        overall: '7.0',
        listening: '6.5',
        reading: '6.5',
        writing: '6.5',
        speaking: '6.5'
      },
      highlights: [
        '#1 University in Asia across engineering and computer science',
        'NUS Overseas Colleges (NOC) startup hubs in Silicon Valley & Munich',
        'Safe, modern, high-tech campus with direct metro connections',
        'Direct employment opportunities with multinational tech firms in Singapore'
      ]
    },

    scholarshipInfo: {
      name: 'ASEAN Undergraduate Full Scholarship',
      type: 'Full Tuition + Living Allowance Award',
      coverage: '100% Tuition Fee Waiver + S$5,800/yr Living Allowance',
      stipendAmount: 'Full tuition + S$5,800 annual stipend + S$3,000 housing',
      deadline: 'January 15, 2027',
      eligibility: [
        'Minimum Overall IELTS score of 7.0',
        'Citizenship of an ASEAN member country (excluding Singapore)',
        'Outstanding high school academic achievements & leadership record',
        'Applying for full-time undergraduate degree program at NUS'
      ],
      benefits: [
        'Full coverage of subsidized tuition fees',
        'Annual living allowance of S$5,800',
        'Annual accommodation allowance of S$3,000',
        'One-off computer allowance of S$1,750 upon enrollment'
      ]
    }
  },

  eth: {
    id: 'eth',
    name: 'ETH Zurich',
    country: 'Switzerland',
    flag: '🇨🇭',
    minBand: '7.0+',
    ranking: '#7 QS World Ranking | Top Continental Europe',
    location: 'Zurich, Switzerland',
    acceptanceRate: '27%',
    image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=1200&auto=format&fit=crop&q=80',
    desc: 'World famous for science and technology, ETH Zurich produced Albert Einstein and 22 Nobel Laureates, offering state-of-the-art research laboratories.',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    
    uniOverview: {
      established: '1855',
      studentCount: '25,000+',
      internationalStudents: '40%',
      topPrograms: ['Physics & Quantum Computing', 'Mechanical Engineering', 'Computer Science', 'Mathematics'],
      cutoffBreakdown: {
        overall: '7.0',
        listening: '6.5',
        reading: '6.5',
        writing: '6.5',
        speaking: '6.5'
      },
      highlights: [
        'Albert Einstein studied and taught as physics professor at ETH',
        'Ultra-low public tuition fees (~CHF 730/semester)',
        'Located in Zurich, consistently voted #1 highest quality of life',
        'Cutting-edge spin-off robotics and AI technology hubs'
      ]
    },

    scholarshipInfo: {
      name: 'Excellence Scholarship & Opportunity Program (ESOP)',
      type: '100% Full Study Grant & Fee Waiver',
      coverage: '100% Tuition Waiver + CHF 12,000/sem Living Grant',
      stipendAmount: 'CHF 24,000 per year + full fee waiver',
      deadline: 'December 15, 2026',
      eligibility: [
        'Minimum Overall IELTS score of 7.0',
        'Very good result in Bachelor degree (top 10% of class)',
        'Pre-proposal for Master thesis idea or research proposal',
        'Unconditional admission offer from ETH Zurich'
      ],
      benefits: [
        'Full study grant covering living and study costs (CHF 12,000 per semester)',
        'Complete waiver of university tuition fees',
        'Special mentorship program with ETH alumni network',
        'Direct lab space & research equipment access'
      ]
    }
  }
};

export default function UniversityDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const uni = universityDetailsData[id] || universityDetailsData.oxford;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061317] text-slate-900 dark:text-[#E6F5F7] transition-colors duration-300 pb-20">
      
      {/* ── Top Cover Image Hero Header ── */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
        <img
          src={uni.image}
          alt={uni.name}
          className="w-full h-full object-cover filter brightness-[0.7] dark:brightness-[0.6] blur-[0.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061317] via-slate-950/40 to-black/60" />

        {/* Top Floating Controls */}
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

        {/* University Title Overlay */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-20 max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{uni.flag}</span>
            <span className="text-xs sm:text-sm font-bold text-cyan-300 uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/30">
              {uni.country}
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30">
              {uni.ranking}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {uni.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0097B2]" />
            <span>{uni.location}</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

        {/* ── SECTION 1: UNIVERSITY DETAILS ── */}
        <section id="university-section" className="mb-16">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-zinc-800 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#0097B2]/15 text-[#0097B2] dark:text-cyan-300 flex items-center justify-center font-black">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-[#0097B2] uppercase">SECTION 1 OF 2</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                University & Academic Overview
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Description & Highlights */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* About Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg backdrop-blur-xl">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">
                  About {uni.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
                  {uni.desc}
                </p>
              </div>

              {/* Key Highlights */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg backdrop-blur-xl">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0097B2]" /> Key Academic Strengths
                </h3>
                <ul className="space-y-3">
                  {uni.uniOverview.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-zinc-200 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Programs */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg backdrop-blur-xl">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#0097B2]" /> Featured Degree Programs
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {uni.uniOverview.topPrograms.map((prog, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 text-xs font-extrabold text-slate-800 dark:text-cyan-300"
                    >
                      🎓 {prog}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Admission Cutoff Breakdown & Key Stats Card */}
            <div className="space-y-6">
              
              {/* Stats Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-cyan-50/30 dark:from-[#0d242b] dark:to-[#061317] border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg space-y-4">
                <h3 className="text-base font-black text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 pb-3">
                  University Quick Facts
                </h3>

                <div className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Established Year</span>
                  <span className="font-black text-slate-900 dark:text-white">{uni.uniOverview.established}</span>
                </div>

                <div className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Total Students</span>
                  <span className="font-black text-slate-900 dark:text-white">{uni.uniOverview.studentCount}</span>
                </div>

                <div className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">International Ratio</span>
                  <span className="font-black text-emerald-500">{uni.uniOverview.internationalStudents}</span>
                </div>

                <div className="flex justify-between items-center text-xs p-3 rounded-2xl bg-white dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800">
                  <span className="text-slate-500 dark:text-zinc-400 font-semibold">Acceptance Rate</span>
                  <span className="font-black text-amber-500">{uni.acceptanceRate}</span>
                </div>
              </div>

              {/* IELTS Cutoff Breakdown Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-[#0097B2]" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Minimum IELTS Cutoff
                  </h3>
                </div>

                <div className="text-center py-3 bg-[#E6F5F7] dark:bg-[#0097B2]/20 rounded-2xl border border-[#0097B2]/30 mb-4">
                  <p className="text-xs font-bold text-[#0097B2] dark:text-cyan-300">Required Band Score</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{uni.minBand}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800 flex justify-between">
                    <span className="text-slate-500 dark:text-zinc-400">Listening</span>
                    <span className="font-black">{uni.uniOverview.cutoffBreakdown.listening}+</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800 flex justify-between">
                    <span className="text-slate-500 dark:text-zinc-400">Reading</span>
                    <span className="font-black">{uni.uniOverview.cutoffBreakdown.reading}+</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800 flex justify-between">
                    <span className="text-slate-500 dark:text-zinc-400">Writing</span>
                    <span className="font-black">{uni.uniOverview.cutoffBreakdown.writing}+</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800 flex justify-between">
                    <span className="text-slate-500 dark:text-zinc-400">Speaking</span>
                    <span className="font-black">{uni.uniOverview.cutoffBreakdown.speaking}+</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ── SECTION 2: SCHOLARSHIP DETAILS ── */}
        <section id="scholarship-section">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-zinc-800 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-black">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase">SECTION 2 OF 2</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                100% Scholarship & Financial Aid Details
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 Columns: Scholarship Overview & Benefits */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Scholarship Header Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white dark:to-[#0d242b] border border-emerald-500/30 shadow-xl relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-black mb-3">
                  <Award className="w-4 h-4" />
                  <span>{uni.scholarshipInfo.type}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
                  {uni.scholarshipInfo.name}
                </h3>

                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                  Grant Value: {uni.scholarshipInfo.stipendAmount}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-zinc-200 bg-white/80 dark:bg-[#091b20]/80 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 dark:border-zinc-800 inline-flex">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>Next Application Deadline: <strong>{uni.scholarshipInfo.deadline}</strong></span>
                </div>
              </div>

              {/* Full Benefits Breakdown */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" /> Scholarship Coverage & Perks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {uni.scholarshipInfo.benefits.map((b, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/30 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-800 dark:text-emerald-200 font-bold leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Eligibility Criteria & Apply CTA */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Eligibility Criteria */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0097B2]" /> Eligibility & Requirements
                </h3>

                <ul className="space-y-3">
                  {uni.scholarshipInfo.eligibility.map((req, i) => (
                    <li key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-100 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-200 font-semibold flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0097B2]/20 text-[#0097B2] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Application CTA */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0097B2] via-[#00788E] to-[#004B59] text-white shadow-2xl text-center space-y-4">
                <h3 className="text-xl font-black">
                  Ready to Apply for {uni.name}?
                </h3>
                <p className="text-xs text-cyan-100 font-medium leading-relaxed">
                  Our Edwaay academic counselor team will guide your scholarship documentation and IELTS score submission.
                </p>

                <button
                  type="button"
                  onClick={() => alert(`Starting 1:1 Scholarship Application Guidance for ${uni.name}!`)}
                  className="w-full py-4 rounded-2xl bg-white text-[#004B59] hover:bg-cyan-50 font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply Now for Scholarship</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
