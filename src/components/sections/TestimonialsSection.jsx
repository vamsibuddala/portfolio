import React from 'react';
import { MessageSquareQuote, Star } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

export default function TestimonialsSection() {
  const testimonials = portfolioData.testimonials || [];

  // Gracefully hide entire section if empty
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-cyber-bg/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Peer & Leadership <span className="text-gradient-cyan">Recommendations</span>
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl glass-panel border border-cyan-500/20 shadow-glass flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/50"
                />
                <div>
                  <h4 className="text-base font-bold text-white">
                    {t.name}
                  </h4>
                  <p className="text-xs text-cyan-300">
                    {t.role}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {t.relationship}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
