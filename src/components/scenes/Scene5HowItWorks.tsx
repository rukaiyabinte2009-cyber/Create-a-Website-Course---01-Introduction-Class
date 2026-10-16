import React from 'react';
import { motion } from 'motion/react';
import { Network, Server, FileCode, Palette, Zap, ArrowRight, Database } from 'lucide-react';

interface SceneProps {
  progress: number;
  isActive: boolean;
}

export const Scene5HowItWorks: React.FC<SceneProps> = ({ progress }) => {
  // Step 1: Request (0 to 0.45) - URL -> DNS -> Server
  // Step 2: Response 3 Trinity layers (0.45 to 1.0) - HTML, CSS, JS
  const isLayerAssembly = progress >= 0.48;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none p-6">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {!isLayerAssembly ? (
        /* Part 1: Packet Journey */
        <motion.div
          key="journey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-10 w-full max-w-3xl flex flex-col items-center"
        >
          {/* Browser address bar */}
          <div className="w-full max-w-md bg-black/80 border border-cyan-800/60 rounded-xl px-4 py-2.5 mb-8 flex items-center gap-3 shadow-lg">
            <span className="text-gray-500 text-xs font-mono">GET</span>
            <span className="text-cyan-400 font-mono text-sm font-semibold tracking-wide flex-1">
              https://awesome-site.com
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          {/* High speed network route */}
          <div className="w-full flex items-center justify-between gap-3 relative py-6">
            {/* Animated Laser Data Line */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-500 via-yellow-500 to-emerald-500 opacity-60" />

            {/* Step 1: User Client */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-950/90 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <Network className="w-8 h-8 text-cyan-300" />
              </div>
              <span className="text-xs font-mono text-cyan-300 mt-2 font-bold">1. Client Request</span>
              <span className="text-[10px] text-gray-400">Your Browser</span>
            </div>

            {/* Step 2: DNS Resolver */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-950/90 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                <Database className="w-8 h-8 text-amber-300" />
              </div>
              <span className="text-xs font-mono text-amber-300 mt-2 font-bold">2. DNS Lookup</span>
              <span className="text-[10px] text-gray-400">Finds IP Address</span>
            </div>

            {/* Step 3: Cloud Server */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <Server className="w-8 h-8 text-emerald-300" />
              </div>
              <span className="text-xs font-mono text-emerald-300 mt-2 font-bold">3. Cloud Server</span>
              <span className="text-[10px] text-gray-400">Sends 200 OK Response</span>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Part 2: HTML, CSS, JavaScript 3-Layer Trinity */
        <motion.div
          key="trinity"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-4xl flex flex-col items-center"
        >
          <div className="text-center mb-6">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">The Holy Trinity of the Web</span>
            <h3 className="text-2xl font-bold text-white mt-1">3 Layers Returning to Your Browser</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* HTML */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-2xl bg-orange-950/40 border border-orange-500/50 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-600/30 border border-orange-500 flex items-center justify-center mb-3">
                  <FileCode className="w-6 h-6 text-orange-400" />
                </div>
                <h4 className="text-lg font-bold text-orange-300">HTML5</h4>
                <p className="text-xs font-mono text-orange-200/80 mb-2 font-semibold">The Structure & Skeleton</p>
                <p className="text-xs text-gray-300">
                  Defines headlines, paragraphs, image containers, buttons, and page hierarchy.
                </p>
              </div>
              <div className="mt-4 p-2 rounded bg-black/60 font-mono text-[11px] text-orange-300/90 border border-orange-900/40">
                {'<header><h1>Hello</h1></header>'}
              </div>
            </motion.div>

            {/* CSS */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/50 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500 flex items-center justify-center mb-3">
                  <Palette className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-bold text-blue-300">CSS3</h4>
                <p className="text-xs font-mono text-blue-200/80 mb-2 font-semibold">The Design & Skin</p>
                <p className="text-xs text-gray-300">
                  Paints colors, applies responsive layouts, fonts, gradients, and fluid grid systems.
                </p>
              </div>
              <div className="mt-4 p-2 rounded bg-black/60 font-mono text-[11px] text-blue-300/90 border border-blue-900/40">
                {'.hero { background: #06b6d4; }'}
              </div>
            </motion.div>

            {/* JS */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-5 rounded-2xl bg-yellow-950/40 border border-yellow-500/50 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-yellow-600/30 border border-yellow-500 flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <h4 className="text-lg font-bold text-yellow-300">JavaScript</h4>
                <p className="text-xs font-mono text-yellow-200/80 mb-2 font-semibold">The Brain & Interactivity</p>
                <p className="text-xs text-gray-300">
                  Handles user clicks, form validation, animations, API requests, and live data.
                </p>
              </div>
              <div className="mt-4 p-2 rounded bg-black/60 font-mono text-[11px] text-yellow-300/90 border border-yellow-900/40">
                {'button.onclick = () => submit();'}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Caption at bottom */}
      <div className="absolute bottom-8 text-center z-10 px-4">
        <p className="text-xs font-mono tracking-widest text-cyan-400/80 uppercase mb-1">
          Scene 05 // Network & Triad
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-white">
          In milliseconds, requests cross the globe and assemble before your eyes.
        </h2>
      </div>
    </div>
  );
};
