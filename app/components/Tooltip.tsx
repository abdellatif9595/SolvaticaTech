import { useState, useRef, useEffect } from 'react'

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  delay?: number
  className?: string
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className = ''
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isHovered) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, delay)
    } else {
      setIsVisible(false)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isHovered, delay])

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2'
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2'
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2'
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2'
    }
  }

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-900'
      case 'right':
        return 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-gray-900'
      case 'bottom':
        return 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-900'
      case 'left':
        return 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-gray-900'
    }
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`
            absolute z-50 ${getPositionClasses()}
            px-2 py-1 text-sm text-white bg-gray-900 rounded
            shadow-lg whitespace-nowrap
            ${className}
          `}
          role="tooltip"
        >
          {content}
          <div
            className={`
              absolute w-0 h-0
              border-4 border-transparent
              ${getArrowClasses()}
            `}
          />
        </div>
      )}
    </div>
  )
}

// Exemple d'utilisation :
/*
// Tooltip simple
<Tooltip content="Ceci est un tooltip">
  <button className="px-4 py-2 bg-primary-600 text-white rounded-md">
    Hover me
  </button>
</Tooltip>

// Tooltip avec position différente
<Tooltip
  content="Tooltip à droite"
  position="right"
>
  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">
    Tooltip à droite
  </button>
</Tooltip>

// Tooltip avec contenu personnalisé
<Tooltip
  content={
    <div className="flex items-center space-x-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Information importante</span>
    </div>
  }
>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
    Information
  </button>
</Tooltip>

// Tooltip avec délai personnalisé
<Tooltip
  content="Apparaît après 500ms"
  delay={500}
>
  <button className="px-4 py-2 bg-green-600 text-white rounded-md">
    Délai personnalisé
  </button>
</Tooltip>

// Tooltip avec style personnalisé
<Tooltip
  content="Tooltip personnalisé"
  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">
    Style personnalisé
  </button>
</Tooltip>

// Tooltip sur un texte
<Tooltip content="Plus d'informations">
  <span className="text-blue-600 cursor-help">
    Hover sur ce texte
  </span>
</Tooltip>

// Tooltip sur une icône
<Tooltip content="Cliquez pour plus d'informations">
  <button className="p-2 text-gray-500 hover:text-gray-700">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </button>
</Tooltip>
*/ 