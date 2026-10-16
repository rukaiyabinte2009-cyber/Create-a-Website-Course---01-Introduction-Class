/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Film, Sparkles, Terminal, Play, Pause, Layers, HelpCircle, Code2, Download, Sliders } from 'lucide-react';
import { SCENES as INITIAL_SCENES } from './data/scenesData';
import type { PlaybackState, AppTab, Scene } from './types/video';
import { calculateSceneTimings, getCurrentSceneIndex, getSceneProgress, getTotalDuration } from './utils/videoTimeline';
import { soundEngine, narratorEngine } from './utils/audioSynthesizer';
import { VideoStage } from './components/video/VideoStage';
import { PlayerControls } from './components/video/PlayerControls';
import { VoiceAndTimingControls } from './components/video/VoiceAndTimingControls';
import { ExportModal } from './components/video/ExportModal';
import { ScriptPromptsStudio } from './components/studio/ScriptPromptsStudio';
import { LiveWebsiteBuilderDemo } from './components/demo/LiveWebsiteBuilderDemo';
import { recordFullTabBroadcastMP4, StreamVideoRecorder, getBestSupportedVideoMimeType } from './utils/videoExporter';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('video');
  const [scenes, setScenes] = useState<Scene[]>(INITIAL_SCENES);

  const totalDuration = getTotalDuration(scenes);
  const timings = calculateSceneTimings(scenes);

  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: totalDuration,
    currentSceneIndex: 0,
    playbackSpeed: 1,
    isMuted: false,
    voiceoverEnabled: true,
    soundEffectsEnabled: true,
    subtitlesEnabled: true,
    isFullscreen: false,
    voiceGender: 'female', // Default to woman's voice as requested!
    selectedVoiceName: narratorEngine.getSelectedVoiceName(),
    timingPreset: 'cinematic',
    isExporting: false,
    exportProgress: 0,
  });

  // Modal and Export State
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const videoStageContainerRef = useRef<HTMLDivElement | null>(null);
  const lastNarratedSceneRef = useRef<number | null>(null);
  const stopExportFnRef = useRef<(() => Promise<void>) | null>(null);
  const canvasRecorderRef = useRef<StreamVideoRecorder | null>(null);

  // Keep totalDuration in sync when scenes change
  useEffect(() => {
    setPlaybackState((prev) => ({
      ...prev,
      duration: totalDuration,
    }));
  }, [totalDuration]);

  // Ensure female voice is initialized on mount
  useEffect(() => {
    narratorEngine.setGender('female');
    setPlaybackState((prev) => ({
      ...prev,
      voiceGender: 'female',
      selectedVoiceName: narratorEngine.getSelectedVoiceName(),
    }));
  }, []);

  // Playback timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (playbackState.isPlaying) {
      soundEngine.startAmbientDrone();

      interval = setInterval(() => {
        setPlaybackState((prev) => {
          const step = 0.1 * prev.playbackSpeed;
          const nextTime = prev.currentTime + step;

          if (nextTime >= prev.duration) {
            // End of video reached
            soundEngine.stopAmbientDrone();
            narratorEngine.stop();
            return {
              ...prev,
              currentTime: 0,
              isPlaying: false,
              currentSceneIndex: 0,
            };
          }

          const sceneIdx = getCurrentSceneIndex(nextTime, timings);
          return {
            ...prev,
            currentTime: nextTime,
            currentSceneIndex: sceneIdx,
          };
        });
      }, 100);
    } else {
      soundEngine.stopAmbientDrone();
      narratorEngine.pause();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playbackState.isPlaying, playbackState.playbackSpeed, timings]);

  // Synchronize Voiceover Speech when Scene changes
  useEffect(() => {
    if (!playbackState.isPlaying || !playbackState.voiceoverEnabled) {
      if (!playbackState.voiceoverEnabled) narratorEngine.stop();
      return;
    }

    const currentScene = scenes[playbackState.currentSceneIndex];
    if (lastNarratedSceneRef.current !== playbackState.currentSceneIndex && currentScene) {
      lastNarratedSceneRef.current = playbackState.currentSceneIndex;
      narratorEngine.speak(currentScene.voiceover, undefined, playbackState.playbackSpeed);
    }
  }, [playbackState.currentSceneIndex, playbackState.isPlaying, playbackState.voiceoverEnabled, playbackState.playbackSpeed, scenes]);

  // Keyboard shortcut: Space to play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaybackState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Controls Handlers
  const handleTogglePlay = () => {
    setPlaybackState((prev) => {
      const willPlay = !prev.isPlaying;
      if (willPlay && prev.voiceoverEnabled) {
        const currentScene = scenes[prev.currentSceneIndex];
        narratorEngine.speak(currentScene.voiceover, undefined, prev.playbackSpeed);
      } else {
        narratorEngine.pause();
      }
      return { ...prev, isPlaying: willPlay };
    });
  };

  const handleSeek = (time: number) => {
    const clampedTime = Math.min(Math.max(time, 0), totalDuration);
    const newSceneIdx = getCurrentSceneIndex(clampedTime, timings);
    lastNarratedSceneRef.current = null; // force re-speak on seek if needed
    setPlaybackState((prev) => ({
      ...prev,
      currentTime: clampedTime,
      currentSceneIndex: newSceneIdx,
    }));
  };

  const handleSkipScene = (direction: 'prev' | 'next') => {
    const targetIdx =
      direction === 'prev'
        ? Math.max(playbackState.currentSceneIndex - 1, 0)
        : Math.min(playbackState.currentSceneIndex + 1, scenes.length - 1);
    handleJumpToScene(targetIdx);
  };

  const handleJumpToScene = (index: number) => {
    const timing = timings[index];
    if (timing) {
      handleSeek(timing.startTime);
    }
  };

  const handleReset = () => {
    lastNarratedSceneRef.current = null;
    narratorEngine.stop();
    setPlaybackState((prev) => ({
      ...prev,
      currentTime: 0,
      currentSceneIndex: 0,
      isPlaying: false,
    }));
  };

  const handleToggleMute = () => {
    setPlaybackState((prev) => {
      const nextMuted = !prev.isMuted;
      soundEngine.setMuted(nextMuted);
      return { ...prev, isMuted: nextMuted };
    });
  };

  const handleToggleVoiceover = () => {
    setPlaybackState((prev) => {
      const nextVoice = !prev.voiceoverEnabled;
      if (!nextVoice) narratorEngine.stop();
      return { ...prev, voiceoverEnabled: nextVoice };
    });
  };

  const handleToggleSoundEffects = () => {
    setPlaybackState((prev) => ({ ...prev, soundEffectsEnabled: !prev.soundEffectsEnabled }));
  };

  const handleToggleSubtitles = () => {
    setPlaybackState((prev) => ({ ...prev, subtitlesEnabled: !prev.subtitlesEnabled }));
  };

  const handleSetSpeed = (speed: number) => {
    setPlaybackState((prev) => ({ ...prev, playbackSpeed: speed }));
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoStageContainerRef.current?.requestFullscreen?.();
      setPlaybackState((prev) => ({ ...prev, isFullscreen: true }));
    } else {
      document.exitFullscreen?.();
      setPlaybackState((prev) => ({ ...prev, isFullscreen: false }));
    }
  };

  // Voice & Timing Handlers
  const handleToggleVoiceGender = (gender: 'female' | 'male') => {
    narratorEngine.setGender(gender);
    setPlaybackState((prev) => ({
      ...prev,
      voiceGender: gender,
      selectedVoiceName: narratorEngine.getSelectedVoiceName(),
    }));
  };

  const handleSelectVoiceName = (name: string) => {
    narratorEngine.setVoiceByName(name);
    setPlaybackState((prev) => ({
      ...prev,
      selectedVoiceName: name,
      voiceGender: narratorEngine.getGender(),
    }));
  };

  const handleUpdateSceneDuration = (sceneId: number, duration: number) => {
    setScenes((prev) =>
      prev.map((s) => (s.id === sceneId ? { ...s, duration: Math.max(duration, 5) } : s))
    );
  };

  const handleApplyPreset = (preset: 'cinematic' | 'detailed' | 'fast') => {
    if (preset === 'cinematic') {
      // Calibrated 3m 54s
      setScenes(INITIAL_SCENES);
    } else if (preset === 'detailed') {
      // Extended 5m 45s
      const multipliers = [1.4, 1.4, 1.5, 1.5, 1.4, 1.5, 1.5, 1.4, 1.5, 1.5, 1.4, 1.4];
      setScenes((prev) =>
        prev.map((s, idx) => ({
          ...s,
          duration: Math.round(s.duration * (multipliers[idx] || 1.4)),
        }))
      );
    } else {
      // Fast Trailer 2m 15s
      setScenes((prev) =>
        prev.map((s) => ({
          ...s,
          duration: Math.max(Math.round(s.duration * 0.6), 8),
        }))
      );
    }
  };

  // Export Flow
  const handleOpenExportModal = () => {
    setIsExportModalOpen(true);
  };

  const handleStartExport = async (mode: 'broadcast' | 'canvas') => {
    setIsRecording(true);
    setRecordingSeconds(0);

    if (mode === 'broadcast') {
      try {
        const session = await recordFullTabBroadcastMP4((sec) => setRecordingSeconds(sec));
        stopExportFnRef.current = session.stop;

        // Auto restart video from beginning and play
        handleReset();
        setPlaybackState((prev) => ({ ...prev, isPlaying: true }));
      } catch (err) {
        setIsRecording(false);
        alert('Could not start screen capture: ' + (err instanceof Error ? err.message : String(err)));
      }
    } else {
      // Canvas / Direct stream mode
      try {
        soundEngine.initContext();
        const synthStream = soundEngine.getAudioStream();
        // Create canvas capture or stream
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const stream = canvas.captureStream(30);

        if (synthStream && synthStream.getAudioTracks().length > 0) {
          stream.addTrack(synthStream.getAudioTracks()[0]);
        }

        const recorder = new StreamVideoRecorder();
        recorder.startRecording(stream);
        canvasRecorderRef.current = recorder;

        const timer = setInterval(() => {
          setRecordingSeconds((s) => s + 1);
        }, 1000);

        stopExportFnRef.current = async () => {
          clearInterval(timer);
          const result = await recorder.stopRecording();
          const a = document.createElement('a');
          a.href = result.url;
          a.download = 'build-anything-cinematic-intro.mp4';
          a.click();
        };

        handleReset();
        setPlaybackState((prev) => ({ ...prev, isPlaying: true }));
      } catch (err) {
        setIsRecording(false);
        alert('Direct stream error: ' + (err instanceof Error ? err.message : String(err)));
      }
    }
  };

  const handleStopExport = async () => {
    if (stopExportFnRef.current) {
      await stopExportFnRef.current();
      stopExportFnRef.current = null;
    }
    setIsRecording(false);
    setIsExportModalOpen(false);
  };

  // Compute active scene details
  const activeScene = scenes[playbackState.currentSceneIndex] || scenes[0];
  const activeTiming = timings[playbackState.currentSceneIndex] || timings[0];
  const sceneProgress = getSceneProgress(playbackState.currentTime, activeTiming);

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#030712]/90 backdrop-blur-md border-b border-gray-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              BUILD ANYTHING <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold">STUDIO</span>
            </h1>
            <p className="text-[11px] text-gray-400 font-mono hidden sm:block">
              Cinematic Video Experience & Course Production
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-gray-900/90 p-1 rounded-xl border border-gray-800 overflow-x-auto max-w-[240px] sm:max-w-none">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cinematic Video</span>
            <span className="sm:hidden">Video</span>
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'studio'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Script & AI Prompts</span>
            <span className="sm:hidden">Prompts</span>
          </button>

          <button
            onClick={() => setActiveTab('demo')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'demo'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live 60s Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col justify-center">
        {activeTab === 'video' && (
          <div className="space-y-5 max-w-5xl mx-auto w-full">
            {/* The 16:9 Cinematic Video Stage */}
            <VideoStage
              scene={activeScene}
              sceneIndex={playbackState.currentSceneIndex}
              sceneProgress={sceneProgress}
              isPlaying={playbackState.isPlaying}
              subtitlesEnabled={playbackState.subtitlesEnabled}
              isFullscreen={playbackState.isFullscreen}
              containerRef={videoStageContainerRef}
            />

            {/* Video Player Controls with EXPORT MP4 button */}
            <PlayerControls
              playbackState={playbackState}
              scenes={scenes}
              onTogglePlay={handleTogglePlay}
              onSeek={handleSeek}
              onSkipScene={handleSkipScene}
              onJumpToScene={handleJumpToScene}
              onReset={handleReset}
              onToggleMute={handleToggleMute}
              onToggleVoiceover={handleToggleVoiceover}
              onToggleSoundEffects={handleToggleSoundEffects}
              onToggleSubtitles={handleToggleSubtitles}
              onSetSpeed={handleSetSpeed}
              onToggleFullscreen={handleToggleFullscreen}
              onExportVideo={handleOpenExportModal}
              isRecording={isRecording}
            />

            {/* Voice & Timing Calibration Panel (Female Voice preference & Timing Sliders) */}
            <VoiceAndTimingControls
              scenes={scenes}
              onUpdateSceneDuration={handleUpdateSceneDuration}
              onApplyPreset={handleApplyPreset}
              voiceGender={playbackState.voiceGender}
              onToggleVoiceGender={handleToggleVoiceGender}
              selectedVoiceName={playbackState.selectedVoiceName}
              onSelectVoiceName={handleSelectVoiceName}
            />
          </div>
        )}

        {activeTab === 'studio' && <ScriptPromptsStudio scenes={scenes} />}

        {activeTab === 'demo' && <LiveWebsiteBuilderDemo />}
      </main>

      {/* MediaRecorder MP4 Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onStartExport={handleStartExport}
        isRecording={isRecording}
        recordingSeconds={recordingSeconds}
        onStopExport={handleStopExport}
      />

      {/* Footer */}
      <footer className="border-t border-gray-800/60 py-4 px-6 text-center text-xs font-mono text-gray-500">
        Build Anything: How Websites & Apps Come to Life • Designed for Teachers, Students & Professionals
      </footer>
    </div>
  );
}
