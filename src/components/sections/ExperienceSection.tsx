import React from 'react';
import { Briefcase, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
          <Briefcase className="w-3.5 h-3.5 text-purple-400" />
          <span>Practical Engineering</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Practical Experience & <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Development Highlights
          </span>
        </h2>
      </div>

      <div className="space-y-8">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-[#08080d] border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl shadow-2xl transition-all"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono mb-2 inline-block">
                  {exp.type}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white font-sans">{exp.role}</h3>
                <p className="text-sm font-mono text-cyan-400 mt-1">{exp.organization}</p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{exp.period}</span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans mb-6">
              {exp.description}
            </p>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-mono text-cyan-400 font-bold block mb-2">Key Accomplishments:</span>
              <div className="grid md:grid-cols-2 gap-3">
                {exp.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {exp.technologies.map((tech, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-purple-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
