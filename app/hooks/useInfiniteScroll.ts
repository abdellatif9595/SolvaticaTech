import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  threshold?: number;
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  threshold = 100,
}: UseInfiniteScrollProps) {
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setIsLoading(true);
            onLoadMore();
          }
        },
        {
          rootMargin: `${threshold}px`,
        }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore, onLoadMore, threshold]
  );

  useEffect(() => {
    setIsLoading(false);
  }, [hasMore]);

  return {
    lastElementRef,
    isLoading,
  };
} 