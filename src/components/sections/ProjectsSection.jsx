import React from 'react';
import { FolderGit2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import ProjectCard from '../projects/ProjectCard';

export default function ProjectsSection({ onHoverProject }) {
  const allProjects = portfolioData.projects;

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
            <span>FEATURED PROJECTS & AI SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            AI, Computer Vision & <span className="text-gradient-blue">Intelligent Systems</span>
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Key engineering projects highlighting deep learning image classification in TensorFlow/Keras and computer vision traffic optimization.
          </p>
        </div>

        {/* 3D Tilt Cards Grid (Balanced 2-Column Symmetrical Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {allProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onHoverProject={onHoverProject}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
