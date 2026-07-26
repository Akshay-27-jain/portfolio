import React from 'react';
import { Award, Cpu, Layers, Zap, Sparkles, BookOpen } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-purple-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-yellow-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-cyan-400" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-emerald-400" />;
      default: return <Award className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>Milestones & Impact</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Engineering Highlights & <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Key Achievements
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((ach) => (
          <div
            key={ach.id}
            className="p-6 rounded-3xl bg-[#08080d] border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-black border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                  {getIcon(ach.icon)}
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  {ach.metric}
                </span>
              </div>

              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block mb-1">
                {ach.category}
              </span>
              <h3 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-cyan-300 transition-colors">
                {ach.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-sans mb-4">
                {ach.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
