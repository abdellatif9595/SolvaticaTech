import { useState, useEffect } from 'react';

interface GeolocationState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
}

export function useGeolocation(options?: PositionOptions) {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: new GeolocationPositionError(),
      }));
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      const {
        coords: { accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed },
        timestamp,
      } = position;

      setState({
        loading: false,
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed,
        timestamp,
        error: null,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setState((prev) => ({
        ...prev,
        loading: false,
        error,
      }));
    };

    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [options]);

  return state;
} 