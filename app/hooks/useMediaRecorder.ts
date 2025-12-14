import { useState, useCallback, useRef } from 'react';

interface MediaRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  error: Error | null;
}

export function useMediaRecorder(stream: MediaStream | null) {
  const [state, setState] = useState<MediaRecorderState>({
    isRecording: false,
    isPaused: false,
    error: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(
    (options?: MediaRecorderOptions) => {
      if (!stream) {
        setState((prev) => ({
          ...prev,
          error: new Error('No media stream available'),
        }));
        return;
      }

      try {
        const mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          setState((prev) => ({ ...prev, isRecording: false }));
        };

        mediaRecorder.onpause = () => {
          setState((prev) => ({ ...prev, isPaused: true }));
        };

        mediaRecorder.onresume = () => {
          setState((prev) => ({ ...prev, isPaused: false }));
        };

        mediaRecorder.onerror = (event) => {
          setState((prev) => ({
            ...prev,
            error: new Error(event.error.message),
          }));
        };

        mediaRecorder.start();
        setState((prev) => ({ ...prev, isRecording: true, error: null }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: error as Error }));
      }
    },
    [stream]
  );

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
    }
  }, [state.isRecording]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording && !state.isPaused) {
      mediaRecorderRef.current.pause();
    }
  }, [state.isRecording, state.isPaused]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording && state.isPaused) {
      mediaRecorderRef.current.resume();
    }
  }, [state.isRecording, state.isPaused]);

  const getRecording = useCallback(() => {
    if (chunksRef.current.length === 0) return null;
    return new Blob(chunksRef.current, { type: 'video/webm' });
  }, []);

  return {
    ...state,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    getRecording,
  };
} 