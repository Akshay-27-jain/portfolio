import React from 'react';
import { motion } from 'motion/react';
import { User, Sparkles, Code, Cpu, GraduationCap, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
          <User className="w-3.5 h-3.5 text-purple-400" />
          <span>About My Journey</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Architecting Intelligent <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Scalable Software Solutions
          </span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Main Content Card */}
        <div className="lg:col-span-8 bg-[#08080e]/90 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-cyan-950/20 flex flex-col justify-between">
          <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-sans">
            {PERSONAL_INFO.aboutTextExtended.map((paragraph, index) => (
              <p key={index} className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span>{paragraph}</span>
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 grid sm:grid-cols-3 gap-4 text-xs font-mono text-gray-400">
            <div>
              <span className="text-cyan-400 font-bold block mb-0.5">INSTITUTION</span>
              <span>Walchand Institute of Technology</span>
            </div>
            <div>
              <span className="text-purple-400 font-bold block mb-0.5">DEGREE</span>
              <span>B.Tech Undergrad</span>
            </div>
            <div>
              <span className="text-emerald-400 font-bold block mb-0.5">LOCATION</span>
              <span>Solapur, Maharashtra, India</span>
            </div>
          </div>
        </div>

        {/* Core Pillars / Side Highlights */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-black to-black border border-cyan-500/30 shadow-xl">
            <Cpu className="w-8 h-8 text-cyan-400 mb-3" />
            <h3 className="text-base font-bold text-white mb-2 font-mono">AI-Accelerated Workflow</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Utilizing Google AI Studio, Copilot, and Gemini API to write clean, refactored, production-ready code with high speed.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 via-black to-black border border-purple-500/30 shadow-xl">
            <Code className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-base font-bold text-white mb-2 font-mono">Full Stack & Java Expertise</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Building robust Spring Boot backends, JDBC transaction runners, PostgreSQL databases, and responsive React interfaces.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/40 via-black to-black border border-blue-500/30 shadow-xl">
            <GraduationCap className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-base font-bold text-white mb-2 font-mono">Walchand Institute Rigor</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Grounding practical applications with deep computer science fundamentals in Data Structures, DBMS, Operating Systems & Networks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
