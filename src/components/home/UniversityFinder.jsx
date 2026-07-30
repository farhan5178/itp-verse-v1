import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Globe2,
  Search,
  Filter,
  Award,
  CheckCircle2,
  DollarSign,
  BookOpen,
  MapPin,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Lightbulb,
  ChevronRight,
  X,
  Zap,
  Building2,
  Star,
  ShieldCheck
} from 'lucide-react';
import universityFinderImg from '../../assets/university_finder_3d.png';

const UNIVERSITIES_DATA = [
  {
    id: 'oxford',
    name: 'University of Oxford',
    country: 'United Kingdom',
    flag: '🇬🇧',
    ranking: '#3 World QS',
    ieltsMin: 7.5,
    pteMin: 76,
    tuition: '£32,500 / year',
    tuitionCategory: 'high',
    scholarship: '100% Full Ride (Clarendon Fund)',
    scholarshipType: 'full',
    logoBg: 'from-blue-900 to-indigo-950',
    popularPrograms: ['Computer Science', 'PPE', 'Medicine', 'Law'],
    acceptanceRate: '17.5%',
    location: 'Oxford, UK',
    details: 'Clarendon offers over 200 fully-funded scholarships each year covering full tuition and a generous living stipend for top IELTS scorers.'
  },
  {
    id: 'tum',
    name: 'Technical University of Munich (TUM)',
    country: 'Germany',
    flag: '🇩🇪',
    ranking: '#37 World QS',
    ieltsMin: 6.5,
    pteMin: 58,
    tuition: '€0 / Tuition-Free Public',
    tuitionCategory: 'free',
    scholarship: 'Deutschlandstipendium (€300/mo)',
    scholarshipType: 'merit',
    logoBg: 'from-blue-600 to-cyan-700',
    popularPrograms: ['Robotics & AI', 'Mechanical Eng', 'Data Science'],
    acceptanceRate: '24%',
    location: 'Munich, Germany',
    details: 'Germany public universities offer 100% tuition-free education for international students. Students only pay a €150 semester fee.'
  },
  {
    id: 'utoronto',
    name: 'University of Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    ranking: '#21 World QS',
    ieltsMin: 6.5,
    pteMin: 60,
    tuition: 'CAD $45,000 / year',
    tuitionCategory: 'medium',
    scholarship: 'Lester B. Pearson 100% Full Scholarship',
    scholarshipType: 'full',
    logoBg: 'from-[#002A5C] to-blue-900',
    popularPrograms: ['Software Eng', 'Finance & Commerce', 'Biotechnology'],
    acceptanceRate: '43%',
    location: 'Toronto, Canada',
    details: 'The Pearson International Scholarship covers 4 years of tuition, books, incidental fees, and full residence support.'
  },
  {
    id: 'melbourne',
    name: 'University of Melbourne',
    country: 'Australia',
    flag: '🇦🇺',
    ranking: '#14 World QS',
    ieltsMin: 6.5,
    pteMin: 58,
    tuition: 'AUD $38,000 / year',
    tuitionCategory: 'medium',
    scholarship: 'Melbourne International (50% - 100% Fee Waiver)',
    scholarshipType: 'merit',
    logoBg: 'from-blue-800 to-indigo-900',
    popularPrograms: ['Information Technology', 'Civil Eng', 'Architecture'],
    acceptanceRate: '70%',
    location: 'Melbourne, Australia',
    details: 'Awarded to high-achieving international students based on academic performance and IELTS score cutoff.'
  },
  {
    id: 'tokyo',
    name: 'University of Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    ranking: '#28 World QS',
    ieltsMin: 6.0,
    pteMin: 50,
    tuition: '¥535,800 (~$3,800) / year',
    tuitionCategory: 'low',
    scholarship: 'MEXT Japanese Government 100% Full Scholarship',
    scholarshipType: 'full',
    logoBg: 'from-[#800020] to-red-950',
    popularPrograms: ['AI & Robotics', 'Global Engineering', 'Physics'],
    acceptanceRate: '34%',
    location: 'Tokyo, Japan',
    details: 'MEXT Scholarship covers full tuition, roundtrip airfare tickets, plus ¥144,000 monthly living allowance.'
  },
  {
    id: 'harvard',
    name: 'Harvard University',
    country: 'USA',
    flag: '🇺🇸',
    ranking: '#4 World QS',
    ieltsMin: 7.5,
    pteMin: 75,
    tuition: '$54,000 / year',
    tuitionCategory: 'high',
    scholarship: '100% Need-Based Financial Aid',
    scholarshipType: 'need',
    logoBg: 'from-[#A51C30] to-rose-950',
    popularPrograms: ['Economics', 'Computer Science', 'Government', 'MBA'],
    acceptanceRate: '3.4%',
    location: 'Cambridge, MA, USA',
    details: 'Harvard meets 100% of demonstrated financial need for all admitted international students regardless of country.'
  },
  {
    id: 'ubc',
    name: 'University of British Columbia',
    country: 'Canada',
    flag: '🇨🇦',
    ranking: '#34 World QS',
    ieltsMin: 6.5,
    pteMin: 60,
    tuition: 'CAD $39,000 / year',
    tuitionCategory: 'medium',
    scholarship: 'Karen McKellin International Leader ($40,000/yr)',
    scholarshipType: 'merit',
    logoBg: 'from-blue-900 to-[#002147]',
    popularPrograms: ['Data Science', 'Environmental Studies', 'Business'],
    acceptanceRate: '52%',
    location: 'Vancouver, Canada',
    details: 'Recognizes exceptional international undergraduate students who demonstrate high academic achievement and leadership.'
  },
  {
    id: 'manchester',
    name: 'University of Manchester',
    country: 'United Kingdom',
    flag: '🇬🇧',
    ranking: '#32 World QS',
    ieltsMin: 6.5,
    pteMin: 59,
    tuition: '£26,000 / year',
    tuitionCategory: 'medium',
    scholarship: 'Global Futures Award (£5,000 - £10,000)',
    scholarshipType: 'merit',
    logoBg: 'from-purple-900 to-indigo-950',
    popularPrograms: ['Electrical Eng', 'Management', 'Cyber Security'],
    acceptanceRate: '56%',
    location: 'Manchester, UK',
    details: 'Open to outstanding international applicants from South Asia and worldwide entering undergraduate degree programs.'
  }
];

