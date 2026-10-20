import React, { useState, useEffect } from 'react';
import { useVoiceWelcome } from './hooks/useVoiceWelcome';
import Navbar from './components/layout/Navbar';
import HeroCanvas from './components/3d/HeroCanvas';
import HeroOverlay from './components/hero/HeroOverlay';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import AchievementsSection from './components/sections/AchievementsSection';
import EducationSection from './components/sections/EducationSection';
import ResumeSection from './components/sections/ResumeSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import RecruiterQuickViewModal from './components/recruiter/RecruiterQuickViewModal';

export default function App() {
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isCloseup, setIsCloseup] = useState(false);

  const {
    isMuted,
    isSpeaking,
    audioAmplitudeRef,
    captionText,
    currentTopic,
    waveTrigger,
    speakTopic,
    replayCurrentTopic,
    triggerWave,
    toggleMute,
    topicsList,
  } = useVoiceWelcome();

  // Track page scroll percentage to drive 3D camera position
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = window.scrollY / totalHeight;
        setScrollProgress(Math.min(1, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-cyber-bg text-cyber-text overflow-x-hidden selection:bg-cyber-cyan selection:text-black">

      {/* 1. Sticky Navbar with Audio Controls & Recruiter Quick View CTA */}
      <Navbar
        onOpenRecruiterModal={() => setIsRecruiterModalOpen(true)}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* 2. Hero Section with Direct 3D Canvas & Interactive Overlay */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">

        {/* Full-bleed 3D Canvas (Directly Present without any button clicks) */}
        <div className="absolute inset-0 z-0">
          <HeroCanvas
            scrollProgress={scrollProgress}
            isSpeaking={isSpeaking}
            audioAmplitudeRef={audioAmplitudeRef}
            isHoveringProject={isHoveringProject}
            waveTrigger={waveTrigger}
            isCloseup={isCloseup}
          />
        </div>

        {/* Ambient Dark Gradient vignette for high text contrast */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-cyber-bg/95 via-cyber-bg/70 to-transparent pointer-events-none sm:w-2/3 lg:w-7/12" />
        <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] bg-gradient-to-t from-cyber-bg to-transparent pointer-events-none" />

        {/* Hero Interactive UI Overlay */}
        <HeroOverlay
          isSpeaking={isSpeaking}
          captionText={captionText}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onReplayGreeting={replayCurrentTopic}
          onOpenRecruiterModal={() => setIsRecruiterModalOpen(true)}
          topicsList={topicsList}
          currentTopic={currentTopic}
          onSelectTopic={(topicId) => speakTopic(topicId, true)}
          onTriggerWave={triggerWave}
          isCloseup={isCloseup}
          onToggleCloseup={() => setIsCloseup(prev => !prev)}
        />
      </section>

      {/* 3. Page Sections (Structured Professional Placement Flow) */}
      <main className="relative z-10 space-y-4">
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection onHoverProject={setIsHoveringProject} />
        <AchievementsSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Sticky Recruiter Quick View Modal */}
      <RecruiterQuickViewModal
        isOpen={isRecruiterModalOpen}
        onClose={() => setIsRecruiterModalOpen(false)}
      />

      {/* Sticky Floating Recruiter Quick View Pill (Always accessible on scroll) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsRecruiterModalOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 border border-blue-400/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-white/20"
          aria-label="Open Recruiter Executive Brief"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span>Recruiter Executive Brief</span>
        </button>
      </div>

    </div>
  );
}
