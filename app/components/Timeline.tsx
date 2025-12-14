interface TimelineItem {
  id: string
  title: string
  description?: string
  date?: string
  icon?: React.ReactNode
  status?: 'success' | 'error' | 'warning' | 'info'
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export default function Timeline({ items, className = '' }: TimelineProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'info':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className={`flow-root ${className}`}>
      <ul role="list" className="-mb-8">
        {items.map((item, index) => (
          <li key={item.id}>
            <div className="relative pb-8">
              {index !== items.length - 1 && (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`
                      h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                      ${getStatusColor(item.status)}
                    `}
                  >
                    {item.icon ? (
                      <div className="h-5 w-5 text-white">
                        {item.icon}
                      </div>
                    ) : (
                      <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-900">{item.title}</p>
                    {item.description && (
                      <p className="mt-0.5 text-sm text-gray-500">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.date && (
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      {item.date}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
} 