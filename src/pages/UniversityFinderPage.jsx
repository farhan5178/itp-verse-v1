import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Globe,
  GraduationCap,
  Award,
  CheckCircle2,
  ExternalLink,
  Building2,
  Filter,
  Sparkles,
  ArrowRight,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

const mockUniversities = [
  {
    id: 'oxford',
    name: 'University of Oxford',
    country: 'United Kingdom',
    flag: '🇬🇧',
    minBand: '7.5+',
    scholarship: '100% Rhodes Full Scholarship',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    tuition: 'Fully Funded',
    deadline: 'Oct 15, 2026',
    desc: 'World-renowned institution offering fully funded Rhodes and Clarendon scholar grants.',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'tum',
    name: 'Technical University of Munich',
    country: 'Germany',
    flag: '🇩🇪',
    minBand: '6.5+',
    scholarship: '100% DAAD Tuition-Free Public',
    matchStatus: 'Guaranteed Match',
    matchColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    tuition: '€0 / Tuition-Free',
    deadline: 'Jul 15, 2026',
    desc: 'Europe’s leading STEM university with zero tuition fees for international students.',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'toronto',
    name: 'University of Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    minBand: '7.0+',
    scholarship: 'Lester B. Pearson Full Ride',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    tuition: 'Fully Funded',
    deadline: 'Jan 18, 2027',
    desc: 'Covers full tuition, books, incidental fees, and full residence support for 4 years.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'harvard',
    name: 'Harvard University',
    country: 'United States',
    flag: '🇺🇸',
    minBand: '7.5+',
    scholarship: 'Presidential Need-Based 100%',
    matchStatus: 'Target Stretch',
    matchColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    tuition: 'Fully Funded',
    deadline: 'Nov 01, 2026',
    desc: 'Guarantees 100% financial aid covering tuition, room, and board for qualified families.',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'melbourne',
    name: 'University of Melbourne',
    country: 'Australia',
    flag: '🇦🇺',
    minBand: '6.5+',
    scholarship: 'Melbourne International Award',
    matchStatus: 'Guaranteed Match',
    matchColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    tuition: 'AUD $10,000 Grant',
    deadline: 'Nov 30, 2026',
    desc: 'Australia’s #1 ranked university offering high-achiever fee remittance grants.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    country: 'United Kingdom',
    flag: '🇬🇧',
    minBand: '7.5+',
    scholarship: 'Gates Cambridge Full Scholarship',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    tuition: 'Fully Funded',
    deadline: 'Dec 03, 2026',
    desc: 'Full-cost scholarships for outstanding applicants from countries outside the UK.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'nus',
    name: 'National University of Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    minBand: '7.0+',
    scholarship: 'ASEAN Undergraduate Full Scholarship',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    tuition: 'Fully Funded',
    deadline: 'Jan 15, 2027',
    desc: 'Covers full tuition plus S$5,800 annual living allowance and accommodation grant.',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=700&auto=format&fit=crop&q=80'
  },
  {
    id: 'eth',
    name: 'ETH Zurich',
    country: 'Switzerland',
    flag: '🇨🇭',
    minBand: '7.0+',
    scholarship: 'Excellence Scholarship & Opportunity Program',
    matchStatus: 'Qualified Match',
    matchColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    tuition: 'CHF 12,000 / sem',
    deadline: 'Dec 15, 2026',
    desc: 'Top world STEM university offering study grant & full tuition fee waiver.',
    image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=700&auto=format&fit=crop&q=80'
  }
];

export default function UniversityFinderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const filteredUniversities = mockUniversities.filter((uni) => {
    const matchesCountry = selectedCountry === 'All' || uni.country === selectedCountry;
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uni.scholarship.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uni.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#061317] transition-colors duration-300">
      
      {/* ── Main Live University & Scholarship Search Explorer Hub ── */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F5F7] dark:bg-[#0097B2]/15 border border-[#0097B2]/30 text-[#0097B2] dark:text-cyan-300 text-xs font-black tracking-widest uppercase shadow-sm">
            <Globe className="w-3.5 h-3.5" />
            <span>GLOBAL ADMISSION & SCHOLARSHIP HUB</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Explore 500+ Top Universities & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#0097B2] via-cyan-500 to-[#004B59] bg-clip-text text-transparent">
              100% Full-Ride Scholarships
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Filter verified partner universities matched to your target IELTS band score. Compare tuition fees, cutoff scores, and application deadlines.
          </p>
        </div>

        {/* ── Live Search & Filter Bar ── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d242b]/90 border border-slate-200/80 dark:border-[#0097B2]/30 shadow-xl mb-12 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by university name, scholarship, or country..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200 dark:border-zinc-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
              />
            </div>

            {/* Country Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              {['All', 'United Kingdom', 'Germany', 'Canada', 'United States', 'Australia', 'Singapore'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCountry(c)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                    selectedCountry === c
                      ? 'bg-gradient-to-r from-[#0097B2] to-[#004B59] text-white shadow-md'
                      : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {c === 'All' ? '🌍 All Countries' : c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Universities Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.length === 0 ? (
            <div className="col-span-full text-center py-16 p-8 rounded-3xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
              <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Universities Found</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                Try resetting search queries or selecting 'All Countries'.
              </p>
            </div>
          ) : (
            filteredUniversities.map((uni, idx) => (
              <motion.div
                key={uni.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-3xl bg-white dark:bg-[#0d242b] border border-slate-200/80 dark:border-[#0097B2]/30 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* ── Top University Campus Image Cover Header ── */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter blur-[0.5px] brightness-[0.78] dark:brightness-[0.68]"
                  />
                  {/* Soft overlay gradient for high contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/40" />

                  {/* Top Glassmorphic Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-extrabold shadow-md">
                      <span className="text-base">{uni.flag}</span>
                      <span>{uni.country}</span>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[10.5px] font-black border uppercase tracking-wider shadow-md backdrop-blur-md ${uni.matchColor}`}>
                      {uni.matchStatus}
                    </span>
                  </div>

                  {/* University Name Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="text-lg sm:text-xl font-black text-white drop-shadow-md leading-tight">
                      {uni.name}
                    </h3>
                  </div>
                </div>

                {/* ── Card Content Body ── */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium mb-5">
                    {uni.desc}
                  </p>

                  {/* Key Details Rows */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200/80 dark:border-zinc-800">
                      <span className="text-slate-500 dark:text-zinc-400 font-semibold">Required IELTS Band</span>
                      <span className="font-black text-slate-900 dark:text-white bg-slate-200/60 dark:bg-zinc-800 px-2.5 py-0.5 rounded-lg">{uni.minBand}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40">
                      <span className="text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-500" /> Scholarship
                      </span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-right">{uni.scholarship}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-slate-50 dark:bg-[#091b20] border border-slate-200/80 dark:border-zinc-800">
                      <span className="text-slate-500 dark:text-zinc-400 font-semibold">Tuition Status</span>
                      <span className="font-black text-cyan-600 dark:text-cyan-400">{uni.tuition}</span>
                    </div>
                  </div>

                  {/* See Details CTA Button */}
                  <Link
                    to={`/university-details/${uni.id}`}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0097B2] to-[#004B59] hover:from-[#00829a] hover:to-[#003843] text-white text-xs font-black shadow-md hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer group-hover:scale-[1.02]"
                  >
                    <span>See Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </section>
    </div>
  );
}
