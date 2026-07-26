import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Database, CheckCircle, ArrowRight, Layers, ExternalLink, Github, Zap } from 'lucide-react';
import { Project } from '../../types';
import { useSound } from './SoundManager';

interface ProjectArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectArchitectureModal: React.FC<ProjectArchitectureModalProps> = ({
  project,
  onClose,
}) => {
  const { playClick } = useSound();

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-2xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[85vh] bg-[#090a10] border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-y-auto p-6 md:p-8 font-sans text-gray-200"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-white/10 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider">
                  {project.category} Architecture
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm text-cyan-400 font-mono mt-1">{project.subtitle}</p>
            </div>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Grid Layout */}
          <div className="space-y-8">
            {/* Problem vs Solution */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                <h4 className="text-sm font-extrabold font-mono text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Problem Statement
                </h4>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{project.problem}</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                <h4 className="text-sm font-extrabold font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Engineered Solution
                </h4>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30">
              <h4 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                System Flow & Components
              </h4>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gray-900/90 border border-white/10">
                  <span className="text-[10px] text-gray-400 font-mono uppercase block mb-1">Frontend Layer</span>
                  <p className="text-xs font-bold text-white font-mono">{project.architectureDiagram.frontend}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/90 border border-white/10">
                  <span className="text-[10px] text-gray-400 font-mono uppercase block mb-1">Backend Layer</span>
                  <p className="text-xs font-bold text-white font-mono">{project.architectureDiagram.backend}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/90 border border-white/10">
                  <span className="text-[10px] text-gray-400 font-mono uppercase block mb-1">Database Layer</span>
                  <p className="text-xs font-bold text-white font-mono">{project.architectureDiagram.database}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/90 border border-white/10">
                  <span className="text-[10px] text-gray-400 font-mono uppercase block mb-1">AI / Processing Engine</span>
                  <p className="text-xs font-bold text-white font-mono">{project.architectureDiagram.aiEngine}</p>
                </div>
              </div>

              {/* Sequential Execution Steps */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-gray-400 block mb-2 font-bold">Execution Workflow:</span>
                {project.architectureDiagram.flowSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-gray-300 font-mono bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold shrink-0">{idx + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Database Schema Design */}
            {project.databaseDesign && (
              <div className="p-6 rounded-2xl bg-black/60 border border-purple-500/30">
                <h4 className="text-sm font-bold font-mono text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Database Schema & Relational Structure
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.databaseDesign.map((table, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs font-mono text-purple-200">
                      {table}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges & Results */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                <h4 className="text-sm font-bold font-mono text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Technical Challenges Faced
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {project.challenges.map((ch, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                <h4 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Measured Results & Impact
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {project.results.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400">✓</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Badges & Footer Links */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  GitHub Code
                </a>
                <a
                  href={project.demoUrl}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs font-mono hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
