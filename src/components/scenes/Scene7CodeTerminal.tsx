import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Code2, FolderTree, RefreshCw, CheckCircle2, Play, Package } from 'lucide-react';
import { soundEngine } from '../../utils/audioSynthesizer';

interface SceneProps {
  progress: number;
  isActive: boolean;
}

export const Scene7CodeTerminal: React.FC<SceneProps> = ({ progress, isActive }) => {
  // Terminal commands and output lines
  const commands = [
    { text: 'npm create vite@latest my-site -- --template react-ts', delay: 0.1 },
    { text: 'cd my-site && npm install', delay: 0.3 },
    { text: 'npm run dev', delay: 0.7 },
  ];

  // Simulated packages installed
  const packages = [
    'react@19.0.0',
    'react-dom@19.0.0',
    'tailwindcss@4.0.0',
    'lucide-react@0.475.0',
    'motion@12.0.0',
  ];

  const [activeTab, setActiveTab] = useState<'terminal' | 'editor' | 'preview'>('terminal');

  useEffect(() => {
    if (progress < 0.45) {
      setActiveTab('terminal');
    } else if (progress < 0.75) {
      setActiveTab('editor');
    } else {
      setActiveTab('preview');
    }
  }, [progress]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#030712] overflow-hidden select-none p-4 sm:p-6">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* IDE Top Navigation Bar */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between bg-gray-950/90 border border-gray-800 rounded-t-xl px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="text-xs font-mono text-gray-400 ml-2 font-semibold">
            Vite Developer Workspace — [Hot Reload Active]
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1 rounded text-xs font-mono transition-colors flex items-center gap-1.5 ${
              activeTab === 'terminal' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50' : 'text-gray-400'
            }`}
          >
            <Terminal className="w-3 h-3" /> Terminal
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1 rounded text-xs font-mono transition-colors flex items-center gap-1.5 ${
              activeTab === 'editor' ? 'bg-blue-950 text-blue-300 border border-blue-500/50' : 'text-gray-400'
            }`}
          >
            <Code2 className="w-3 h-3" /> Editor (App.tsx)
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded text-xs font-mono transition-colors flex items-center gap-1.5 ${
              activeTab === 'preview' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50' : 'text-gray-400'
            }`}
          >
            <Play className="w-3 h-3" /> Live Preview
          </button>
        </div>
      </div>

      {/* Main IDE Window */}
      <div className="relative z-10 w-full max-w-4xl h-72 sm:h-80 bg-black/90 border-x border-b border-gray-800 rounded-b-xl p-4 font-mono text-xs overflow-hidden flex flex-col justify-between shadow-2xl">
        {activeTab === 'terminal' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <div className="text-emerald-400 flex items-center gap-2">
              <span className="text-gray-500 select-none">$</span>
              <span>npm create vite@latest my-website</span>
              {progress >= 0.15 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-auto" />}
            </div>

            {progress >= 0.25 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-300 flex items-center gap-2">
                <span className="text-gray-500 select-none">$</span>
                <span>npm install</span>
              </motion.div>
            )}

            {progress >= 0.3 && (
              <div className="pl-4 space-y-1 text-gray-400 text-[11px] border-l-2 border-cyan-800/60 my-2">
                {packages.map((pkg, i) => (
                  <motion.div
                    key={pkg}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-1.5"
                  >
                    <Package className="w-3 h-3 text-cyan-400" />
                    <span>added {pkg}</span>
                    <span className="text-gray-600 ml-auto">0.{2 + i}s</span>
                  </motion.div>
                ))}
              </div>
            )}

            {progress >= 0.4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-yellow-300 flex items-center gap-2">
                <span className="text-gray-500 select-none">$</span>
                <span>npm run dev</span>
                <span className="text-emerald-400 font-bold ml-3">
                  ➜ Local: http://localhost:5173/ [READY in 180ms]
                </span>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'editor' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full gap-4">
            {/* Sidebar File Tree */}
            <div className="w-40 border-r border-gray-800 pr-3 hidden sm:block text-gray-400 space-y-1 text-[11px]">
              <div className="text-gray-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                <FolderTree className="w-3 h-3" /> Explorer
              </div>
              <div className="text-cyan-400">📁 src</div>
              <div className="pl-3 text-cyan-300">📄 App.tsx (Active)</div>
              <div className="pl-3">📄 index.css</div>
              <div className="pl-3">📄 main.tsx</div>
              <div>📄 package.json</div>
              <div>📄 vite.config.ts</div>
            </div>

            {/* Code lines */}
            <div className="flex-1 space-y-1 text-[12px] text-gray-300">
              <div className="text-purple-400">export default function App() &#123;</div>
              <div className="pl-4 text-purple-300">return (</div>
              <div className="pl-8 text-cyan-300">
                {'<div className="min-h-screen bg-slate-900 text-white p-8">'}
              </div>
              <div className="pl-12 text-emerald-300">
                {'<h1 className="text-4xl font-bold">Welcome to My Live Site</h1>'}
              </div>
              <div className="pl-12 text-yellow-300">
                {'<p className="text-cyan-400">Built live in front of you!</p>'}
              </div>
              <div className="pl-8 text-cyan-300">{'</div>'}</div>
              <div className="pl-4 text-purple-300">);</div>
              <div className="text-purple-400">&#125;</div>
            </div>
          </motion.div>
        )}

        {activeTab === 'preview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" /> Hot Module Replacement (0ms latency)
              </span>
              <span className="text-gray-500">Preview: 100% Zoom</span>
            </div>

            <div className="my-auto p-4 rounded-xl bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/50 text-center">
              <h3 className="text-2xl font-extrabold text-white">Welcome to My Live Site</h3>
              <p className="text-cyan-300 mt-1">Built live in front of you!</p>
              <div className="mt-3 inline-block px-3 py-1 bg-cyan-500 text-black font-bold text-xs rounded-lg shadow-lg">
                Explore Project
              </div>
            </div>

            <span className="text-[10px] text-gray-500 text-right">
              Vite v6 • Client connected via WebSockets
            </span>
          </motion.div>
        )}

        {/* Footer status bar */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-800 text-[10px] text-gray-500">
          <span>Git: main*</span>
          <span>TypeScript 5.7 • UTF-8</span>
          <span className="text-cyan-400">Node v22 Active</span>
        </div>
      </div>

      {/* Caption at bottom */}
      <div className="absolute bottom-6 text-center z-10 px-4">
        <p className="text-xs font-mono tracking-widest text-cyan-400/80 uppercase mb-1">
          Scene 07 // The Engine Room
        </p>
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Real tools. Real commands. Turning ideas into running code in seconds.
        </h2>
      </div>
    </div>
  );
};
