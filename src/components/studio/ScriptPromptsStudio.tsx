import React, { useState } from 'react';
import { Copy, Check, Sparkles, Film, Terminal, ExternalLink, Download } from 'lucide-react';
import type { Scene } from '../../types/video.ts';
import { generateMasterVideoPrompt, formatTime } from '../../utils/videoTimeline.ts';

interface StudioProps {
  scenes: Scene[];
}

export const ScriptPromptsStudio: React.FC<StudioProps> = ({ scenes }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedSceneId, setCopiedSceneId] = useState<number | null>(null);
  const [selectedTool, setSelectedTool] = useState<'all' | 'invideo' | 'runway' | 'elevenlabs' | 'midjourney'>('all');

  const handleCopyAll = () => {
    const text = generateMasterVideoPrompt(scenes);
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyScene = (scene: Scene) => {
    const text = `Scene ${scene.id}: ${scene.title}\nVisual Direction: ${scene.visualDirection}\nVoiceover: "${scene.voiceover}"\nAI Video Prompt: ${scene.aiPromptSnippet}`;
    navigator.clipboard.writeText(text);
    setCopiedSceneId(scene.id);
    setTimeout(() => setCopiedSceneId(null), 2000);
  };

  const tools = [
    {
      id: 'invideo',
      name: 'InVideo AI / Atlabs',
      desc: 'Paste the master script directly into their "Script to Video" generator. Select "Cinematic Tech" style.',
      tip: 'Set voice to "Deep Inspiring Narrator", 16:9 widescreen, medium pace.',
    },
    {
      id: 'runway',
      name: 'Runway Gen-3 / Luma',
      desc: 'Use the individual scene prompts for hyper-realistic 3D camera dollies and particle networks.',
      tip: 'Append "--camera push-in --lighting volumetric cyan" for best results.',
    },
    {
      id: 'elevenlabs',
      name: 'ElevenLabs Voiceover',
      desc: 'Generate studio-grade narration voiceover using their free tier.',
      tip: 'Recommended voice: "Adam" or "Rachel" with 0.95 speed and 0.7 stability.',
    },
    {
      id: 'midjourney',
      name: 'Midjourney v6 / Flux',
      desc: 'Generate photorealistic 3D keyframe backgrounds matching the 9 storyboard styles.',
      tip: 'Append "--ar 16:9 --style raw --v 6.1" to generate backdrop cards for CapCut.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-950/90 border border-gray-800 rounded-2xl p-6 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-1">
            <Film className="w-4 h-4" /> AI Video Production & Prompt Exporter
          </div>
          <h2 className="text-2xl font-black text-white">Full 12-Scene Master Script & AI Prompts</h2>
          <p className="text-sm text-gray-400 mt-1">
            Ready to copy directly into InVideo AI, Runway, Midjourney, ElevenLabs, or CapCut.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold font-mono text-xs flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all shrink-0"
        >
          {copiedAll ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
          <span>{copiedAll ? 'COPIED TO CLIPBOARD!' : 'COPY FULL MASTER SCRIPT'}</span>
        </button>
      </div>

      {/* Recommended Production Workflow Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tools.map((t) => (
          <div key={t.id} className="p-4 rounded-xl bg-gray-950/70 border border-gray-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-300">{t.name}</span>
              <p className="text-xs text-gray-300 mt-1">{t.desc}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-800/80 text-[10px] font-mono text-amber-300/90">
              💡 {t.tip}
            </div>
          </div>
        ))}
      </div>

      {/* Scene By Scene Script Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" /> Complete Scene Breakdown (12 Scenes)
        </h3>

        {scenes.map((scene) => (
          <div
            key={scene.id}
            className="p-5 rounded-2xl bg-gray-950/80 border border-gray-800/80 hover:border-cyan-800/60 transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-bold">
                  ACT {String(scene.id).padStart(2, '0')}
                </span>
                <h4 className="text-base font-bold text-white">{scene.title}</h4>
                <span className="text-xs text-gray-400">({scene.duration} seconds)</span>
              </div>

              <button
                onClick={() => handleCopyScene(scene)}
                className="px-3 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 text-xs font-mono text-cyan-300 border border-gray-700 flex items-center gap-1.5 transition-colors"
              >
                {copiedSceneId === scene.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSceneId === scene.id ? 'Copied' : 'Copy Prompt'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-bold block mb-1">
                  VOICEOVER NARRATION:
                </span>
                <p className="text-gray-200 bg-black/50 p-3 rounded-xl border border-gray-900 leading-relaxed italic">
                  "{scene.voiceover}"
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {scene.onScreenText.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/50">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-amber-400 font-bold block mb-1">
                  AI GENERATOR PROMPT (InVideo / Runway / Midjourney):
                </span>
                <p className="text-gray-300 font-mono text-[11px] bg-black/50 p-3 rounded-xl border border-gray-900 leading-relaxed">
                  {scene.aiPromptSnippet}
                </p>
                <div className="mt-2 text-[11px] text-gray-400 flex items-center gap-2">
                  <span className="text-gray-500 font-mono">Audio Cues:</span>
                  <span>{scene.soundCues.join(' • ')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
