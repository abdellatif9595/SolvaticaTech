import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DetailPageNavProps {
  title: string
  category: string
  breadcrumbs: {
    label: string
    href: string
  }[]
}

export default function DetailPageNav({
  title,
  category,
  breadcrumbs
}: DetailPageNavProps) {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-primary-600 hover:text-primary-700">
                Accueil
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center">
                  <span className="text-gray-500 mx-2">/</span>
                  <Link
                    href={crumb.href}
                    className={`
                      inline-flex items-center px-1 pt-1 text-sm font-medium
                      ${pathname === crumb.href
                        ? 'text-primary-600 border-b-2 border-primary-500'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {crumb.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500">{category}</span>
          </div>
        </div>
      </div>
    </nav>
  )
} 