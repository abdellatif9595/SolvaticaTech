import { useState, useEffect, useCallback, useRef } from 'react';

interface WebSocketState {
  isConnected: boolean;
  error: Error | null;
}

export function useWebSocket(url: string) {
  const [state, setState] = useState<WebSocketState>({
    isConnected: false,
    error: null,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const messageQueueRef = useRef<any[]>([]);

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setState((prev) => ({ ...prev, isConnected: true, error: null }));
        while (messageQueueRef.current.length > 0) {
          const message = messageQueueRef.current.shift();
          ws.send(JSON.stringify(message));
        }
      };

      ws.onclose = () => {
        setState((prev) => ({ ...prev, isConnected: false }));
      };

      ws.onerror = (error) => {
        setState((prev) => ({
          ...prev,
          error: new Error('WebSocket error'),
        }));
      };
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error as Error,
      }));
    }
  }, [url]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const send = useCallback(
    (message: any) => {
      if (state.isConnected && wsRef.current) {
        wsRef.current.send(JSON.stringify(message));
      } else {
        messageQueueRef.current.push(message);
      }
    },
    [state.isConnected]
  );

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    ...state,
    send,
    connect,
    disconnect,
  };
} 