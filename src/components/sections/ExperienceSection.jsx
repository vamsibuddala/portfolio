import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, TrendingUp, Sparkles, CheckCircle2, Zap, Award } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

export default function ExperienceSection() {
  const experiences = portfolioData.experience;
  const [selectedTech, setSelectedTech] = useState('all');

  // Collect unique prominent technologies for quick filtering
  const allTechs = Array.from(new Set(experiences.flatMap(exp => exp.technologies || [])));
  const techFilters = ['all', ...allTechs.slice(0, 6)];

  const filteredExperiences = selectedTech === 'all'
    ? experiences
    : experiences.filter(exp => exp.technologies.some(t => t.toLowerCase().includes(selectedTech.toLowerCase())));

  // Highlight metrics for each role
  const roleHighlights = {
    'exp-1': { metric: 'Power BI & Jupyter', label: 'Analytics Stack', icon: Zap, color: 'text-cyan-400 bg-cyan-950/70 border-cyan-500/30' },
    'exp-2': { metric: '8+ Events Led', label: 'Student Engagement', icon: Award, color: 'text-purple-400 bg-purple-950/70 border-purple-500/30' },
    'exp-3': { metric: 'Logical Problem Solving', label: 'Customer Operations', icon: TrendingUp, color: 'text-emerald-400 bg-emerald-950/70 border-emerald-500/30' }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>PROFESSIONAL & LEADERSHIP TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Work Experience & <span className="text-gradient-blue">Measurable Impact</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Hands-on data analytics internship experience, student committee leadership, and customer-facing operations.
          </p>
        </div>

        {/* Technology Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          <span className="text-xs font-mono text-slate-400 mr-2 hidden sm:inline">Filter by stack:</span>
          {techFilters.map(tech => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedTech === tech
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 border border-blue-400/40'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              {tech === 'all' ? 'All Roles' : tech}
            </button>
          ))}
        </div>

        {/* Animated Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central cyber beam */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-slate-700 sm:-translate-x-1/2 opacity-70" />

          <div className="space-y-12">
            {filteredExperiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const highlight = roleHighlights[exp.id];

              return (
                <div 
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } group`}
                >
                  {/* Timeline Glowing Node Dot */}
                  <div className="absolute left-4 sm:left-1/2 top-6 w-6 h-6 rounded-full bg-slate-950 border-2 border-blue-400 -translate-x-1/2 shadow-sm z-20 flex items-center justify-center ring-4 ring-blue-500/20 group-hover:ring-blue-400/40 transition-all">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Timeline Content Card */}
                  <div className="w-full pl-12 sm:pl-0 sm:w-1/2 sm:px-8">
                    <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-slate-800 shadow-glass group-hover:border-slate-600 transition-all duration-200 relative overflow-hidden">
                      {/* Subtle top sheen */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
                      
                      {/* Top Header: Period & Highlight Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-900 border border-slate-700/80 text-slate-300">
                          <Calendar className="w-3 h-3 text-blue-400" />
                          {exp.period}
                        </span>

                        {highlight && (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${highlight.color} shadow-sm`}>
                            <highlight.icon className="w-3.5 h-3.5" />
                            <span>{highlight.metric}</span>
                          </span>
                        )}
                      </div>

                      {/* Company & Role */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <h4 className="text-sm font-semibold text-purple-400">
                            {exp.company}
                          </h4>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            {exp.location}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs text-emerald-400 font-medium font-mono">
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      {/* 3 Measurable Impact Bullets */}
                      <ul className="space-y-3 mb-5">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                            <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Tags */}
                      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 ${
                              selectedTech.toLowerCase() === tech.toLowerCase()
                                ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400 shadow-glow-cyan scale-105'
                                : 'bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA for Recruiter Discussion */}
        <div className="mt-16 text-center">
          <p className="text-xs text-slate-400 mb-3">
            Want to dive deeper into any architecture decisions or metrics above?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-cyan-300 glass-panel border border-cyan-500/30 hover:border-cyan-400 hover:text-white transition-all transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Schedule a Technical Architecture Discussion</span>
          </a>
        </div>

      </div>
    </section>
  );
}
