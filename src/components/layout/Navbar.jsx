import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Menu, 
  X, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

export default function Navbar({ 
  onOpenRecruiterModal, 
  isMuted, 
  onToggleMute 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Resume", href: "#resume", id: "resume" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active section detection
      const scrollPosition = window.scrollY + 200;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const element = document.getElementById(navLinks[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 px-3 sm:px-6' 
          : 'bg-transparent py-5 px-4 sm:px-6 lg:px-8'
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto transition-all duration-300 ${
          isScrolled 
            ? 'glass-panel rounded-2xl px-4 sm:px-6 py-2.5 border border-cyan-500/25 shadow-glass-hover backdrop-blur-xl' 
            : 'px-0 py-0'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo / Personal Brand */}
          <a 
            href="#" 
            className="flex items-center gap-3 group text-white font-heading font-extrabold text-xl tracking-tight"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-sm group-hover:border-blue-500/50 transition-all duration-300 ring-1 ring-white/10">
              <span className="font-mono text-sm font-bold text-blue-400 tracking-wider">
                {portfolioData.personal.initials || "VB"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="group-hover:text-blue-300 transition-colors leading-tight font-heading font-bold text-slate-100">
                {portfolioData.personal.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-normal hidden sm:inline flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                {portfolioData.personal.navRole || "MSc Data Science & AI"}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-300 bg-blue-600/20 border border-blue-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Header Action Tools */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              title={isMuted ? "Unmute audio overview" : "Mute audio overview"}
              className="p-2 rounded-xl glass-panel text-slate-300 hover:text-blue-400 hover:border-slate-600 transition-all hover:scale-105 cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-blue-400" />
              )}
            </button>

            {/* Recruiter Quick View CTA Button */}
            <button
              id="recruiter-fast-view-btn"
              onClick={onOpenRecruiterModal}
              className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 border border-blue-400/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-blue-100" />
              <span>Recruiter Brief</span>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400"></span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenRecruiterModal}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600/30 border border-blue-400/40 cursor-pointer"
            >
              Recruiter Brief
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg glass-panel text-slate-300 hover:text-blue-400 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-cyan-500/20 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-cyan-950/50 hover:text-cyan-300"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onToggleMute}
              className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-cyan-300"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span>{isMuted ? "Sound: Off" : "Sound: On"}</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenRecruiterModal();
              }}
              className="text-xs font-semibold text-cyan-400 underline"
            >
              Open Recruiter Summary
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
