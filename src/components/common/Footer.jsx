import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube, ArrowUpRight, Sparkles } from 'lucide-react';
import EdwaayLogo from './EdwaayLogo';

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
      icon: Facebook,
      url: 'https://facebook.com',
      color: 'hover:bg-blue-600 hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com',
      color: 'hover:bg-sky-600 hover:text-white',
    },
    {
      name: 'YouTube',
      icon: Youtube,
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
            <Sparkles className="w-3.5 h-3.5" />
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

        {/* Bottom Bar / Copyright */}
        <div className="pt-8 border-t border-slate-800 dark:border-dark-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
          <p>© {currentYear} Edwaay / ITP-Verse. All rights reserved.</p>
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
