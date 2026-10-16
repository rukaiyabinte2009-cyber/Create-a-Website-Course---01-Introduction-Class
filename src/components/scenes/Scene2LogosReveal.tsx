import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Landmark, 
  GraduationCap, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Share2, 
  Building2, 
  Cpu, 
  Sparkles,
  Layers
} from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

interface SceneProps {
  progress: number; // 0 to 1
  isActive: boolean;
}

export const Scene2LogosReveal: React.FC<SceneProps> = ({ progress, isActive }) => {
  const whooshPlayed = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!isActive) {
      whooshPlayed.current = {};
      return;
    }

    if (progress >= 0.18 && !whooshPlayed.current['bank']) {
      soundEngine.playWhoosh(400);
      whooshPlayed.current['bank'] = true;
    }
    if (progress >= 0.38 && !whooshPlayed.current['school']) {
      soundEngine.playWhoosh(520);
      whooshPlayed.current['school'] = true;
    }
    if (progress >= 0.58 && !whooshPlayed.current['socials']) {
      soundEngine.playWhoosh(650);
      whooshPlayed.current['socials'] = true;
    }
    if (progress >= 0.85 && !whooshPlayed.current['software']) {
      soundEngine.playSubBassDrop();
      whooshPlayed.current['software'] = true;
    }
  }, [progress, isActive]);

  // Phase logic:
  // 0 - 0.18: Central Core pulsing
  // 0.18 - 0.40: Bank pops from center -> slides left
  // 0.38 - 0.60: School pops from center -> slides right
  // 0.58 - 0.80: Socials (Instagram, Facebook, X, YouTube) pop from center -> orbit in constellation
  // 0.80 - 1.0: Pullback to Cyber City Grid & "SOFTWARE" reveal

  const showBank = progress >= 0.18;
  const showSchool = progress >= 0.38;
  const showSocials = progress >= 0.58;
  const isCityPullback = progress >= 0.82;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none">
      {/* Background Cyber Grid */}
      <div 
        className={`absolute inset-0 cyber-grid transition-opacity duration-1000 ${
          isCityPullback ? 'opacity-40 scale-125' : 'opacity-20'
        }`} 
      />

      {/* Cyber City Skyline & Highway Trails on Pullback */}
      {isCityPullback && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 pointer-events-none flex items-end justify-center"
        >
          {/* Neon Highway Light Beams */}
          <svg className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="laserGrad" x1="0%" y1="100%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d="M 0 600 Q 400 400 720 300" stroke="url(#laserGrad)" strokeWidth="3" fill="none" />
            <path d="M 1440 600 Q 1040 400 720 300" stroke="url(#laserGrad)" strokeWidth="3" fill="none" />
            <path d="M 200 900 Q 600 500 720 300" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            <path d="M 1240 900 Q 840 500 720 300" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 6" fill="none" />
          </svg>

          {/* Futuristic City Silhouettes */}
          <div className="w-full h-48 flex items-end justify-between px-12 gap-2 opacity-30">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-cyan-950/80 to-blue-900/20 border-t border-cyan-500/40"
                style={{
                  height: `${40 + ((i * 37) % 120)}px`,
                  boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Central Interactive Core Sphere */}
      <motion.div
        className="relative z-20 flex items-center justify-center"
        animate={{
          scale: isCityPullback ? 0.75 : 1,
          y: isCityPullback ? -30 : 0,
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        {/* Glowing Central Energy Orb */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-600/20 to-transparent border border-cyan-400/50 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.6)]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-1 rounded-full border border-dashed border-cyan-300/40"
          />
          <Cpu className="w-12 h-12 text-cyan-300 animate-pulse" />
          <div className="absolute -bottom-7 text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
            DIGITAL CORE
          </div>
        </div>

        {/* 1. BANK LOGO: Pops up from center and slides LEFT */}
        {showBank && (
          <motion.div
            initial={{ scale: 0, x: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              x: -220, 
              opacity: 1 
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 120, duration: 0.8 }}
            className="absolute z-30 flex flex-col items-center"
          >
            {/* Laser connector line back to center */}
            <div className="absolute right-0 top-1/2 w-[220px] h-[2px] bg-gradient-to-l from-cyan-400/80 to-transparent pointer-events-none" />
            
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-cyan-900/60 border-2 border-emerald-400/80 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] group hover:scale-110 transition-transform">
              <Landmark className="w-10 h-10 text-emerald-300" />
            </div>
            <span className="mt-2 text-xs font-mono font-bold tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
              YOUR BANK
            </span>
          </motion.div>
        )}

        {/* 2. SCHOOL LOGO: Pops up from center and slides RIGHT */}
        {showSchool && (
          <motion.div
            initial={{ scale: 0, x: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              x: 220, 
              opacity: 1 
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 120, duration: 0.8 }}
            className="absolute z-30 flex flex-col items-center"
          >
            {/* Laser connector line back to center */}
            <div className="absolute left-0 top-1/2 w-[220px] h-[2px] bg-gradient-to-r from-blue-400/80 to-transparent pointer-events-none" />

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/30 to-indigo-950/70 border-2 border-blue-400/80 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] group hover:scale-110 transition-transform">
              <GraduationCap className="w-10 h-10 text-blue-300" />
            </div>
            <span className="mt-2 text-xs font-mono font-bold tracking-wider text-blue-300 bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-500/40">
              YOUR SCHOOL
            </span>
          </motion.div>
        )}

        {/* 3. SOCIAL APPS: Orbiting Constellation (Instagram, Facebook, X, YouTube, TikTok) */}
        {showSocials && (
          <>
            {/* Instagram (Upper Left) */}
            <motion.div
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ scale: 1, x: -140, y: -130 }}
              transition={{ type: 'spring', damping: 14, stiffness: 130 }}
              className="absolute z-30 flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px] shadow-[0_0_25px_rgba(225,48,108,0.5)]">
                <div className="w-full h-full bg-black/70 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Instagram className="w-7 h-7 text-pink-400" />
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold text-pink-300 mt-1">Instagram</span>
            </motion.div>

            {/* Facebook (Upper Right) */}
            <motion.div
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ scale: 1, x: 140, y: -130 }}
              transition={{ type: 'spring', damping: 14, stiffness: 130, delay: 0.1 }}
              className="absolute z-30 flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-[2px] shadow-[0_0_25px_rgba(37,99,235,0.5)]">
                <div className="w-full h-full bg-black/70 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Facebook className="w-7 h-7 text-blue-400" />
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold text-blue-300 mt-1">Facebook</span>
            </motion.div>

            {/* X / Twitter (Lower Right) */}
            <motion.div
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ scale: 1, x: 160, y: 120 }}
              transition={{ type: 'spring', damping: 14, stiffness: 130, delay: 0.2 }}
              className="absolute z-30 flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600 p-[2px] shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                <div className="w-full h-full bg-black/80 rounded-2xl flex items-center justify-center">
                  <span className="text-xl font-extrabold text-white font-mono">𝕏</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold text-gray-300 mt-1">X / Twitter</span>
            </motion.div>

            {/* YouTube (Lower Left) */}
            <motion.div
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ scale: 1, x: -160, y: 120 }}
              transition={{ type: 'spring', damping: 14, stiffness: 130, delay: 0.3 }}
              className="absolute z-30 flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-[2px] shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                <div className="w-full h-full bg-black/70 rounded-2xl flex items-center justify-center">
                  <Youtube className="w-7 h-7 text-red-500" />
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold text-red-300 mt-1">YouTube</span>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Dramatic Reveal: "SOFTWARE." */}
      <motion.div
        className="absolute bottom-14 text-center z-30 px-4"
        animate={{
          scale: isCityPullback ? 1.05 : 1,
        }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">
          Scene 02 // The Common Denominator
        </p>

        {isCityPullback ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <h1 className="text-4xl sm:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-amber-300 drop-shadow-[0_0_35px_rgba(6,182,212,0.8)]">
              SOFTWARE.
            </h1>
            <p className="text-sm font-mono text-cyan-200/90 mt-2 tracking-wide">
              Different experiences. Different industries. One powerful reality.
            </p>
          </motion.div>
        ) : (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Banking. Education. Social Connection.
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Every platform you open today shares the exact same foundation.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