export default function UniversityFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedIelts, setSelectedIelts] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedScholarship, setSelectedScholarship] = useState('all');
  const [activeModalUni, setActiveModalUni] = useState(null);

  /* Filter Logic */
  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES_DATA.filter((uni) => {
      const matchesSearch =
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.popularPrograms.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCountry = selectedCountry === 'all' || uni.country.toLowerCase() === selectedCountry.toLowerCase();

      const matchesIelts =
        selectedIelts === 'all' ||
        (selectedIelts === '6.0' && uni.ieltsMin <= 6.0) ||
        (selectedIelts === '6.5' && uni.ieltsMin <= 6.5) ||
        (selectedIelts === '7.0' && uni.ieltsMin <= 7.0) ||
        (selectedIelts === '7.5' && uni.ieltsMin <= 7.5);

      const matchesBudget =
        selectedBudget === 'all' ||
        (selectedBudget === 'free' && uni.tuitionCategory === 'free') ||
        (selectedBudget === 'low' && (uni.tuitionCategory === 'free' || uni.tuitionCategory === 'low')) ||
        (selectedBudget === 'medium' && uni.tuitionCategory !== 'high');

      const matchesScholarship =
        selectedScholarship === 'all' ||
        (selectedScholarship === 'full' && uni.scholarshipType === 'full') ||
        (selectedScholarship === 'merit' && (uni.scholarshipType === 'merit' || uni.scholarshipType === 'full'));

      return matchesSearch && matchesCountry && matchesIelts && matchesBudget && matchesScholarship;
    });
  }, [searchQuery, selectedCountry, selectedIelts, selectedBudget, selectedScholarship]);

  return (
    <section id="university-finder" className="relative overflow-hidden bg-slate-50 dark:bg-[#07070c] py-20 lg:py-28 border-t border-slate-200/80 dark:border-zinc-800">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0097B2]/10 dark:bg-[#0097B2]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Badge & Title ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0097B2]/10 border border-[#0097B2]/30 text-[#0097B2] dark:text-cyan-400 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
            <Globe2 className="w-4 h-4" />
            <span>Unique Ecosystem Feature</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Global University &{' '}
            <span className="bg-gradient-to-r from-[#0097B2] via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
              Scholarship Finder
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
            Find dream universities worldwide based on your target IELTS or PTE score, budget, and 100% scholarship eligibility.
          </p>
        </div>

        {/* ── PROBLEM VS SOLUTION STORYBOARD (Concept Image Banner) ── */}
        <div className="mb-16 rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-8 lg:p-10 shadow-xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 3D Generated Visual Showcase (6 cols) */}
            <div className="lg:col-span-6 relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-zinc-800 shadow-md">
              <img
                src={universityFinderImg}
                alt="Global University & Scholarship Finder Concept Storyboard"
                className="w-full h-auto object-cover rounded-2xl transform hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-extrabold flex items-center justify-between">
                <span className="bg-[#0097B2] px-3 py-1 rounded-full shadow-md">
                  🌟 Powered by ITP-Verse AI Matching
                </span>
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                  500+ Partner Universities
                </span>
              </div>
            </div>

            {/* Right Storyboard Breakdown (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Problem Column Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-rose-600 dark:text-rose-400">
                  <HelpCircle className="w-4 h-4" />
                  <span>The Student Struggle</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-700 dark:text-zinc-300">
                  <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                    "Which university accepts my score?"
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                    "Can I get a 100% Scholarship?"
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                    "High tuition fees!"
                  </span>
                </div>
              </div>

              {/* Solution Column Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-600 dark:text-emerald-400">
                    <Lightbulb className="w-4 h-4" />
                    <span>We Have The Solution!</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/20">
                    99.4% Match Rate
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-800 dark:text-zinc-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Find Universities by IELTS/PTE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Filter 100% Full-Ride Grants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Tuition-Free Public Options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Direct Alumni Guidance</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ── INTERACTIVE SEARCH & FILTERS BAR ── */}
        <div className="mb-10 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-6 shadow-xl space-y-4">
          
          {/* Search Input Row */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search university name, country, or program (e.g. Computer Science, Oxford, Germany)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters Row (Country, Tuition Fee, Scholarship, IELTS Requirement) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            
            {/* Filter 1: Country */}
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-[#0097B2]" />
                <span>Country</span>
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
              >
                <option value="all">All Countries 🌐</option>
                <option value="United Kingdom">United Kingdom 🇬🇧</option>
                <option value="Germany">Germany 🇩🇪</option>
                <option value="Canada">Canada 🇨🇦</option>
                <option value="Australia">Australia 🇦🇺</option>
                <option value="Japan">Japan 🇯🇵</option>
                <option value="USA">USA 🇺🇸</option>
              </select>
            </div>

            {/* Filter 2: IELTS Min Requirement */}
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#0097B2]" />
                <span>IELTS Requirement</span>
              </label>
              <select
                value={selectedIelts}
                onChange={(e) => setSelectedIelts(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
              >
                <option value="all">Any IELTS Band Score</option>
                <option value="6.0">IELTS 6.0 or below</option>
                <option value="6.5">IELTS 6.5 or below</option>
                <option value="7.0">IELTS 7.0 or below</option>
                <option value="7.5">IELTS 7.5+ Target</option>
              </select>
            </div>

            {/* Filter 3: Tuition Fee Budget */}
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-[#0097B2]" />
                <span>Tuition Fee Budget</span>
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
              >
                <option value="all">All Tuition Ranges</option>
                <option value="free">€0 Tuition-Free (Germany)</option>
                <option value="low">Low Cost (Under $10,000/yr)</option>
                <option value="medium">Standard ($10,000 - $40,000/yr)</option>
              </select>
            </div>

            {/* Filter 4: Scholarship Type */}
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#0097B2]" />
                <span>Scholarship Type</span>
              </label>
              <select
                value={selectedScholarship}
                onChange={(e) => setSelectedScholarship(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#0097B2]"
              >
                <option value="all">All Scholarships</option>
                <option value="full">100% Full-Ride Grants</option>
                <option value="merit">Merit-Based Fee Waivers</option>
              </select>
            </div>

          </div>

        </div>

        {/* ── FILTERED UNIVERSITIES GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredUniversities.map((uni) => (
              <motion.div
                key={uni.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Card Header: Flag & Ranking */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{uni.flag}</span>
                    <span className="px-3 py-1 rounded-full bg-[#0097B2]/10 border border-[#0097B2]/20 text-[#0097B2] dark:text-cyan-400 text-[11px] font-black">
                      {uni.ranking}
                    </span>
                  </div>

                  {/* University Name & Country */}
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-[#0097B2] transition-colors">
                      {uni.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{uni.location}</span>
                    </p>
                  </div>

                  {/* Badges: IELTS Min & Tuition */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800">
                      <span className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 block">
                        Min IELTS Cutoff
                      </span>
                      <span className="text-xs font-black text-slate-800 dark:text-zinc-200">
                        {uni.ieltsMin} (PTE {uni.pteMin}+)
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800">
                      <span className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 block">
                        Tuition Fee
                      </span>
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 truncate block">
                        {uni.tuition}
                      </span>
                    </div>
                  </div>

                  {/* Scholarship Pill */}
                  <div className="p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300 space-y-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider block flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span>Scholarship Opportunity</span>
                    </span>
                    <p className="text-xs font-extrabold line-clamp-1">
                      {uni.scholarship}
                    </p>
                  </div>

                </div>

                {/* Card Action Footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500">
                    Acceptance: {uni.acceptanceRate}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveModalUni(uni)}
                    className="px-4 py-2 rounded-xl bg-[#0097B2] hover:bg-[#00839b] text-white text-xs font-black shadow-md shadow-[#0097B2]/20 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Check Match</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty Search Result */}
        {filteredUniversities.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 dark:text-zinc-700 mx-auto" />
            <h4 className="text-lg font-black text-slate-800 dark:text-zinc-200">
              No matching universities found
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
              Try adjusting your country filter, IELTS score range, or search keyword to see available global options.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('all');
                setSelectedIelts('all');
                setSelectedBudget('all');
                setSelectedScholarship('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#0097B2]/10 text-[#0097B2] text-xs font-black hover:bg-[#0097B2]/20 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* ── ELIGIBILITY DETAILS POPUP MODAL ── */}
      <AnimatePresence>
        {activeModalUni && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalUni(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{activeModalUni.flag}</span>
                  <span className="px-3 py-1 rounded-full bg-[#0097B2]/10 text-[#0097B2] text-xs font-black">
                    {activeModalUni.ranking}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {activeModalUni.name}
                </h3>
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                  {activeModalUni.location} • Acceptance Rate: {activeModalUni.acceptanceRate}
                </p>
              </div>

              {/* Detailed Specs Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Minimum IELTS</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{activeModalUni.ieltsMin} Band</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Minimum PTE</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{activeModalUni.pteMin} Score</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800 col-span-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Tuition Structure</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{activeModalUni.tuition}</span>
                </div>
              </div>

              {/* Scholarship Highlight */}
              <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Scholarship Overview</span>
                </span>
                <p className="text-xs text-slate-700 dark:text-zinc-200 font-semibold leading-relaxed">
                  {activeModalUni.details}
                </p>
              </div>

              {/* Popular Programs */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                  Top International Programs
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeModalUni.popularPrograms.map((p, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-xs font-bold text-slate-700 dark:text-zinc-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => {
                  alert(`Connecting your IELTS score profile to ${activeModalUni.name} admissions office!`);
                  setActiveModalUni(null);
                }}
                className="w-full py-3.5 rounded-2xl bg-[#0097B2] hover:bg-[#00839b] text-white text-xs font-black shadow-lg shadow-[#0097B2]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Apply & Match IELTS Score</span>
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
