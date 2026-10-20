import React, { useState, useRef } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

export default function ProjectCard({ project, onHoverProject }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 3D Card Tilt & Cursor Spotlight Calculation
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation 6 degrees for smooth subtle feel
    const rX = ((y - centerY) / centerY) * -6;
    const rY = ((x - centerX) / centerX) * 6;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (typeof onHoverProject === 'function') onHoverProject(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    if (typeof onHoverProject === 'function') onHoverProject(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'}`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className="relative rounded-2xl p-6 sm:p-7 glass-panel border border-cyan-500/20 shadow-glass hover:border-cyan-400/50 hover:shadow-glow-mixed transition-all flex flex-col justify-between overflow-hidden group"
    >
      {/* Ambient gradient card background glow */}
      <div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Dynamic Cursor Spotlight Sheen */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.09), transparent 70%)`,
          }}
        />
      )}

      {/* Top Meta: Category & Featured Tag */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-mono font-semibold text-blue-300 uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-500/30">
          {project.category}
        </span>
        {project.featured && (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{project.previewBadge || "Key Project"}</span>
          </span>
        )}
      </div>

      {/* Project Title & Subtitle */}
      <div className="relative z-10 mb-3.5">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1 leading-relaxed">
          {project.subtitle}
        </p>
      </div>

      {/* Problem -> Solution -> Result Breakdown */}
      <div className="relative z-10 space-y-3 my-2 text-xs sm:text-sm bg-slate-900/70 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
        <div>
          <span className="font-semibold text-amber-400 flex items-center gap-1.5 mb-0.5 text-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            Project Challenge:
          </span>
          <p className="text-slate-300 leading-relaxed pl-5">
            {project.problem}
          </p>
        </div>

        <div>
          <span className="font-semibold text-blue-400 flex items-center gap-1.5 mb-0.5 text-xs">
            <Lightbulb className="w-3.5 h-3.5" />
            Technical Solution:
          </span>
          <p className="text-slate-300 leading-relaxed pl-5">
            {project.solution}
          </p>
        </div>

        <div>
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-0.5 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Impact & Results:
          </span>
          <p className="text-emerald-300 font-medium leading-relaxed pl-5">
            {project.result}
          </p>
        </div>
      </div>

      {/* Tech Stack Tags */}
      <div className="relative z-10 mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 border border-slate-700/80 text-slate-300 font-mono hover:border-slate-500 hover:text-white transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

    </div>
  );
}
