'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
  hoverRotate?: number
  glowColor?: string
}

export default function AnimatedCard({
  children,
  className = '',
  hoverScale = 1.05,
  hoverRotate = 0,
  glowColor = '#3B82F6'
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: hoverScale,
        rotateY: hoverRotate,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 blur-xl"
        style={{ backgroundColor: glowColor }}
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card content */}
      <motion.div
        className="relative bg-white rounded-lg shadow-lg overflow-hidden"
        animate={{
          boxShadow: isHovered 
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)` 
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}



