import React, { useState } from 'react';
import { ParticleBackground } from './components/3d/ParticleBackground';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { SoundProvider } from './components/ui/SoundManager';
import { Navbar } from './components/ui/Navbar';
import { CommandPalette } from './components/ui/CommandPalette';
import { AIAssistantModal } from './components/ui/AIAssistantModal';
import { ResumeModal } from './components/ui/ResumeModal';

import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { EducationSection } from './components/sections/EducationSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { CodingProfilesSection } from './components/sections/CodingProfilesSection';
import { BlogSection } from './components/sections/BlogSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

export function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#0d0f14] text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden font-sans">

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Subtle particle background */}
      <ParticleBackground />

      {/* Navbar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Hero */}
      <HeroSection
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* About */}
      <AboutSection />

      {/* Education */}
      <EducationSection onOpenResume={() => setResumeModalOpen(true)} />

      {/* Skills */}
      <SkillsSection />

      {/* Projects */}
      <ProjectsSection onSelectArchitecture={() => {}} />

      {/* Experience */}
      <ExperienceSection />

      {/* Achievements */}
      <AchievementsSection />

      {/* Certifications */}
      <CertificationsSection />

      {/* Coding Profiles & GitHub */}
      <CodingProfilesSection />

      {/* Blog */}
      <BlogSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      <AIAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <AppContent />
    </SoundProvider>
  );
}
