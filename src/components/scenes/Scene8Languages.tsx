import React from 'react';
import { motion } from 'motion/react';
import { Layers, Database, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface SceneProps {
  progress: number;
  isActive: boolean;
}

export const Scene8Languages: React.FC<SceneProps> = () => {
  const languages = [
    { name: 'HTML5', role: 'Page Structure', color: 'bg-orange-500/20 text-orange-400 border-orange-500/40', tag: 'Frontend' },
    { name: 'CSS3', role: 'Styling & Motion', color: 'bg-blue-500/20 text-blue-400 border-blue-500/40', tag: 'Frontend' },
    { name: 'JavaScript', role: 'Interactivity', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40', tag: 'Core' },
    { name: 'TypeScript', role: 'Type Safety', color: 'bg-sky-500/20 text-sky-400 border-sky-500/40', tag: 'Modern' },
    { name: 'Python', role: 'AI & Backend', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', tag: 'Backend' },
    { name: 'C# / .NET', role: 'Enterprise APIs', color: 'bg-purple-500/20 text-purple-400 border-purple-500/40', tag: 'Backend' },
    { name: 'SQL', role: 'Database Queries', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40', tag: 'Data' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none p-6">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* 3-Tier Architecture Pipeline Header */}
      <div className="relative z-10 w-full max-w-3xl flex items-center justify-between gap-2 mb-8 bg-black/60 border border-gray-800 rounded-xl p-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-orange-400">
          <Layers className="w-4 h-4" />
          <span>1. CLIENT (FRONTEND)</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
        <div className="flex items-center gap-2 text-purple-400">
          <Cpu className="w-4 h-4" />
          <span>2. SERVER (API / LOGIC)</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
        <div className="flex items-center gap-2 text-cyan-400">
          <Database className="w-4 h-4" />
          <span>3. PERSISTENCE (SQL DATABASE)</span>
        </div>
      </div>

      {/* Orbiting Language Badges */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-3xl">
        {languages.map((lang, idx) => (
          <motion.div
            key={lang.name}
            initial={{ scale: 0.8, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className={`p-4 rounded-xl border backdrop-blur-md flex flex-col justify-between ${lang.color} shadow-lg`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-extrabold font-mono">{lang.name}</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/50 border border-current">
                {lang.tag}
              </span>
            </div>
            <p className="text-xs text-gray-300 font-sans">{lang.role}</p>
          </motion.div>
        ))}
      </div>

      {/* Caption at bottom */}
      <div className="absolute bottom-8 text-center z-10 px-4">
        <p className="text-xs font-mono tracking-widest text-cyan-400/80 uppercase mb-1">
          Scene 08 // Ecosystem
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Different languages serve different roles, working as one connected system.
        </h2>
      </div>
    </div>
  );
};
