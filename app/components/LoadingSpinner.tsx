'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  text?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = '#3B82F6',
  text = 'Chargement...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ borderTopColor: color }}
      />
      
      {text && (
        <motion.p 
          className={`${textSizeClasses[size]} text-gray-600 font-medium`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Composant de chargement en plein écran
export function FullScreenLoader({ text = 'Chargement...' }) {
  return (
    <motion.div
      className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl p-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LoadingSpinner size="lg" text={text} />
      </motion.div>
    </motion.div>
  )
}

// Animation de chargement avec particules
export function ParticleLoader() {
  return (
    <div className="relative w-16 h-16">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-blue-600 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: '0 0'
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 0.5, 1],
            opacity: [1, 0.3, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}