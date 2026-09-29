import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  FileDown,
  Mail,
  Github,
  Linkedin,
  ArrowRight,
  MapPin,
  GraduationCap,
  ChevronDown,
  Star,
  Briefcase
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
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
      timer = setTimeout(() => setDisplayedText(currentTagline.slice(0, displayedText.length + 1)), 65);
    } else if (!isDeleting && displayedText.length === currentTagline.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => setDisplayedText(currentTagline.slice(0, displayedText.length - 1)), 35);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % PERSONAL_INFO.taglines.length);
    }
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTagline]);

  return (
    <section className="relative min-h-screen pt-24 pb-20 flex flex-col justify-center items-center px-4 lg:px-8 overflow-hidden z-10 particle-bg">

      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: Text Content ── */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1">

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="amber-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Available for Java Full Stack &amp; Software Engineering Roles
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white mb-3 leading-[1.08]"
          >
            Hi, I'm{' '}
            <span className="gradient-text">Akshay Jain</span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 flex items-center text-lg sm:text-xl font-mono text-indigo-300 mb-6"
          >
            <span className="text-violet-400 mr-2">▷</span>
            <span>{displayedText}</span>
            <span className="w-[2px] h-6 bg-indigo-400 ml-1 animate-pulse" />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-6"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* Quick info pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <span className="indigo-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              WIT Solapur · 9.07 CGPA
            </span>
            <span className="indigo-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono">
              <Briefcase className="w-3.5 h-3.5 text-violet-400" />
              Infosys Springboard Intern
            </span>
            <span className="indigo-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Solapur, Maharashtra
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <a
              href="#projects"
              onClick={playClick}
              className="btn-primary"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => { playClick(); if (onOpenResume) onOpenResume(); }}
              className="btn-outline"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume</span>
            </button>

            <a
              href="#contact"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-sm hover:bg-amber-500/20 hover:border-amber-400/50 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-center gap-3"
          >
            <span className="text-slate-500 text-xs font-mono uppercase tracking-widest">Links:</span>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-400/50 hover:bg-indigo-500/10 text-slate-300 hover:text-indigo-300 transition-all text-xs font-mono"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-400/50 hover:bg-indigo-500/10 text-slate-300 hover:text-indigo-300 transition-all text-xs font-mono"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onClick={playClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-amber-500/10 text-slate-300 hover:text-amber-300 transition-all text-xs font-mono"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </motion.div>
        </div>

        {/* ── Right: Profile Photo ── */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-amber-500/10 blur-2xl scale-110 pointer-events-none" />

            {/* Photo frame */}
            <div className="relative w-[300px] sm:w-[360px] lg:w-[400px] rounded-3xl overflow-hidden border border-indigo-500/25 shadow-2xl shadow-indigo-900/30 bg-[#111827]">
              <img
                src="/assets/akshay-profile.jpg"
                alt="Akshay Jain — Java Full Stack Developer"
                className="w-full object-cover object-top"
                style={{ aspectRatio: '4/5' }}
              />

              {/* Bottom overlay gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/60 to-transparent" />

              {/* Name card overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-bold text-lg leading-tight">Akshay Jain</p>
                <p className="text-indigo-300 text-xs font-mono">Java Full Stack Developer</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  OPEN TO WORK
                </div>
              </div>
            </div>

            {/* Floating CGPA badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -right-5 top-10 glass-card p-3 shadow-xl min-w-[80px] text-center"
            >
              <p className="text-2xl font-black text-indigo-400">9.07</p>
              <p className="text-[10px] text-slate-400 font-mono">CGPA</p>
            </motion.div>

            {/* Floating projects badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute -left-5 top-1/2 glass-card p-3 shadow-xl min-w-[90px] text-center"
            >
              <p className="text-2xl font-black text-violet-400">6+</p>
              <p className="text-[10px] text-slate-400 font-mono">Projects</p>
            </motion.div>

            {/* Floating star / certified badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 glass-card px-3 py-2 shadow-xl flex items-center gap-2"
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-mono leading-none">HackerRank</p>
                <p className="text-[11px] text-amber-300 font-bold font-mono leading-tight">Java Certified</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        onClick={playClick}
        className="mt-16 flex flex-col items-center gap-1.5 text-slate-500 hover:text-indigo-400 text-xs font-mono transition-colors cursor-pointer"
      >
        <span className="tracking-widest uppercase">Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
