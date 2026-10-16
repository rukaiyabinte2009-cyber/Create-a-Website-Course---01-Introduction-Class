import React, { useState, useEffect } from 'react';
import { Sliders, User, Mic, Clock, Volume2, Sparkles, ChevronDown, ChevronUp, Play } from 'lucide-react';
import type { Scene } from '../../types/video.ts';
import { narratorEngine } from '../../utils/audioSynthesizer';
import { formatTime } from '../../utils/videoTimeline';

interface VoiceAndTimingProps {
  scenes: Scene[];
  onUpdateSceneDuration: (sceneId: number, duration: number) => void;
  onApplyPreset: (preset: 'cinematic' | 'detailed' | 'fast') => void;
  voiceGender: 'female' | 'male';
  onToggleVoiceGender: (gender: 'female' | 'male') => void;
  selectedVoiceName: string;
  onSelectVoiceName: (name: string) => void;
}

export const VoiceAndTimingControls: React.FC<VoiceAndTimingProps> = ({
  scenes,
  onUpdateSceneDuration,
  onApplyPreset,
  voiceGender,
  onToggleVoiceGender,
  selectedVoiceName,
  onSelectVoiceName,
}) => {
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showFineTune, setShowFineTune] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  useEffect(() => {
    const voices = narratorEngine.getVoices();
    setAvailableVoices(voices);
  }, []);

  const handlePreviewVoice = () => {
    setIsPlayingPreview(true);
    narratorEngine.speak(
      'Welcome to the beginning of your journey. Your website, live today.',
      () => setIsPlayingPreview(false)
    );
  };

  const totalSecs = scenes.reduce((a, b) => a + b.duration, 0);

  return (
    <div className="w-full bg-gray-950/90 border border-gray-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Voice & Timing Calibration
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-gray-400">Total Duration:</span>
          <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
            {formatTime(totalSecs)} ({totalSecs}s)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Voice Settings (Explicit Female Voice Preference) */}
        <div className="p-4 rounded-xl bg-black/60 border border-gray-850 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-300 font-bold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-pink-400" /> Narrator Voice
            </span>

            {/* Gender Toggle */}
            <div className="flex items-center gap-1 bg-gray-900 p-1 rounded-lg border border-gray-800 text-[11px] font-mono">
              <button
                onClick={() => onToggleVoiceGender('female')}
                className={`px-2.5 py-0.5 rounded transition-colors ${
                  voiceGender === 'female'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Woman (Default)
              </button>
              <button
                onClick={() => onToggleVoiceGender('male')}
                className={`px-2.5 py-0.5 rounded transition-colors ${
                  voiceGender === 'male'
                    ? 'bg-blue-600 text-white font-bold shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Man
              </button>
            </div>
          </div>

          {/* Voice Dropdown */}
          <div>
            <label className="text-[11px] font-mono text-gray-400 block mb-1">Select System Voice:</label>
            <select
              value={selectedVoiceName}
              onChange={(e) => onSelectVoiceName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {availableVoices.length > 0 ? (
                availableVoices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))
              ) : (
                <option value="default">Default Natural Female Voice</option>
              )}
            </select>
          </div>

          {/* Voice Preview Button */}
          <button
            onClick={handlePreviewVoice}
            disabled={isPlayingPreview}
            className="w-full py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-pink-300 text-xs font-mono border border-pink-500/30 flex items-center justify-center gap-2 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isPlayingPreview ? 'Speaking Preview...' : 'Test Female Voice Preview'}</span>
          </button>
        </div>

        {/* 2. Timing Presets */}
        <div className="p-4 rounded-xl bg-black/60 border border-gray-850 space-y-3">
          <span className="text-xs font-mono text-gray-300 font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> Timing Synchrony Presets
          </span>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onApplyPreset('cinematic')}
              className="p-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-left transition-all"
            >
              <span className="text-[11px] font-mono font-bold text-cyan-300 block">Cinematic</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">3m 54s (Paced)</span>
            </button>

            <button
              onClick={() => onApplyPreset('detailed')}
              className="p-2.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-500/40 text-left transition-all"
            >
              <span className="text-[11px] font-mono font-bold text-blue-300 block">Extended</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">5m 45s (Deep)</span>
            </button>

            <button
              onClick={() => onApplyPreset('fast')}
              className="p-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 text-left transition-all"
            >
              <span className="text-[11px] font-mono font-bold text-amber-300 block">Trailer</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">2m 15s (Fast)</span>
            </button>
          </div>

          <p className="text-[11px] text-gray-400 leading-snug">
            Each scene's duration has been calibrated so the female voiceover never rushes, with smooth breathing room before each visual transition.
          </p>
        </div>
      </div>

      {/* 3. Accordion: Fine-Tune Individual Scene Timings */}
      <div className="border border-gray-800 rounded-xl overflow-hidden bg-black/40">
        <button
          onClick={() => setShowFineTune(!showFineTune)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono text-gray-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fine-Tune Individual Scene Durations (12 Scenes)</span>
          </span>
          {showFineTune ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showFineTune && (
          <div className="p-4 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {scenes.map((scene) => (
              <div key={scene.id} className="p-2.5 rounded-lg bg-gray-900/70 border border-gray-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-gray-300 font-semibold truncate max-w-[140px]">
                    {scene.id}. {scene.title}
                  </span>
                  <span className="text-cyan-300 font-bold">{scene.duration}s</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="45"
                  step="1"
                  value={scene.duration}
                  onChange={(e) => onUpdateSceneDuration(scene.id, Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-gray-800 rounded cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
