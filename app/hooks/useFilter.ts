import { useState, useCallback, useMemo } from 'react';

type FilterOperator = 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';

interface Filter<T> {
  key: keyof T;
  operator: FilterOperator;
  value: any;
}

interface UseFilterProps<T> {
  items: T[];
  initialFilters?: Filter<T>[];
}

export function useFilter<T>({ items, initialFilters = [] }: UseFilterProps<T>) {
  const [filters, setFilters] = useState<Filter<T>[]>(initialFilters);

  const filteredItems = useMemo(() => {
    if (filters.length === 0) return items;

    return items.filter((item) =>
      filters.every((filter) => {
        const itemValue = item[filter.key];
        const filterValue = filter.value;

        switch (filter.operator) {
          case 'equals':
            return itemValue === filterValue;
          case 'contains':
            return String(itemValue).toLowerCase().includes(String(filterValue).toLowerCase());
          case 'startsWith':
            return String(itemValue).toLowerCase().startsWith(String(filterValue).toLowerCase());
          case 'endsWith':
            return String(itemValue).toLowerCase().endsWith(String(filterValue).toLowerCase());
          case 'greaterThan':
            return itemValue > filterValue;
          case 'lessThan':
            return itemValue < filterValue;
          default:
            return true;
        }
      })
    );
  }, [items, filters]);

  const addFilter = useCallback(
    (filter: Filter<T>) => {
      setFilters((prev) => [...prev, filter]);
    },
    []
  );

  const removeFilter = useCallback((index: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateFilter = useCallback((index: number, filter: Filter<T>) => {
    setFilters((prev) =>
      prev.map((f, i) => (i === index ? filter : f))
    );
  }, []);

  const clearFilters = useCallback(() => {
    setFilters([]);
  }, []);

  return {
    filters,
    filteredItems,
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters,
  };
} 