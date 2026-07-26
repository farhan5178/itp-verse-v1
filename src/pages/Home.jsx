import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, GraduationCap, Award, Compass, Timer, BookOpen, 
  ChevronRight, Star, Send, Bot, CheckCircle, Flame, Sparkles, MessageSquare
} from 'lucide-react';
import HeroOnboarding from '../components/home/HeroOnboarding/index';
import GuestHero from '../components/home/GuestHero';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('IELTS'); // IELTS, TOEFL, PTE
  const [graderSection, setGraderSection] = useState('Writing'); // Writing, Speaking
  const [graderInput, setGraderInput] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [graderReport, setGraderReport] = useState(null);
  
  // Interactive bot state
  const [botMessages, setBotMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your ITPverse AI Assistant. How can I help you prepare today?' }
  ]);
  const [botInput, setBotInput] = useState('');

  const testDetails = {
    IELTS: {
      fullName: 'IELTS (International English Language Testing System)',
      desc: 'Globally recognized English proficiency test taken by millions worldwide for education, employment, and immigration. Consists of four core modules simulating academic and general tasks.',
      duration: '2 hours 40 mins',
      color: 'from-[#f72585] to-[#d91a70]',
      accentColor: 'text-[#f72585]',
      borderColor: 'border-[#f72585]/30',
      bgColor: 'bg-[#f72585]/10',
      sections: [
        { name: 'Reading', time: '60 Mins', details: '3 passages, 40 questions', task: 'Academic texts evaluation' },
        { name: 'Writing', time: '60 Mins', details: '2 tasks (Graph & Essay)', task: 'Cohesion and lexical accuracy' },
        { name: 'Listening', time: '30 Mins', details: '4 recordings, 40 questions', task: 'Monologues & conversations' },
        { name: 'Speaking', time: '11-14 Mins', details: '3 parts (Interview & Cue Card)', task: 'Fluency and pronunciation' },
      ]
    },
    TOEFL: {
      fullName: 'TOEFL iBT (Test of English as a Foreign Language)',
      desc: 'Trusted academic English evaluation accepted by more than 12,000 universities worldwide. Fully computer-delivered with synchronized task combinations mimicking physical university lectures.',
      duration: 'approx. 2 hours',
      color: 'from-[#f72585] to-[#d91a70]',
      accentColor: 'text-[#f72585]',
      borderColor: 'border-[#f72585]/30',
      bgColor: 'bg-[#f72585]/10',
      sections: [
        { name: 'Reading', time: '35 Mins', details: '2 passages, 20 questions', task: 'Academic reading comprehension' },
        { name: 'Listening', time: '36 Mins', details: '5 passages, 28 questions', task: 'Lectures and classroom discussions' },
        { name: 'Speaking', time: '16 Mins', details: '4 integrated tasks', task: 'Expressing opinions & summarizing' },
        { name: 'Writing', time: '29 Mins', details: '2 tasks (Integrated & Academic)', task: 'Integrated support essay writing' },
      ]
    },
    PTE: {
      fullName: 'PTE Academic (Pearson Test of English)',
      desc: 'Faster, highly convenient computer-based test trusted by governments and colleges globally. Utilizes state-of-the-art unbiased automated AI scoring mechanics to evaluate all key English skills.',
      duration: 'approx. 2 hours',
      color: 'from-[#f59e0b] to-[#d97706]',
      accentColor: 'text-amber-500',
      borderColor: 'border-amber-500/30',
      bgColor: 'bg-amber-500/10',
      sections: [
        { name: 'Speaking & Writing', time: '54-67 Mins', details: '7 task types (Read aloud, Essay)', task: 'Fluency, pronunciation & grammar' },
        { name: 'Reading', time: '29-30 Mins', details: '5 task types (Fill in blanks)', task: 'Collocations & comprehension' },
        { name: 'Listening', time: '30-43 Mins', details: '8 task types (Write from dictation)', task: 'Audio transcription & tracking' },
      ]
    }
  };

  const handleSimulateGrade = () => {
    if (!graderInput.trim()) return;
    setIsGrading(true);
    setGraderReport(null);
    setTimeout(() => {
      setIsGrading(false);
      setGraderReport({
        score: activeTab === 'IELTS' ? '7.5' : activeTab === 'TOEFL' ? '98' : '72',
        maxScore: activeTab === 'IELTS' ? '9.0' : activeTab === 'TOEFL' ? '120' : '90',
        feedback: 'Excellent vocabulary variation and strong lexical coherence. Minor errors found in complex preposition usage.',
        criteria: [
          { name: 'Grammar & Accuracy', score: '85%' },
          { name: 'Cohesion & Structure', score: '90%' },
          { name: 'Lexical Resource', score: '88%' }
        ]
      });
    }, 1500);
  };

  const handleBotSubmit = (e) => {
    e.preventDefault();
    if (!botInput.trim()) return;

    const userMessage = { sender: 'user', text: botInput };
    setBotMessages(prev => [...prev, userMessage]);
    const prompt = botInput.toLowerCase();
    setBotInput('');

    setTimeout(() => {
      let replyText = "I can assist you with test resources, mock exams, or practice guidelines. Which test are you preparing for?";
      if (prompt.includes('toefl')) {
        replyText = "TOEFL preparation features a 2-hour exam. ITPverse offers customized speaking grader simulations and full-length practice workspaces.";
      } else if (prompt.includes('ielts')) {
        replyText = "For IELTS, you should focus on writing task templates. You can practice describing graphs or writing arguments with instant feedback.";
      } else if (prompt.includes('pte')) {
        replyText = "PTE Academic evaluation runs on pure automated AI. Practice 'Read Aloud' or 'Write From Dictation' in our portal for quick improvements.";
      } else if (prompt.includes('grader') || prompt.includes('ai')) {
        replyText = "Our AI Grader analyses grammar, context, coherence, and pronunciation in under 60 seconds, utilizing trained model weights from 1M+ responses.";
      }
      setBotMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
    }, 800);
  };

  return (
    <div className="relative min-h-screen">

      {/* ── Dynamic Hero Section (LoggedIn Avatar vs Guest Landing) ── */}
      {isLoggedIn ? <HeroOnboarding /> : <GuestHero />}

      {/* ── All below-hero content in its own dark bg wrapper ── */}
      <div className="bg-[#09090b]">

      {/* Language breakdown selector tabs */}
      <section id="language-breakdown" className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-dark-800">
        <div className="text-center mb-10">
          <p className="text-[#f72585] text-xs font-bold uppercase tracking-wider mb-2">Standardized Exams</p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">Select Your Exam Framework</h2>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center space-x-3 mb-8">
          {Object.keys(testDetails).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all border ${
                activeTab === tab 
                  ? 'bg-dark-800 border-[#f72585] text-white shadow-md shadow-[#f72585]/10' 
                  : 'bg-dark-900 border-dark-700 text-dark-muted hover:text-white'
              }`}
            >
              {tab} Section
            </button>
          ))}
        </div>

        {/* Tab View Container */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl relative">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-dark-700/60 mb-8">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                What is <span className={testDetails[activeTab].accentColor}>{activeTab}</span>?
              </h3>
              <p className="text-xs text-dark-muted font-medium">{testDetails[activeTab].fullName}</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-dark-900 border border-dark-700 text-xs font-bold text-white flex items-center gap-2">
              <Timer className="w-4 h-4 text-[#f72585]" />
              <span>Total Duration: {testDetails[activeTab].duration}</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-dark-muted leading-relaxed mb-8">
            {testDetails[activeTab].desc}
          </p>

          <h4 className="text-xs font-bold text-dark-muted tracking-widest uppercase mb-4">Exam Structure & Breakdown</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testDetails[activeTab].sections.map((sect, sIdx) => (
              <div 
                key={sIdx}
                className="p-5 rounded-2xl border border-dark-700 bg-dark-900/50 hover:border-dark-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-white">{sect.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-dark-800 text-[#f72585] font-black">{sect.time}</span>
                  </div>
                  <p className="text-xs text-dark-muted mb-2 font-semibold">{sect.details}</p>
                </div>
                <p className="text-[10px] text-dark-muted italic border-t border-dark-800 pt-2 mt-2">{sect.task}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Grader Demonstration Playground */}
      <section id="ai-assessment" className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-dark-800">
        <div className="text-center mb-10">
          <span className="px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-xs font-bold text-brand-emerald">
            ⚡ AI Grader Engine
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mt-4">Evaluate Writing & Speaking Skills</h2>
          <p className="text-sm text-dark-muted max-w-md mx-auto mt-2">Submit a sample writing text response below to simulate instant diagnostic evaluation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grader Panel Left */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex border-b border-dark-700/60 pb-3 justify-between items-center">
                <span className="text-sm font-bold text-white">Diagnostic Grader Input</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setGraderSection('Writing')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${graderSection === 'Writing' ? 'bg-[#f72585] text-white' : 'text-dark-muted'}`}
                  >
                    Writing Task
                  </button>
                  <button 
                    onClick={() => setGraderSection('Speaking')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${graderSection === 'Speaking' ? 'bg-[#f72585] text-white' : 'text-dark-muted'}`}
                  >
                    Speaking Audio Transcript
                  </button>
                </div>
              </div>

              <textarea
                value={graderInput}
                onChange={(e) => setGraderInput(e.target.value)}
                placeholder={graderSection === 'Writing' ? "Type your IELTS/TOEFL practice response here..." : "Provide speech transcription here to analyze coherence..."}
                className="w-full h-44 bg-dark-900 border border-dark-700 rounded-2xl p-4 text-sm text-white placeholder-dark-muted focus:outline-none focus:border-[#f72585] resize-none"
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-dark-700/40 mt-4">
              <span className="text-xs text-dark-muted font-medium">Evaluate in under 1 minute.</span>
              <button
                onClick={handleSimulateGrade}
                disabled={isGrading || !graderInput.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f72585] to-[#d91a70] text-sm font-bold text-white hover:opacity-90 disabled:opacity-40 transition-all flex items-center space-x-1.5"
              >
                {isGrading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Grading Engine Running...</span>
                  </>
                ) : (
                  <span>Evaluate Response</span>
                )}
              </button>
            </div>
          </div>

          {/* Grader Report Right */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-3xl h-full flex flex-col justify-center items-center text-center">
              <AnimatePresence mode="wait">
                {graderReport ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full space-y-5"
                  >
                    <div className="inline-flex flex-col items-center">
                      <span className="text-xs font-bold text-dark-muted uppercase">Estimated Score</span>
                      <span className="text-4xl font-extrabold text-[#f72585] mt-1">{graderReport.score} <span className="text-xs text-dark-muted">/ {graderReport.maxScore}</span></span>
                    </div>

                    <div className="space-y-3 text-left">
                      {graderReport.criteria.map((crit, cIdx) => (
                        <div key={cIdx} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-dark-muted">{crit.name}</span>
                            <span className="text-white">{crit.score}</span>
                          </div>
                          <div className="w-full bg-dark-700 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#f72585] to-[#d91a70]" style={{ width: crit.score }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-dark-muted leading-relaxed text-left border-t border-dark-700/60 pt-3">
                      {graderReport.feedback}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <Award className="w-12 h-12 text-dark-muted mx-auto" />
                    <h3 className="font-bold text-white">Diagnostic Scorecard</h3>
                    <p className="text-xs text-dark-muted max-w-xs leading-relaxed">
                      Grading feedback includes estimated band scores, coherence parameters, and lexical metrics details.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* News & Offerings Showcase cards */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-dark-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-[#f72585]/50 transition-all group">
            <div>
              <Flame className="w-8 h-8 text-[#f72585] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">New TOEFL Mock Tests</h3>
              <p className="text-xs text-dark-muted leading-relaxed">
                We have added 5 brand new integrated speaking and reading simulated TOEFL tests in our workspace module.
              </p>
            </div>
            <a href="#/dashboard" className="text-xs font-bold text-[#f72585] flex items-center space-x-1 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Access Tests</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-[#f72585]/50 transition-all group">
            <div>
              <Award className="w-8 h-8 text-[#f72585] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Free PTE Assessments</h3>
              <p className="text-xs text-dark-muted leading-relaxed">
                Take advantage of free automated PTE scoring practice questions to test your grammar and speaking pacing.
              </p>
            </div>
            <a href="#/dashboard" className="text-xs font-bold text-[#f72585] flex items-center space-x-1 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Start Assessment</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-[#f72585]/50 transition-all group">
            <div>
              <Compass className="w-8 h-8 text-[#f72585] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">ITP Study Lounge</h3>
              <p className="text-xs text-dark-muted leading-relaxed">
                Access specialist advice, editorial council articles, blogs, and examiner tips for scoring band 8.0+.
              </p>
            </div>
            <a href="#/dashboard" className="text-xs font-bold text-[#f72585] flex items-center space-x-1 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Visit Lounge</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* AI Bot Integration Widget section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-dark-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1 space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#f72585]/10 border border-[#f72585]/35 text-xs text-[#f72585] font-bold">
              <Bot className="w-3.5 h-3.5" />
              <span>AI Study Companion</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">Instant Preparation Guidance</h2>
            <p className="text-sm text-dark-muted leading-relaxed">
              Have questions about TOEFL criteria, IELTS sections, or preparation schedules? Chat with our integrated AI bot for prompt guidelines.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-panel rounded-3xl overflow-hidden flex flex-col h-[350px]">
              {/* Bot Header */}
              <div className="bg-dark-800 px-5 py-3 border-b border-dark-700/60 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f72585] to-[#d91a70] flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">ITPverse Bot</h4>
                  <span className="text-[10px] text-brand-emerald flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                    <span>Active Guide</span>
                  </span>
                </div>
              </div>

              {/* Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs scroll-smooth">
                {botMessages.map((msg, mIdx) => (
                  <div key={mIdx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-[#f72585] to-[#d91a70] text-white rounded-tr-none' 
                        : 'bg-dark-800 text-dark-text border border-dark-700 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bot Input Form */}
              <form onSubmit={handleBotSubmit} className="p-3 bg-dark-800 border-t border-dark-700/60 flex space-x-2">
                <input
                  type="text"
                  value={botInput}
                  onChange={(e) => setBotInput(e.target.value)}
                  placeholder="Ask a question about TOEFL, IELTS, or PTE..."
                  className="flex-1 bg-dark-900 border border-dark-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#f72585]"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-gradient-to-br from-[#f72585] to-[#d91a70] hover:opacity-90 text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 border-t border-dark-800">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Student Testimonials</h2>
          <p className="text-xs text-dark-muted mt-2">Real success stories from candidates using ITPverse.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl relative">
            <Star className="w-5 h-5 text-yellow-400 mb-3 fill-current" />
            <p className="text-xs text-dark-muted italic mb-4">
              "From zero preparation to an absolute band score boost on TOEFL in 30 days! The realistic mock systems and expert study plan made the entire process stress-free."
            </p>
            <div className="border-t border-dark-700/50 pt-3 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center font-bold text-xs text-[#f72585]">
                A
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Ahsan Karim</h4>
                <p className="text-[10px] text-dark-muted">Scored 108/120 on TOEFL</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl relative">
            <Star className="w-5 h-5 text-yellow-400 mb-3 fill-current" />
            <p className="text-xs text-dark-muted italic mb-4">
              "The IELTS mock environment is extremely realistic. Navigating the reading questions felt exactly like the computer-delivered test environment. Recommended!"
            </p>
            <div className="border-t border-dark-700/50 pt-3 flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center font-bold text-xs text-[#f72585]">
                T
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Tasmia Chowdhury</h4>
                <p className="text-[10px] text-dark-muted">Scored Band 8.0 on IELTS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration/Contact section */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#f72585]/10 rounded-full blur-2xl" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Ready to kickstart your study?</h2>
          <p className="text-xs text-dark-muted mb-6">Get in touch with ITPverse or start practicing simulated mock exams immediately.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="#/dashboard"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#f72585] to-[#d91a70] text-xs font-bold text-white shadow-md shadow-[#f72585]/20 transition-all"
            >
              Start Free Mock Test
            </a>
            <button
              onClick={() => alert("Thank you for choosing ITPverse! We will get in touch shortly.")}
              className="px-6 py-3 rounded-xl border border-dark-700 text-xs font-semibold text-white hover:bg-dark-800 transition-all"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

      </div>{/* end dark bg wrapper */}
    </div>
  );
}
