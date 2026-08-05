import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Mic, FileText, Globe, BarChart3, TrendingUp } from 'lucide-react';

/* ── Custom Animated Counter Component ── */
function Counter({ targetValue, duration = 2, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startValue = 0;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out quad formula for smooth decelerating count animation
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutProgress * (targetValue - startValue) + startValue);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, targetValue, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const statsData = [
  {
    id: 'students',
    label: 'Enrolled Students',
    target: 12500,
    suffix: '+',
    icon: Users,
    description: 'Active test-takers preparing for top universities',
    badge: 'Community',
    accentColor: 'text-[#0097B2] dark:text-cyan-400',
    bgIconColor: 'bg-brand-muted/80 dark:bg-[#0097B2]/15 text-[#0097B2] dark:text-cyan-300',
  },
  {
    id: 'speaking',
    label: 'Speaking Sessions',
    target: 250000,
    suffix: '+',
    icon: Mic,
    description: 'Real-time AI audio evaluations & feedback provided',
    badge: 'AI Powered',
    accentColor: 'text-[#0097B2] dark:text-cyan-300',
    bgIconColor: 'bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400',
  },
  {
    id: 'mock-tests',
    label: 'Mock Tests Taken',
    target: 80000,
    suffix: '+',
    icon: FileText,
    description: 'Full-length realistic exam simulations completed',
    badge: 'Simulated',
    accentColor: 'text-cyan-600 dark:text-cyan-400',
    bgIconColor: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400',
  },
  {
    id: 'countries',
    label: 'Countries Reached',
    target: 25,
    suffix: '+',
    icon: Globe,
    description: 'Global candidate presence across major study regions',
    badge: 'Worldwide',
    accentColor: 'text-[#004B59] dark:text-teal-300',
    bgIconColor: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
  },
];

export default function SuccessStatistics() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-dark-900 py-20 lg:py-28 border-t border-slate-200/80 dark:border-dark-700/80 transition-colors duration-300">
      
      {/* Ambient background brand glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-brand/5 dark:bg-brand/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/5 dark:bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6F5F7] dark:bg-[#0097B2]/15 border border-[#0097B2]/30 text-xs font-black uppercase tracking-wider text-[#0097B2] dark:text-cyan-300 shadow-xs mb-4"
          >
            <BarChart3 className="w-4 h-4 text-[#0097B2] dark:text-cyan-300" />
            <span>11. SUCCESS STATISTICS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-headline"
          >
            Our Growth &{' '}
            <span className="bg-gradient-to-r from-[#0097B2] via-cyan-500 to-[#004B59] dark:from-cyan-400 dark:via-[#0097B2] dark:to-teal-300 bg-clip-text text-transparent">
              Platform Impact
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-dark-muted font-medium max-w-2xl mx-auto"
          >
            Empowering candidates worldwide with measurable practice metrics and proven score outcomes.
          </motion.p>
        </div>

        {/* ── Statistics Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {statsData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative rounded-3xl bg-slate-50/80 dark:bg-dark-800 border border-slate-200/90 dark:border-dark-700 p-7 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Header Row: Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${item.bgIconColor} flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white dark:bg-dark-900/80 border border-slate-200 dark:border-dark-700 text-slate-600 dark:text-dark-muted">
                    {item.badge}
                  </span>
                </div>

                {/* Counter & Label */}
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-headline mb-2">
                    <Counter targetValue={item.target} suffix={item.suffix} />
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-800 dark:text-zinc-200 mb-2">
                    {item.label}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-dark-muted font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Indicator Bar */}
                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-dark-700/60 flex items-center gap-2 text-[11px] font-bold text-[#0097B2] dark:text-cyan-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Continuous Active Growth</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
