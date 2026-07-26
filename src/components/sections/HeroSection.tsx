import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  FileDown,
  Mail,
  Github,
  Linkedin,
  ArrowRight,
  Sparkles,
  Bot,
  Terminal,
  ChevronDown
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Brain3D } from '../3d/Brain3D';
import { useSound } from '../ui/SoundManager';

interface HeroSectionProps {
  onOpenAIAssistant: () => void;
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAIAssistant, onOpenResume }) => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { playClick } = useSound();

  const currentTagline = PERSONAL_INFO.taglines[taglineIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentTagline.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentTagline.slice(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText.length === currentTagline.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentTagline.slice(0, displayedText.length - 1));
      }, 40);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % PERSONAL_INFO.taglines.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTagline]);

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center items-center px-4 lg:px-8 overflow-hidden z-10">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/15 to-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Bio */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for AI & Full Stack Opportunities</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]"
          >
            Hi, I'm{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
              Akshay Jain
            </span>
          </motion.h1>

          {/* Typing Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 sm:h-12 flex items-center text-xl sm:text-2xl md:text-3xl font-mono text-cyan-400 mb-6 font-semibold"
          >
            <Terminal className="w-6 h-6 mr-3 text-purple-400 shrink-0" />
            <span>{displayedText}</span>
            <span className="w-2 h-7 bg-cyan-400 ml-1 animate-pulse" />
          </motion.div>

          {/* Short Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-sans"
          >
            B.Tech Undergrad at{' '}
            <strong className="text-cyan-300 font-semibold">
              Walchand Institute of Technology
            </strong>
            . Building intelligent software solutions across AI/ML models, Spring Boot enterprise backends, and responsive React applications.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
          >
            <a
              href="#projects"
              onClick={playClick}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-black font-extrabold text-sm font-mono tracking-wider uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:scale-105 transition-all cursor-pointer"
            >
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                playClick();
                if (onOpenResume) onOpenResume();
                else window.location.hash = '#contact';
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 text-white font-mono text-sm font-semibold hover:bg-cyan-500/10 transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-cyan-400" />
              <span>View & Download Resume</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onOpenAIAssistant();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 font-mono text-sm hover:border-purple-400 hover:bg-purple-900/40 transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4 text-purple-400 animate-bounce" />
              <span>Ask My AI</span>
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 text-gray-400 font-mono text-xs"
          >
            <span className="text-gray-500">CONNECT:</span>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:text-cyan-400 hover:border-cyan-400 transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:text-cyan-400 hover:border-cyan-400 transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onClick={playClick}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:text-cyan-400 hover:border-cyan-400 transition-all"
              title="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D AI Brain Element */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full h-[420px] relative rounded-3xl bg-black/40 border border-cyan-500/20 backdrop-blur-xl p-4 shadow-2xl shadow-cyan-950/40">
            <Brain3D className="w-full h-full" />
          </div>

          {/* Floating Metric Badges */}
          <div className="absolute -bottom-6 left-4 right-4 flex items-center justify-around bg-black/80 border border-white/10 rounded-2xl p-3 backdrop-blur-2xl text-xs font-mono">
            <div className="text-center">
              <span className="block font-bold text-cyan-400 text-sm">24+</span>
              <span className="text-[10px] text-gray-400">REPOS</span>
            </div>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="text-center">
              <span className="block font-bold text-purple-400 text-sm">5+</span>
              <span className="text-[10px] text-gray-400">AI APPS</span>
            </div>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="text-center">
              <span className="block font-bold text-emerald-400 text-sm">100%</span>
              <span className="text-[10px] text-gray-400">COMMITMENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        onClick={playClick}
        className="mt-16 flex flex-col items-center gap-1 text-gray-500 hover:text-cyan-400 text-xs font-mono transition-colors cursor-pointer"
      >
        <span>DISCOVER MORE</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
