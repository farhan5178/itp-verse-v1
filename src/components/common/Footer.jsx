import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import EdwaayLogo from './EdwaayLogo';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About', path: '/#about' },
    { name: 'Blog', path: '/#blog' },
    { name: 'Contact', path: '/#contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/#privacy' },
    { name: 'Terms', path: '/#terms' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: 'https://facebook.com',
      color: 'hover:bg-blue-600 hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      url: 'https://linkedin.com',
      color: 'hover:bg-sky-600 hover:text-white',
    },
    {
      name: 'YouTube',
      icon: YoutubeIcon,
      url: 'https://youtube.com',
      color: 'hover:bg-red-600 hover:text-white',
    },
  ];

  return (
    <footer className="relative bg-slate-900 dark:bg-dark-900 border-t border-slate-800 dark:border-dark-700/80 text-slate-400 dark:text-dark-muted transition-colors duration-300 overflow-hidden">
      {/* Soft Background Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0097B2]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Top Header Badge */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-800 dark:border-dark-700/60 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0097B2]/10 border border-[#0097B2]/20 text-xs font-bold text-[#0097B2] dark:text-cyan-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>15. Footer</span>
          </div>

          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-semibold text-slate-400 hover:text-[#0097B2] dark:hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <span>Back to top</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <EdwaayLogo size="md" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 dark:text-zinc-400 max-w-sm">
              Empowering global students with state-of-the-art AI speaking evaluation, standardized IELTS practice tests, and intelligent university matching.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-black tracking-widest text-white uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-slate-400 dark:text-zinc-400 hover:text-[#0097B2] dark:hover:text-cyan-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-black tracking-widest text-white uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-slate-400 dark:text-zinc-400 hover:text-[#0097B2] dark:hover:text-cyan-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xs font-black tracking-widest text-white uppercase mb-4">
              Follow Us
            </h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-800/80 dark:bg-dark-800 text-slate-300 dark:text-zinc-300 text-xs font-semibold border border-slate-700/50 dark:border-dark-700 transition-all ${social.color} shadow-sm group`}
                  >
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 ml-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar / Copyright & Developer Credit */}
        <div className="pt-8 border-t border-slate-800 dark:border-dark-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
          <p>© {currentYear} Edwaay / ITP-Verse. All rights reserved.</p>
          
          <p className="font-medium text-slate-400 dark:text-zinc-400">
            Designed & Developed by{' '}
            <span className="font-bold text-slate-200 dark:text-zinc-200 hover:text-[#0097B2] dark:hover:text-cyan-400 transition-colors">
              Farhan Sadik Turjo
            </span>
          </p>

          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
