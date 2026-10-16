import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, BookOpen, ExternalLink, Sparkles, UserCheck } from 'lucide-react';

interface SceneProps {
  progress: number;
  isActive: boolean;
}

export const Scene6WhyBuild: React.FC<SceneProps> = ({ progress }) => {
  // Cycle between Teacher, Student, and Professional based on progress
  const activeTrack = progress < 0.35 ? 0 : progress < 0.7 ? 1 : 2;

  const tracks = [
    {
      role: 'For Teachers & Educators',
      subtitle: 'The 24/7 Digital Classroom Companion',
      icon: BookOpen,
      accent: 'from-blue-600 to-indigo-700',
      badgeColor: 'text-blue-300 border-blue-500/40 bg-blue-950/60',
      bullets: [
        'Upload weekly lesson slides & PDFs without email clutter',
        'Share instant homework deadlines and notice board updates',
        'Provide curated learning links and interactive quizzes',
      ],
      previewHeadline: 'Physics 101: Space & Relativity Hub',
      metric: '35 Students Synced',
    },
    {
      role: 'For Students & Learners',
      subtitle: 'Your Living Proof-of-Work Portfolio',
      icon: GraduationCap,
      accent: 'from-cyan-600 to-emerald-600',
      badgeColor: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/60',
      bullets: [
        'Stand out from generic PDF resumes with live deployed links',
        'Showcase coding projects, science fairs, and design work',
        'Connect your GitHub, LinkedIn, and personal blog',
      ],
      previewHeadline: 'Sarah Rahman — Full-Stack Portfolio',
      metric: '5 Deployed Projects',
    },
    {
      role: 'For Freelancers & Professionals',
      subtitle: 'Your 24/7 Global Client Storefront',
      icon: Briefcase,
      accent: 'from-amber-600 to-orange-600',
      badgeColor: 'text-amber-300 border-amber-500/40 bg-amber-950/60',
      bullets: [
        'Convert visitors into paying clients with custom booking forms',
        'Display verified client testimonials and case studies',
        'Sell digital consulting, freelance packages, or products',
      ],
      previewHeadline: 'Apex Design & Code Studio',
      metric: '$4,200 Client Inquiries',
    },
  ];

  const current = tracks[activeTrack];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none p-6">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* 3 Audience Track Tabs */}
      <div className="relative z-10 flex items-center gap-3 sm:gap-4 mb-6">
        {tracks.map((t, idx) => {
          const Icon = t.icon;
          const isSelected = idx === activeTrack;
          return (
            <div
              key={t.role}
              className={`px-3.5 py-1.5 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                isSelected
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                  : 'bg-gray-900/40 border-gray-800 text-gray-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs font-mono font-bold hidden sm:inline">{t.role.split(' ')[1]}</span>
            </div>
          );
        })}
      </div>

      {/* Featured Stage Card */}
      <motion.div
        key={current.role}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-gray-700 bg-gradient-to-b from-gray-950/90 to-black/90 p-6 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${current.accent} flex items-center justify-center shadow-lg`}>
              <current.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{current.role}</h3>
              <p className="text-xs text-gray-400">{current.subtitle}</p>
            </div>
          </div>
          <span className={`text-xs font-mono px-3 py-1 rounded-full border ${current.badgeColor}`}>
            {current.metric}
          </span>
        </div>

        {/* Live Mockup Box */}
        <div className="rounded-xl bg-black/60 border border-gray-800 p-4 mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 border-b border-gray-800/60 pb-2 mb-3">
            <span className="font-mono text-cyan-400">{current.previewHeadline}</span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Live Demo
            </span>
          </div>

          <div className="space-y-2">
            {current.bullets.map((bullet, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Caption at bottom */}
      <div className="absolute bottom-8 text-center z-10 px-4">
        <p className="text-xs font-mono tracking-widest text-cyan-400/80 uppercase mb-1">
          Scene 06 // Purpose & Value
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-white">
          One foundational skill. Infinite real-world impact.
        </h2>
      </div>
    </div>
  );
};
