import { useState, useCallback } from 'react';

export function useScreenWakeLock() {
  const [isWakeLocked, setIsWakeLocked] = useState(false);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  const requestWakeLock = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        const wakeLock = await (navigator as any).wakeLock.request('screen');
        setWakeLock(wakeLock);
        setIsWakeLocked(true);

        wakeLock.addEventListener('release', () => {
          setIsWakeLocked(false);
        });
      } else {
        console.warn('Wake Lock API not supported');
      }
    } catch (error) {
      console.error('Failed to request wake lock:', error);
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    try {
      if (wakeLock) {
        await wakeLock.release();
        setWakeLock(null);
        setIsWakeLocked(false);
      }
    } catch (error) {
      console.error('Failed to release wake lock:', error);
    }
  }, [wakeLock]);

  return {
    isWakeLocked,
    requestWakeLock,
    releaseWakeLock,
  };
} 