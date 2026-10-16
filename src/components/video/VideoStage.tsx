import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Scene } from '../../types/video.ts';
import { Scene1Spark } from '../scenes/Scene1Spark';
import { Scene2LogosReveal } from '../scenes/Scene2LogosReveal';
import { Scene3WhatIsSoftware } from '../scenes/Scene3WhatIsSoftware';
import { Scene4ThreeForms } from '../scenes/Scene4ThreeForms';
import { Scene5HowItWorks } from '../scenes/Scene5HowItWorks';
import { Scene6WhyBuild } from '../scenes/Scene6WhyBuild';
import { Scene7CodeTerminal } from '../scenes/Scene7CodeTerminal';
import { Scene8Languages } from '../scenes/Scene8Languages';
import { Scene9CyberSecurity } from '../scenes/Scene9CyberSecurity';
import { Scene10WebsiteLive } from '../scenes/Scene10WebsiteLive';
import { Scene11CourseRoadmap } from '../scenes/Scene11CourseRoadmap';
import { Scene12Finale } from '../scenes/Scene12Finale';

interface VideoStageProps {
  scene: Scene;
  sceneIndex: number;
  sceneProgress: number; // 0 to 1
  isPlaying: boolean;
  subtitlesEnabled: boolean;
  isFullscreen: boolean;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const VideoStage: React.FC<VideoStageProps> = ({
  scene,
  sceneIndex,
  sceneProgress,
  isPlaying,
  subtitlesEnabled,
  isFullscreen,
  containerRef,
}) => {
  const renderScene = () => {
    switch (scene.id) {
      case 1:
        return <Scene1Spark progress={sceneProgress} isActive={isPlaying} />;
      case 2:
        return <Scene2LogosReveal progress={sceneProgress} isActive={isPlaying} />;
      case 3:
        return <Scene3WhatIsSoftware progress={sceneProgress} isActive={isPlaying} />;
      case 4:
        return <Scene4ThreeForms progress={sceneProgress} isActive={isPlaying} />;
      case 5:
        return <Scene5HowItWorks progress={sceneProgress} isActive={isPlaying} />;
      case 6:
        return <Scene6WhyBuild progress={sceneProgress} isActive={isPlaying} />;
      case 7:
        return <Scene7CodeTerminal progress={sceneProgress} isActive={isPlaying} />;
      case 8:
        return <Scene8Languages progress={sceneProgress} isActive={isPlaying} />;
      case 9:
        return <Scene9CyberSecurity progress={sceneProgress} isActive={isPlaying} />;
      case 10:
        return <Scene10WebsiteLive progress={sceneProgress} isActive={isPlaying} />;
      case 11:
        return <Scene11CourseRoadmap progress={sceneProgress} isActive={isPlaying} />;
      case 12:
        return <Scene12Finale progress={sceneProgress} isActive={isPlaying} />;
      default:
        return <Scene1Spark progress={sceneProgress} isActive={isPlaying} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[16/9] min-h-[300px] sm:min-h-[380px] md:min-h-[480px] bg-black rounded-2xl overflow-hidden border border-cyan-900/40 shadow-2xl flex flex-col justify-between ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none aspect-auto h-screen' : ''
      }`}
    >
      {/* Active Scene Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>

      {/* Top HUD Overlay (Cinematic Timecode & Scene Badge) */}
      <div className="relative z-30 p-4 sm:p-6 flex items-center justify-between pointer-events-none select-none">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-800 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-gray-400">ACT {String(sceneIndex + 1).padStart(2, '0')}/12:</span>
          <span className="text-cyan-300 font-bold">{scene.title}</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-800 text-xs font-mono text-gray-400">
          <span>4K UHD 60FPS</span>
          <span className="text-gray-600">•</span>
          <span className="text-emerald-400">REC ●</span>
        </div>
      </div>

      {/* Kinetic Closed Captions / Subtitles Overlay */}
      {subtitlesEnabled && (
        <div className="relative z-30 px-6 pb-3 pointer-events-none flex justify-center">
          <motion.div
            key={scene.voiceover}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl bg-black/90 backdrop-blur-md px-5 py-2 rounded-xl border border-cyan-500/30 text-center shadow-2xl"
          >
            <p className="text-xs sm:text-sm font-medium text-cyan-200 leading-snug">
              "{scene.voiceover}"
            </p>
          </motion.div>
        </div>
      )}

      {/* Scanline texture */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-25" />
    </div>
  );
};
