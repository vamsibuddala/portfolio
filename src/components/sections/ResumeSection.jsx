import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, Eye, ExternalLink, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolio';

export default function ResumeSection() {
  const resume = portfolioData.resume;
  const p = portfolioData.personal;
  const contact = portfolioData.contact;

  const handleDownload = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00f2fe', '#a855f7', '#38bdf8']
    });

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'resume_download_click', {
        event_category: 'Recruitment',
        event_label: resume.fileName
      });
    }

    const link = document.createElement('a');
    link.href = resume.downloadUrl;
    link.download = resume.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>EXECUTIVE CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Curriculum Vitae & <span className="text-gradient-blue">Career Summary</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            ATS-optimized curriculum vitae outlining data science & AI competencies, academic modules, and practical internship results.
          </p>
        </div>

        {/* Embedded Resume Preview Container */}
        <div className="max-w-4xl mx-auto rounded-2xl glass-panel border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-950/70 border border-blue-500/30 text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {resume.fileName}
                </h3>
                <p className="text-xs text-slate-400">
                  Last updated: {resume.lastUpdated} • Verified ATS Compliant
                </p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-glow-cyan transition-all transform hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4 text-cyan-100" />
              <span>Download PDF</span>
            </button>
          </div>

          {/* Embedded Interactive Resume Sheet */}
          <div className="p-6 sm:p-10 bg-slate-900/60 space-y-8 font-sans">
            
            {/* Header of Resume */}
            <div className="border-b border-slate-700/80 pb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {p.name}
                </h4>
                <p className="text-base font-semibold text-cyan-400 mt-0.5">
                  {p.role}
                </p>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{p.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-pink-400" />
                  <span>{contact.phone}</span>
                </div>
              </div>
            </div>

            {/* Executive Highlights */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                EXECUTIVE HIGHLIGHTS & ARCHITECTURAL EXPERTISE
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {resume.summaryBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies Quick Matrix */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h5 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                PRIMARY COMPETENCY MATRIX
              </h5>
              <div className="flex flex-wrap gap-2">
                {(portfolioData.recruiterSummary.topSkills || [
                  "Python", "Data Preprocessing", "TensorFlow / Keras", 
                  "Power BI", "Jupyter Notebook", "React.js", 
                  "MongoDB", "Data Visualization", "Algorithms & Data Structures"
                ]).map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-md text-xs font-medium bg-slate-950/80 border border-slate-700 text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Callout */}
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Need a tailored custom resume or blind resume for clients? Reach out directly.</span>
              </span>
              <a
                href="#contact"
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline"
              >
                Send a quick message
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
