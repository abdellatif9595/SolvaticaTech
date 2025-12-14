'use client'

import { motion } from 'framer-motion'

interface AnimatedGradientProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  duration?: number
}

export default function AnimatedGradient({
  children,
  className = '',
  colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'],
  duration = 10
}: AnimatedGradientProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      animate={{
        background: [
          `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,
          `linear-gradient(135deg, ${colors[1]}, ${colors[2]})`,
          `linear-gradient(225deg, ${colors[2]}, ${colors[3]})`,
          `linear-gradient(315deg, ${colors[3]}, ${colors[0]})`,
          `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`
        ]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {/* Animated overlay */}
      <motion.div
        className="absolute inset-0 bg-white/10"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: duration * 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}



