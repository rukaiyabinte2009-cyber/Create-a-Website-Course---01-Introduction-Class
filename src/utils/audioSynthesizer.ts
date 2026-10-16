/**
 * Real Web Audio API cinematic sound engine and Web Speech API narrator.
 * Zero external audio dependencies; synthesizes movie-grade audio directly.
 * Equipped with MediaStream destination for recording / MediaRecorder export.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private mediaDest: MediaStreamAudioDestinationNode | null = null;

  public initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        try {
          this.mediaDest = this.ctx.createMediaStreamDestination();
        } catch {
          // Fallback if media destination not supported
        }
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Returns a MediaStream of the synthesized audio for MediaRecorder!
   */
  public getAudioStream(): MediaStream | null {
    this.initContext();
    return this.mediaDest ? this.mediaDest.stream : null;
  }

  private connectToOutputs(node: AudioNode) {
    if (this.ctx) {
      node.connect(this.ctx.destination);
      if (this.mediaDest) {
        try {
          node.connect(this.mediaDest);
        } catch {
          // ignore
        }
      }
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain) {
      this.ambientGain.gain.value = muted ? 0 : 0.04;
    }
  }

  /**
   * Continuous subtle sci-fi electronic drone in the background.
   */
  public startAmbientDrone() {
    if (this.ambientOsc) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      // Low pass filter for warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.035, this.ctx.currentTime);

      this.ambientOsc.connect(filter);
      filter.connect(this.ambientGain);
      this.connectToOutputs(this.ambientGain);

      this.ambientOsc.start();
    } catch {
      // Ignore audio start failures if blocked by user autoplay policy
    }
  }

  public stopAmbientDrone() {
    if (this.ambientOsc) {
      try {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
      } catch {
        // cleanup
      }
      this.ambientOsc = null;
      this.ambientGain = null;
    }
  }

  /**
   * Deep cinematic sub-bass impact (Braam).
   */
  public playSubBassDrop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 1.2);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(gain);
      this.connectToOutputs(gain);

      osc.start(now);
      osc.stop(now + 1.5);
    } catch {
      // Audio fallback
    }
  }

  /**
   * High-tech laser / sliding logo whoosh.
   */
  public playWhoosh(pitch = 440) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 2.2, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, now + 0.35);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(pitch * 1.5, now);
      filter.Q.value = 3;

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      this.connectToOutputs(gain);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Mechanical keyboard click.
   */
  public playKeyboardClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      this.connectToOutputs(gain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Security shield activation pulse.
   */
  public playShieldHum() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(320, now + 0.4);
      osc.frequency.linearRampToValueAtTime(220, now + 0.8);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      this.connectToOutputs(gain);

      osc.start(now);
      osc.stop(now + 0.8);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Triumphant deployment chime.
   */
  public playDeployChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        const startTime = now + idx * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

        osc.connect(gain);
        this.connectToOutputs(gain);

        osc.start(startTime);
        osc.stop(startTime + 1.2);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const soundEngine = new SoundEngine();

/**
 * Speech synthesis narrator engine with explicit female voice preference & selector.
 */
class NarratorEngine {
  private isSpeaking: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private gender: 'female' | 'male' = 'female';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.updateVoices();
      window.speechSynthesis.onvoiceschanged = () => this.updateVoices();
    }
  }

  public setGender(gender: 'female' | 'male') {
    this.gender = gender;
    this.updateVoices();
  }

  public getGender(): 'female' | 'male' {
    return this.gender;
  }

  private isFemaleVoice(name: string): boolean {
    const n = name.toLowerCase();
    return (
      n.includes('female') ||
      n.includes('samantha') ||
      n.includes('victoria') ||
      n.includes('karen') ||
      n.includes('zira') ||
      n.includes('fiona') ||
      n.includes('moira') ||
      n.includes('tessa') ||
      n.includes('serena') ||
      n.includes('agnes') ||
      n.includes('allison') ||
      n.includes('ava') ||
      n.includes('kate') ||
      n.includes('susan') ||
      n.includes('stephanie') ||
      n.includes('jenny') ||
      n.includes('aria') ||
      n.includes('emma') ||
      n.includes('sonia') ||
      n.includes('natural')
    );
  }

  private updateVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return;

    const enVoices = voices.filter((v) => v.lang.startsWith('en'));

    if (this.gender === 'female') {
      const preferred =
        enVoices.find((v) => this.isFemaleVoice(v.name)) ||
        enVoices.find((v) => v.name.includes('Google') || v.name.includes('Natural')) ||
        enVoices[0];
      if (preferred) this.selectedVoice = preferred;
    } else {
      const preferred =
        enVoices.find((v) => !this.isFemaleVoice(v.name) && (v.name.includes('David') || v.name.includes('Daniel') || v.name.includes('Guy') || v.name.includes('Male'))) ||
        enVoices.find((v) => !this.isFemaleVoice(v.name)) ||
        enVoices[0];
      if (preferred) this.selectedVoice = preferred;
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    return window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));
  }

  public getSelectedVoiceName(): string {
    return this.selectedVoice ? this.selectedVoice.name : 'Default Female Voice';
  }

  public setVoiceByName(voiceName: string) {
    const voices = this.getVoices();
    const found = voices.find((v) => v.name === voiceName);
    if (found) {
      this.selectedVoice = found;
      this.gender = this.isFemaleVoice(found.name) ? 'female' : 'male';
    }
  }

  public setVoice(voice: SpeechSynthesisVoice) {
    this.selectedVoice = voice;
  }

  public speak(text: string, onEnd?: () => void, rate = 1.0) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = Math.min(Math.max(rate, 0.8), 1.4);
    // Set pitch higher for feminine, crystal-clear narration
    utterance.pitch = this.gender === 'female' ? 1.15 : 0.95;
    utterance.volume = 1.0;

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    this.currentUtterance = utterance;
    this.isSpeaking = true;
    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  public pause() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  public resume() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }
}

export const narratorEngine = new NarratorEngine();
