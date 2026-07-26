import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Atom, Layers, Coffee, Code, Database, Sparkles, Server, Camera, Zap, Box, MessageSquare, Users, CheckSquare, Brain } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { useSound } from '../ui/SoundManager';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(SKILL_CATEGORIES[0].category);
  const { playClick } = useSound();

  const currentCategoryData =
    SKILL_CATEGORIES.find((c) => c.category === activeCategory) || SKILL_CATEGORIES[0];

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-4 h-4 text-amber-400" />;
      case 'Code': case 'FileCode': return <Code className="w-4 h-4 text-cyan-400" />;
      case 'Database': case 'HardDrive': return <Database className="w-4 h-4 text-purple-400" />;
      case 'Atom': return <Atom className="w-4 h-4 text-blue-400" />;
      case 'Server': case 'Cpu': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Brain': return <Brain className="w-4 h-4 text-purple-400" />;
      case 'Activity': return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'Camera': case 'Zap': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'MessageSquare': return <MessageSquare className="w-4 h-4 text-cyan-300" />;
      case 'Users': return <Users className="w-4 h-4 text-emerald-300" />;
      case 'CheckSquare': return <CheckSquare className="w-4 h-4 text-purple-300" />;
      default: return <Layers className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>Technical Capabilities</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Interactive Technical <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Skills & Stack
          </span>
        </h2>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.category}
            onClick={() => {
              playClick();
              setActiveCategory(cat.category);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat.category
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCategoryData.skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-[#08080d] border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-black border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                  {getSkillIcon(skill.iconName)}
                </div>
                <h3 className="text-sm font-bold text-white font-mono">{skill.name}</h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">{skill.level}%</span>
            </div>

            <p className="text-xs text-gray-400 mb-4 leading-relaxed font-sans">{skill.description}</p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-500"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
