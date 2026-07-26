import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Timer, LineChart, Play, Calendar, Star } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Overall Completion', value: '78%', icon: LineChart, color: 'text-brand-purple' },
    { label: 'Average Score', value: '84/100', icon: Trophy, color: 'text-brand-emerald' },
    { label: 'Tests Attempted', value: '12', icon: BookOpen, color: 'text-[#f72585]' },
    { label: 'Time Practiced', value: '18.5 hrs', icon: Timer, color: 'text-[#f72585]' },
  ];

  const subjects = [
    { name: 'Quantitative Reasoning', progress: 85, color: 'bg-brand-purple', count: '45 questions done' },
    { name: 'Verbal Section', progress: 70, color: 'bg-gradient-to-r from-[#f72585] to-[#d91a70]', count: '30 questions done' },
    { name: 'Analytical Writing', progress: 60, color: 'bg-gradient-to-r from-[#f72585] to-[#d91a70]', count: '12 prompts practiced' },
  ];

  const activeTests = [
    {
      id: 'mock-1',
      title: 'ITP Diagnostic Mock Test #1',
      duration: '45 Mins',
      questions: 30,
      difficulty: 'Medium',
      subject: 'Full Syllabus',
      bestScore: '88%'
    },
    {
      id: 'mock-2',
      title: 'Quantitative Special Focus Test',
      duration: '30 Mins',
      questions: 20,
      difficulty: 'Hard',
      subject: 'Math Focus',
      bestScore: '75%'
    },
    {
      id: 'mock-3',
      title: 'Verbal Comprehensive Exam',
      duration: '40 Mins',
      questions: 25,
      difficulty: 'Easy',
      subject: 'Verbal Skills',
      bestScore: '92%'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl mb-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl -z-10" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back, Scholar!</h1>
          <p className="text-dark-muted">Continue practicing to boost your readiness. You are in the top 12% of applicants this week.</p>
        </div>
        <button
          onClick={() => navigate('/mock-test')}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#f72585] to-[#d91a70] text-sm font-semibold text-white shadow-lg shadow-[#f72585]/20 hover:shadow-[#f72585]/30 transition-all flex items-center space-x-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Launch Practice Simulator</span>
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
              className="glass-panel p-5 rounded-2xl flex items-center space-x-4"
            >
              <div className={`p-3 bg-dark-700/60 rounded-xl ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-dark-muted font-medium">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns - Subject Progress and Active Tests */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Mock Tests */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Active Mock Exams</h2>
              <span className="text-xs text-[#f72585] font-semibold hover:underline cursor-pointer">View All</span>
            </div>
            <div className="space-y-4">
              {activeTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl border border-dark-700/70 bg-dark-900/50 hover:bg-dark-800/40 hover:border-dark-600 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-dark-700 text-dark-muted">
                        {test.subject}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        test.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400' :
                        test.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-green-500/10 text-green-400'
                      }`}>
                        {test.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{test.title}</h3>
                    <div className="flex items-center space-x-4 text-xs text-dark-muted">
                      <span className="flex items-center space-x-1">
                        <Timer className="w-3.5 h-3.5" />
                        <span>{test.duration}</span>
                      </span>
                      <span>{test.questions} Questions</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] text-dark-muted">Best Attempt</p>
                      <p className="text-sm font-semibold text-brand-emerald">{test.bestScore}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/mock-test?id=${test.id}`)}
                      className="px-4 py-2.5 rounded-lg bg-dark-800 hover:bg-[#f72585] hover:text-white border border-dark-700 hover:border-[#f72585] text-sm font-medium text-white transition-all flex items-center space-x-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Subject Breakdown & Activity Log */}
        <div className="space-y-8">
          {/* Subject Breakdown */}
          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Course Readiness</h2>
            <div className="space-y-5">
              {subjects.map((sub, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-text font-medium">{sub.name}</span>
                    <span className="text-white font-bold">{sub.progress}%</span>
                  </div>
                  <div className="w-full bg-dark-700 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${sub.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-full ${sub.color}`}
                    />
                  </div>
                  <p className="text-[10px] text-dark-muted">{sub.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Schedule */}
          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Exam Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-dark-900/40 rounded-xl">
                <Calendar className="w-5 h-5 text-[#f72585] mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Full Mock Simulation #4</h4>
                  <p className="text-xs text-dark-muted">Tomorrow at 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-dark-900/40 rounded-xl">
                <Star className="w-5 h-5 text-[#f72585] mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Revision: Algebra & Verbal</h4>
                  <p className="text-xs text-dark-muted">Today, self-paced study</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
