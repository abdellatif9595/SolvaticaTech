import { useState, useEffect } from 'react'
import Button from './Button'

interface Filter {
  id: string
  label: string
  type: 'select' | 'checkbox' | 'radio' | 'range'
  options?: Array<{ value: string; label: string }>
  min?: number
  max?: number
  step?: number
  defaultValue?: string | number | boolean
}

interface SortOption {
  value: string
  label: string
}

interface AdvancedSearchProps {
  filters: Filter[]
  sortOptions: SortOption[]
  onSearch: (filters: Record<string, any>, sort: string) => void
  className?: string
  defaultSort?: string
  debounceTime?: number
  showResetButton?: boolean
}

export default function AdvancedSearch({
  filters,
  sortOptions,
  onSearch,
  className = '',
  defaultSort = '',
  debounceTime = 300,
  showResetButton = true
}: AdvancedSearchProps) {
  const [filterValues, setFilterValues] = useState<Record<string, any>>({})
  const [sortValue, setSortValue] = useState(defaultSort)
  const [isExpanded, setIsExpanded] = useState(false)

  // Initialiser les valeurs par défaut des filtres
  useEffect(() => {
    const initialValues = filters.reduce((acc, filter) => {
      if (filter.defaultValue !== undefined) {
        acc[filter.id] = filter.defaultValue
      }
      return acc
    }, {} as Record<string, any>)
    setFilterValues(initialValues)
  }, [filters])

  // Gérer les changements de filtres avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(filterValues, sortValue)
    }, debounceTime)

    return () => clearTimeout(timer)
  }, [filterValues, sortValue, onSearch, debounceTime])

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterValues(prev => ({
      ...prev,
      [filterId]: value
    }))
  }

  const handleSortChange = (value: string) => {
    setSortValue(value)
  }

  const handleReset = () => {
    const resetValues = filters.reduce((acc, filter) => {
      if (filter.defaultValue !== undefined) {
        acc[filter.id] = filter.defaultValue
      }
      return acc
    }, {} as Record<string, any>)
    setFilterValues(resetValues)
    setSortValue(defaultSort)
  }

  const renderFilter = (filter: Filter) => {
    switch (filter.type) {
      case 'select':
        return (
          <select
            value={filterValues[filter.id] || ''}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
              focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">Sélectionner...</option>
            {filter.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'checkbox':
        return (
          <div className="mt-1">
            {filter.options?.map((option) => (
              <label key={option.value} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  checked={filterValues[filter.id]?.includes(option.value) || false}
                  onChange={(e) => {
                    const currentValues = filterValues[filter.id] || []
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: string) => v !== option.value)
                    handleFilterChange(filter.id, newValues)
                  }}
                  className="rounded border-gray-300 text-primary-600
                    focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )

      case 'radio':
        return (
          <div className="mt-1 space-y-2">
            {filter.options?.map((option) => (
              <label key={option.value} className="inline-flex items-center">
                <input
                  type="radio"
                  checked={filterValues[filter.id] === option.value}
                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  value={option.value}
                  className="h-4 w-4 border-gray-300 text-primary-600
                    focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )

      case 'range':
        return (
          <div className="mt-1">
            <input
              type="range"
              min={filter.min}
              max={filter.max}
              step={filter.step}
              value={filterValues[filter.id] || filter.min}
              onChange={(e) => handleFilterChange(filter.id, Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{filter.min}</span>
              <span>{filterValues[filter.id] || filter.min}</span>
              <span>{filter.max}</span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Filtres principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filters.slice(0, isExpanded ? undefined : 3).map((filter) => (
          <div key={filter.id}>
            <label className="block text-sm font-medium text-gray-700">
              {filter.label}
            </label>
            {renderFilter(filter)}
          </div>
        ))}
      </div>

      {/* Bouton "Voir plus" si nécessaire */}
      {filters.length > 3 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          {isExpanded ? 'Voir moins' : 'Voir plus de filtres'}
        </button>
      )}

      {/* Tri et réinitialisation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">
            Trier par :
          </label>
          <select
            value={sortValue}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm
              focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {showResetButton && (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
          >
            Réinitialiser
          </Button>
        )}
      </div>
    </div>
  )
}

// Exemple d'utilisation :
/*
const filters = [
  {
    id: 'category',
    label: 'Catégorie',
    type: 'select',
    options: [
      { value: 'web', label: 'Développement Web' },
      { value: 'mobile', label: 'Développement Mobile' },
      { value: 'desktop', label: 'Développement Desktop' }
    ]
  },
  {
    id: 'technologies',
    label: 'Technologies',
    type: 'checkbox',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' }
    ]
  },
  {
    id: 'experience',
    label: 'Niveau d\'expérience',
    type: 'radio',
    options: [
      { value: 'beginner', label: 'Débutant' },
      { value: 'intermediate', label: 'Intermédiaire' },
      { value: 'advanced', label: 'Avancé' }
    ]
  },
  {
    id: 'price',
    label: 'Prix maximum',
    type: 'range',
    min: 0,
    max: 1000,
    step: 50
  }
]

const sortOptions = [
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'date_desc', label: 'Plus récent' },
  { value: 'date_asc', label: 'Plus ancien' }
]

<AdvancedSearch
  filters={filters}
  sortOptions={sortOptions}
  onSearch={(filters, sort) => {
    console.log('Filtres:', filters)
    console.log('Tri:', sort)
  }}
/>
*/ 