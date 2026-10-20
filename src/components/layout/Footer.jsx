import React from 'react';
import { Sparkles, ArrowUp, Heart } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-cyber-bg relative z-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-blue-400">
            {portfolioData.personal.initials || "VB"}
          </div>
          <span>
            © {new Date().getFullYear()} {portfolioData.personal.name}. Data Science, AI & Machine Learning Portfolio. Built with React & Three.js.
          </span>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel hover:text-white hover:border-slate-600 transition-colors cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
        </button>

      </div>
    </footer>
  );
}
