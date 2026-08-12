import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Zap,
  Target,
  Crown,
  Award,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Flame,
  CheckCircle2,
  Lock,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PricingSection() {
  const { openAuthModal } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('lifetime');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '0',
      period: 'Forever Free',
      description: 'Perfect for exploring Edwaay and trying out daily practice tools.',
      badge: 'Starter',
      icon: Zap,
      accentColor: 'text-[#0097B2]',
      borderStyle: 'border-slate-200 dark:border-slate-800',
      bgStyle: 'bg-white/90 dark:bg-[#0d242b]/80',
      btnStyle: 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700',
      features: [
        { text: 'Daily Practice', included: true },
        { text: 'Limited AI Speaking', included: true },
        { text: 'Vocabulary', included: true },
        { text: 'Grammar', included: true },
        { text: 'Full Mock Tests', included: false },
        { text: 'University Finder', included: false },
        { text: 'Scholarship Finder', included: false },
      ],
      isHighlighted: false,
    },
    {
      id: 'essential',
      name: 'Essential',
      price: '10,000',
      currency: 'BDT',
      period: 'One-Time Payment',
      description: 'Ideal for candidates focusing on band score boost & evaluation.',
      badge: 'Popular',
      icon: Target,
      accentColor: 'text-[#0097B2] dark:text-cyan-300',
      borderStyle: 'border-slate-200 dark:border-slate-800',
      bgStyle: 'bg-white/90 dark:bg-[#0d242b]/90',
      btnStyle: 'bg-[#004B59] hover:bg-[#003843] text-white border border-cyan-800 shadow-md',
      features: [
        { text: 'More AI Speaking', included: true, highlight: true },
        { text: 'Mock Tests', included: true, highlight: true },
        { text: 'Progress Tracking', included: true },
        { text: 'Writing Feedback', included: true, highlight: true },
        { text: 'Daily Practice', included: true },
        { text: 'Vocabulary & Grammar', included: true },
        { text: 'University & Scholarship Finder', included: false },
      ],
      isHighlighted: false,
    },
    {
      id: 'lifetime',
      name: 'Lifetime',
      price: '12,000',
      originalPrice: '25,000',
      currency: 'BDT',
      period: 'Pay Once • Unlimited Access',
      description: 'Complete all-in-one access for your entire study abroad journey.',
      badge: 'Best Value',
      icon: Crown,
      accentColor: 'text-amber-400',
      borderStyle: 'border-[#0097B2]',
      bgStyle: 'bg-gradient-to-b from-[#0d242b] via-slate-900 to-[#061317] text-white',
      btnStyle: 'bg-gradient-to-r from-[#0097B2] via-cyan-500 to-[#004B59] hover:from-[#00849c] hover:to-[#003843] text-white shadow-xl shadow-[#0097B2]/30',
      features: [
        { text: 'Unlimited AI Speaking', included: true, bold: true, highlight: true },
        { text: 'All Mock Tests', included: true, bold: true, highlight: true },
        { text: 'University Finder', included: true, bold: true, highlight: true },
        { text: 'Scholarship Finder', included: true, bold: true, highlight: true },
        { text: 'Future Updates', included: true, bold: true },
        { text: 'Progress Tracking & Analytics', included: true },
        { text: 'Writing & Grammar Evaluation', included: true },
      ],
      isHighlighted: true,
    },
  ];

  return (
    <section id="pricing" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-slate-50 dark:bg-[#061317] transition-colors duration-300">
      
      {/* ── Background Ambient Glows (Brand Colors: #0097B2 & #004B59) ── */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] bg-[#0097B2]/10 dark:bg-[#0097B2]/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#004B59]/15 dark:bg-[#004B59]/30 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Title Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F5F7] dark:bg-[#0097B2]/15 border border-[#0097B2]/30 text-[#0097B2] dark:text-cyan-300 text-xs font-black tracking-widest uppercase shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-[#0097B2] dark:text-cyan-300" />
            <span>Edwaay Flexible Pricing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Simple, Transparent Pricing <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#0097B2] via-cyan-500 to-[#004B59] dark:from-cyan-400 dark:via-[#0097B2] dark:to-teal-300 bg-clip-text text-transparent">
              No Hidden Fees
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed"
          >
            Invest in your dream band score with full AI feedback, unlimited practice speaking, and smart university matching.
          </motion.p>
        </div>

        {/* ── 3 PRICING CARDS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isBestValue = plan.isHighlighted;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 cursor-pointer ${
                  isBestValue
                    ? 'md:-translate-y-4 shadow-2xl ring-2 ring-[#0097B2] dark:ring-cyan-400 bg-gradient-to-b from-[#0d242b] via-slate-900 to-[#061317] text-white'
                    : 'bg-white dark:bg-[#0d242b]/95 border border-slate-200 dark:border-slate-800/80 shadow-xl hover:shadow-2xl hover:-translate-y-1'
                }`}
              >
                {/* Highlighted "Best Value" Floating Badge */}
                {isBestValue && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-teal-300 to-[#0097B2] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 animate-pulse">
                    <Flame className="w-4 h-4 fill-slate-950" />
                    <span>BEST VALUE</span>
                  </div>
                )}

                <div>
                  {/* Card Header: Icon & Name */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${isBestValue ? 'bg-[#0097B2]/25 text-cyan-300' : 'bg-[#E6F5F7] dark:bg-cyan-950/60 text-[#0097B2] dark:text-cyan-400'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                      isBestValue
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isBestValue ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {plan.name} Plan
                  </h3>

                  <p className={`text-xs mt-1.5 leading-relaxed font-medium min-h-[36px] ${isBestValue ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    {plan.description}
                  </p>

                  {/* Price Section */}
                  <div className="my-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80">
                    <div className="flex items-baseline gap-1.5">
                      {plan.price === '0' ? (
                        <span className={`text-4xl sm:text-5xl font-black tracking-tight ${isBestValue ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                          Free
                        </span>
                      ) : (
                        <>
                          <span className={`text-3xl sm:text-4xl font-black ${isBestValue ? 'text-cyan-300' : 'text-[#0097B2] dark:text-cyan-400'}`}>
                            ৳{plan.price}
                          </span>
                          <span className={`text-sm font-bold uppercase ${isBestValue ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                            {plan.currency}
                          </span>
                          {plan.originalPrice && (
                            <span className="line-through text-slate-400 text-sm ml-2 font-medium">
                              ৳{plan.originalPrice}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    <span className={`text-[11px] font-bold block mt-1 ${isBestValue ? 'text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {plan.period}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <span className={`text-xs font-black uppercase tracking-wider block ${isBestValue ? 'text-slate-300' : 'text-slate-400 dark:text-slate-500'}`}>
                      What's Included:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs font-medium">
                          {feature.included ? (
                            <div className={`p-0.5 rounded-full shrink-0 ${isBestValue ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'}`}>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="p-0.5 rounded-full shrink-0 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600">
                              <Check className="w-3.5 h-3.5 stroke-[2] opacity-30" />
                            </div>
                          )}
                          <span className={`
                            ${feature.included 
                              ? isBestValue ? 'text-slate-100' : 'text-slate-700 dark:text-slate-200' 
                              : 'text-slate-400 dark:text-slate-500 line-through'
                            }
                            ${feature.bold ? 'font-black text-white' : ''}
                            ${feature.highlight && !isBestValue ? 'font-bold text-[#0097B2] dark:text-cyan-300' : ''}
                          `}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Action Button */}
                <div>
                  <button
                    onClick={openAuthModal}
                    className={`w-full py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${plan.btnStyle}`}
                  >
                    <span>
                      {plan.id === 'free' ? 'Start Free Practice' : plan.id === 'essential' ? 'Get Essential Plan' : 'Get Lifetime Access'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── TRUST & PAYMENT ASSURANCE BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 max-w-4xl mx-auto p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-[#0d242b]/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl flex flex-wrap items-center justify-around gap-4 text-center text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xl"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0097B2] dark:text-cyan-400 shrink-0" />
            <span>100% Secure Payment (bKash, Nagad, Rocket & Cards)</span>
          </div>

          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Instant Account Activation</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0097B2] dark:text-cyan-400 shrink-0" />
            <span>7-Day Satisfaction Guarantee</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
