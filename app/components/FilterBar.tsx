interface FilterOption {
  id: string
  label: string
  value: string
}

interface FilterBarProps {
  title: string
  options: FilterOption[]
  selectedValue: string
  onFilterChange: (value: string) => void
}

export default function FilterBar({ title, options, selectedValue, onFilterChange }: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="radio"
              name={title.toLowerCase()}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={(e) => onFilterChange(e.target.value)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

// Exemple d'utilisation pour les catégories de blog
export const blogCategories: FilterOption[] = [
  { id: 'all', label: 'Tous les articles', value: 'all' },
  { id: 'ai', label: 'Intelligence Artificielle', value: 'ai' },
  { id: 'web', label: 'Développement Web', value: 'web' },
  { id: 'security', label: 'Cybersécurité', value: 'security' },
  { id: 'cloud', label: 'Cloud Computing', value: 'cloud' }
]

// Exemple d'utilisation pour les niveaux de cours
export const courseLevels: FilterOption[] = [
  { id: 'all', label: 'Tous les niveaux', value: 'all' },
  { id: 'beginner', label: 'Débutant', value: 'beginner' },
  { id: 'intermediate', label: 'Intermédiaire', value: 'intermediate' },
  { id: 'advanced', label: 'Avancé', value: 'advanced' }
]

// Exemple d'utilisation pour les catégories de cours
export const courseCategories: FilterOption[] = [
  { id: 'all', label: 'Toutes les catégories', value: 'all' },
  { id: 'web', label: 'Développement Web', value: 'web' },
  { id: 'mobile', label: 'Développement Mobile', value: 'mobile' },
  { id: 'data', label: 'Data Science', value: 'data' },
  { id: 'security', label: 'Cybersécurité', value: 'security' }
] 