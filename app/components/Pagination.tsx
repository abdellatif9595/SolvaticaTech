import { useMemo } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  className?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  className = ''
}: PaginationProps) {
  const pages = useMemo(() => {
    const items: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Si moins de pages que le maximum visible, afficher toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      // Toujours afficher la première page
      items.push(1)

      // Calculer le début et la fin de la plage de pages à afficher
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Ajuster si on est proche du début
      if (currentPage <= 3) {
        end = 4
      }

      // Ajuster si on est proche de la fin
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3
      }

      // Ajouter les points de suspension si nécessaire
      if (start > 2) {
        items.push('...')
      }

      // Ajouter les pages du milieu
      for (let i = start; i <= end; i++) {
        items.push(i)
      }

      // Ajouter les points de suspension si nécessaire
      if (end < totalPages - 1) {
        items.push('...')
      }

      // Toujours afficher la dernière page
      items.push(totalPages)
    }

    return items
  }, [currentPage, totalPages])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <nav
      className={`flex items-center justify-center space-x-1 ${className}`}
      aria-label="Pagination"
    >
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-1 rounded-md
            ${currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
          aria-label="Première page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      )}

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          px-3 py-1 rounded-md
          ${currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
          }
        `}
        aria-label="Page précédente"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pages.map((page, index) => (
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-1 text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page as number)}
            className={`
              px-3 py-1 rounded-md
              ${currentPage === page
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          px-3 py-1 rounded-md
          ${currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
          }
        `}
        aria-label="Page suivante"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {showFirstLast && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-1 rounded-md
            ${currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
          aria-label="Dernière page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </nav>
  )
}

// Exemple d'utilisation :
/*
// Pagination simple
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log('Page changed:', page)}
/>

// Pagination avec beaucoup de pages
<Pagination
  currentPage={5}
  totalPages={20}
  onPageChange={(page) => console.log('Page changed:', page)}
/>

// Pagination sans boutons première/dernière page
<Pagination
  currentPage={3}
  totalPages={8}
  onPageChange={(page) => console.log('Page changed:', page)}
  showFirstLast={false}
/>

// Pagination avec style personnalisé
<Pagination
  currentPage={2}
  totalPages={5}
  onPageChange={(page) => console.log('Page changed:', page)}
  className="my-8"
/>

// Pagination dans un conteneur
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <Pagination
    currentPage={1}
    totalPages={10}
    onPageChange={(page) => console.log('Page changed:', page)}
  />
</div>

// Pagination avec état
const [currentPage, setCurrentPage] = useState(1)
const totalPages = 10

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>

// Pagination avec chargement de données
const [currentPage, setCurrentPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)
const [loading, setLoading] = useState(false)

const handlePageChange = async (page: number) => {
  setLoading(true)
  try {
    // Charger les données pour la nouvelle page
    const response = await fetch(`/api/data?page=${page}`)
    const data = await response.json()
    setCurrentPage(page)
    setTotalPages(data.totalPages)
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    setLoading(false)
  }
}

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  className={loading ? 'opacity-50 pointer-events-none' : ''}
/>
*/ 