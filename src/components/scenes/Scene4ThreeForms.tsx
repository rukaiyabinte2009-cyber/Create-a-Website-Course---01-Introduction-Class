import React from 'react';
import { motion } from 'motion/react';
import { Globe, LayoutDashboard, Smartphone, Bell, Camera, MapPin, CheckCircle2 } from 'lucide-react';

interface SceneProps {
  progress: number;
  isActive: boolean;
}

export const Scene4ThreeForms: React.FC<SceneProps> = ({ progress }) => {
  // 0 - 0.33: Website
  // 0.33 - 0.66: Web App
  // 0.66 - 1.0: Mobile App
  const mode = progress < 0.35 ? 'website' : progress < 0.7 ? 'webapp' : 'mobile';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none p-6">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* 3 Form factor badges at top */}
      <div className="relative z-20 flex items-center gap-3 sm:gap-6 mb-8">
        <div className={`px-4 py-2 rounded-xl border transition-all duration-500 flex items-center gap-2 ${
          mode === 'website'
            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            : 'bg-gray-900/40 border-gray-800 text-gray-500'
        }`}>
          <Globe className="w-4 h-4" />
          <span className="text-xs font-mono font-bold">1. Website</span>
        </div>

        <div className={`px-4 py-2 rounded-xl border transition-all duration-500 flex items-center gap-2 ${
          mode === 'webapp'
            ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
            : 'bg-gray-900/40 border-gray-800 text-gray-500'
        }`}>
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-xs font-mono font-bold">2. Web App</span>
        </div>

        <div className={`px-4 py-2 rounded-xl border transition-all duration-500 flex items-center gap-2 ${
          mode === 'mobile'
            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
            : 'bg-gray-900/40 border-gray-800 text-gray-500'
        }`}>
          <Smartphone className="w-4 h-4" />
          <span className="text-xs font-mono font-bold">3. Mobile App</span>
        </div>
      </div>

      {/* Main 3D Device Container */}
      <div className="relative z-10 w-full max-w-2xl flex items-center justify-center min-h-[300px]">
        {mode === 'website' && (
          <motion.div
            key="website"
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-2xl border border-cyan-500/40 bg-gray-950/90 shadow-2xl p-5 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="text-xs font-mono text-cyan-400/80 bg-black/60 px-4 py-1 rounded-full border border-gray-800">
                https://myschool.edu
              </div>
              <span className="text-xs text-gray-500 font-mono">Informational</span>
            </div>

            <div className="space-y-4">
              <div className="h-28 rounded-xl bg-gradient-to-r from-cyan-900/40 via-blue-900/30 to-purple-900/30 p-4 flex flex-col justify-end border border-cyan-800/30">
                <h4 className="text-lg font-bold text-white">St. Marks High School & STEM Academy</h4>
                <p className="text-xs text-cyan-200">Inspiring the next generation of engineers and creators.</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-gray-900/60 border border-gray-800 text-xs text-gray-300">
                  📚 Academic Calendar
                </div>
                <div className="p-3 rounded-lg bg-gray-900/60 border border-gray-800 text-xs text-gray-300">
                  🏆 Science Olympiad
                </div>
                <div className="p-3 rounded-lg bg-gray-900/60 border border-gray-800 text-xs text-gray-300">
                  📬 Admissions Contact
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {mode === 'webapp' && (
          <motion.div
            key="webapp"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-2xl border border-blue-500/40 bg-gray-950/90 shadow-2xl p-5 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
              <div className="text-xs font-mono text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/60 flex items-center gap-1.5">
                <LayoutDashboard className="w-3.5 h-3.5" /> Portal Dashboard (Interactive Logic)
              </div>
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Server Session
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div className="p-3 rounded-xl bg-gray-900/80 border border-blue-900/40">
                <span className="text-[11px] text-gray-400">Total Enrolled</span>
                <p className="text-xl font-bold text-white font-mono">1,248</p>
                <span className="text-[10px] text-emerald-400">+12% this term</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-900/80 border border-blue-900/40">
                <span className="text-[11px] text-gray-400">Assignments Due</span>
                <p className="text-xl font-bold text-cyan-300 font-mono">14</p>
                <span className="text-[10px] text-yellow-400">2 require grading</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-900/80 border border-blue-900/40">
                <span className="text-[11px] text-gray-400">Live Server Latency</span>
                <p className="text-xl font-bold text-emerald-300 font-mono">24 ms</p>
                <span className="text-[10px] text-gray-400">Cloud database synced</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-black/60 border border-gray-800 flex items-center justify-between text-xs text-gray-300">
              <span>Database query: `SELECT * FROM students WHERE term = '2026'`</span>
              <button className="px-3 py-1 bg-blue-600 rounded-lg text-white font-mono text-[11px] font-semibold">
                Execute Action
              </button>
            </div>
          </motion.div>
        )}

        {mode === 'mobile' && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-72 rounded-[2.5rem] border-4 border-gray-700 bg-black p-3 shadow-2xl relative overflow-hidden"
          >
            {/* Phone Speaker Notch */}
            <div className="w-24 h-4 bg-gray-800 rounded-full mx-auto mb-3" />

            <div className="p-3 space-y-3">
              {/* Push notification banner */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center gap-2"
              >
                <Bell className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-white">Class Notification</p>
                  <p className="text-gray-300 text-[10px]">Your homework was graded: 100%</p>
                </div>
              </motion.div>

              <div className="h-32 rounded-xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-3 flex flex-col justify-between">
                <span className="text-xs font-bold text-cyan-300">Native Hardware Access</span>
                <div className="flex items-center justify-around text-gray-400 text-xs">
                  <div className="flex flex-col items-center gap-1">
                    <Camera className="w-5 h-5 text-cyan-400" />
                    <span className="text-[9px]">Camera</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="text-[9px]">Location</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    <span className="text-[9px]">Biometrics</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Phone Home Bar */}
            <div className="w-28 h-1 bg-gray-600 rounded-full mx-auto mt-4 mb-1" />
          </motion.div>
        )}
      </div>

      {/* Caption at bottom */}
      <div className="absolute bottom-8 text-center z-10 px-4">
        <p className="text-xs font-mono tracking-widest text-cyan-400/80 uppercase mb-1">
          Scene 04 // Architecture Comparison
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-white">
          {mode === 'website' && 'Websites share knowledge and introduce the world to your brand.'}
          {mode === 'webapp' && 'Web Applications let users do real work directly inside the browser.'}
          {mode === 'mobile' && 'Mobile Applications leverage native phone hardware and instant alerts.'}
        </h2>
      </div>
    </div>
  );
};
