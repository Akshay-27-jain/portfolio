import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  FileDown,
  MapPin,
  Github,
  Linkedin,
  Heart,
  CheckCircle,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useSound } from '../ui/SoundManager';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [applauseCount, setApplauseCount] = useState(382);
  const [clapped, setClapped] = useState(false);
  const { playClick, playSuccess } = useSound();

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        if (data.applause) setApplauseCount(data.applause);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    playSuccess();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleApplause = () => {
    playSuccess();
    setApplauseCount((prev) => prev + 1);
    setClapped(true);
    fetch('/api/applause', { method: 'POST' }).catch(() => {});
    setTimeout(() => setClapped(false), 800);
  };

  return (
    <section id="contact" className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Exceptional Together
          </span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact & Applause */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-[#08080d] border border-cyan-500/20 backdrop-blur-xl shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Contact Information
            </h3>

            <div className="space-y-4 text-xs md:text-sm font-mono text-gray-300">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all text-cyan-300"
              >
                <Mail className="w-5 h-5 text-cyan-400" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 text-gray-300">
                <MapPin className="w-5 h-5 text-purple-400 shrink-0" />
                <span>Walchand Institute of Technology, Solapur, India</span>
              </div>
            </div>

            {/* Resume Download & Socials */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Interview%20/%20Opportunity%20Inquiry`}
                onClick={playClick}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs font-mono uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Get Resume</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 text-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Interactive Applause Button */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">Show Support for Portfolio:</span>
              <button
                onClick={handleApplause}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                  clapped
                    ? 'bg-rose-500/30 border-rose-400 text-rose-300 scale-110'
                    : 'bg-white/5 border-white/10 hover:border-rose-400/50 text-gray-300'
                }`}
              >
                <Heart className={`w-4 h-4 ${clapped ? 'fill-rose-400 text-rose-400 animate-ping' : 'text-rose-400'}`} />
                <span>{applauseCount} Applause</span>
              </button>
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="p-6 rounded-3xl bg-[#08080d] border border-cyan-500/20 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-cyan-400 font-bold uppercase">
              <MapPin className="w-4 h-4" />
              <span>Walchand Institute Location Radar</span>
            </div>
            <div className="h-32 rounded-2xl bg-gradient-to-tr from-cyan-950/40 via-black to-purple-950/40 border border-white/10 flex items-center justify-center p-4 text-center">
              <p className="text-xs font-mono text-gray-300 leading-relaxed">
                📍 Solapur, Maharashtra, India <br />
                <span className="text-[10px] text-cyan-400">Lat: 17.6599° N, Lon: 75.9064° E</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-[#08080d] border border-cyan-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <h3 className="text-xl font-bold text-white font-mono mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            Send a Direct Message
          </h3>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-3"
            >
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-white font-mono">Message Sent Successfully!</h4>
              <p className="text-xs text-gray-300 font-sans">
                Thank you, {form.name}! Your message has been routed to Akshay Jain's primary inbox. He will reply shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs md:text-sm">
              <div>
                <label className="block text-gray-400 mb-1.5 font-semibold">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 font-mono placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1.5 font-semibold">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. sarah@company.com"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 font-mono placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1.5 font-semibold">Project / Opportunity Details</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Discuss full-stack project roles, AI/ML engineering, or hackathon collaboration..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 font-mono placeholder-gray-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-black font-extrabold text-xs md:text-sm font-mono uppercase tracking-wider hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>SEND DIRECT MESSAGE</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
