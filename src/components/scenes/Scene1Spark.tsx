import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

interface SceneProps {
  progress: number; // 0 to 1
  isActive: boolean;
}

export const Scene1Spark: React.FC<SceneProps> = ({ progress, isActive }) => {
  const codeToType = 'const future = createWorld();';
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setTypedChars(0);
      return;
    }
    // Calculate typing based on progress (from 0.1 to 0.6)
    if (progress < 0.1) {
      setTypedChars(0);
    } else if (progress <= 0.6) {
      const p = (progress - 0.1) / 0.5;
      const chars = Math.floor(p * codeToType.length);
      if (chars !== typedChars) {
        soundEngine.playKeyboardClick();
        setTypedChars(chars);
      }
    } else {
      setTypedChars(codeToType.length);
    }
  }, [progress, isActive, typedChars, codeToType.length]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden select-none">
      {/* Background radial gradient glow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/40 via-black to-black transition-opacity duration-1000"
        style={{ opacity: Math.min(progress * 1.5, 1) }}
      />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Ambient floating dust particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: (i % 3) + 2,
              height: (i % 3) + 2,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 29) % 100}%`,
              boxShadow: '0 0 8px #06b6d4',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (i * 0.1),
            }}
          />
        ))}
      </div>

      {/* Terminal window container */}
      <motion.div
        className="relative z-10 w-full max-w-2xl px-4 sm:px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-xl border border-cyan-900/60 bg-black/80 backdrop-blur-md p-3.5 sm:p-6 shadow-2xl shadow-cyan-950/50">
          <div className="flex items-center gap-2 mb-2 sm:mb-4 border-b border-gray-800 pb-2 sm:pb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="text-[10px] sm:text-xs font-mono text-gray-500 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-cyan-500" /> bash — 80x24
            </span>
          </div>

          <div className="font-mono text-sm sm:text-2xl text-cyan-400 flex items-center tracking-wide min-h-[2rem] sm:min-h-[3rem]">
            <span className="text-emerald-400 mr-2 sm:mr-3 select-none">{'>'}</span>
            <span className="text-gray-100 font-semibold">{codeToType.slice(0, typedChars)}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 sm:w-3 h-4 sm:h-6 ml-1 bg-cyan-400 shadow-[0_0_10px_#06b6d4]"
            />
          </div>
        </div>

        {/* Spark burst when code completes */}
        {progress >= 0.65 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.4, 1.2], opacity: [1, 0.9, 0] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-cyan-400/20 blur-2xl flex items-center justify-center">
              <Sparkles className="w-12 sm:w-20 h-12 sm:h-20 text-cyan-300 animate-spin" />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Kinetic Subtitles / Heading */}
      <motion.div
        className="absolute bottom-12 sm:bottom-14 text-center z-10 px-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-400/80 uppercase mb-0.5 sm:mb-1">
          Scene 01 // Genesis
        </p>
        <h2 className="text-base sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
          Every digital experience begins somewhere.
        </h2>
        <p className="text-gray-400 text-xs mt-0.5 sm:mt-1 max-w-xl mx-auto hidden sm:block">
          An idea. A problem waiting to be solved. And a few lines of code.
        </p>
      </motion.div>
    </div>
  );
};
