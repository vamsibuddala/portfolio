import React, { useState } from 'react';
import { Sparkles, Layers, Box, Cpu, Database, Cloud, Users, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import SkillGalaxyCanvas from '../3d/SkillGalaxyCanvas';

export default function SkillsSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const categories = portfolioData.skillsCategories;
  const currentCategory = categories[activeCategoryIndex];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-cyber-bg/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-3">
            <Box className="w-3.5 h-3.5 text-blue-400" />
            <span>TECHNICAL ARCHITECTURE MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Engineering Competencies & <span className="text-gradient-blue">Tooling</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Core competencies across data science pipelines, machine learning models, Power BI analytics suites, and software engineering.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategoryIndex === idx
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 border border-blue-400/40'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 3D Skill Galaxy & DOM Metric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3D Galaxy Canvas */}
          <div className="lg:col-span-6 rounded-2xl glass-panel border border-cyan-500/20 shadow-glass overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-black/60 backdrop-blur border border-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D Orbiting Orbs: {currentCategory.name}</span>
            </div>

            {/* Hovered Skill Tooltip */}
            {hoveredSkill && (
              <div className="absolute bottom-4 left-4 right-4 z-10 p-3 rounded-xl bg-slate-950/90 border border-cyan-400/50 backdrop-blur text-center animate-fadeIn shadow-glow-cyan">
                <span className="text-sm font-bold text-white">{hoveredSkill.name}</span>
                <span className="text-xs text-cyan-300 ml-2 font-mono">({hoveredSkill.level}% Production Mastery)</span>
              </div>
            )}

            <SkillGalaxyCanvas 
              skills={currentCategory.skills} 
              onHoverSkill={setHoveredSkill}
            />
          </div>

          {/* Right: ATS-Friendly DOM Proficiency Level Progress Bars */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-cyan-500/20 shadow-glass relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
              <h3 className="text-lg font-bold font-heading text-white mb-6 flex items-center justify-between">
                <span>{currentCategory.name} Competencies</span>
                <span className="text-xs font-mono text-cyan-400">BENCHMARK: PRODUCTION USE</span>
              </h3>

              <div className="space-y-4">
                {currentCategory.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5 group">
                    <div className="flex justify-between items-center text-xs sm:text-sm font-medium">
                      <span className="text-slate-200 flex items-center gap-2 group-hover:text-cyan-200 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-glow-cyan" />
                        {skill.name}
                      </span>
                      <span className="font-mono text-cyan-300 font-semibold">{skill.level}%</span>
                    </div>
                    {/* Proficiency Bar with Glowing Tip */}
                    <div className="w-full h-2.5 rounded-full bg-slate-900/90 border border-slate-800/80 overflow-hidden relative p-0.5">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 rounded-full transition-all duration-700 ease-out relative"
                        style={{ width: `${skill.level}%` }}
                      >
                        <span className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full opacity-75 shadow-glow-cyan" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>All listed skills developed through academic modules, data analytics internship, and project builds.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
