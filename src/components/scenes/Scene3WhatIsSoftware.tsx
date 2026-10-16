import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Music, School, CreditCard, Cpu, ArrowRight } from 'lucide-react';

interface SceneProps {
  progress: number;
  isActive: boolean;
}

export const Scene3WhatIsSoftware: React.FC<SceneProps> = ({ progress }) => {
  // Cycle examples based on scene progress
  const examples = [
    {
      id: 'calc',
      title: 'Calculate Numbers',
      category: 'Computation',
      icon: Calculator,
      color: 'from-blue-600 to-cyan-500',
      preview: '256 × 1024 = 262,144',
      badge: 'Math Engine',
    },
    {
      id: 'music',
      title: 'Stream Audio & Media',
      category: 'Entertainment',
      icon: Music,
      color: 'from-purple-600 to-pink-500',
      preview: 'Playing: Lo-Fi Synth Beats • 128 kbps',
      badge: 'Audio DSP',
    },
    {
      id: 'school',
      title: 'Manage a Classroom',
      category: 'Education',
      icon: School,
      color: 'from-emerald-600 to-teal-500',
      preview: 'Grade 10: 32 Students Present • Physics Hub',
      badge: 'LMS Platform',
    },
    {
      id: 'payment',
      title: 'Process Global Payments',
      category: 'Finance',
      icon: CreditCard,
      color: 'from-amber-600 to-yellow-500',
      preview: 'TX_#9841 • $49.00 USD Approved',
      badge: 'Payment Gateway',
    },
  ];

  const activeIdx = Math.min(Math.floor(progress * examples.length), examples.length - 1);
  const currentExample = examples[activeIdx];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none p-6">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Floating Holographic Circuit Blueprint */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Core Equation Banner */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 bg-black/60 border border-cyan-800/40 px-5 py-3 rounded-2xl backdrop-blur-md shadow-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-mono text-cyan-400 font-bold">SOFTWARE</span>
          <span className="text-gray-500">=</span>
          <span className="px-2.5 py-1 bg-cyan-950/80 border border-cyan-500/40 rounded-lg text-xs font-mono text-cyan-300">
            Instructions
          </span>
          <span className="text-gray-500">+</span>
          <span className="px-2.5 py-1 bg-blue-950/80 border border-blue-500/40 rounded-lg text-xs font-mono text-blue-300">
            Logic
          </span>
          <span className="text-gray-500">+</span>
          <span className="px-2.5 py-1 bg-amber-950/80 border border-amber-500/40 rounded-lg text-xs font-mono text-amber-300">
            Human Purpose
          </span>
        </motion.div>

        {/* Central Morphing Interface Stage */}
        <div className="w-full max-w-xl aspect-[16/9] relative rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-gray-950/90 to-black/95 p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Subtle circuit lines background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20 20 H 120 V 80 H 250" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
              <path d="M 400 300 H 300 V 200 H 150" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
              <circle cx="250" cy="80" r="4" fill="#06b6d4" />
              <circle cx="150" cy="200" r="4" fill="#f59e0b" />
            </svg>
          </div>

          <div className="flex items-center justify-between border-b border-gray-800 pb-3 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Execution Model: {currentExample.category}
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-800/80 text-cyan-300 border border-gray-700">
              {currentExample.badge}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentExample.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 my-auto flex flex-col items-center text-center px-4"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentExample.color} flex items-center justify-center shadow-lg mb-4`}>
                <currentExample.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{currentExample.title}</h3>
              <div className="font-mono text-sm px-4 py-2 bg-black/60 rounded-xl border border-gray-800 text-cyan-300 shadow-inner">
                {currentExample.preview}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-800/80 relative z-10">
            {examples.map((ex, i) => (
              <div
                key={ex.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIdx ? 'w-8 bg-cyan-400' : 'w-2 bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Kinetic footer caption */}
      <div className="absolute bottom-10 text-center z-10 px-4">
        <p className="text-xs font-mono tracking-widest text-cyan-400/80 uppercase mb-1">
          Scene 03 // Definition & Impact
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Software is turning human ideas into working tools.
        </h2>
      </div>
    </div>
  );
};
