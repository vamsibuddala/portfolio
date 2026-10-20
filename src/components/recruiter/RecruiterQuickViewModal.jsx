import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolio';

export default function RecruiterQuickViewModal({ isOpen, onClose }) {
  const [copiedType, setCopiedType] = useState(null);

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownload = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
    const link = document.createElement('a');
    link.href = portfolioData.resume.downloadUrl;
    link.download = portfolioData.resume.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl my-8 p-6 sm:p-8 rounded-2xl glass-panel border border-slate-700 shadow-2xl bg-slate-900/98 text-white cursor-default"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruiter-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close recruiter summary"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Placement & Recruiter Brief</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
            ● {portfolioData.personal.statusBadge}
          </span>
        </div>

        {/* Identity & Current Headline */}
        <div className="border-b border-slate-800 pb-5 mb-6">
          <h2 id="recruiter-modal-title" className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            {portfolioData.personal.name}
          </h2>
          <p className="text-base sm:text-lg font-medium text-blue-400 mt-1">
            {portfolioData.personal.role}
          </p>
          <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
            {portfolioData.recruiterSummary.headline}
          </p>
        </div>

        {/* Core Recruiter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          
          {/* Key Quick Facts */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>Career Snapshot</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5">
              <div className="flex items-start justify-between">
                <span className="text-slate-400">Total Experience:</span>
                <span className="font-semibold text-white">{portfolioData.personal.yearsExperience}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-400">Latest Role:</span>
                <span className="font-semibold text-cyan-300 text-right max-w-[200px]">
                  {portfolioData.recruiterSummary.latestRole}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-400">Notice Period:</span>
                <span className="font-semibold text-emerald-400">{portfolioData.personal.availability}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-400">Work Model:</span>
                <span className="font-semibold text-white">{portfolioData.personal.workPreferences.type}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold text-white text-right">{portfolioData.personal.location}</span>
              </div>
            </div>

            {/* Education & Work Authorization */}
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs text-purple-300 font-semibold">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Education:</span>
              </div>
              <p className="text-xs text-slate-300 pl-6">
                {portfolioData.recruiterSummary.educationSummary}
              </p>
              
              <div className="flex items-center gap-2 text-xs text-cyan-300 font-semibold pt-1 border-t border-slate-800">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Work Auth:</span>
              </div>
              <p className="text-xs text-slate-300 pl-6">
                {portfolioData.recruiterSummary.visaStatus}
              </p>
            </div>
          </div>

          {/* Top 8 Tech Skills */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Core Primary Tech Stack (Top 8)</span>
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {portfolioData.recruiterSummary.topSkills.map((skill) => (
                <div 
                  key={skill}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs font-medium text-slate-200 flex items-center gap-2 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            {/* Direct Contact Actions */}
            <div className="mt-4 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                Direct Recruiter Line:
              </h4>
              
              {/* Copy Email */}
              <div className="flex items-center justify-between bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300 truncate">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{portfolioData.contact.email}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(portfolioData.contact.email, 'email')}
                  className="ml-2 p-1.5 text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/60 rounded flex items-center gap-1 transition-colors"
                  title="Copy email address"
                >
                  {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'email' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Copy Phone */}
              <div className="flex items-center justify-between bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-300 truncate">
                  <Phone className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>{portfolioData.contact.phone}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(portfolioData.contact.phone, 'phone')}
                  className="ml-2 p-1.5 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-950/60 rounded flex items-center gap-1 transition-colors"
                  title="Copy phone number"
                >
                  {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'phone' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Updated for 2026 hiring cycles • Ready for technical screening
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 text-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Full PDF Resume</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl font-medium text-slate-300 hover:text-white glass-panel text-sm"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
