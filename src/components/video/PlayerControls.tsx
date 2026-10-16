import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Subtitles,
  Maximize2,
  Minimize2,
  Download,
  Gauge
} from 'lucide-react';
import type { Scene, PlaybackState } from '../../types/video.ts';
import { calculateSceneTimings, formatTime } from '../../utils/videoTimeline.ts';

interface PlayerControlsProps {
  playbackState: PlaybackState;
  scenes: Scene[];
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onSkipScene: (direction: 'prev' | 'next') => void;
  onJumpToScene: (index: number) => void;
  onReset: () => void;
  onToggleMute: () => void;
  onToggleVoiceover: () => void;
  onToggleSoundEffects: () => void;
  onToggleSubtitles: () => void;
  onSetSpeed: (speed: number) => void;
  onToggleFullscreen: () => void;
  onExportVideo?: () => void;
  isRecording?: boolean;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  playbackState,
  scenes,
  onTogglePlay,
  onSeek,
  onSkipScene,
  onJumpToScene,
  onReset,
  onToggleMute,
  onToggleVoiceover,
  onToggleSoundEffects,
  onToggleSubtitles,
  onSetSpeed,
  onToggleFullscreen,
  onExportVideo,
  isRecording,
}) => {
  const timings = calculateSceneTimings(scenes);
  const totalDuration = playbackState.duration;
  const progressPercent = totalDuration > 0 ? (playbackState.currentTime / totalDuration) * 100 : 0;

  const speeds = [0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="w-full bg-gray-950/95 border border-gray-800 rounded-2xl p-4 shadow-xl backdrop-blur-md space-y-3">
      {/* 1. Timeline Scrubber with Scene Chapter Markers */}
      <div className="relative group select-none">
        {/* Progress Bar Container */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            onSeek(clickPos * totalDuration);
          }}
          className="relative w-full h-3 bg-gray-900 rounded-full cursor-pointer overflow-hidden border border-gray-800 transition-all group-hover:h-4"
        >
          {/* Active Fill */}
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 rounded-full transition-all duration-75 relative"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Scene Chapter Dividers */}
          {timings.map((t, idx) => {
            if (idx === 0) return null;
            const leftPercent = (t.startTime / totalDuration) * 100;
            return (
              <div
                key={t.sceneId}
                className="absolute top-0 bottom-0 w-[2px] bg-black/80 hover:bg-white z-10"
                style={{ left: `${leftPercent}%` }}
                title={`Scene ${t.sceneId}: ${scenes[idx].title}`}
              />
            );
          })}
        </div>

        {/* Hover chapter indicator below */}
        <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mt-1.5">
          <span>{formatTime(playbackState.currentTime)}</span>
          <span className="text-cyan-400 font-semibold truncate max-w-[200px] sm:max-w-md text-center">
            {scenes[playbackState.currentSceneIndex]?.title}
          </span>
          <span>{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* 2. Primary Playback Buttons & Audio Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Playback Transport Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 transition-colors"
            title="Restart from beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSkipScene('prev')}
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 transition-colors"
            title="Previous Scene"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all"
            title={playbackState.isPlaying ? 'Pause' : 'Play'}
          >
            {playbackState.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span className="text-xs font-mono">{playbackState.isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>

          <button
            onClick={() => onSkipScene('next')}
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 transition-colors"
            title="Next Scene"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Scene Chapter Quick Select Dropdown */}
        <div className="hidden md:flex items-center">
          <select
            value={playbackState.currentSceneIndex}
            onChange={(e) => onJumpToScene(Number(e.target.value))}
            className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {scenes.map((s, idx) => (
              <option key={s.id} value={idx}>
                {String(s.id).padStart(2, '0')}. {s.title} ({s.duration}s)
              </option>
            ))}
          </select>
        </div>

        {/* Audio, Speech, Subtitles & Speed Settings */}
        <div className="flex items-center gap-2">
          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-gray-900 px-2 py-1 rounded-xl border border-gray-800 text-xs font-mono">
            <Gauge className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={playbackState.playbackSpeed}
              onChange={(e) => onSetSpeed(Number(e.target.value))}
              className="bg-transparent text-cyan-300 focus:outline-none cursor-pointer"
            >
              {speeds.map((sp) => (
                <option key={sp} value={sp} className="bg-gray-900 text-white">
                  {sp}x
                </option>
              ))}
            </select>
          </div>

          {/* Voiceover Speech Toggle */}
          <button
            onClick={onToggleVoiceover}
            className={`p-2 rounded-xl border transition-colors ${
              playbackState.voiceoverEnabled
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-gray-900 border-gray-800 text-gray-500'
            }`}
            title={playbackState.voiceoverEnabled ? 'Voiceover Narrator: Enabled' : 'Voiceover Narrator: Muted'}
          >
            {playbackState.voiceoverEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* Subtitles Toggle */}
          <button
            onClick={onToggleSubtitles}
            className={`p-2 rounded-xl border transition-colors ${
              playbackState.subtitlesEnabled
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-gray-900 border-gray-800 text-gray-500'
            }`}
            title={playbackState.subtitlesEnabled ? 'Captions: ON' : 'Captions: OFF'}
          >
            <Subtitles className="w-4 h-4" />
          </button>

          {/* Sound Effects & Music Mute */}
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-xl border transition-colors ${
              !playbackState.isMuted
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-gray-900 border-gray-800 text-gray-500'
            }`}
            title={playbackState.isMuted ? 'Unmute Audio FX' : 'Mute Audio FX'}
          >
            {playbackState.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 transition-colors"
            title={playbackState.isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {playbackState.isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Download / Export Video Button */}
          {onExportVideo && (
            <button
              onClick={onExportVideo}
              className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                isRecording
                  ? 'bg-red-500/20 border-red-500 text-red-300 animate-pulse'
                  : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30'
              }`}
              title="Record and download this video as a file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isRecording ? 'RECORDING...' : 'EXPORT VIDEO'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
