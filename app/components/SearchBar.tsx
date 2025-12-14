import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  title: string
  type: 'blog' | 'course'
  category: string
  excerpt: string
}

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({ placeholder = 'Rechercher...', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true)
        try {
          // Simuler une recherche
          const mockResults: SearchResult[] = [
            {
              id: '1',
              title: 'Les tendances de l\'IA en 2024',
              type: 'blog',
              category: 'Intelligence Artificielle',
              excerpt: 'Découvrez les dernières tendances...'
            },
            {
              id: '2',
              title: 'Développement Web Full Stack',
              type: 'course',
              category: 'Développement',
              excerpt: 'Maîtrisez le développement web...'
            }
          ]
          setResults(mockResults)
        } catch (error) {
          console.error('Erreur lors de la recherche:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  const handleResultClick = (result: SearchResult) => {
    setShowResults(false)
    setQuery('')
    router.push(`/${result.type}/${result.id}`)
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowResults(true)
          }}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <svg
              className="animate-spin h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Résultats de recherche */}
      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="py-2">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition"
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{result.title}</h4>
                    <p className="text-sm text-gray-500">{result.category}</p>
                    <p className="text-sm text-gray-600 mt-1">{result.excerpt}</p>
                  </div>
                  <span className="ml-4 text-xs text-gray-400">
                    {result.type === 'blog' ? 'Article' : 'Cours'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Aucun résultat */}
      {showResults && query && !isLoading && results.length === 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-4 py-3 text-center text-gray-500">
            Aucun résultat trouvé pour "{query}"
          </div>
        </div>
      )}
    </div>
  )
} 