import React from 'react';
import { Award, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS } from '../../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  return (
    <section className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>Verified Credentials</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Certifications & <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Professional Validation
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            className="p-6 rounded-3xl bg-[#08080d] border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                  {cert.issuer}
                </span>
                <span className="text-xs font-mono text-gray-400">{cert.date}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 font-sans">{cert.title}</h3>
              <p className="text-xs font-mono text-gray-400 mb-4">Credential ID: {cert.credentialId}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                VERIFIED CREDENTIAL
              </span>

              <a
                href={cert.verifyUrl}
                className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:underline"
              >
                <span>Verify</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
