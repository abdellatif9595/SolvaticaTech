import { useState, useCallback, useEffect } from 'react';

interface SpeechRecognitionState {
  transcript: string;
  isListening: boolean;
  error: Error | null;
}

export function useSpeechRecognition() {
  const [state, setState] = useState<SpeechRecognitionState>({
    transcript: '',
    isListening: false,
    error: null,
  });

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');

          setState((prev) => ({ ...prev, transcript }));
        };

        recognitionRef.current.onerror = (event: any) => {
          setState((prev) => ({
            ...prev,
            error: new Error(event.error),
          }));
        };

        recognitionRef.current.onend = () => {
          setState((prev) => ({ ...prev, isListening: false }));
        };
      } else {
        setState((prev) => ({
          ...prev,
          error: new Error('Speech recognition not supported'),
        }));
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setState((prev) => ({ ...prev, isListening: true, error: null }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: error as Error }));
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
  };
} 