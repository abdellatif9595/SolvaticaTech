import { useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  className?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = ''
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Sauvegarder l'élément qui avait le focus
      previousFocusRef.current = document.activeElement as HTMLElement

      // Empêcher le défilement du body
      document.body.style.overflow = 'hidden'

      // Gérer la touche Escape
      if (closeOnEscape) {
        const handleEscape = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            onClose()
          }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
      }
    } else {
      // Restaurer le défilement du body
      document.body.style.overflow = ''

      // Restaurer le focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen, onClose, closeOnEscape])

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnOutsideClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm'
      case 'lg':
        return 'max-w-3xl'
      case 'xl':
        return 'max-w-5xl'
      case 'full':
        return 'max-w-full h-full m-0'
      default:
        return 'max-w-2xl'
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={handleBackdropClick}
        />

        {/* Modal */}
        <div
          ref={modalRef}
          className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full ${getSizeClasses()} ${className}`}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              {title && (
                <h3
                  id="modal-title"
                  className="text-lg font-medium text-gray-900"
                >
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  onClick={onClose}
                  aria-label="Fermer"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Exemple d'utilisation :
/*
// Modal simple
const [isOpen, setIsOpen] = useState(false)

<button
  onClick={() => setIsOpen(true)}
  className="px-4 py-2 bg-primary-600 text-white rounded-md"
>
  Ouvrir la modal
</button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Titre de la modal"
>
  <p>Contenu de la modal</p>
</Modal>

// Modal avec différentes tailles
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal large"
  size="lg"
>
  <div className="space-y-4">
    <p>Contenu de la modal large</p>
    <button
      onClick={() => setIsOpen(false)}
      className="px-4 py-2 bg-primary-600 text-white rounded-md"
    >
      Fermer
    </button>
  </div>
</Modal>

// Modal sans titre
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  showCloseButton={false}
>
  <div className="text-center">
    <h3 className="text-lg font-medium text-gray-900 mb-4">
      Confirmation
    </h3>
    <p className="text-gray-500 mb-4">
      Êtes-vous sûr de vouloir continuer ?
    </p>
    <div className="flex justify-center space-x-4">
      <button
        onClick={() => setIsOpen(false)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
      >
        Annuler
      </button>
      <button
        onClick={() => {
          // Action de confirmation
          setIsOpen(false)
        }}
        className="px-4 py-2 bg-primary-600 text-white rounded-md"
      >
        Confirmer
      </button>
    </div>
  </div>
</Modal>

// Modal avec style personnalisé
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal personnalisée"
  className="bg-gray-50"
>
  <div className="space-y-4">
    <p className="text-gray-600">
      Contenu de la modal avec style personnalisé
    </p>
    <div className="flex justify-end">
      <button
        onClick={() => setIsOpen(false)}
        className="px-4 py-2 bg-primary-600 text-white rounded-md"
      >
        Fermer
      </button>
    </div>
  </div>
</Modal>
*/ 