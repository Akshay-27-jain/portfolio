import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { BLOG_POSTS } from '../../data/portfolioData';
import { BlogPost } from '../../types';
import { useSound } from '../ui/SoundManager';

export const BlogSection: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const { playClick } = useSound();

  return (
    <section className="py-24 px-4 lg:px-8 relative z-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
          <span>Technical Writings</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Engineering Articles & <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
            Technical Insights
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-3xl bg-[#08080d] border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-gray-400">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-cyan-300 transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-sans mb-4">
                {post.excerpt}
              </p>
            </div>

            <button
              onClick={() => {
                playClick();
                setActivePost(post);
              }}
              className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
            onClick={() => setActivePost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[85vh] bg-[#090a10] border border-cyan-500/40 rounded-3xl p-8 overflow-y-auto font-sans text-gray-200"
            >
              <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono">
                    {activePost.category}
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-2">{activePost.title}</h2>
                  <p className="text-xs text-gray-400 font-mono mt-1">{activePost.date} • {activePost.readTime}</p>
                </div>
                <button
                  onClick={() => setActivePost(null)}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-sm leading-relaxed text-gray-300 whitespace-pre-wrap font-sans space-y-4">
                {activePost.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
