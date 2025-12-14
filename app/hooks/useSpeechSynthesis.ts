import { useState, useCallback, useEffect } from 'react';

interface SpeechSynthesisState {
  isSpeaking: boolean;
  isPaused: boolean;
  error: Error | null;
}

export function useSpeechSynthesis() {
  const [state, setState] = useState<SpeechSynthesisState>({
    isSpeaking: false,
    isPaused: false,
    error: null,
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      utteranceRef.current = new SpeechSynthesisUtterance();

      utteranceRef.current.onstart = () => {
        setState((prev) => ({ ...prev, isSpeaking: true }));
      };

      utteranceRef.current.onend = () => {
        setState((prev) => ({ ...prev, isSpeaking: false, isPaused: false }));
      };

      utteranceRef.current.onerror = (event: any) => {
        setState((prev) => ({
          ...prev,
          error: new Error(event.error),
        }));
      };
    } else {
      setState((prev) => ({
        ...prev,
        error: new Error('Speech synthesis not supported'),
      }));
    }

    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback(
    (text: string, options?: Partial<SpeechSynthesisUtterance>) => {
      if (utteranceRef.current) {
        try {
          Object.assign(utteranceRef.current, options);
          utteranceRef.current.text = text;
          window.speechSynthesis.speak(utteranceRef.current);
          setState((prev) => ({ ...prev, error: null }));
        } catch (error) {
          setState((prev) => ({ ...prev, error: error as Error }));
        }
      }
    },
    []
  );

  const pause = useCallback(() => {
    if (state.isSpeaking && !state.isPaused) {
      window.speechSynthesis.pause();
      setState((prev) => ({ ...prev, isPaused: true }));
    }
  }, [state.isSpeaking, state.isPaused]);

  const resume = useCallback(() => {
    if (state.isSpeaking && state.isPaused) {
      window.speechSynthesis.resume();
      setState((prev) => ({ ...prev, isPaused: false }));
    }
  }, [state.isSpeaking, state.isPaused]);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
    setState((prev) => ({
      ...prev,
      isSpeaking: false,
      isPaused: false,
    }));
  }, []);

  return {
    ...state,
    speak,
    pause,
    resume,
    cancel,
  };
} 