'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500',
      ghost: 'bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500',
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && 'opacity-70 cursor-not-allowed',
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }

// Exemple d'utilisation :
/*
// Bouton simple
<Button>Cliquer</Button>

// Bouton avec différentes variantes
<div className="space-x-2">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="success">Success</Button>
  <Button variant="danger">Danger</Button>
  <Button variant="warning">Warning</Button>
  <Button variant="info">Info</Button>
  <Button variant="light">Light</Button>
  <Button variant="dark">Dark</Button>
</div>

// Bouton avec différentes tailles
<div className="space-x-2">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>

// Bouton en pleine largeur
<Button fullWidth>
  Bouton en pleine largeur
</Button>

// Bouton avec état de chargement
<Button loading>
  Chargement...
</Button>

// Bouton avec icône
<Button
  icon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  }
>
  Ajouter
</Button>

// Bouton avec icône à droite
<Button
  icon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  }
  iconPosition="right"
>
  Suivant
</Button>

// Bouton désactivé
<Button disabled>
  Désactivé
</Button>

// Bouton avec style personnalisé
<Button
  className="uppercase tracking-wider"
  variant="primary"
>
  Personnalisé
</Button>

// Bouton avec événements
<Button
  onClick={() => console.log('Button clicked')}
  onMouseEnter={() => console.log('Mouse entered')}
  onMouseLeave={() => console.log('Mouse left')}
>
  Interactif
</Button>

// Bouton dans un formulaire
<form onSubmit={(e) => e.preventDefault()}>
  <Button type="submit">
    Soumettre
  </Button>
</form>
*/ 