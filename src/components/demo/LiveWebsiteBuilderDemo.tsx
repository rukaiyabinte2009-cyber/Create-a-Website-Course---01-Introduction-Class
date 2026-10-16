import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Play,
  RotateCcw,
  Check,
  Globe,
  Smartphone,
  Laptop,
  QrCode,
  ExternalLink,
  Code2,
  Palette,
  CloudUpload
} from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

export const LiveWebsiteBuilderDemo: React.FC = () => {
  const [personName, setPersonName] = useState('Dr. Farhana Ahmed');
  const [role, setRole] = useState<'teacher' | 'student' | 'freelancer'>('teacher');
  const [siteHeadline, setSiteHeadline] = useState('STEM Innovation & Biology Classroom Hub');
  const [themeColor, setThemeColor] = useState<'cyan' | 'blue' | 'emerald' | 'amber'>('cyan');
  const [isBuilding, setIsBuilding] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const handleLiveBuild = () => {
    setIsBuilding(true);
    setIsDeployed(false);
    soundEngine.playWhoosh(480);

    setTimeout(() => {
      setIsBuilding(false);
      setIsDeployed(true);
      soundEngine.playDeployChime();
    }, 1800);
  };

  const handleReset = () => {
    setIsDeployed(false);
    setIsBuilding(false);
  };

  const colorStyles = {
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]' },
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]' },
  };

  const activeColor = colorStyles[themeColor];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Intro Header */}
      <div className="bg-gray-950/90 border border-gray-800 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-1">
          <Sparkles className="w-4 h-4" /> Live Presentation Demo Rehearsal Tool
        </div>
        <h2 className="text-2xl font-black text-white">The "Website Live in 60 Seconds" Demo Engine</h2>
        <p className="text-sm text-gray-400 mt-1">
          Use this interactive sandbox during your intro presentation to amaze your viewers by creating a real website on screen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Customizer & Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-4">
            <h3 className="text-sm font-mono uppercase text-gray-400 font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" /> 1. Personalize For Your Audience
            </h3>

            {/* Role Switcher */}
            <div>
              <label className="text-xs font-mono text-gray-300 block mb-1.5">Target Audience Track</label>
              <div className="grid grid-cols-3 gap-2">
                {(['teacher', 'student', 'freelancer'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      if (r === 'teacher') {
                        setPersonName('Dr. Farhana Ahmed');
                        setSiteHeadline('STEM Innovation & Biology Classroom Hub');
                      } else if (r === 'student') {
                        setPersonName('Tariq Hassan');
                        setSiteHeadline('Junior Full-Stack & AI Robotics Portfolio');
                      } else {
                        setPersonName('Rukaiya Shafique');
                        setSiteHeadline('High-Performance Web & Architecture Consulting');
                      }
                    }}
                    className={`py-1.5 rounded-xl text-xs font-mono capitalize border transition-all ${
                      role === r
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-black/50 border-gray-800 text-gray-400'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="text-xs font-mono text-gray-300 block mb-1">Full Name / Brand Name</label>
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                className="w-full bg-black/60 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Headline Input (To prove live editing!) */}
            <div>
              <label className="text-xs font-mono text-gray-300 block mb-1">
                Headline <span className="text-cyan-400">(Edit this live to prove it’s real code!)</span>
              </label>
              <input
                type="text"
                value={siteHeadline}
                onChange={(e) => setSiteHeadline(e.target.value)}
                className="w-full bg-black/60 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Color Accent Picker */}
            <div>
              <label className="text-xs font-mono text-gray-300 block mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> Theme Accent
              </label>
              <div className="flex items-center gap-3">
                {(['cyan', 'blue', 'emerald', 'amber'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setThemeColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      c === 'cyan' ? 'bg-cyan-400' : c === 'blue' ? 'bg-blue-500' : c === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'
                    } ${themeColor === c ? 'scale-125 border-white shadow-lg' : 'border-transparent'}`}
                  />
                ))}
              </div>
            </div>

            {/* Live Trigger Action */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleLiveBuild}
                disabled={isBuilding}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold font-mono text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all disabled:opacity-50"
              >
                {isBuilding ? (
                  <>
                    <CloudUpload className="w-4 h-4 animate-bounce" />
                    <span>BUILDING & DEPLOYING...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>BUILD & DEPLOY LIVE NOW</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="p-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-400 border border-gray-800 transition-colors"
                title="Reset Demo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Script Prompter for Speaker */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs font-mono text-cyan-200/90 space-y-1.5">
            <span className="font-bold text-cyan-300 block">🎤 What to say right now to your audience:</span>
            <p className="italic">
              "Give me a name and what you do. Watch: in less than 60 seconds, we will generate the structure, write the code, and publish it live with a real link anyone can open."
            </p>
          </div>
        </div>

        {/* Right Column: Live Website Result & QR Code */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full bg-gray-950/90 border border-gray-800 rounded-2xl p-4 flex flex-col justify-between shadow-2xl">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isDeployed ? 'bg-emerald-400 animate-ping' : 'bg-yellow-400'}`} />
                <span className="text-xs font-mono text-gray-300">
                  {isDeployed ? 'https://live-showcase.run.app' : 'Staging Preview [Not yet deployed]'}
                </span>
              </div>

              {/* Device Preview Toggle */}
              <div className="flex items-center gap-1 bg-gray-900 p-1 rounded-xl border border-gray-800">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg text-xs ${previewDevice === 'desktop' ? 'bg-cyan-500 text-black' : 'text-gray-400'}`}
                >
                  <Laptop className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg text-xs ${previewDevice === 'mobile' ? 'bg-cyan-500 text-black' : 'text-gray-400'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Generated Website Mock View */}
            <div className="flex items-center justify-center p-2 min-h-[360px]">
              <motion.div
                layout
                className={`transition-all duration-500 bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
                  previewDevice === 'desktop' ? 'w-full' : 'w-72 border-4 border-gray-700 rounded-[2rem]'
                }`}
              >
                {/* Site Header / Nav */}
                <div className="bg-black/90 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-lg ${activeColor.bg} flex items-center justify-center font-bold text-black text-xs`}>
                      {personName.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-white font-mono">{personName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 font-mono">
                    <span className="hover:text-white cursor-pointer">About</span>
                    <span className="hover:text-white cursor-pointer">Projects</span>
                    <span className="hover:text-white cursor-pointer">Contact</span>
                  </div>
                </div>

                {/* Hero Banner */}
                <div className="p-6 bg-gradient-to-b from-gray-900 to-black text-center flex flex-col items-center">
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${activeColor.border} ${activeColor.text} mb-3`}>
                    {role === 'teacher' ? 'Official Educator Hub' : role === 'student' ? 'Student Engineer' : 'Professional Services'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight max-w-md">
                    {siteHeadline}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 max-w-sm">
                    {role === 'teacher'
                      ? 'Access weekly class notes, downloadable laboratory assignments, and academic announcements.'
                      : role === 'student'
                      ? 'Exploring computer systems, interactive web applications, and robotics research.'
                      : 'Delivering tailored digital systems, intuitive UI/UX architecture, and robust engineering.'}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <button className={`px-4 py-1.5 rounded-xl ${activeColor.bg} text-black font-extrabold text-xs font-mono shadow-md`}>
                      Explore Content
                    </button>
                    <button className="px-4 py-1.5 rounded-xl bg-gray-900 text-gray-300 text-xs font-mono border border-gray-800">
                      Get In Touch
                    </button>
                  </div>
                </div>

                {/* Content Cards */}
                <div className="p-4 bg-black/60 grid grid-cols-2 gap-3 border-t border-gray-900 text-xs text-gray-300">
                  <div className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800">
                    <span className="text-[10px] text-gray-500 font-mono">RESOURCE 01</span>
                    <p className="font-semibold text-white mt-1">
                      {role === 'teacher' ? 'Physics Lab Syllabus' : 'React + Vite Architecture'}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800">
                    <span className="text-[10px] text-gray-500 font-mono">RESOURCE 02</span>
                    <p className="font-semibold text-white mt-1">
                      {role === 'teacher' ? 'Upcoming Exam Deadlines' : 'Cybersecurity Defense System'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* QR Code Reveal on Deployment */}
            {isDeployed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white rounded-lg">
                    <QrCode className="w-10 h-10 text-black" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" /> Site Live On Global CDN!
                    </span>
                    <p className="text-[11px] text-cyan-200">
                      Ask your audience to scan this right now to see their live site on their phone.
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950 px-3 py-1.5 rounded-lg border border-cyan-500/40">
                  200 OK • 12ms
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
