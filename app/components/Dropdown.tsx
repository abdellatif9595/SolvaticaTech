import { useState, useRef, useEffect } from 'react'

interface DropdownItem {
  label: string
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
  divider?: boolean
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  width?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function Dropdown({
  trigger,
  items,
  align = 'left',
  width = 'md',
  className = ''
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getWidthClasses = () => {
    switch (width) {
      case 'sm':
        return 'w-32'
      case 'md':
        return 'w-48'
      case 'lg':
        return 'w-64'
      case 'xl':
        return 'w-80'
      default:
        return 'w-48'
    }
  }

  const getAlignClasses = () => {
    switch (align) {
      case 'left':
        return 'left-0'
      case 'right':
        return 'right-0'
      default:
        return 'left-0'
    }
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`
            absolute z-10 mt-2 ${getWidthClasses()} ${getAlignClasses()}
            rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
            focus:outline-none
          `}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {items.map((item, index) => (
              item.divider ? (
                <div
                  key={index}
                  className="border-t border-gray-100 my-1"
                />
              ) : (
                <button
                  key={index}
                  className={`
                    w-full text-left px-4 py-2 text-sm
                    ${item.disabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  onClick={() => {
                    if (!item.disabled) {
                      item.onClick?.()
                      setIsOpen(false)
                    }
                  }}
                  disabled={item.disabled}
                  role="menuitem"
                  tabIndex={-1}
                >
                  <div className="flex items-center">
                    {item.icon && (
                      <span className="mr-3 text-gray-400">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </div>
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Exemple d'utilisation :
/*
// Dropdown simple
<Dropdown
  trigger={
    <button className="px-4 py-2 bg-primary-600 text-white rounded-md">
      Options
    </button>
  }
  items={[
    { label: 'Modifier', onClick: () => console.log('Modifier') },
    { label: 'Supprimer', onClick: () => console.log('Supprimer') }
  ]}
/>

// Dropdown avec icônes
<Dropdown
  trigger={
    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">
      Actions
    </button>
  }
  items={[
    {
      label: 'Modifier',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      onClick: () => console.log('Modifier')
    },
    {
      label: 'Supprimer',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      onClick: () => console.log('Supprimer')
    }
  ]}
/>

// Dropdown avec alignement à droite
<Dropdown
  trigger={
    <button className="px-4 py-2 bg-primary-600 text-white rounded-md">
      Menu
    </button>
  }
  align="right"
  items={[
    { label: 'Option 1', onClick: () => console.log('Option 1') },
    { label: 'Option 2', onClick: () => console.log('Option 2') },
    { label: 'Option 3', onClick: () => console.log('Option 3') }
  ]}
/>

// Dropdown avec différentes largeurs
<Dropdown
  trigger={
    <button className="px-4 py-2 bg-primary-600 text-white rounded-md">
      Large
    </button>
  }
  width="lg"
  items={[
    { label: 'Option avec un très long texte qui nécessite plus d\'espace', onClick: () => console.log('Option 1') },
    { label: 'Option 2', onClick: () => console.log('Option 2') }
  ]}
/>

// Dropdown avec éléments désactivés et séparateurs
<Dropdown
  trigger={
    <button className="px-4 py-2 bg-primary-600 text-white rounded-md">
      Menu
    </button>
  }
  items={[
    { label: 'Option 1', onClick: () => console.log('Option 1') },
    { label: 'Option 2', onClick: () => console.log('Option 2') },
    { divider: true },
    { label: 'Option désactivée', disabled: true },
    { label: 'Option 3', onClick: () => console.log('Option 3') }
  ]}
/>

// Dropdown avec style personnalisé
<Dropdown
  trigger={
    <button className="px-4 py-2 bg-primary-600 text-white rounded-md">
      Menu personnalisé
    </button>
  }
  className="my-8"
  items={[
    { label: 'Option 1', onClick: () => console.log('Option 1') },
    { label: 'Option 2', onClick: () => console.log('Option 2') }
  ]}
/>
*/ 