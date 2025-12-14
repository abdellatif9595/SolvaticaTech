interface DetailNavigationProps {
  items: Array<{
    id: string
    label: string
    href: string
    icon?: React.ReactNode
    isActive?: boolean
    isDisabled?: boolean
  }>
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export default function DetailNavigation({
  items,
  className = '',
  orientation = 'horizontal'
}: DetailNavigationProps) {
  return (
    <nav
      className={`
        ${orientation === 'vertical' ? 'space-y-1' : 'space-x-1'}
        ${className}
      `}
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={`
            flex items-center px-3 py-2 text-sm font-medium rounded-md
            ${item.isActive
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }
            ${item.isDisabled
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer'
            }
          `}
          aria-current={item.isActive ? 'page' : undefined}
          tabIndex={item.isDisabled ? -1 : undefined}
        >
          {item.icon && (
            <span className={`
              mr-3
              ${item.isActive
                ? 'text-primary-500'
                : 'text-gray-400 group-hover:text-gray-500'
              }
            `}>
              {item.icon}
            </span>
          )}
          {item.label}
        </a>
      ))}
    </nav>
  )
} 