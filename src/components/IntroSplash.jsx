import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export default function IntroSplash({ onEnter, onSkip }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        const increment = Math.floor(Math.random() * 25) + 20;
        return Math.min(100, prev + increment);
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const triggerEnter = () => {
    setIsDismissed(true);
    if (typeof onEnter === 'function') {
      onEnter();
    }
  };

  const triggerSkip = () => {
    setIsDismissed(true);
    if (typeof onSkip === 'function') {
      onSkip();
    }
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div 
      id="intro-splash-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-bg/95 backdrop-blur-xl overflow-hidden select-none transition-opacity duration-300"
      onClick={() => {
        if (isLoaded) triggerEnter();
      }}
    >
      {/* Background ambient aurora glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse-glow delay-1000 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-w-md w-full mx-4 p-8 rounded-2xl glass-panel text-center border border-cyan-500/30 shadow-glow-cyan pointer-events-auto"
      >
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-cyan-400" />
          <span>Interactive 3D Portfolio</span>
        </div>

        {/* Title & Name */}
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight mb-2">
          {portfolioData.personal.name}
        </h1>
        <p className="text-sm font-medium text-cyber-muted mb-8">
          {portfolioData.personal.role}
        </p>

        {/* Progress Bar or Enter Button */}
        {!isLoaded ? (
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-mono text-cyan-400">
              <span>INITIALIZING 3D ENVIRONMENT</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-150 ease-out shadow-glow-cyan"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 italic">
              Compiling WebGL shaders & loading interactive workspace...
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            {/* Enter Portfolio Button */}
            <button
              type="button"
              id="enter-portfolio-btn"
              onClick={triggerEnter}
              className="w-full group relative inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-glow-cyan transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Volume2 className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform pointer-events-none" />
              <span className="pointer-events-none text-base font-bold">Enter Portfolio</span>
              <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform pointer-events-none" />
            </button>

            {/* Audio notice */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-cyan-300/80">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Sound on for the best voice experience</span>
            </div>

            {/* Quick recruiter bypass */}
            <div className="pt-2">
              <button
                type="button"
                id="skip-intro-btn"
                onClick={triggerSkip}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors underline decoration-slate-600 hover:decoration-cyan-400 cursor-pointer"
              >
                <Zap className="w-3 h-3 text-amber-400 pointer-events-none" />
                <span className="pointer-events-none">Skip intro & jump straight to recruiter view</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
