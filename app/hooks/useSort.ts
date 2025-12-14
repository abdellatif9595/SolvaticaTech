import { useState, useCallback, useMemo } from 'react';

type SortDirection = 'asc' | 'desc';

interface UseSortProps<T> {
  items: T[];
  initialKey?: keyof T;
  initialDirection?: SortDirection;
}

export function useSort<T>({
  items,
  initialKey,
  initialDirection = 'asc',
}: UseSortProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(initialKey);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialDirection);

  const sortedItems = useMemo(() => {
    if (!sortKey) return items;

    return [...items].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [items, sortKey, sortDirection]);

  const sort = useCallback(
    (key: keyof T) => {
      if (key === sortKey) {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortDirection('asc');
      }
    },
    [sortKey]
  );

  const clearSort = useCallback(() => {
    setSortKey(undefined);
    setSortDirection('asc');
  }, []);

  return {
    sortKey,
    sortDirection,
    sortedItems,
    sort,
    clearSort,
  };
} 