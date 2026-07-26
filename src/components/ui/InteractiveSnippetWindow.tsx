import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Copy, Check, Terminal, Sparkles, FileCode } from 'lucide-react';
import { CODE_SNIPPETS } from '../../data/portfolioData';
import { useSound } from './SoundManager';

export const InteractiveSnippetWindow: React.FC = () => {
  const [selectedId, setSelectedId] = useState('snip-java');
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);
  const { playClick, playSuccess } = useSound();

  const currentSnippet = CODE_SNIPPETS.find((s) => s.id === selectedId) || CODE_SNIPPETS[0];

  const handleRun = () => {
    playClick();
    setIsRunning(true);
    setShowOutput(false);

    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
      playSuccess();
    }, 600);
  };

  const handleCopy = () => {
    playClick();
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="code-snippets" className="w-full bg-[#0a0a0f] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/40 font-mono">
      {/* Top Header Bar */}
      <div className="px-6 py-4 border-b border-white/10 bg-black/60 flex flex-wrap items-center justify-between gap-4">
        {/* Traffic Lights + File Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs text-gray-400 font-bold tracking-wider flex items-center gap-1.5 pl-2 border-l border-white/10">
            <FileCode className="w-4 h-4 text-cyan-400" />
            {currentSnippet.filename}
          </span>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CODE_SNIPPETS.map((snip) => (
            <button
              key={snip.id}
              onClick={() => {
                playClick();
                setSelectedId(snip.id);
                setShowOutput(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                selectedId === snip.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {snip.language}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-400 transition-all cursor-pointer"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>{isRunning ? 'EXECUTING...' : 'RUN CODE'}</span>
          </button>
        </div>
      </div>

      {/* Description Banner */}
      <div className="px-6 py-2.5 bg-cyan-950/20 border-b border-cyan-900/30 text-xs text-cyan-300/90 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>{currentSnippet.description}</span>
      </div>

      {/* Code Display Area */}
      <div className="p-6 overflow-x-auto text-xs md:text-sm text-gray-200 leading-relaxed bg-[#060609]">
        <pre className="font-mono">
          <code>{currentSnippet.code}</code>
        </pre>
      </div>

      {/* Simulated Terminal Output */}
      <AnimatePresence>
        {(showOutput || isRunning) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-cyan-500/30 bg-black p-5 text-xs text-emerald-400 font-mono"
          >
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10 text-gray-400 text-[11px]">
              <span className="flex items-center gap-1.5 font-bold text-cyan-400">
                <Terminal className="w-3.5 h-3.5" />
                EXECUTION OUTPUT LOGS
              </span>
              <span>Status: {isRunning ? 'COMPILING' : 'SUCCESS (0 errors)'}</span>
            </div>

            {isRunning ? (
              <div className="py-4 text-cyan-400 animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Initializing runtime environment and executing bytecode...
              </div>
            ) : (
              <pre className="whitespace-pre-wrap text-emerald-400/90 leading-relaxed">
                {currentSnippet.simulatedOutput}
              </pre>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
