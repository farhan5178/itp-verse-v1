import React from 'react';
import { Globe, Share2, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import EdwaayLogo from './EdwaayLogo';

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center">
              <EdwaayLogo size="md" />
            </Link>
            <p className="text-sm text-dark-muted max-w-sm">
              State-of-the-art academic preparation and mock testing environment designed to assist students in achieving peak performance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-dark-muted hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-dark-muted hover:text-white transition-colors">Student Portal</Link>
              </li>
              <li>
                <Link to="/mock-test" className="text-dark-muted hover:text-white transition-colors">Practice Tests</Link>
              </li>
            </ul>
          </div>

          {/* Legal / Socials */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="p-2 bg-dark-800 rounded-lg text-dark-muted hover:text-white transition-colors" title="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-dark-800 rounded-lg text-dark-muted hover:text-white transition-colors" title="Socials">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-dark-800 rounded-lg text-dark-muted hover:text-white transition-colors" title="Links">
                <Link2 className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-dark-muted">
              &copy; {new Date().getFullYear()} Edwaay. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-700/30 text-center text-xs text-dark-muted">
          <p>&copy; {new Date().getFullYear()} Edwaay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
