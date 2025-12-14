import { useState, useEffect } from 'react';

interface BatteryState {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

export function useBattery() {
  const [state, setState] = useState<BatteryState>({
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 1,
  });

  useEffect(() => {
    let battery: any = null;

    const updateBatteryInfo = () => {
      setState({
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
        level: battery.level,
      });
    };

    const initBattery = async () => {
      try {
        battery = await (navigator as any).getBattery();
        updateBatteryInfo();

        battery.addEventListener('chargingchange', updateBatteryInfo);
        battery.addEventListener('chargingtimechange', updateBatteryInfo);
        battery.addEventListener('dischargingtimechange', updateBatteryInfo);
        battery.addEventListener('levelchange', updateBatteryInfo);
      } catch (error) {
        console.error('Battery API not supported:', error);
      }
    };

    initBattery();

    return () => {
      if (battery) {
        battery.removeEventListener('chargingchange', updateBatteryInfo);
        battery.removeEventListener('chargingtimechange', updateBatteryInfo);
        battery.removeEventListener('dischargingtimechange', updateBatteryInfo);
        battery.removeEventListener('levelchange', updateBatteryInfo);
      }
    };
  }, []);

  return state;
} 