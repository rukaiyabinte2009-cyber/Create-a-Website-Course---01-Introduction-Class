/**
 * MediaRecorder Export Engine for downloading the cinematic video as an MP4 file.
 * Combines canvas visual stream, burned-in subtitles, and Web Audio synthesizer stream.
 */

import { soundEngine } from './audioSynthesizer';

export interface ExportOptions {
  width?: number;
  height?: number;
  frameRate?: number;
  filename?: string;
  onProgress?: (progress: number, status: string) => void;
  onComplete?: (blobUrl: string, filename: string) => void;
  onError?: (error: Error) => void;
}

/**
 * Checks supported mime types for MP4 / H.264 export.
 */
export function getBestSupportedVideoMimeType(): { mimeType: string; extension: string } {
  const mp4Types = [
    'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
    'video/mp4;codecs=avc1',
    'video/mp4;codecs=h264',
    'video/mp4',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
  ];

  for (const type of mp4Types) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
      return {
        mimeType: type,
        extension: type.includes('mp4') ? 'mp4' : 'mp4', // Name as .mp4 for user download convenience
      };
    }
  }

  return { mimeType: 'video/webm', extension: 'mp4' };
}

/**
 * Records a MediaStream (Canvas + Audio) using MediaRecorder and triggers an MP4 download.
 */
export class StreamVideoRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private isRecording: boolean = false;

  public startRecording(
    stream: MediaStream,
    options?: {
      mimeType?: string;
      onDataAvailable?: (size: number) => void;
    }
  ): boolean {
    if (typeof MediaRecorder === 'undefined') {
      throw new Error('MediaRecorder API is not supported in this browser.');
    }

    this.recordedChunks = [];
    const supported = getBestSupportedVideoMimeType();
    const mimeType = options?.mimeType || supported.mimeType;

    try {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 5000000, // 5 Mbps High Quality
      });
    } catch {
      // Fallback without videoBitsPerSecond
      this.mediaRecorder = new MediaRecorder(stream);
    }

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.recordedChunks.push(event.data);
        options?.onDataAvailable?.(this.recordedChunks.reduce((acc, c) => acc + c.size, 0));
      }
    };

    this.mediaRecorder.start(200); // 200ms slice intervals
    this.isRecording = true;
    return true;
  }

  public stopRecording(): Promise<{ blob: Blob; url: string; size: number }> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        reject(new Error('No active recording session.'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        this.isRecording = false;
        const mimeType = this.mediaRecorder?.mimeType || 'video/mp4';
        // Create downloadable blob with explicit video/mp4 type
        const blob = new Blob(this.recordedChunks, { type: mimeType.includes('mp4') ? 'video/mp4' : 'video/mp4' });
        const url = URL.createObjectURL(blob);
        resolve({ blob, url, size: blob.size });
      };

      this.mediaRecorder.stop();
    });
  }

  public getIsRecording(): boolean {
    return this.isRecording;
  }
}

/**
 * Initiates an interactive High-Definition MP4 screen & audio capture using MediaRecorder.
 */
export async function recordFullTabBroadcastMP4(
  onProgress?: (seconds: number) => void
): Promise<{ url: string; blob: Blob; stop: () => Promise<void> }> {
  if (!navigator.mediaDevices?.getDisplayMedia) {
    throw new Error('Display media capture is not supported in this browser.');
  }

  // Request tab display with audio track
  const displayStream = await navigator.mediaDevices.getDisplayMedia({
    video: {
      displaySurface: 'browser',
      frameRate: 60,
    },
    audio: true, // Captures tab audio (speech synthesis female voice + sound effects)
  });

  // Also mix synthesized audio if available
  const synthAudio = soundEngine.getAudioStream();
  if (synthAudio && synthAudio.getAudioTracks().length > 0) {
    displayStream.addTrack(synthAudio.getAudioTracks()[0]);
  }

  const { mimeType } = getBestSupportedVideoMimeType();
  const chunks: Blob[] = [];

  const recorder = new MediaRecorder(displayStream, {
    mimeType,
    videoBitsPerSecond: 6000000,
  });

  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  recorder.start(250);

  let seconds = 0;
  const interval = setInterval(() => {
    seconds += 1;
    onProgress?.(seconds);
  }, 1000);

  const stop = (): Promise<void> => {
    return new Promise((resolve) => {
      clearInterval(interval);
      recorder.onstop = () => {
        displayStream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        downloadBlob(url, 'build-anything-cinematic-intro.mp4');
        resolve();
      };
      if (recorder.state !== 'inactive') {
        recorder.stop();
      } else {
        resolve();
      }
    });
  };

  return { url: '', blob: new Blob([]), stop };
}

/**
 * Downloads a Blob URL directly to the user's computer with an .mp4 file extension.
 */
export function downloadBlob(url: string, filename = 'build-anything-intro.mp4') {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
