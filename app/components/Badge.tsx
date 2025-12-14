'use client'

import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline'
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-purple-100 text-purple-800',
    outline: 'border border-gray-300 bg-transparent',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

// Exemple d'utilisation :
/*
// Badge simple
<Badge>Nouveau</Badge>

// Badge avec différentes variantes
<div className="space-x-2">
  <Badge variant="primary">Primary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="error">Error</Badge>
  <Badge variant="info">Info</Badge>
  <Badge variant="gray">Gray</Badge>
</div>

// Badge avec différentes tailles
<div className="space-x-2">
  <Badge size="sm">Small</Badge>
  <Badge size="md">Medium</Badge>
  <Badge size="lg">Large</Badge>
</div>

// Badge cliquable
<Badge
  onClick={() => console.log('Badge clicked')}
  className="cursor-pointer"
>
  Cliquable
</Badge>

// Badge supprimable
<Badge
  removable
  onRemove={() => console.log('Badge removed')}
>
  Supprimable
</Badge>

// Badge avec style personnalisé
<Badge
  className="uppercase tracking-wider"
  variant="primary"
>
  Personnalisé
</Badge>

// Badge avec icône
<Badge>
  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
  Avec icône
</Badge>

// Badge dans un contexte
<div className="flex items-center space-x-2">
  <span className="text-gray-700">Status:</span>
  <Badge variant="success">Actif</Badge>
</div>

// Badge avec nombre
<Badge variant="primary">
  <span className="font-bold">5</span>
  <span className="ml-1">nouveaux messages</span>
</Badge>
*/ 