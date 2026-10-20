import React from 'react';
import { 
  User, 
  MapPin, 
  Globe2, 
  Clock, 
  Briefcase, 
  Compass, 
  Sparkles, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

export default function AboutSection() {
  const p = portfolioData.personal;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>ACADEMIC & PROFESSIONAL BIOGRAPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            About <span className="text-gradient-blue">{p.name}</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            {p.valueProposition}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: The Narrative Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl glass-panel space-y-4 text-slate-300 leading-relaxed border border-slate-800 shadow-glass relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-blue-400" />
                <span>Academic Trajectory & AI/Data Focus</span>
              </h3>
              
              {p.bioStory.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base text-slate-300">
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Production-Grade Code Quality</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>System Design Rigor</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Cross-Team Empathy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fast-Scan Recruiter Criteria Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Availability & Location Card */}
            <div className="p-6 rounded-2xl glass-card-violet space-y-4 shadow-glass relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Employment & Availability</span>
              </h4>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-purple-900/40">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Notice Period:
                  </span>
                  <span className="font-semibold text-emerald-400">{p.availability}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-purple-900/40">
                  <span className="text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    Base Location:
                  </span>
                  <span className="font-semibold text-white text-right">{p.location}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-purple-900/40">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-pink-400" />
                    Work Preference:
                  </span>
                  <span className="font-semibold text-cyan-300">{p.workPreferences.type}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-cyan-400" />
                    Relocation:
                  </span>
                  <span className="font-semibold text-white">{p.workPreferences.relocation}</span>
                </div>
              </div>
            </div>

            {/* Languages & Core Stats */}
            <div className="p-6 rounded-2xl glass-panel space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-cyan-400" />
                <span>Spoken & Human Languages</span>
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {(p.languages || ["English (Fluent / Professional)", "Telugu (Native / Mother-tongue)"]).map((lang) => (
                  <span 
                    key={lang}
                    className="px-3 py-1 rounded-full text-xs bg-slate-900/80 border border-slate-700 text-slate-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
