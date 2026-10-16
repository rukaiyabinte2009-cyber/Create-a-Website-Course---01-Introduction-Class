import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Laptop, Smartphone, Terminal } from 'lucide-react';

interface SceneProps {
  progress: number;
  isActive: boolean;
}

export const Scene12Finale: React.FC<SceneProps> = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden select-none p-6">
      {/* Deep ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/60 via-slate-950/80 to-black pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-25" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: (i % 3) + 2,
              height: (i % 3) + 2,
              left: `${(i * 23) % 100}%`,
              top: `${(i * 37) % 100}%`,
              boxShadow: '0 0 10px #06b6d4',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-purple-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-mono mb-6 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>PROJECT-BASED INTRODUCTORY COURSE</span>
        </motion.div>

        {/* Master Kinetic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]"
        >
          YOUR WEBSITE, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300">LIVE TODAY</span>
        </motion.h1>

        {/* Subtitle triad */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-base sm:text-xl font-mono text-cyan-200 mt-4 tracking-widest font-semibold uppercase"
        >
          LEARN. BUILD. PUBLISH.
        </motion.p>

        {/* Device silhouettes preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center justify-center gap-6 my-8 text-gray-400"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-950/80 border border-gray-800 text-xs font-mono">
            <Laptop className="w-4 h-4 text-cyan-400" /> Web Edition
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-950/80 border border-gray-800 text-xs font-mono">
            <Smartphone className="w-4 h-4 text-emerald-400" /> Mobile Ready
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-950/80 border border-gray-800 text-xs font-mono">
            <Terminal className="w-4 h-4 text-amber-400" /> Real Code & Tools
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold font-mono text-sm shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center gap-2">
            START YOUR JOURNEY <ArrowRight className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono text-gray-400">
            For Teachers • Students • Freelancers • Beginners
          </span>
        </motion.div>
      </div>

      {/* Footer attribution */}
      <div className="absolute bottom-6 text-center z-10 text-[11px] font-mono text-gray-500">
        Created for Rukaiya Binte Shafique • Software Engineering Showcase
      </div>
    </div>
  );
};
