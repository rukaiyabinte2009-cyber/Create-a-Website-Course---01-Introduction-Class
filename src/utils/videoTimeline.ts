import type { Scene } from '../types/video.ts';

export interface SceneTiming {
  sceneId: number;
  startTime: number;
  endTime: number;
  duration: number;
}

/**
 * Calculates start and end timestamps for each scene.
 */
export function calculateSceneTimings(scenes: Scene[]): SceneTiming[] {
  let accumulated = 0;
  return scenes.map((scene) => {
    const start = accumulated;
    const end = accumulated + scene.duration;
    accumulated = end;
    return {
      sceneId: scene.id,
      startTime: start,
      endTime: end,
      duration: scene.duration,
    };
  });
}

/**
 * Gets total duration of all scenes in seconds.
 */
export function getTotalDuration(scenes: Scene[]): number {
  return scenes.reduce((total, scene) => total + scene.duration, 0);
}

/**
 * Finds which scene is currently active given the current playback time.
 */
export function getCurrentSceneIndex(time: number, timings: SceneTiming[]): number {
  if (timings.length === 0) return 0;
  if (time <= 0) return 0;
  for (let i = 0; i < timings.length; i++) {
    if (time >= timings[i].startTime && time < timings[i].endTime) {
      return i;
    }
  }
  return timings.length - 1;
}

/**
 * Calculates progress within the current scene (0.0 to 1.0).
 */
export function getSceneProgress(time: number, timing: SceneTiming): number {
  if (!timing || timing.duration <= 0) return 0;
  const elapsed = time - timing.startTime;
  const ratio = elapsed / timing.duration;
  return Math.min(Math.max(ratio, 0), 1);
}

/**
 * Formats seconds into MM:SS format.
 */
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Generates an all-in-one exportable prompt document for AI video tools.
 */
export function generateMasterVideoPrompt(scenes: Scene[]): string {
  const header = `=== BUILD ANYTHING: CINEMATIC PROMOTIONAL FILM & COURSE INTRO ===\n` +
    `Target Duration: ${formatTime(getTotalDuration(scenes))} (12 Scenes)\n` +
    `Style: Modern Cinematic 3D Motion Graphics, Midnight Navy (#030712) with Electric Cyan (#06B6D4) and Golden Amber (#F59E0B) accents.\n` +
    `Vibe: High-tech software company launch keynote, inspiring, sophisticated, kinetic typography, faceless.\n\n`;

  const sceneBlocks = scenes
    .map((scene, idx) => {
      return `[SCENE ${scene.id}: ${scene.title.toUpperCase()}] (${scene.duration}s)\n` +
        `Visual Direction:\n${scene.visualDirection}\n\n` +
        `Voiceover Narration:\n"${scene.voiceover}"\n\n` +
        `On-Screen Kinetic Text:\n${scene.onScreenText.join(' | ')}\n\n` +
        `AI Generator Prompt:\n${scene.aiPromptSnippet}\n` +
        `------------------------------------------------------------\n`;
    })
    .join('\n');

  return header + sceneBlocks;
}
