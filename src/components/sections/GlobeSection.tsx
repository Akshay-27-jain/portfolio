import React from 'react';
import { Globe } from 'lucide-react';
import { InteractiveGlobe } from '../3d/InteractiveGlobe';

export const GlobeSection: React.FC = () => {
  return (
    <section className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>3D Interactive Network</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Global Deployment & <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Project Architecture Mesh
          </span>
        </h2>
      </div>

      <div className="p-6 md:p-8 rounded-3xl bg-[#08080d] border border-cyan-500/30 backdrop-blur-2xl shadow-2xl">
        <InteractiveGlobe className="w-full min-h-[400px]" />
      </div>
    </section>
  );
};
