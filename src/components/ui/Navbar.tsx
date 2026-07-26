import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Command,
  Volume2,
  VolumeX,
  FileDown,
  Menu,
  X,
  Sparkles,
  Code2
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
  const { isMuted, toggleMute, playClick } = useSound();

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Code Live', href: '#code-snippets' },
    { name: 'Experience', href: '#experience' },
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
        className="h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className={`px-4 lg:px-8 py-3.5 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-cyan-950/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={playClick}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
                AJ
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-wider text-white font-mono group-hover:text-cyan-400 transition-colors">
                AKSHAY JAIN
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80 tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI ENGINEER
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-6 text-xs font-mono font-medium text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={playClick}
                className="hover:text-cyan-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions Right */}
          <div className="flex items-center gap-2.5">
            {/* Ask AI Assistant Button */}
            <button
              onClick={() => {
                playClick();
                onOpenAIAssistant();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              <span className="hidden sm:inline">Ask</span>
              <span className="font-bold text-white">AI</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                playClick();
                onOpenCommandPalette();
              }}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-mono hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              title="Command Palette (Cmd+K)"
            >
              <Command className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[10px] bg-black/50 px-1.5 py-0.5 rounded border border-white/10 text-gray-400">
                ⌘K
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-400 hover:bg-white/10 transition-all cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-gray-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              )}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                playClick();
                if (onOpenResume) onOpenResume();
                else window.location.hash = '#education';
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-300 text-xs font-mono hover:bg-cyan-500/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-400 text-black font-bold font-sans">9.07</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden border-t border-white/10 mt-3 pt-4 pb-2 bg-black/95 rounded-2xl px-4 backdrop-blur-2xl"
            >
              <div className="flex flex-col gap-3 font-mono text-sm text-gray-300">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      playClick();
                      setMobileMenuOpen(false);
                    }}
                    className="hover:text-cyan-400 transition-colors py-1 flex items-center justify-between border-b border-white/5"
                  >
                    <span>{link.name}</span>
                    <Sparkles className="w-3 h-3 text-cyan-500/50" />
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
