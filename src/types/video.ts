export interface Scene {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: number; // in seconds
  voiceover: string;
  onScreenText: string[];
  visualDirection: string;
  soundCues: string[];
  techTags: string[];
  aiPromptSnippet: string;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number; // in seconds
  duration: number; // total in seconds
  currentSceneIndex: number;
  playbackSpeed: number; // 0.5, 0.75, 1, 1.25, 1.5, 2
  isMuted: boolean;
  voiceoverEnabled: boolean;
  soundEffectsEnabled: boolean;
  subtitlesEnabled: boolean;
  isFullscreen: boolean;
  voiceGender: 'female' | 'male';
  selectedVoiceName: string;
  timingPreset: 'cinematic' | 'detailed' | 'custom';
  isExporting: boolean;
  exportProgress: number;
}

export type AppTab = 'video' | 'studio' | 'demo';
