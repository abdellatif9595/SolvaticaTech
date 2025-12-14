import { useState, useCallback } from 'react';

interface MediaStreamState {
  stream: MediaStream | null;
  error: Error | null;
}

export function useMediaStream() {
  const [state, setState] = useState<MediaStreamState>({
    stream: null,
    error: null,
  });

  const startStream = useCallback(async (constraints: MediaStreamConstraints) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setState({ stream, error: null });
      return stream;
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      throw error;
    }
  }, []);

  const stopStream = useCallback(() => {
    if (state.stream) {
      state.stream.getTracks().forEach((track) => track.stop());
      setState({ stream: null, error: null });
    }
  }, [state.stream]);

  return {
    ...state,
    startStream,
 