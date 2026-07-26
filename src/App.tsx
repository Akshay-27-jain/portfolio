import React, { useState } from 'react';
import { ParticleBackground } from './components/3d/ParticleBackground';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { SoundProvider } from './components/ui/SoundManager';
import { Navbar } from './components/ui/Navbar';
import { CommandPalette } from './components/ui/CommandPalette';
import { AIAssistantModal } from './components/ui/AIAssistantModal';
import { ProjectArchitectureModal } from './components/ui/ProjectArchitectureModal';
import { ResumeModal } from './components/ui/ResumeModal';

import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { EducationSection } from './components/sections/EducationSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { InteractiveSnippetWindow } from './components/ui/InteractiveSnippetWindow';
import { InteractiveTerminal } from './components/ui/InteractiveTerminal';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { CodingProfilesSection } from './components/sections/CodingProfilesSection';
import { BlogSection } from './components/sections/BlogSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { GlobeSection } from './components/sections/GlobeSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

import { Project } from './types';
import { Cpu, Terminal, Layers } from 'lucide-react';

export function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedArchitectureProject, setSelectedArchitectureProject] = useState<Project | null>(null);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#030305] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans">
      {/* 3D Interactive Custom Cursor */}
      <CustomCursor />

      {/* 3D Dynamic Particle Canvas */}
      <ParticleBackground />

      {/* Futuristic Navbar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* About Section */}
      <AboutSection />

      {/* Education Section */}
      <EducationSection
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Skills Section */}
      <SkillsSection />

      {/* Featured Projects Showcase */}
      <ProjectsSection
        onSelectArchitecture={(proj) => setSelectedArchitectureProject(proj)}
      />

      {/* Interactive Code Snippets Runner */}
      <section id="architecture" className="py-20 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Developer Sandbox</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Live Code Runner & <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
              Interactive Terminal CLI
            </span>
          </h2>
        </div>

        <InteractiveSnippetWindow />

        <div className="pt-8">
          <InteractiveTerminal />
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Achievements Section */}
      <AchievementsSection />

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Coding Profiles & GitHub Matrix */}
      <CodingProfilesSection />

      {/* Global 3D Network Globe */}
      <GlobeSection />

      {/* Technical Articles Blog */}
      <BlogSection />

      {/* Peer Testimonials */}
      <TestimonialsSection />

      {/* Contact Section */}
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

      <ProjectArchitectureModal
        project={selectedArchitectureProject}
        onClose={() => setSelectedArchitectureProject(null)}
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
