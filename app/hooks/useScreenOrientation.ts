import { useState, useEffect } from 'react';

type OrientationType = 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary' | 'natural' | 'any';

interface ScreenOrientationState {
  type: OrientationType;
  angle: number;
}

export function useScreenOrientation() {
  const [state, setState] = useState<ScreenOrientationState>({
    type: 'natural',
    angle: 0,
  });

  useEffect(() => {
    const screen = window.screen;
    if (!screen.orientation) {
      console.warn('Screen Orientation API not supported');
      return;
    }

    const updateOrientation = () => {
      setState({
        type: screen.orientation.type as OrientationType,
        angle: screen.orientation.angle,
      });
    };

    screen.orientation.addEventListener('change', updateOrientation);
    updateOrientation();

    return () => {
      screen.orientation.removeEventListener('change', updateOrientation);
    };
  }, []);

  const lock = async (orientation: OrientationType) => {
    try {
      await screen.orientation.lock(orientation);
    } catch (error) {
      console.error('Failed to lock orientation:', error);
    }
  };

  const unlock = () => {
    try {
      screen.orientation.unlock();
    } catch (error) {
      console.error('Failed to unlock orientation:', error);
    }
  };

  return {
    ...state,
    lock,
    unlock,
  };
} 