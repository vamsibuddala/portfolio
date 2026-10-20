import React, { useState, useEffect } from 'react';
import {
  Download,
  Briefcase,
  FolderGit2,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Info,
  X,
  MapPin,
  Zap,
  Hand,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolio';

export default function HeroOverlay({
  isSpeaking,
  captionText,
  isMuted,
  onToggleMute,
  onReplayGreeting,
  onOpenRecruiterModal,
  topicsList = [],
  currentTopic = 'intro',
  onSelectTopic,
  onTriggerWave,
  isCloseup = false,
  onToggleCloseup,
}) {
  const [typedRole, setTypedRole] = useState("");
  const [showNameMeaning, setShowNameMeaning] = useState(false);

  const fullRole = portfolioData.personal.role;

  // Typing effect for the role title
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedRole(fullRole.slice(0, index));
      index++;
      if (index > fullRole.length) {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [fullRole]);

  // Celebratory Hire Me handler
  const handleHireMe = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#a855f7', '#ec4899', '#38bdf8']
    });

    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Resume Download
  const handleResumeDownload = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00f2fe', '#38bdf8']
    });

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'resume_download', {
        event_category: 'Recruiter',
        event_label: portfolioData.resume.fileName
      });
    }

    const link = document.createElement('a');
    link.href = portfolioData.resume.downloadUrl;
    link.download = portfolioData.resume.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 min-h-[90vh] flex flex-col justify-between pointer-events-none">

      {/* 1. Top Floating Badges & Avatar Interactive Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Availability Badge & Status */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium shadow-glass">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-300">{portfolioData.personal.statusBadge}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              {portfolioData.personal.location.split('(')[0].trim()}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-slate-700/80 text-slate-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>3D Workspace Visualizer</span>
          </div>
        </div>

        {/* 3D Avatar Kinematics Toolbar */}
        <div className="flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-full border border-slate-700/80 text-xs shadow-glass backdrop-blur-md">
          {/* Wave hello */}
          <button
            onClick={onTriggerWave}
            title="Interactive avatar wave gesture"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Hand className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline font-medium">Wave</span>
          </button>

          {/* Zoom Close-up toggle */}
          {onToggleCloseup && (
            <button
              onClick={onToggleCloseup}
              title={isCloseup ? "Reset View" : "Close-up 3D View"}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isCloseup ? (
                <>
                  <ZoomOut className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden md:inline font-medium">Reset View</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden md:inline font-medium">Zoom View</span>
                </>
              )}
            </button>
          )}

          <div className="w-px h-3.5 bg-slate-700" />

          {/* Replay */}
          <button
            onClick={onReplayGreeting}
            title="Replay technical introduction"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline font-medium">Replay</span>
          </button>

          <div className="w-px h-3.5 bg-slate-700" />

          {/* Mute/Unmute */}
          <button
            onClick={onToggleMute}
            title={isMuted ? "Unmute audio brief" : "Mute audio brief"}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-rose-400 font-medium">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-blue-300 font-medium">Audio Active</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Main Hero Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4">

        {/* Left Column: Headline, Value Proposition, Action CTAs & Co-pilot Console */}
        <div className="lg:col-span-7 space-y-5 pointer-events-auto max-w-2xl">

          {/* Eyebrow and Name */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-300 text-xs font-mono tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>MSC DATA SCIENCE & ARTIFICIAL INTELLIGENCE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-[1.1]">
              Hi, I'm{" "}
              <button
                type="button"
                onClick={() => setShowNameMeaning(!showNameMeaning)}
                className="group inline-flex items-baseline font-extrabold text-white hover:text-blue-300 underline decoration-blue-500/40 hover:decoration-blue-400 underline-offset-8 transition-colors cursor-pointer"
                title="Click to view name meaning & heritage"
              >
                {portfolioData.personal.name}
                <Info className="w-4 h-4 ml-2 text-blue-400 inline opacity-70 group-hover:opacity-100 transition-opacity" />
              </button>
            </h1>

            {/* Dynamic Typewriter Role */}
            <div className="text-base sm:text-lg font-mono text-slate-300 flex items-center min-h-[1.75rem]">
              <span className="text-blue-300 font-semibold">{typedRole}</span>
              <span className="inline-block w-2 h-4 ml-1.5 bg-blue-400 animate-pulse" />
            </div>
          </div>

          {/* Core Recruiter Value Proposition */}
          <p className="text-base sm:text-lg font-normal text-slate-300 leading-relaxed">
            {portfolioData.personal.valueProposition}
          </p>

          {/* Organized Academic & Career Credentials Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Sheffield Hallam University
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs font-medium text-emerald-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Placement Year Candidate (2026/27)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Data Analytics & Machine Learning
            </span>
          </div>

          {/* Primary Action Buttons (Prominent & Professional) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Contact / Placement Enquiry */}
            <button
              onClick={handleHireMe}
              className="relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 border border-blue-400/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-blue-100" />
              <span>Contact / Placement Enquiry</span>
            </button>

            {/* Download Resume */}
            <button
              onClick={handleResumeDownload}
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-850 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 shadow-glass transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-300" />
              <span>Download CV (PDF)</span>
            </button>

            {/* View Projects */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold text-slate-300 glass-panel hover:text-white hover:border-slate-600 transition-all transform hover:scale-[1.02]"
            >
              <FolderGit2 className="w-4 h-4 text-blue-400" />
              <span>Explore Projects</span>
            </a>
          </div>

          {/* Fast View Shortcut */}
          <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Short on time?</span>
            <button
              onClick={onOpenRecruiterModal}
              className="text-blue-400 hover:text-blue-300 font-semibold underline decoration-blue-500/40 hover:decoration-blue-400 cursor-pointer"
            >
              Open 1-Page Placement & Candidate Summary
            </button>
          </div>

          {/* Candidate Audio Brief & Highlights Console */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 shadow-glass space-y-3.5">
            <div className="flex items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300 uppercase tracking-wider font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Candidate Audio Brief</span>
              </div>

              {/* Animated Live Equalizer Waves */}
              <div className="flex items-center gap-1.5">
                {isSpeaking ? (
                  <div className="flex items-end gap-1 h-3.5">
                    <span className="w-1 bg-blue-400 rounded-full animate-bounce h-2" />
                    <span className="w-1 bg-indigo-400 rounded-full animate-bounce h-3.5 delay-75" />
                    <span className="w-1 bg-sky-400 rounded-full animate-bounce h-2.5 delay-150" />
                    <span className="w-1 bg-blue-300 rounded-full animate-bounce h-3 delay-100" />
                    <span className="text-[11px] text-blue-300 font-sans font-medium ml-1">Narrating</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400 font-sans">Ready to play</span>
                )}
              </div>
            </div>

            {/* Interactive Speech Prompt Chips */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>Select Overview Topic:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {topicsList.map(topic => {
                  const isActive = currentTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => onSelectTopic && onSelectTopic(topic.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all transform hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-blue-600/30 border border-blue-400 text-blue-200 shadow-sm'
                          : 'bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>{topic.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Subtitle Narration Box */}
            {captionText && (
              <div className="text-xs text-slate-200 bg-slate-950/90 p-3.5 rounded-xl border-l-4 border-l-blue-500 border border-slate-800">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>CANDIDATE BRIEF TRANSCRIPTION</span>
                  {isMuted && <span className="text-amber-400 font-sans">(Muted — click Audio Active to listen)</span>}
                </div>
                <p className="leading-relaxed text-slate-200 text-xs sm:text-sm">
                  "{captionText}"
                </p>
              </div>
            )}
          </div>

          {/* Interactive Name Origin Breakdown Modal */}
          {showNameMeaning && (
            <div className="animate-fadeIn p-5 rounded-2xl glass-card-violet border border-purple-500/40 shadow-glow-violet">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>The Origin of "{portfolioData.personal.name}"</span>
                </div>
                <button
                  onClick={() => setShowNameMeaning(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-850 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <p>
                  <strong className="text-white">Meaning: </strong>
                  {portfolioData.personal.nameOrigin.meaning}
                </p>
                <p>
                  <strong className="text-white">Origin: </strong>
                  {portfolioData.personal.nameOrigin.origin}
                </p>
                <p className="text-xs text-purple-200/80 italic pt-1 border-t border-purple-800/40">
                  💡 {portfolioData.personal.nameOrigin.funFact}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Dedicated 3D Spatial Host Viewport */}
        <div className="lg:col-span-5 h-[340px] sm:h-[440px] lg:h-[520px] relative flex flex-col justify-end items-end pointer-events-none">
          {/* Subtle floating 3D status badge on the avatar viewport */}
          <div className="glass-panel px-3.5 py-2 rounded-xl border border-cyan-500/25 text-xs text-slate-300 pointer-events-auto backdrop-blur-md shadow-glass mb-4 mr-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-[11px] text-cyan-300 font-semibold">Interactive 3D Spatial Host</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Tracks pointer • Voice lip-sync • Waving kinematics
            </p>
          </div>
        </div>
      </div>

      {/* 3. Bottom Scroll Indicator */}
      <div className="flex items-center justify-center pt-2 pointer-events-auto">
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <span>SCROLL TO EXPLORE PORTFOLIO</span>
          <div className="w-5 h-7 rounded-full border border-slate-700 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </a>
      </div>

    </div>
  );
}
