import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  Bot,
  Code,
  GraduationCap,
  Briefcase,
  Layers,
  Cpu,
  Mail,
  FileText,
  Github,
  Linkedin,
  Terminal,
  Volume2
} from 'lucide-react';
import { useSound } from './SoundManager';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAIAssistant: () => void;
  onOpenResume?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenAIAssistant,
  onOpenResume,
}) => {
  const [query, setQuery] = useState('');
  const { playClick, toggleMute } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          playClick();
          // open palette handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, playClick]);

  if (!isOpen) return null;

  const commands = [
    {
      id: 'resume',
      title: 'View & Print Resume (CGPA: 9.07 / 10.0)',
      category: 'Official Resume',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        if (onOpenResume) onOpenResume();
      },
    },
    {
      id: 'ai-assistant',
      title: 'Ask Akshay\'s AI Assistant',
      category: 'AI Feature',
      icon: <Bot className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        onOpenAIAssistant();
      },
    },
    {
      id: 'projects',
      title: 'View Projects (AI Warehouse, SaaS, Edge CV...)',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      action: () => {
        onClose();
        window.location.hash = '#projects';
      },
    },
    {
      id: 'architecture',
      title: 'Explore System Architecture Diagrams',
      category: 'Deep Dive',
      icon: <Cpu className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        window.location.hash = '#architecture';
      },
    },
    {
      id: 'code-snippets',
      title: 'Run Live Interactive Code Snippets',
      category: 'Interactive',
      icon: <Code className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        window.location.hash = '#code-snippets';
      },
    },
    {
      id: 'terminal',
      title: 'Open Interactive CLI Terminal',
      category: 'Interactive',
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      action: () => {
        onClose();
        window.location.hash = '#terminal';
      },
    },
    {
      id: 'education',
      title: 'View B.Tech Education at Walchand Institute',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        window.location.hash = '#education';
      },
    },
    {
      id: 'experience',
      title: 'View Engineering Experience & Skills',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-purple-400" />,
      action: () => {
        onClose();
        window.location.hash = '#experience';
      },
    },
    {
      id: 'contact',
      title: 'Contact Akshay Jain (Email, Resume, Socials)',
      category: 'Contact',
      icon: <Mail className="w-4 h-4 text-rose-400" />,
      action: () => {
        onClose();
        window.location.hash = '#contact';
      },
    },
    {
      id: 'toggle-audio',
      title: 'Toggle Cyberpunk Ambient Audio Synthesizer',
      category: 'System',
      icon: <Volume2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        toggleMute();
        onClose();
      },
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-[#0a0a0f] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden font-mono"
        >
          {/* Input Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/5">
            <Search className="w-5 h-5 text-cyan-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search section (e.g. projects, java, architecture)..."
              className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-gray-500 font-mono"
            />
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
            {filtered.length > 0 ? (
              filtered.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => {
                    playClick();
                    cmd.action();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-black/50 border border-white/10 group-hover:border-cyan-400/50">
                      {cmd.icon}
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium group-hover:text-cyan-300">
                        {cmd.title}
                      </div>
                      <div className="text-[10px] text-gray-400">{cmd.category}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-cyan-400/60 uppercase tracking-widest font-mono">
                    SELECT ↵
                  </span>
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm">
                No matching commands found.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-white/10 bg-black/60 flex items-center justify-between text-[11px] text-gray-500 font-mono">
            <span>Use ↑ ↓ to navigate</span>
            <span>ESC to close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
