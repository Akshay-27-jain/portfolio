import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>Recommendations</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Testimonials & <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Peer Endorsements
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-[#08080d] border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-xs md:text-sm text-gray-300 italic leading-relaxed mb-6 font-sans">
                "{t.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover border border-cyan-400/40"
              />
              <div>
                <h4 className="text-sm font-bold text-white font-mono">{t.name}</h4>
                <p className="text-[11px] text-cyan-400 font-mono">{t.role}</p>
                <p className="text-[10px] text-gray-500 font-mono">{t.organization}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
