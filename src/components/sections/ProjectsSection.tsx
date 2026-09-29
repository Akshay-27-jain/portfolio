import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  ExternalLink,
  Layers,
  ArrowUpRight,
  Code2,
  Star,
  GitFork
} from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { useSound } from '../ui/SoundManager';

interface ProjectsSectionProps {
  onSelectArchitecture: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectArchitecture }) => {
  const [filter, setFilter] = useState<string>('All');
  const { playClick } = useSound();

  const categories = ['All', 'Full Stack', 'Java Backend'];

  const filteredProjects =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="section-label mx-auto">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>Featured Projects</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          Projects That{' '}
          <span className="gradient-text">Ship Real Value</span>
        </h2>
        <p className="text-slate-400 text-base">
          Production-grade software built with Java, Spring Boot, React, and Next.js.
          Every project is on <span className="text-indigo-300 font-semibold">GitHub</span> — explore the real code.
        </p>
      </motion.div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { playClick(); setFilter(cat); }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              filter === cat
                ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/8'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => (
            <motion.article
              key={proj.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="glass-card-interactive flex flex-col overflow-hidden"
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden bg-[#111827]">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/30 to-transparent" />

                {/* Category badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  {proj.category}
                </span>

                {/* GitHub link on hover */}
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 hover:border-indigo-400/50 text-white hover:text-indigo-300 transition-all opacity-0 group-hover:opacity-100"
                  title="View Source on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-1 leading-tight">{proj.title}</h3>
                <p className="text-xs font-mono text-violet-400 mb-3">{proj.subtitle}</p>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                  {proj.description}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.technologies.slice(0, 5).map((t, i) => (
                    <span key={i} className="skill-tag">
                      {t}
                    </span>
                  ))}
                  {proj.technologies.length > 5 && (
                    <span className="skill-tag text-slate-500">+{proj.technologies.length - 5}</span>
                  )}
                </div>

                {/* Key features (2 max) */}
                <ul className="space-y-1 mb-5">
                  {proj.keyFeatures.slice(0, 2).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-indigo-400 mt-0.5 shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/6">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400/50 hover:bg-indigo-500/10 text-slate-300 hover:text-indigo-300 text-xs font-mono font-semibold transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                  {proj.demoUrl && proj.demoUrl !== proj.githubUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playClick}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-xs hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all cursor-pointer"
                    >
                      <span>Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* GitHub CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="mt-12 text-center"
      >
        <a
          href="https://github.com/Akshay-27-jain"
          target="_blank"
          rel="noreferrer"
          onClick={playClick}
          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-[#111827] border border-indigo-500/20 hover:border-indigo-400/50 hover:bg-indigo-950/30 text-slate-300 hover:text-white font-mono text-sm transition-all shadow-lg"
        >
          <Github className="w-5 h-5 text-indigo-400" />
          <span>See all repositories on GitHub</span>
          <ExternalLink className="w-4 h-4 text-slate-500" />
        </a>
      </motion.div>
    </section>
  );
};
