import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  homeLabel?: string
  homeHref?: string
  className?: string
}

export default function Breadcrumb({
  items,
  homeLabel = 'Accueil',
  homeHref = '/',
  className = ''
}: BreadcrumbProps) {
  return (
    <nav
      className={`
        flex
        ${className}
      `}
      aria-label="Fil d'Ariane"
    >
      <ol className="flex items-center space-x-2">
        <li>
          <a
            href={homeHref}
            className="text-gray-500 hover:text-gray-700"
          >
            {homeLabel}
          </a>
        </li>

        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <svg
              className="flex-shrink-0 h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <a
              href={item.href}
              className={`
                ml-2 text-sm font-medium
                ${index === items.length - 1
                  ? 'text-gray-500'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Exemple d'utilisation :
/*
// Breadcrumb simple
<Breadcrumb
  items={[
    { label: 'Produits', href: '/products' },
    { label: 'Catégorie', href: '/products/category' },
    { label: 'Produit', href: '/products/category/product' }
  ]}
/>

// Breadcrumb avec labels personnalisés
<Breadcrumb
  homeLabel="Dashboard"
  homeHref="/dashboard"
  items={[
    { label: 'Utilisateurs', href: '/dashboard/users' },
    { label: 'Profil', href: '/dashboard/users/profile' }
  ]}
/>

// Breadcrumb avec style personnalisé
<Breadcrumb
  className="p-4 bg-gray-50 rounded-lg"
  items={[
    { label: 'Blog', href: '/blog' },
    { label: 'Articles', href: '/blog/articles' },
    { label: 'Titre de l\'article', href: '/blog/articles/article-1' }
  ]}
/>

// Breadcrumb dans un conteneur
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <Breadcrumb
    items={[
      { label: 'Services', href: '/services' },
      { label: 'Développement web', href: '/services/web-development' },
      { label: 'Projets', href: '/services/web-development/projects' }
    ]}
  />
</div>

// Breadcrumb avec navigation dynamique
const [breadcrumbs, setBreadcrumbs] = useState([
  { label: 'Niveau 1', href: '/level1' }
])

const addBreadcrumb = (label: string, href: string) => {
  setBreadcrumbs(prev => [...prev, { label, href }])
}

// Dans le rendu
<Breadcrumb items={breadcrumbs} />

// Utilisation
<button
  onClick={() => addBreadcrumb('Niveau 2', '/level1/level2')}
  className="px-4 py-2 bg-primary-600 text-white rounded-md"
>
  Ajouter un niveau
</button>
*/ 