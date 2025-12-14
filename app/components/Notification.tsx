import { useState, useEffect } from 'react'
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

interface NotificationProps {
  type?: 'success' | 'error' | 'info' | 'warning'
  title?: string
  message: string
  duration?: number
  onClose?: () => void
  className?: string
  showIcon?: boolean
  showCloseButton?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  action?: {
    label: string
    onClick: () => void
  }
}

export default function Notification({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className = '',
  showIcon = true,
  showCloseButton = true,
  position = 'top-right',
  action
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300) // Durée de l'animation de sortie
  }

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200'
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200'
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200'
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-400" />
      case 'error':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
      case 'warning':
        return <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" />
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-400" />
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      default:
        return 'top-4 right-4'
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed ${getPositionClasses()} z-50 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto
        transform transition-all duration-300 ease-in-out
        ${isExiting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
        ${getTypeClasses()} ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="p-4">
        <div className="flex items-start">
          {showIcon && (
            <div className="flex-shrink-0 mr-3">
              {getIcon()}
            </div>
          )}
          <div className="flex-1">
            {title && (
              <h3 className="text-sm font-medium mb-1">
                {title}
              </h3>
            )}
            <p className="text-sm">
              {message}
            </p>
            {action && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={action.onClick}
                  className="text-sm font-medium hover:underline focus:outline-none"
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>
          {showCloseButton && (
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Fermer</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Exemple d'utilisation :
/*
// Notification simple
<Notification
  message="Opération réussie !"
  type="success"
/>

// Notification avec durée personnalisée
<Notification
  message="Une erreur est survenue"
  type="error"
  duration={10000}
/>

// Notification avec callback de fermeture
<Notification
  message="Attention, cette action est irréversible"
  type="warning"
  onClose={() => console.log('Notification fermée')}
/>

// Notification avec style personnalisé
<Notification
  message="Nouvelle mise à jour disponible"
  type="info"
  className="max-w-md"
/>

// Système de notifications multiples
const [notifications, setNotifications] = useState<Array<{
  id: number
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}>>([])

const addNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
  const id = Date.now()
  setNotifications(prev => [...prev, { id, message, type }])
}

const removeNotification = (id: number) => {
  setNotifications(prev => prev.filter(notification => notification.id !== id))
}

// Dans le rendu
<div className="fixed top-4 right-4 z-50 space-y-4">
  {notifications.map(notification => (
    <Notification
      key={notification.id}
      message={notification.message}
      type={notification.type}
      onClose={() => removeNotification(notification.id)}
    />
  ))}
</div>

// Utilisation
<button
  onClick={() => addNotification('Opération réussie !', 'success')}
  className="px-4 py-2 bg-primary-600 text-white rounded-md"
>
  Ajouter une notification
</button>
*/ 