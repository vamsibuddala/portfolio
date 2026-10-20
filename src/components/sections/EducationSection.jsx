import React from 'react';
import { GraduationCap, Award, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

export default function EducationSection() {
  const education = portfolioData.education;
  const certs = portfolioData.certifications;

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Credentials & Academics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Education & <span className="text-gradient-aurora">Certifications</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Education Card */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Academic Qualifications</span>
            </h3>

            {education.map((edu, idx) => (
              <div 
                key={idx}
                className="p-7 rounded-2xl glass-panel border border-cyan-500/20 shadow-glass space-y-3"
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/80 border border-cyan-400/40 text-cyan-300">
                  {edu.period}
                </span>
                <h4 className="text-lg font-bold text-white">
                  {edu.degree}
                </h4>
                <p className="text-sm font-semibold text-purple-400">
                  {edu.institution}
                </p>
                <div className="inline-block px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                  {edu.grade}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                  {edu.highlights}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Industry Certifications */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Verified Industry Certifications</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certs.map((cert) => (
                <div
                  key={cert.title}
                  className="p-5 rounded-2xl glass-card-violet border border-purple-500/20 hover:border-purple-400/50 hover:shadow-glow-violet transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-purple-300 bg-purple-950/70 px-2 py-0.5 rounded border border-purple-500/30">
                        {cert.badgeCode}
                      </span>
                      <span className="text-xs text-slate-400">{cert.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-slate-300 font-medium">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-purple-900/40 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </span>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Show Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
