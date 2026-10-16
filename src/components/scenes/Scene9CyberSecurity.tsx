import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ShieldCheck, Lock, KeyRound, Smartphone, CheckCircle2, AlertTriangle } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

interface SceneProps {
  progress: number;
  isActive: boolean;
}

export const Scene9CyberSecurity: React.FC<SceneProps> = ({ progress, isActive }) => {
  const isProtected = progress >= 0.45;
  const shieldPlayed = useRef(false);

  useEffect(() => {
    if (!isActive) {
      shieldPlayed.current = false;
      return;
    }
    if (isProtected && !shieldPlayed.current) {
      soundEngine.playShieldHum();
      shieldPlayed.current = true;
    }
  }, [isProtected, isActive]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none p-6">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Hexagonal Shield Hologram in Center */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Central Shield Orb */}
        <motion.div
          className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center transition-all duration-700 ${
            isProtected
              ? 'bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.6)]'
              : 'bg-red-500/20 border-2 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)]'
          }`}
          animate={{ scale: isProtected ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {isProtected ? (
            <ShieldCheck className="w-16 h-16 text-cyan-300" />
          ) : (
            <ShieldAlert className="w-16 h-16 text-red-400 animate-pulse" />
          )}

          {/* Hexagonal orbiting rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40 animate-spin" style={{ animationDuration: '15s' }} />
        </motion.div>

        {/* 4 Defensive Security Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-8">
          {/* Pillar 1: Password Strength */}
          <div className="p-4 rounded-xl bg-black/60 border border-gray-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-gray-400 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" /> 1. Strong Cryptographic Passwords
              </span>
              <span className={`font-mono text-[11px] font-bold ${isProtected ? 'text-emerald-400' : 'text-red-400'}`}>
                {isProtected ? '100% Entropic' : 'Weak (123456)'}
              </span>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${
                  isProtected ? 'w-full bg-emerald-500' : 'w-1/4 bg-red-500'
                }`}
              />
            </div>
            <p className="text-[11px] font-mono text-gray-500 mt-2">
              {isProtected ? 'Salted bcrypt hash: $2b$12$K8y...3kL9' : 'Plaintext risk detected!'}
            </p>
          </div>

          {/* Pillar 2: 2FA Authentication */}
          <div className="p-4 rounded-xl bg-black/60 border border-gray-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-gray-400 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-blue-400" /> 2. Multi-Factor Authentication
              </span>
              <span className="font-mono text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Enabled
              </span>
            </div>
            <div className="p-2 rounded bg-gray-900/80 border border-gray-800 text-[11px] font-mono text-cyan-300 flex items-center justify-between">
              <span>Token: 489-021</span>
              <span className="text-[10px] text-gray-500">Expires in 28s</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">Guards accounts even if password is compromised.</p>
          </div>

          {/* Pillar 3: HTTPS Encryption */}
          <div className="p-4 rounded-xl bg-black/60 border border-gray-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-gray-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> 3. End-to-End HTTPS / TLS 1.3
              </span>
              <span className="font-mono text-[11px] text-emerald-400 font-bold">256-bit AES</span>
            </div>
            <p className="text-xs text-gray-300">
              Encrypts all student records, passwords, and messages in transit across the web.
            </p>
          </div>

          {/* Pillar 4: Threat Defense */}
          <div className="p-4 rounded-xl bg-black/60 border border-gray-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-gray-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> 4. Input Sanitization & Firewall
              </span>
              <span className="font-mono text-[11px] text-cyan-400 font-bold">WAF Active</span>
            </div>
            <p className="text-xs text-gray-300">
              Blocks SQL injection and malicious scripts before they reach the database.
            </p>
          </div>
        </div>
      </div>

      {/* Caption at bottom */}
      <div className="absolute bottom-6 text-center z-10 px-4">
        <p className="text-xs font-mono tracking-widest text-cyan-400/80 uppercase mb-1">
          Scene 09 // Security & Trust
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Security is not optional. It is part of the engineering craft.
        </h2>
      </div>
    </div>
  );
};
