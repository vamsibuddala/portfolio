import React, { useState, useEffect } from 'react';
import { Award, Zap, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

export default function AchievementsSection() {
  const achievements = portfolioData.achievements;

  return (
    <section id="achievements" className="py-20 relative overflow-hidden bg-cyber-bg/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>VERIFIED PERFORMANCE BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Key Engineering <span className="text-gradient-blue">Metrics</span>
          </h2>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item) => (
            <div
              key={item.label}
              className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 text-center hover:border-slate-600 transition-all duration-200 group"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white transition-transform">
                <span className="text-white">
                  {item.value}
                </span>
                <span className="text-blue-400 text-2xl sm:text-3xl font-mono ml-0.5">
                  {item.suffix}
                </span>
              </div>
              <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-200">
                {item.label}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
