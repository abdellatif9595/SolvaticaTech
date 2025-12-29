'use client'

import Link from 'next/link'
import { motion, easeOut, easeInOut } from 'framer-motion'
import ScrollReveal from './components/ScrollReveal'
import AnimatedCard from './components/AnimatedCard'
import FloatingParticles from './components/FloatingParticles'
import TypewriterText from './components/TypewriterText'
import AnimatedGradient from './components/AnimatedGradient'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easeOut, // ✅ use imported easing function
      },
    },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedGradient className="absolute inset-0 opacity-20" children={undefined} />
      <FloatingParticles count={30} />

      {/* Hero Section */}
      <motion.div
        className="container mx-auto px-4 py-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Bienvenue chez{' '}
            <motion.span
              className="text-blue-600 relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <TypewriterText
                text="SolvaticaTech"
                speed={100}
                delay={1}
                className="inline-block"
              />
              <motion.div
                className="absolute -inset-2 bg-blue-600/20 rounded-lg blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: easeInOut, // ✅ fixed
                }}
              />
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Solutions digitales innovantes pour votre entreprise. Développement web, applications
            mobiles, design UI/UX et consulting digital en Mauritanie.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/services"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl inline-block"
              >
                Nos Services
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
              >
                Nous Contacter
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Services Section */}
      {/* ...rest of your code unchanged... */}

      {/* CTA Section */}
      {/* Make sure to also replace ease strings here */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: easeInOut, // ✅ fixed
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full"
        animate={{
          y: [0, 20, 0],
          rotate: [360, 180, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: easeInOut, // ✅ fixed
          delay: 1,
        }}
      />
    </div>
  )
}
