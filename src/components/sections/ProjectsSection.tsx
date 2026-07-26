import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Cpu,
  ExternalLink,
  Github,
  Zap,
  CheckCircle,
  ArrowRight,
  Database,
  Sparkles
} from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { useSound } from '../ui/SoundManager';

interface ProjectsSectionProps {
  onSelectArchitecture: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectArchitecture,
}) => {
  const [filter, setFilter] = useState<string>('All');
  const { playClick } = useSound();

  const categories = ['All', 'AI/ML', 'Full Stack', 'Edge CV', 'Java Backend'];

  const filteredProjects =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Featured Engineering</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Innovative Projects & <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Real-World Software Systems
          </span>
        </h2>
      </motion.div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playClick();
              setFilter(cat);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filter === cat
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Cards Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="group bg-[#08080e] border border-cyan-500/20 hover:border-cyan-400/60 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/20 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Cover Image Banner */}
                <div className="relative h-60 overflow-hidden bg-gray-900">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080e] via-black/40 to-transparent" />

                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-bold uppercase">
                    {proj.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 font-sans group-hover:text-cyan-300 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-400 mb-4">{proj.subtitle}</p>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans mb-6">
                    {proj.description}
                  </p>

                  {/* Key Tech Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 mt-auto">
                <button
                  onClick={() => {
                    playClick();
                    onSelectArchitecture(proj);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs font-mono hover:bg-cyan-500/20 transition-all cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Architecture & Specs</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={proj.demoUrl}
                    onClick={playClick}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs font-mono hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
                  >
                    <span>Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
