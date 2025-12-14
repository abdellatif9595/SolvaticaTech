import { useEffect, useRef } from 'react';

interface MutationObserverOptions {
  attributes?: boolean;
  childList?: boolean;
  subtree?: boolean;
  characterData?: boolean;
  attributeOldValue?: boolean;
  characterDataOldValue?: boolean;
  attributeFilter?: string[];
}

export function useMutationObserver(
  callback: (mutations: MutationRecord[]) => void,
  options: MutationObserverOptions = {
    attributes: true,
    childList: true,
    subtree: true,
  }
) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new MutationObserver(callback);
    observer.observe(element, options);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return elementRef;
} 