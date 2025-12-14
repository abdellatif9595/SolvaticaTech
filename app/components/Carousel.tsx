'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarouselItem {
  id: number
  content: React.ReactNode
}

interface CarouselProps {
  items: CarouselItem[]
  showControls?: boolean
  showIndicators?: boolean
  autoPlay?: boolean
  interval?: number
}

export function Carousel({
  items,
  showControls = true,
  showIndicators = true,
  autoPlay = true,
  interval = 5000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % items.length)
  }, [items.length])

  const previous = useCallback(() => {
    setCurrentIndex((current) => (current - 1 + items.length) % items.length)
  }, [items.length])

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, next])

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full flex-shrink-0 px-4"
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <>
          <button
            onClick={previous}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Exemple d'utilisation :
/*
const items = [
  {
    id: 1,
    image: {
      src: '/images/slide1.jpg',
      alt: 'Slide 1'
    },
    content: (
      <div className="relative aspect-video bg-gray-900 text-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Bienvenue</h2>
            <p className="text-xl">Découvrez nos services</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    image: {
      src: '/images/slide2.jpg',
      alt: 'Slide 2'
    }
  },
  {
    id: 3,
    content: (
      <div className="relative aspect-video bg-primary-600 text-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Nos projets</h2>
            <p className="text-xl">Explorez notre portfolio</p>
          </div>
        </div>
      </div>
    )
  }
]

<Carousel
  items={items}
  autoPlay
  interval={5000}
  showArrows
  showDots
/>
*/ 