'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedGradient className="absolute inset-0 opacity-20" />
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
              transition={{ type: "spring", stiffness: 300 }}
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
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Solutions digitales innovantes pour votre entreprise. 
            Développement web, applications mobiles, design UI/UX et consulting digital en Mauritanie.
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
      <ScrollReveal direction="up" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
              transition={{ duration: 0.6 }}
            >
              Nos Services
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-blue-600 mx-auto rounded-full"
              whileInView={{ width: [0, 100] }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </ScrollReveal>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <AnimatedCard 
              hoverScale={1.05}
              glowColor="#3B82F6"
              className="text-center p-8"
            >
              <motion.div 
                className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-3xl">🌐</span>
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold mb-4"
                whileHover={{ color: "#3B82F6" }}
                transition={{ duration: 0.3 }}
              >
                Développement Web
              </motion.h3>
              <p className="text-gray-600">
                Sites web modernes et applications web personnalisées
              </p>
            </AnimatedCard>

            <AnimatedCard 
              hoverScale={1.05}
              glowColor="#10B981"
              className="text-center p-8"
            >
              <motion.div 
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-3xl">📱</span>
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold mb-4"
                whileHover={{ color: "#10B981" }}
                transition={{ duration: 0.3 }}
              >
                Applications Mobiles
              </motion.h3>
              <p className="text-gray-600">
                Applications iOS et Android natives et hybrides
              </p>
            </AnimatedCard>

            <AnimatedCard 
              hoverScale={1.05}
              glowColor="#8B5CF6"
              className="text-center p-8"
            >
              <motion.div 
                className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-3xl">🎨</span>
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold mb-4"
                whileHover={{ color: "#8B5CF6" }}
                transition={{ duration: 0.3 }}
              >
                Design UI/UX
              </motion.h3>
              <p className="text-gray-600">
                Interfaces utilisateur intuitives et expériences optimisées
              </p>
            </AnimatedCard>
          </motion.div>
        </div>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal direction="up">
        <AnimatedGradient 
          colors={['#3B82F6', '#1D4ED8', '#1E40AF']}
          className="py-20 relative overflow-hidden"
        >
          <motion.div 
            className="container mx-auto px-4 text-center relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              whileInView={{ 
                scale: [0.9, 1.05, 1],
                opacity: [0, 1]
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Prêt à transformer votre idée en réalité ?
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto"
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Contactez-nous dès aujourd'hui pour discuter de votre projet
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl inline-block text-lg"
              >
                Démarrer un Projet
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full"
            animate={{
              y: [0, 20, 0],
              rotate: [360, 180, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </AnimatedGradient>
      </ScrollReveal>
    </div>
  )
} 