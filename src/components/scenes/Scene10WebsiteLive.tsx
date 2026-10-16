import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe, Smartphone, QrCode, Check, ExternalLink, Cloud } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

interface SceneProps {
  progress: number;
  isActive: boolean;
}

export const Scene10WebsiteLive: React.FC<SceneProps> = ({ progress, isActive }) => {
  const isDeployed = progress >= 0.35;
  const chimePlayed = useRef(false);

  useEffect(() => {
    if (!isActive) {
      chimePlayed.current = false;
      return;
    }
    if (isDeployed && !chimePlayed.current) {
      soundEngine.playDeployChime();
      chimePlayed.current = true;
    }
  }, [isDeployed, isActive]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none p-6">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Deployment Banner */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono mb-2">
            <Cloud className="w-3.5 h-3.5" /> Edge CDN Global Deployment: 100% Complete
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            “This website didn’t exist 60 seconds ago.”
          </h2>
        </motion.div>

        {/* Live URL Pill with Glow */}
        <div className="w-full max-w-xl p-3 rounded-2xl bg-black/80 border-2 border-cyan-400 flex items-center justify-between shadow-[0_0_35px_rgba(6,182,212,0.5)] mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-sm sm:text-base text-cyan-300 font-bold">
              https://your-live-website.run.app
            </span>
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-cyan-900/60 text-cyan-200 rounded-lg border border-cyan-500/40 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-400" /> LIVE
          </span>
        </div>

        {/* Split: Interactive Responsive Showcase & QR Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Desktop Preview Card */}
          <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 mb-3 border-b border-gray-800 pb-2">
                <span className="font-mono text-cyan-400">Desktop View</span>
                <span className="text-[10px] text-gray-500">1920 × 1080</span>
              </div>
              <div className="h-28 rounded-lg bg-gradient-to-br from-cyan-950/50 to-blue-950/40 border border-cyan-800/40 p-3 flex flex-col justify-center text-center">
                <h4 className="text-sm font-bold text-white">Full Responsive Experience</h4>
                <p className="text-[11px] text-cyan-200 mt-1">
                  Custom domain, SSL certificate, and lightning-fast worldwide delivery.
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
              <span>Time to First Byte: 18ms</span>
              <span className="text-emerald-400 font-mono">100/100 Lighthouse</span>
            </div>
          </div>

          {/* QR Code Card for Mobile Phone Scan */}
          <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-white rounded-xl shadow-lg mb-2">
              {/* Generated clean SVG QR Code representation */}
              <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                {/* Corner Finder 1 */}
                <rect x="10" y="10" width="24" height="24" fill="#030712" />
                <rect x="14" y="14" width="16" height="16" fill="white" />
                <rect x="18" y="18" width="8" height="8" fill="#030712" />
                {/* Corner Finder 2 */}
                <rect x="66" y="10" width="24" height="24" fill="#030712" />
                <rect x="70" y="14" width="16" height="16" fill="white" />
                <rect x="74" y="18" width="8" height="8" fill="#030712" />
                {/* Corner Finder 3 */}
                <rect x="10" y="66" width="24" height="24" fill="#030712" />
                <rect x="14" y="70" width="16" height="16" fill="white" />
                <rect x="18" y="74" width="8" height="8" fill="#030712" />
                {/* Pattern Data points */}
                <rect x="42" y="14" width="6" height="6" fill="#030712" />
                <rect x="52" y="24" width="6" height="6" fill="#030712" />
                <rect x="42" y="42" width="16" height="16" fill="#06b6d4" />
                <rect x="20" y="44" width="8" height="8" fill="#030712" />
                <rect x="72" y="52" width="6" height="12" fill="#030712" />
                <rect x="44" y="72" width="14" height="6" fill="#030712" />
                <rect x="68" y="76" width="8" height="8" fill="#030712" />
              </svg>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5" /> Scan on Your Phone
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5">Instant mobile preview for your viewers</p>
          </div>
        </div>
      </div>

      {/* Caption at bottom */}
      <div className="absolute bottom-6 text-center z-10 px-4">
        <p className="text-xs font-mono tracking-widest text-cyan-400/80 uppercase mb-1">
          Scene 10 // The Big Reveal
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-white">
          A real link. Shareable with anyone, anywhere on Earth.
        </h2>
      </div>
    </div>
  );
};
