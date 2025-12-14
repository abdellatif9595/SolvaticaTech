interface SortOption {
  id: string
  label: string
  value: string
}

interface SortSelectProps {
  options: SortOption[]
  selectedValue: string
  onSortChange: (value: string) => void
  label?: string
}

export default function SortSelect({ options, selectedValue, onSortChange, label = 'Trier par' }: SortSelectProps) {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm text-gray-600">
        {label}:
      </label>
      <select
        id="sort"
        value={selectedValue}
        onChange={(e) => onSortChange(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// Exemple d'utilisation pour les articles de blog
export const blogSortOptions: SortOption[] = [
  { id: 'newest', label: 'Plus récents', value: 'newest' },
  { id: 'oldest', label: 'Plus anciens', value: 'oldest' },
  { id: 'popular', label: 'Les plus populaires', value: 'popular' },
  { id: 'comments', label: 'Plus commentés', value: 'comments' }
]

// Exemple d'utilisation pour les cours
export const courseSortOptions: SortOption[] = [
  { id: 'newest', label: 'Plus récents', value: 'newest' },
  { id: 'popular', label: 'Les plus populaires', value: 'popular' },
  { id: 'rating', label: 'Meilleures notes', value: 'rating' },
  { id: 'price-asc', label: 'Prix croissant', value: 'price-asc' },
  { id: 'price-desc', label: 'Prix décroissant', value: 'price-desc' }
] 