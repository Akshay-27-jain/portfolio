import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Command,
  FileDown,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useSound } from './SoundManager';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenAIAssistant: () => void;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenAIAssistant,
  onOpenResume,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playClick } = useSound();

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 40);
      setScrollProgress(totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Scroll Progress Bar */}
      <div
        className="h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className={`px-4 lg:px-8 py-3.5 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0d0f14]/85 backdrop-blur-xl border-b border-indigo-500/12 shadow-lg shadow-indigo-950/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <a href="#" onClick={playClick} className="flex items-center gap-2.5 group cursor-pointer">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-[1.5px] shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0d0f14] rounded-[10px] flex items-center justify-center font-mono font-black text-indigo-400 text-sm">
                AJ
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-wider text-white font-mono group-hover:text-indigo-300 transition-colors">
                AKSHAY JAIN
              </span>
              <span className="text-[10px] font-mono text-indigo-400/80 tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                JAVA FULL STACK DEV
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-6 text-xs font-mono font-medium text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={playClick}
                className="hover:text-indigo-300 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-400 hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Ask AI */}
            <button
              onClick={() => { playClick(); onOpenAIAssistant(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mono hover:border-indigo-400/60 hover:bg-indigo-500/20 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline font-semibold">Ask AI</span>
            </button>

            {/* Command Palette */}
            <button
              onClick={() => { playClick(); onOpenCommandPalette(); }}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-mono hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              title="Command Palette (Cmd+K)"
            >
              <Command className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[10px] bg-black/50 px-1.5 py-0.5 rounded border border-white/10 text-slate-400">⌘K</span>
            </button>

            {/* Resume */}
            <button
              onClick={() => { playClick(); if (onOpenResume) onOpenResume(); }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-mono font-bold hover:shadow-[0_0_15px_rgba(99,102,241,0.45)] transition-all cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden border-t border-indigo-500/10 mt-3 pt-4 pb-2 px-4"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => { playClick(); setMobileMenuOpen(false); }}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-indigo-500/10 text-slate-300 hover:text-indigo-300 transition-all text-sm font-mono"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
