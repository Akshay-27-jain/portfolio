import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
  Loader,
  MessageSquare,
  Phone,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useSound } from '../ui/SoundManager';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { playClick, playSuccess } = useSound();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        playSuccess();
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || 'Failed to send. Please email directly.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setErrorMsg('Network error. Please email me directly.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="section-label mx-auto">
          <Mail className="w-3.5 h-3.5 text-indigo-400" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          Let's Work{' '}
          <span className="gradient-text">Together</span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          Open to full-time roles, internships, and freelance opportunities. <br />
          Fill the form below — your message goes directly to my inbox.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8 items-start">

        {/* ── Left: Contact Info ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-4"
        >
          {/* Info card */}
          <div className="glass-card p-7 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              Contact Information
            </h3>

            <div className="space-y-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-start gap-3.5 p-3.5 rounded-xl bg-indigo-500/8 border border-indigo-500/15 hover:border-indigo-400/40 hover:bg-indigo-500/15 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-500/15 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-sm text-indigo-300 font-mono group-hover:text-indigo-200 transition-colors truncate">
                    {PERSONAL_INFO.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/4 border border-white/8">
                <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="text-sm text-slate-300 font-mono">{PERSONAL_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/4 border border-white/8">
                <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-sm text-slate-300 font-mono">{PERSONAL_INFO.location}</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-4 border-t border-white/8">
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-3">Find me on</p>
              <div className="flex gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400/40 hover:bg-indigo-500/10 text-slate-300 hover:text-indigo-300 transition-all text-xs font-mono"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400/40 hover:bg-indigo-500/10 text-slate-300 hover:text-indigo-300 transition-all text-xs font-mono"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={PERSONAL_INFO.hackerrank}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-amber-500/10 text-slate-300 hover:text-amber-300 transition-all text-xs font-mono"
                >
                  <ExternalLink className="w-4 h-4" />
                  HR
                </a>
              </div>
            </div>
          </div>

          {/* Response time card */}
          <div className="glass-card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
              <span className="text-amber-400 text-lg">⚡</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Fast Response</p>
              <p className="text-xs text-slate-400">Typically replies within 24 hours</p>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Contact Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-3 glass-card p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-400" />
            Send a Message
          </h3>

          {/* Success state */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3 mb-4"
            >
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Message Sent! ✓</h4>
              <p className="text-sm text-slate-300">
                Thank you! Your message has been delivered directly to Akshay's inbox. He'll reply soon.
              </p>
            </motion.div>
          )}

          {/* Error state */}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-3 mb-4"
            >
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-300 font-semibold">Could not send message</p>
                <p className="text-xs text-slate-400 mt-0.5">{errorMsg}</p>
              </div>
            </motion.div>
          )}

          {status !== 'success' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 font-mono mb-1.5 uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Sarah Jenkins"
                    className="w-full bg-[#0d0f14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-400/60 focus:bg-indigo-950/20 placeholder-slate-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 font-mono mb-1.5 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full bg-[#0d0f14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-400/60 focus:bg-indigo-950/20 placeholder-slate-600 transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs text-slate-400 font-mono mb-1.5 uppercase tracking-wider">Subject / Role</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Java Backend Developer — Acme Corp"
                  className="w-full bg-[#0d0f14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-400/60 focus:bg-indigo-950/20 placeholder-slate-600 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-slate-400 font-mono mb-1.5 uppercase tracking-wider">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe the role, your company, and what you're looking for..."
                  className="w-full bg-[#0d0f14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-400/60 focus:bg-indigo-950/20 placeholder-slate-600 transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm hover:shadow-[0_0_30px_rgba(99,102,241,0.45)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500 font-mono">
                Or email directly:{' '}
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
