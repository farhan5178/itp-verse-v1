import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Timer, LineChart, Play, Calendar, Star, Mic, PenTool, Headphones } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Estimated IELTS Band', value: '7.5 / 9.0', icon: Trophy, color: 'text-[#f72585]' },
    { label: 'Modules Completed', value: '28 Tests', icon: BookOpen, color: 'text-amber-500' },
    { label: 'Practice Time', value: '34.5 hrs', icon: Timer, color: 'text-emerald-500' },
    { label: 'Target Band Goal', value: 'Band 8.0', icon: LineChart, color: 'text-[#a855f7]' },
  ];

  const ieltsModules = [
    { name: 'Listening Module', progress: 85, band: 'Band 8.0', color: 'bg-[#a855f7]', count: '45 sections completed • 40 Qs average', icon: Headphones },
    { name: 'Reading Module', progress: 78, band: 'Band 7.5', color: 'bg-emerald-500', count: '18 academic passages done • 60 mins avg', icon: BookOpen },
    { name: 'Writing Task 1 & 2', progress: 65, band: 'Band 7.0', color: 'bg-gradient-to-r from-[#f72585] to-[#7c3aed]', count: '14 AI graded essays • Lexical feedback ready', icon: PenTool },
    { name: 'Speaking Cue Cards', progress: 80, band: 'Band 7.5', color: 'bg-[#f72585]', count: '22 AI audio simulations • Fluency 8.0', icon: Mic },
  ];

  const activeTests = [
    {
      id: 'ielts-mock-1',
      title: 'IELTS Academic Full Simulation #1',
      duration: '2 Hours 40 Mins',
      questions: 'Listening, Reading, Writing & Speaking',
      difficulty: 'IDP Standard',
      subject: 'Full Mock Test',
      bestScore: 'Band 7.5'
    },
    {
      id: 'ielts-writing-2',
      title: 'IELTS Writing Task 2: Opinion Essay Practice',
      duration: '40 Mins',
      questions: '1 Essay (250+ Words)',
      difficulty: 'Band 8.0 Level',
      subject: 'Writing Focus',
      bestScore: 'Band 7.0'
    },
    {
      id: 'ielts-speaking-card',
      title: 'IELTS Speaking Part 2 & 3 Cue Card Simulator',
      duration: '14 Mins',
      questions: '3 Parts Live AI Examiner',
      difficulty: 'Adaptive AI',
      subject: 'Speaking Focus',
      bestScore: 'Band 8.0'
    },
    {
      id: 'ielts-reading-acad',
      title: 'IELTS Academic Reading Passage 3 Speed Drill',
      duration: '20 Mins',
      questions: '14 True/False/Not Given Qs',
      difficulty: 'Hard',
      subject: 'Reading Focus',
      bestScore: 'Band 7.5'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl mb-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-200/80 dark:border-zinc-800"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#f72585]/10 rounded-full blur-3xl -z-10" />
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f72585]/10 border border-[#f72585]/20 text-xs font-bold text-[#f72585] mb-3">
            <span>🎧 IDP IELTS Academic Prep</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
            Welcome Back, IELTS Scholar!
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-xs sm:text-sm max-w-xl">
            You are currently on track for <strong className="text-slate-900 dark:text-white font-black">Band 7.5+</strong>. Practice your weak modules to reach Band 8.0 before your exam date.
          </p>
        </div>
        <button
          onClick={() => navigate('/mock-test')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#f72585] via-[#a855f7] to-[#7c3aed] text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Launch IELTS Simulator</span>
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel p-5 rounded-2xl flex items-center space-x-4 border border-slate-200/80 dark:border-zinc-800"
            >
              <div className={`p-3 bg-slate-100 dark:bg-dark-700/60 rounded-xl ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-dark-muted font-medium">{stat.label}</p>
                <p className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Active IELTS Mock Tests */}
        <div className="lg:col-span-2 space-y-8">

          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Active IELTS Mock Exams</h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Real IDP test pattern with instant AI band scores</p>
              </div>
              <span className="text-xs text-[#f72585] font-bold hover:underline cursor-pointer">View All</span>
            </div>

            <div className="space-y-4">
              {activeTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-900/50 hover:bg-slate-100/60 dark:hover:bg-zinc-800/60 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f72585]/10 text-[#f72585]">
                        {test.subject}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                        {test.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{test.title}</h3>
                    <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-zinc-400">
                      <span className="flex items-center space-x-1">
                        <Timer className="w-3.5 h-3.5 text-[#f72585]" />
                        <span>{test.duration}</span>
                      </span>
                      <span>{test.questions}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Best Score</p>
                      <p className="text-sm font-black text-emerald-500">{test.bestScore}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/mock-test?id=${test.id}`)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f72585] to-[#7c3aed] text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Test</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 4 IELTS Modules Breakdown & Exam Timeline */}
        <div className="space-y-8">

          {/* IELTS 4 Modules Breakdown */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">IELTS 4-Module Progress</h2>
            <div className="space-y-5">
              {ieltsModules.map((sub, index) => {
                const Icon = sub.icon;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#f72585]" />
                        <span>{sub.name}</span>
                      </span>
                      <span className="text-[#f72585] font-black text-xs px-2 py-0.5 rounded-md bg-[#f72585]/10">{sub.band}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sub.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.15 }}
                        className={`h-full ${sub.color}`}
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">{sub.count}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* IELTS Exam Timeline */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-zinc-800">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">Official IELTS Schedule</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-xl border border-slate-200/60 dark:border-zinc-800">
                <Calendar className="w-5 h-5 text-[#f72585] mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Official IDP IELTS Exam</h4>
                  <p className="text-[11px] text-[#f72585] font-bold">Target Date: August 15, 2026</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-xl border border-slate-200/60 dark:border-zinc-800">
                <Mic className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Live AI Speaking Cue Card Test</h4>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">Scheduled: Today, 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-zinc-900/60 rounded-xl border border-slate-200/60 dark:border-zinc-800">
                <PenTool className="w-5 h-5 text-[#a855f7] mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">IELTS Academic Task 2 Review</h4>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">Scheduled: Tomorrow, 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
