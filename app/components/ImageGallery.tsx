import { useState } from 'react'
import Image from 'next/image'
import Modal from './Modal'

interface ImageItem {
  src: string
  alt: string
  title?: string
  description?: string
}

interface ImageGalleryProps {
  images: ImageItem[]
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
  showTitles?: boolean
  showDescriptions?: boolean
}

export default function ImageGallery({
  images,
  columns = 3,
  gap = 'md',
  className = '',
  showTitles = false,
  showDescriptions = false
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2'
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }
  }

  const getGap = () => {
    switch (gap) {
      case 'sm':
        return 'gap-2'
      case 'md':
        return 'gap-4'
      case 'lg':
        return 'gap-6'
      default:
        return 'gap-4'
    }
  }

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  const handlePrevious = () => {
    if (!selectedImage) return
    const currentIndex = images.findIndex(img => img.src === selectedImage.src)
    const previousIndex = (currentIndex - 1 + images.length) % images.length
    setSelectedImage(images[previousIndex])
  }

  const handleNext = () => {
    if (!selectedImage) return
    const currentIndex = images.findIndex(img => img.src === selectedImage.src)
    const nextIndex = (currentIndex + 1) % images.length
    setSelectedImage(images[nextIndex])
  }

  return (
    <>
      <div className={`grid ${getGridColumns()} ${getGap()} ${className}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer group"
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {(showTitles || showDescriptions) && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {showTitles && image.title && (
                    <h3 className="text-lg font-semibold">{image.title}</h3>
                  )}
                  {showDescriptions && image.description && (
                    <p className="text-sm mt-1">{image.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedImage}
        onClose={handleCloseModal}
        size="full"
        className="bg-black bg-opacity-90"
      >
        {selectedImage && (
          <div className="relative h-full flex items-center justify-center">
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-opacity"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="relative w-full h-full max-w-7xl mx-auto px-4">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
              {(showTitles || showDescriptions) && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                  {showTitles && selectedImage.title && (
                    <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                  )}
                  {showDescriptions && selectedImage.description && (
                    <p className="mt-2">{selectedImage.description}</p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-opacity"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-opacity"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </Modal>
    </>
  )
}

// Exemple d'utilisation :
/*
const images = [
  {
    src: '/images/project1.jpg',
    alt: 'Projet 1',
    title: 'Projet de développement web',
    description: 'Site web responsive avec React et Next.js'
  },
  {
    src: '/images/project2.jpg',
    alt: 'Projet 2',
    title: 'Application mobile',
    description: 'Application iOS et Android avec React Native'
  },
  // ... autres images
]

<ImageGallery
  images={images}
  columns={3}
  gap="md"
  showTitles
  showDescriptions
/>
*/ 