import { useState, useCallback } from 'react';

interface ScreenShareState {
  stream: MediaStream | null;
  error: Error | null;
}

export function useScreenShare() {
  const [state, setState] = useState<ScreenShareState>({
    stream: null,
    error: null,
  });

  const startSharing = useCallback(async (options?: DisplayMediaStreamOptions) => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(options);
      setState({ stream, error: null });
      return stream;
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      throw error;
    }
  }, []);

  const stopSharing = useCallback(() => {
    if (state.stream) {
      state.stream.getTracks().forEach((track) => track.stop());
      setState({ stream: null, error: null });
    }
  }, [state.stream]);

  return {
    ...state,
    startSharing,
    stopSharing,
  };
} 