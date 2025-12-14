import { useState } from 'react'

interface Tab {
  id: string
  label: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  className?: string
  variant?: 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded'
}

export default function Tabs({
  tabs,
  defaultTab,
  onChange,
  className = '',
  variant = 'line'
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  const getTabStyles = (isActive: boolean, isDisabled: boolean) => {
    const baseStyles = 'px-4 py-2 text-sm font-medium transition-colors duration-200'
    const disabledStyles = 'opacity-50 cursor-not-allowed'

    switch (variant) {
      case 'line':
        return `
          ${baseStyles}
          ${isActive
            ? 'border-b-2 border-primary-600 text-primary-600'
            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }
          ${isDisabled ? disabledStyles : ''}
        `
      case 'enclosed':
        return `
          ${baseStyles}
          ${isActive
            ? 'bg-white border border-gray-200 border-b-0 text-primary-600'
            : 'bg-gray-50 text-gray-500 hover:text-gray-700'
          }
          ${isDisabled ? disabledStyles : ''}
        `
      case 'soft-rounded':
        return `
          ${baseStyles}
          rounded-md
          ${isActive
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }
          ${isDisabled ? disabledStyles : ''}
        `
      case 'solid-rounded':
        return `
          ${baseStyles}
          rounded-md
          ${isActive
            ? 'bg-primary-600 text-white'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }
          ${isDisabled ? disabledStyles : ''}
        `
    }
  }

  const getTabListStyles = () => {
    switch (variant) {
      case 'line':
        return 'border-b border-gray-200'
      case 'enclosed':
        return 'border-b border-gray-200'
      case 'soft-rounded':
      case 'solid-rounded':
        return 'space-x-2'
    }
  }

  return (
    <div className={className}>
      <div className={`flex ${getTabListStyles()}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            className={getTabStyles(tab.id === activeTab, !!tab.disabled)}
            disabled={tab.disabled}
            role="tab"
            aria-selected={tab.id === activeTab}
            aria-controls={`panel-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={tab.id}
            className={tab.id === activeTab ? 'block' : 'hidden'}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

// Exemple d'utilisation :
/*
// Tabs simples
<Tabs
  tabs={[
    {
      id: 'tab1',
      label: 'Onglet 1',
      content: <div>Contenu de l'onglet 1</div>
    },
    {
      id: 'tab2',
      label: 'Onglet 2',
      content: <div>Contenu de l'onglet 2</div>
    }
  ]}
/>

// Tabs avec différents styles
<Tabs
  variant="enclosed"
  tabs={[
    {
      id: 'tab1',
      label: 'Onglet 1',
      content: <div>Contenu de l'onglet 1</div>
    },
    {
      id: 'tab2',
      label: 'Onglet 2',
      content: <div>Contenu de l'onglet 2</div>
    }
  ]}
/>

// Tabs avec onglet désactivé
<Tabs
  variant="soft-rounded"
  tabs={[
    {
      id: 'tab1',
      label: 'Onglet 1',
      content: <div>Contenu de l'onglet 1</div>
    },
    {
      id: 'tab2',
      label: 'Onglet 2',
      content: <div>Contenu de l'onglet 2</div>,
      disabled: true
    }
  ]}
/>

// Tabs avec contenu personnalisé
<Tabs
  variant="solid-rounded"
  tabs={[
    {
      id: 'tab1',
      label: (
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Informations</span>
        </div>
      ),
      content: <div>Contenu de l'onglet 1</div>
    },
    {
      id: 'tab2',
      label: (
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Ajouter</span>
        </div>
      ),
      content: <div>Contenu de l'onglet 2</div>
    }
  ]}
/>
*/ 