import { useState, useEffect, useRef } from 'react';

interface ResizeObserverEntry {
  contentRect: {
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
}

export function useResizeObserver<T extends HTMLElement>() {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { elementRef, dimensions };
} 