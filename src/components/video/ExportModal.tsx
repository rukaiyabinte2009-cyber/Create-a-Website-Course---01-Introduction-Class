import React, { useState } from 'react';
import { Download, Film, Sparkles, X, Check, AlertCircle, Radio, Music, Subtitles, Volume2 } from 'lucide-react';
import { getBestSupportedVideoMimeType } from '../../utils/videoExporter';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExport: (mode: 'broadcast' | 'canvas') => void;
  isRecording: boolean;
  recordingSeconds: number;
  onStopExport: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onStartExport,
  isRecording,
  recordingSeconds,
  onStopExport,
}) => {
  const [exportMode, setExportMode] = useState<'broadcast' | 'canvas'>('broadcast');
  const supported = getBestSupportedVideoMimeType();

  if (!isOpen) return null;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-gray-950 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl text-gray-100 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Export Cinematic MP4 Video
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  MediaRecorder API
                </span>
              </h3>
              <p className="text-xs text-gray-400">Downloadable high-definition video with audio & subtitles</p>
            </div>
          </div>

          {!isRecording && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Recording Active Banner */}
        {isRecording ? (
          <div className="p-6 rounded-2xl bg-cyan-950/40 border-2 border-cyan-400 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mx-auto animate-pulse">
              <span className="w-4 h-4 rounded-full bg-red-500" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
                RECORDING IN PROGRESS
              </span>
              <div className="text-3xl font-mono font-black text-white mt-1">
                {formatSeconds(recordingSeconds)}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Capturing video frames, female narration voice, sound effects & subtitles into MP4.
              </p>
            </div>

            <button
              onClick={onStopExport}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-extrabold font-mono text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> STOP & DOWNLOAD .MP4 FILE NOW
            </button>
          </div>
        ) : (
          /* Pre-record Selection */
          <div className="space-y-4">
            {/* Mode selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-300 uppercase block font-semibold">
                Select Export Pipeline:
              </label>

              {/* Option 1: Broadcast Tab Capture */}
              <div
                onClick={() => setExportMode('broadcast')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  exportMode === 'broadcast'
                    ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" /> Full Cinematic Broadcast MP4 (Recommended)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    Highest Quality
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Captures complete experience with the **female voiceover narration**, synthesized audio impacts, 60fps visuals, and subtitles directly to a `.mp4` file.
                </p>
              </div>

              {/* Option 2: Canvas Stream Capture */}
              <div
                onClick={() => setExportMode('canvas')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  exportMode === 'canvas'
                    ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Film className="w-3.5 h-3.5 text-blue-400" /> Direct In-App Canvas MP4
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/40">
                    1-Click
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Directly captures visual canvas stream with burned-in subtitles and Web Audio synthesized soundscapes into an `.mp4` file.
                </p>
              </div>
            </div>

            {/* Features Included Checklist */}
            <div className="p-3 bg-black/60 rounded-xl border border-gray-900 grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-300">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> MP4 Video Container
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Female Voiceover Audio
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Burned-in Subtitles
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Synthesized SFX Track
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onStartExport(exportMode)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-black font-extrabold font-mono text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>START RECORDING MP4 EXPORT</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-mono border border-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
