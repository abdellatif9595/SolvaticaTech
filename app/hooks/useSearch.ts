import { useState, useCallback, useMemo } from 'react';

interface UseSearchProps<T> {
  items: T[];
  searchKeys: (keyof T)[];
  initialQuery?: string;
}

export function useSearch<T>({ items, searchKeys, initialQuery = '' }: UseSearchProps<T>) {
  const [query, setQuery] = useState(initialQuery);

  const filteredItems = useMemo(() => {
    if (!query) return items;

    const searchQuery = query.toLowerCase();
    return items.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery);
        }
        return false;
      })
    );
  }, [items, searchKeys, query]);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, []);

  const clear = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    filteredItems,
    search,
    clear,
  };
} 