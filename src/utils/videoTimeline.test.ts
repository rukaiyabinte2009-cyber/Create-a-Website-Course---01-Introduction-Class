import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSceneTimings,
  getTotalDuration,
  getCurrentSceneIndex,
  getSceneProgress,
  formatTime,
  generateMasterVideoPrompt
} from './videoTimeline.ts';
import type { Scene } from '../types/video.ts';

const mockScenes: Scene[] = [
  {
    id: 1,
    slug: 'scene-1',
    title: 'The First Spark',
    subtitle: 'A single blinking cursor',
    duration: 16,
    voiceover: 'Every digital experience begins somewhere.',
    onScreenText: ['AN IDEA.', 'A FEW INSTRUCTIONS.'],
    visualDirection: 'Black screen, cursor blinks, spark forms.',
    soundCues: ['Electronic hum', 'Bass drop'],
    techTags: ['Terminal', 'Code Spark'],
    aiPromptSnippet: 'Cinematic black screen with cyan blinking cursor.'
  },
  {
    id: 2,
    slug: 'scene-2',
    title: 'The Digital Universe',
    subtitle: 'Logos emerge and slide',
    duration: 20,
    voiceover: 'Think about the things you use every day.',
    onScreenText: ['BANKING.', 'EDUCATION.', 'SOFTWARE.'],
    visualDirection: 'Central sphere, logos pop up and slide left and right.',
    soundCues: ['Laser whoosh', 'City swell'],
    techTags: ['Networks', 'Constellation'],
    aiPromptSnippet: '3D floating banking and school icons gliding.'
  },
  {
    id: 3,
    slug: 'scene-3',
    title: 'What is Software?',
    subtitle: 'Logic and instructions',
    duration: 18,
    voiceover: 'Software is a collection of instructions.',
    onScreenText: ['LOGIC.', 'PURPOSE.'],
    visualDirection: 'Circuit board transforming into apps.',
    soundCues: ['Circuit pulse'],
    techTags: ['Architecture', 'Logic'],
    aiPromptSnippet: 'Isometric glowing microprocessor circuit.'
  }
];

test('calculateSceneTimings computes correct cumulative bounds', () => {
  const timings = calculateSceneTimings(mockScenes);
  assert.equal(timings.length, 3);
  assert.deepEqual(timings[0], { sceneId: 1, startTime: 0, endTime: 16, duration: 16 });
  assert.deepEqual(timings[1], { sceneId: 2, startTime: 16, endTime: 36, duration: 20 });
  assert.deepEqual(timings[2], { sceneId: 3, startTime: 36, endTime: 54, duration: 18 });
});

test('getTotalDuration aggregates scene durations accurately', () => {
  const total = getTotalDuration(mockScenes);
  assert.equal(total, 54);
});

test('getCurrentSceneIndex resolves correct active scene', () => {
  const timings = calculateSceneTimings(mockScenes);
  assert.equal(getCurrentSceneIndex(0, timings), 0);
  assert.equal(getCurrentSceneIndex(10, timings), 0);
  assert.equal(getCurrentSceneIndex(16, timings), 1);
  assert.equal(getCurrentSceneIndex(35.9, timings), 1);
  assert.equal(getCurrentSceneIndex(36, timings), 2);
  assert.equal(getCurrentSceneIndex(53, timings), 2);
  assert.equal(getCurrentSceneIndex(100, timings), 2); // clamped to last
});

test('getSceneProgress computes relative ratio 0.0 to 1.0', () => {
  const timings = calculateSceneTimings(mockScenes);
  assert.equal(getSceneProgress(0, timings[0]), 0);
  assert.equal(getSceneProgress(8, timings[0]), 0.5);
  assert.equal(getSceneProgress(16, timings[0]), 1);
});

test('formatTime formats minutes and seconds with zero padding', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(234), '03:54');
  assert.equal(formatTime(420), '07:00');
});

test('generateMasterVideoPrompt contains title and scene descriptions', () => {
  const prompt = generateMasterVideoPrompt(mockScenes);
  assert.match(prompt, /BUILD ANYTHING/);
  assert.match(prompt, /THE FIRST SPARK/);
  assert.match(prompt, /THE DIGITAL UNIVERSE/);
});
