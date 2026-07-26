import React, { useEffect, useState } from 'react';
import { Terminal, Github, Linkedin, Award, Code2, ExternalLink, GitBranch, Star } from 'lucide-react';
import { CODING_PROFILES } from '../../data/portfolioData';

export const CodingProfilesSection: React.FC = () => {
  const [ghStats, setGhStats] = useState<{
    repos: number;
    contributions: number;
    streak: string;
    commits: Array<{ repo: string; msg: string; time: string }>;
  } | null>(null);

  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((data) => {
        setGhStats({
          repos: data.public_repos || 24,
          contributions: data.contributions_this_year || 742,
          streak: data.streak || "48 days",
          commits: data.recent_commits || []
        });
      })
      .catch(() => {});
  }, []);

  const getProfileIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github': return <Github className="w-5 h-5 text-white" />;
      case 'Linkedin': return <Linkedin className="w-5 h-5 text-blue-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-amber-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-emerald-400" />;
      default: return <Award className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Competitive & Open Source</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Coding Profiles & <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Problem Solving Platforms
          </span>
        </h2>
      </div>

      {/* Profile Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {CODING_PROFILES.map((prof) => (
          <a
            key={prof.name}
            href={prof.url}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-[#08080d] border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl shadow-xl transition-all hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-black border border-white/10 group-hover:border-cyan-400/50">
                  {getProfileIcon(prof.icon)}
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
              </div>

              <h3 className="text-base font-bold text-white font-mono">{prof.name}</h3>
              <p className="text-xs font-mono text-cyan-400 mb-2">@{prof.username}</p>
              <p className="text-xs text-gray-300 font-sans">{prof.stats}</p>
            </div>

            <span className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider block">
              {prof.badge}
            </span>
          </a>
        ))}
      </div>

      {/* GitHub Real-time Activity Heatmap Card */}
      {ghStats && (
        <div className="p-6 md:p-8 rounded-3xl bg-[#08080d] border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <Github className="w-6 h-6 text-white" />
              <div>
                <h3 className="text-lg font-bold text-white font-mono">GitHub Activity Matrix</h3>
                <p className="text-xs text-gray-400 font-mono">Live Commit Tracker & Repositories</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 font-bold">
                {ghStats.contributions} Commits This Year
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400 font-bold">
                Streak: {ghStats.streak}
              </div>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <span className="text-gray-400 font-bold block mb-2">Recent Commits:</span>
            {ghStats.commits.map((c, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-gray-300">
                <div className="flex items-center gap-2 truncate">
                  <GitBranch className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="text-cyan-300 font-bold">{c.repo}:</span>
                  <span className="truncate">{c.msg}</span>
                </div>
                <span className="text-[10px] text-gray-500 shrink-0 ml-2">{c.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
