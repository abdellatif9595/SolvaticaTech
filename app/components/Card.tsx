'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import LoadingSpinner from './LoadingSpinner'

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-white',
        primary: 'bg-primary-50 border-primary-200',
        secondary: 'bg-secondary-50 border-secondary-200',
        ghost: 'bg-transparent border-transparent shadow-none',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
  title: string
  description?: string
  image?: string
  link?: string
  tags?: string[]
  date?: string
  author?: {
    name: string
    avatar?: string
  }
  className?: string
  loading?: boolean
  onClick?: () => void
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}

export default function Card({
  title,
  description,
  image,
  link,
  tags,
  date,
  author,
  className = '',
  variant = 'default',
  loading = false,
  onClick
}: CardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'featured':
        return 'md:flex-row'
      case 'compact':
        return 'flex-row items-center space-x-4'
      default:
        return 'flex-col'
    }
  }

  const getImageClasses = () => {
    switch (variant) {
      case 'featured':
        return 'md:w-1/3 h-48 md:h-auto'
      case 'compact':
        return 'w-24 h-24'
      default:
        return 'w-full h-48'
    }
  }

  const CardContentComponent = () => (
    <div className={`flex ${getVariantClasses()} bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {image && (
        <div className={`relative ${getImageClasses()}`}>
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <LoadingSpinner size="sm" />
            </div>
          )}
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">Image non disponible</span>
            </div>
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      )}

      <div className="flex-1 p-4">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            {description && (
              <p className="text-gray-600 text-sm mb-4">
                {description}
              </p>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium text-primary-600 bg-primary-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {(date || author) && (
              <div className="flex items-center justify-between text-sm text-gray-500">
                {date && <span>{date}</span>}
                {author && (
                  <div className="flex items-center space-x-2">
                    {author.avatar && (
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={author.avatar}
                          alt={author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span>{author.name}</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )

  if (loading) {
    return <CardContentComponent />
  }

  if (link) {
    return (
      <Link href={link} className="block hover:opacity-90 transition-opacity">
        <CardContentComponent />
      </Link>
    )
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left hover:opacity-90 transition-opacity"
      >
        <CardContentComponent />
      </button>
    )
  }

  return <CardContentComponent />
}

// Exemple d'utilisation :
/*
// Card simple
<Card title="Titre de la carte">
  <p className="text-gray-600">
    Contenu de la carte
  </p>
</Card>

// Card avec image
<Card
  title="Produit"
  image={{
    src: '/images/product.jpg',
    alt: 'Image du produit'
  }}
>
  <p className="text-gray-600">
    Description du produit
  </p>
</Card>

// Card avec footer
<Card
  title="Article"
  footer={
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">Publié le 1 Jan 2023</span>
      <button className="text-primary-600 hover:text-primary-800">
        Lire plus
      </button>
    </div>
  }
>
  <p className="text-gray-600">
    Contenu de l'article
  </p>
</Card>

// Card avec style personnalisé
<Card
  title="Carte personnalisée"
  className="max-w-sm mx-auto"
  variant="elevated"
>
  <p className="text-gray-600">
    Contenu de la carte avec style personnalisé
  </p>
</Card>

// Card cliquable
<Card
  title="Carte cliquable"
  onClick={() => console.log('Card clicked')}
>
  <p className="text-gray-600">
    Cliquez sur cette carte
  </p>
</Card>

// Card avec titre personnalisé
<Card
  title={
    <div className="flex items-center space-x-2">
      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-lg font-medium text-gray-900">
        Titre avec icône
      </h3>
    </div>
  }
>
  <p className="text-gray-600">
    Contenu de la carte
  </p>
</Card>

// Card avec différents variants
<div className="space-y-4">
  <Card
    title="Card par défaut"
    variant="default"
  >
    <p className="text-gray-600">Contenu</p>
  </Card>

  <Card
    title="Card avec bordure"
    variant="bordered"
  >
    <p className="text-gray-600">Contenu</p>
  </Card>

  <Card
    title="Card surélevée"
    variant="elevated"
  >
    <p className="text-gray-600">Contenu</p>
  </Card>
</div>
*/ 