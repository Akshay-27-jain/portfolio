import React, { useState } from 'react';
import { Terminal as TermIcon, Play, RefreshCw, X } from 'lucide-react';
import { useSound } from './SoundManager';

export const InteractiveTerminal: React.FC = () => {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'whoami',
      output: 'Akshay Jain — B.Tech Undergrad at Walchand Institute of Technology | AI Engineer & Full Stack Developer'
    },
    {
      cmd: 'help',
      output: 'Available commands:\n- whoami\n- skills\n- projects\n- education\n- sudo hire\n- contact\n- matrix\n- clear'
    }
  ]);
  const [input, setInput] = useState('');
  const { playClick, playSuccess } = useSound();

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playClick();
    const cleanCmd = input.trim().toLowerCase();
    let responseOutput = '';

    switch (cleanCmd) {
      case 'whoami':
        responseOutput = 'Akshay Jain — AI Engineer & Full Stack Developer | Walchand Institute of Technology B.Tech candidate.';
        break;
      case 'skills':
        responseOutput = 'Java, Spring Boot, React, Node.js, Python, PostgreSQL, Scikit-Learn, YOLO, OpenCV, Docker, REST APIs, Gemini API.';
        break;
      case 'projects':
        responseOutput = '1. AI Warehouse Optimization System (React, Python, XGBoost)\n2. AI SaaS Customer Support Platform (React, Node, Gemini API)\n3. Edge-Optimized Computer Vision Monitor (Python, YOLO, TFLite)\n4. Hospital Management System (Java, JDBC, MySQL)\n5. Arise Edu (React, Node, PostgreSQL)';
        break;
      case 'education':
        responseOutput = 'Bachelor of Technology (B.Tech) at Walchand Institute of Technology.\nFocus: AI, Machine Learning, Data Structures, Database Systems.';
        break;
      case 'sudo hire':
        playSuccess();
        responseOutput = '🎉 ACCESS GRANTED! Email sent notification triggered to jainakshay0804@gmail.com. Looking forward to discussing software opportunities!';
        break;
      case 'contact':
        responseOutput = 'Email: jainakshay0804@gmail.com\nGitHub: github.com\nLinkedIn: linkedin.com\nLocation: Solapur, Maharashtra';
        break;
      case 'matrix':
        responseOutput = '01000001 01001011 01010011 01001000 01000001 01011001 (AKSHAY) — Entering Cyber Matrix Mode...';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'help':
      default:
        responseOutput = 'Available commands: whoami, skills, projects, education, sudo hire, contact, matrix, clear';
        break;
    }

    setHistory((prev) => [...prev, { cmd: input, output: responseOutput }]);
    setInput('');
  };

  return (
    <div id="terminal" className="w-full bg-[#050508] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/50 font-mono">
      {/* Title bar */}
      <div className="px-6 py-3.5 bg-black/80 border-b border-white/10 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2 font-bold text-cyan-400">
          <TermIcon className="w-4 h-4" />
          <span>akshay@cyber-terminal:~$</span>
        </div>
        <span className="text-[10px] text-gray-500">BASH v5.2</span>
      </div>

      {/* Terminal Content */}
      <div className="p-6 h-[280px] overflow-y-auto space-y-4 text-xs md:text-sm text-gray-300">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <span>akshay@portfolio:~$</span>
              <span className="text-white">{item.cmd}</span>
            </div>
            <pre className="whitespace-pre-wrap text-emerald-400/90 pl-4 border-l-2 border-emerald-500/40 font-mono">
              {item.output}
            </pre>
          </div>
        ))}

        {/* Live Prompt Input */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
          <span className="text-cyan-400 font-bold">akshay@portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help', 'whoami', 'skills' or 'sudo hire'..."
            className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs md:text-sm placeholder-gray-600"
          />
        </form>
      </div>
    </div>
  );
};
