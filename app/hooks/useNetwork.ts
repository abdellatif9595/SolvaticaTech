import { useState, useEffect } from 'react';

interface NetworkState {
  online: boolean;
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

export function useNetwork() {
  const [state, setState] = useState<NetworkState>({
    online: navigator.onLine,
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0,
    saveData: false,
  });

  useEffect(() => {
    const updateNetworkInfo = () => {
      const connection = (navigator as any).connection;

      setState({
        online: navigator.onLine,
        effectiveType: connection?.effectiveType || 'unknown',
        downlink: connection?.downlink || 0,
        rtt: connection?.rtt || 0,
        saveData: connection?.saveData || false,
      });
    };

    window.addEventListener('online', updateNetworkInfo);
    window.addEventListener('offline', updateNetworkInfo);

    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', updateNetworkInfo);
    }

    updateNetworkInfo();

    return () => {
      window.removeEventListener('online', updateNetworkInfo);
      window.removeEventListener('offline', updateNetworkInfo);

      if ((navigator as any).connection) {
        (navigator as any).connection.removeEventListener('change', updateNetworkInfo);
      }
    };
  }, []);

  return state;
} 