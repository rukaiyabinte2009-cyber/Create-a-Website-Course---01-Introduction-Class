/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Film, Sparkles, Terminal, Play, Pause, Layers, HelpCircle, Code2, Download } from 'lucide-react';
import { SCENES } from './data/scenesData';
import type { PlaybackState, AppTab } from './types/video';
import { calculateSceneTimings, getCurrentSceneIndex, getSceneProgress, getTotalDuration } from './utils/videoTimeline';
import { soundEngine, narratorEngine } from './utils/audioSynthesizer';
import { VideoStage } from './components/video/VideoStage';
import { PlayerControls } from './components/video/PlayerControls';
import { ScriptPromptsStudio } from './components/studio/ScriptPromptsStudio';
import { LiveWebsiteBuilderDemo } from './components/demo/LiveWebsiteBuilderDemo';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('video');
  const totalDuration = getTotalDuration(SCENES);
  const timings = calculateSceneTimings(SCENES);

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
  });

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const videoStageContainerRef = useRef<HTMLDivElement | null>(null);

  const lastNarratedSceneRef = useRef<number | null>(null);

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

    const currentScene = SCENES[playbackState.currentSceneIndex];
    if (lastNarratedSceneRef.current !== playbackState.currentSceneIndex && currentScene) {
      lastNarratedSceneRef.current = playbackState.currentSceneIndex;
      narratorEngine.speak(currentScene.voiceover, undefined, playbackState.playbackSpeed);
    }
  }, [playbackState.currentSceneIndex, playbackState.isPlaying, playbackState.voiceoverEnabled, playbackState.playbackSpeed]);

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
        const currentScene = SCENES[prev.currentSceneIndex];
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
        : Math.min(playbackState.currentSceneIndex + 1, SCENES.length - 1);
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

  // Screen / Video export feature
  const handleExportVideo = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    try {
      // Prompt user to select this tab or screen to record
      if (!navigator.mediaDevices?.getDisplayMedia) {
        alert('Screen recording is not supported in this browser environment. You can copy the master prompts in the Studio tab!');
        return;
      }

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' },
        audio: true,
      });

      recordedChunksRef.current = [];
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `build-anything-intro-video.webm`;
        a.click();
        URL.revokeObjectURL(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      // Automatically start playing from beginning
      handleReset();
      setPlaybackState((prev) => ({ ...prev, isPlaying: true }));
    } catch {
      // User cancelled recording prompt
      setIsRecording(false);
    }
  };

  // Compute active scene details
  const activeScene = SCENES[playbackState.currentSceneIndex] || SCENES[0];
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
        <div className="flex items-center gap-1 bg-gray-900/90 p-1 rounded-xl border border-gray-800 overflow-x-auto max-w-[220px] sm:max-w-none">
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
          <div className="space-y-4 max-w-5xl mx-auto w-full">
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

            {/* Video Player Controls */}
            <PlayerControls
              playbackState={playbackState}
              scenes={SCENES}
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
              onExportVideo={handleExportVideo}
              isRecording={isRecording}
            />

            {/* Quick Context & Guide */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 text-xs text-gray-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">Pro Tip:</span>
                <span>Press Spacebar to Play/Pause • Use the scrubber to jump to any of the 12 acts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">Total Duration:</span>
                <span className="text-white font-bold">{Math.floor(totalDuration / 60)} min {totalDuration % 60} sec</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'studio' && <ScriptPromptsStudio scenes={SCENES} />}

        {activeTab === 'demo' && <LiveWebsiteBuilderDemo />}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/60 py-4 px-6 text-center text-xs font-mono text-gray-500">
        Build Anything: How Websites & Apps Come to Life • Designed for Teachers, Students & Professionals
      </footer>
    </div>
  );
}
