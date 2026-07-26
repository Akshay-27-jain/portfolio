import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, CheckCircle, MapPin, Calendar, Star, FileText } from 'lucide-react';
import { EDUCATION } from '../../data/portfolioData';
import { useSound } from '../ui/SoundManager';

interface EducationSectionProps {
  onOpenResume?: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ onOpenResume }) => {
  const { playClick } = useSound();

  return (
    <section id="education" className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Academic Excellence</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Walchand Institute of Technology <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Bachelor of Technology (B.Tech)
          </span>
        </h2>
      </div>

      <div className="bg-[#08080d] border border-cyan-500/30 rounded-3xl p-8 md:p-10 shadow-2xl shadow-cyan-950/30 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-white/10 mb-8 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                {EDUCATION.status}
              </span>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                CGPA: {EDUCATION.cgpa || '9.07 / 10.0'}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white font-sans">
              {EDUCATION.degree}
            </h3>
            <p className="text-base text-cyan-400 font-mono mt-1 font-semibold">
              {EDUCATION.institution}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>{EDUCATION.location}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{EDUCATION.period}</span>
            </div>

            {onOpenResume && (
              <button
                onClick={() => {
                  playClick();
                  onOpenResume();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs font-mono hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:scale-105 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </button>
            )}
          </div>
        </div>

        {/* Focus Areas Grid */}
        <div className="mb-8 relative z-10">
          <h4 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Core Specialization & Focus Areas
          </h4>

          <div className="flex flex-wrap gap-2.5">
            {EDUCATION.focusAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-xs font-mono text-gray-200 transition-all"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Academic Highlights */}
        <div className="relative z-10">
          <h4 className="text-sm font-bold font-mono text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Academic Achievements & Rigor
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            {EDUCATION.highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all text-xs text-gray-300 font-sans"
              >
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
