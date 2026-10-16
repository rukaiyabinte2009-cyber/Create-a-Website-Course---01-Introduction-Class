import React from 'react';
import { motion } from 'motion/react';
import { Compass, Hammer, Palette, Shield, Rocket, Check } from 'lucide-react';

interface SceneProps {
  progress: number;
  isActive: boolean;
}

export const Scene11CourseRoadmap: React.FC<SceneProps> = ({ progress }) => {
  const steps = [
    { num: '01', title: 'Plan & Sketch', desc: 'Pick your purpose, audience & content', icon: Compass },
    { num: '02', title: 'Assemble Code', desc: 'HTML & modern component blocks', icon: Hammer },
    { num: '03', title: 'Style & Polish', desc: 'Colors, mobile responsiveness & typography', icon: Palette },
    { num: '04', title: 'Secure & Test', desc: 'Contact forms, auth & HTTPS safeguards', icon: Shield },
    { num: '05', title: 'Publish Live', desc: 'Free global cloud hosting & custom link', icon: Rocket },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none p-6">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">The Course Blueprint</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Your 5-Stage Journey to a Live Website</h2>
        </motion.div>

        {/* 5 Milestone Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 w-full">
          {steps.map((st, i) => {
            const Icon = st.icon;
            const isCompleted = progress >= (i + 1) * 0.18;
            return (
              <motion.div
                key={st.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all duration-500 backdrop-blur-md ${
                  isCompleted
                    ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : 'bg-gray-950/60 border-gray-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-gray-500">{st.num}</span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isCompleted ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{st.title}</h4>
                  <p className="text-[11px] text-gray-400 leading-snug">{st.desc}</p>
                </div>
                {isCompleted && (
                  <div className="mt-3 pt-2 border-t border-cyan-800/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> Complete
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Caption at bottom */}
      <div className="absolute bottom-8 text-center z-10 px-4">
        <p className="text-xs font-mono tracking-widest text-cyan-400/80 uppercase mb-1">
          Scene 11 // Your Turn
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-white">
          You don’t need to be an expert to start. You just need to take step one.
        </h2>
      </div>
    </div>
  );
};
