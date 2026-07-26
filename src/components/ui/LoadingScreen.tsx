import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Sparkles, Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [scanText, setScanText] = useState('Initializing AI Core...');

  const steps = [
    'Initializing AI Neural Core...',
    'Loading 3D Three.js Shaders...',
    'Fetching Project Architecture Models...',
    'Calibrating Quantum Particle Field...',
    'System Ready — Welcome to Akshay Jain\'s World'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const stepIndex = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
        setScanText(steps[stepIndex]);
        return Math.min(next, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white select-none px-6"
      >
        {/* Background Radial Glow */}
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Logo / Scanner Frame */}
        <div className="relative mb-8 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border border-dashed border-cyan-400/40 border-t-cyan-400"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-24 h-24 rounded-full border border-purple-500/40 border-b-purple-400"
          />
          
          <div className="absolute flex flex-col items-center justify-center text-cyan-400">
            <Cpu className="w-10 h-10 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-extrabold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-2 font-mono"
        >
          AKSHAY JAIN
        </motion.h1>
        <p className="text-xs font-mono tracking-wider text-gray-400 mb-8 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          AI ENGINEER & FULL STACK DEVELOPER
        </p>

        {/* Progress Bar Container */}
        <div className="w-full max-w-md bg-gray-900/80 border border-gray-800 rounded-full p-1.5 backdrop-blur-md mb-4 relative overflow-hidden shadow-2xl">
          {/* Animated Fill */}
          <motion.div
            className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 shadow-[0_0_15px_rgba(0,240,255,0.6)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
          {/* Scanning light line */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>

        {/* Scanning status info */}
        <div className="w-full max-w-md flex items-center justify-between text-xs font-mono text-gray-400">
          <span className="flex items-center gap-1.5 text-cyan-400/90 truncate">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            {scanText}
          </span>
          <span className="font-bold text-white font-mono">{progress}%</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
