import React from 'react';
import { motion } from 'framer-motion';

/**
 * StatsRow
 * Quick-glance user stats shown after the greeting finishes.
 * TODO (backend): Replace static data with API call → GET /api/user/stats
 *
 * Props:
 *   stats {Array<{ label, value, icon }>}
 */
export default function StatsRow({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.45 }}
      className="flex items-center gap-3 flex-wrap mt-1"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={[
            'flex items-center gap-2',
            'px-3.5 py-2 rounded-2xl',
            'border border-slate-200 dark:border-[#27272a]',
            'bg-white/80 dark:bg-[#18181f]/80',
            'backdrop-blur-sm',
            'shadow-sm',
          ].join(' ')}
        >
          <span className="text-base" role="img" aria-label={stat.label}>{stat.icon}</span>
          <div>
            <p className="text-[10px] font-semibold text-slate-500 dark:text-zinc-500 leading-none tracking-wide uppercase">
              {stat.label}
            </p>
            <p className="text-sm font-black text-[#f72585] leading-tight">{stat.value}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
