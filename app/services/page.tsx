'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import AnimatedCard from '../components/AnimatedCard'

const services = [
  {
    id: 'web',
    title: 'Développement Web',
    description: 'Nous créons des applications web modernes et performantes adaptées à vos besoins.',
    features: [
      'Applications web progressives (PWA)',
      'Sites web responsives',
      'E-commerce',
      'Applications métier sur mesure',
      'Intégration API',
      'Optimisation des performances'
    ],
    icon: '🌐',
    price: 'À partir de 500€',
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript']
  },
  {
    id: 'mobile',
    title: 'Développement Mobile',
    description: 'Applications mobiles natives et hybrides pour iOS et Android.',
    features: [
      'Applications natives iOS/Android',
      'Applications hybrides React Native',
      'Interface utilisateur intuitive',
      'Intégration avec APIs existantes',
      'Publication sur les stores',
      'Maintenance et support'
    ],
    icon: '📱',
    price: 'À partir de 800€',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin']
  },
  {
    id: 'ui-ux',
    title: 'Design UI/UX',
    description: 'Design d\'interfaces utilisateur modernes et expériences optimisées.',
    features: [
      'Design d\'interface utilisateur',
      'Expérience utilisateur (UX)',
      'Prototypage interactif',
      'Design system',
      'Tests d\'utilisabilité',
      'Optimisation de conversion'
    ],
    icon: '🎨',
    price: 'À partir de 300€',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle']
  },
  {
    id: 'consulting',
    title: 'Consulting Digital',
    description: 'Accompagnement stratégique pour votre transformation digitale.',
    features: [
      'Audit technologique',
      'Stratégie digitale',
      'Formation des équipes',
      'Migration vers le cloud',
      'Optimisation des processus',
      'Accompagnement au changement'
    ],
    icon: '💼',
    price: 'À partir de 200€/jour',
    technologies: ['Cloud', 'DevOps', 'Agile', 'Scrum']
  }
]

export default function ServicesPage() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ScrollReveal direction="up">
        <motion.section 
          className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full"
            animate={{
              y: [0, 30, 0],
              rotate: [360, 180, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          <motion.div 
            className="container mx-auto px-4 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-center"
              variants={itemVariants}
            >
              Nos Services
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-center max-w-3xl mx-auto text-blue-100"
              variants={itemVariants}
            >
              Des solutions digitales innovantes pour transformer votre entreprise
            </motion.p>
          </motion.div>
        </motion.section>
      </ScrollReveal>

      {/* Services Grid */}
      <ScrollReveal direction="up" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <AnimatedCard 
                key={service.id} 
                hoverScale={1.02}
                glowColor="#3B82F6"
                className="p-8"
              >
                <motion.div 
                  className="text-4xl mb-6"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>
                
                <motion.h2 
                  className="text-2xl font-bold mb-4"
                  whileHover={{ color: "#3B82F6" }}
                  transition={{ duration: 0.3 }}
                >
                  {service.title}
                </motion.h2>
                
                <motion.p 
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {service.description}
                </motion.p>
                
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <h3 className="font-semibold mb-3 text-gray-800">Fonctionnalités :</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-center text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + idx * 0.05 }}
                      >
                        <motion.svg 
                          className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </motion.svg>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                >
                  <h3 className="font-semibold mb-3 text-gray-800">Technologies :</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <motion.span 
                        key={idx} 
                        className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.5 + idx * 0.05 }}
                        whileHover={{ scale: 1.1, backgroundColor: "#3B82F6", color: "white" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                >
                  <motion.span 
                    className="text-lg font-bold text-green-600"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.price}
                  </motion.span>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href="/contact"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Demander un devis
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatedCard>
            ))}
          </motion.div>
        </div>
      </ScrollReveal>

      {/* Process Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Processus</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-semibold mb-2">Analyse</h3>
              <p className="text-gray-600 text-sm">Nous analysons vos besoins et définissons les objectifs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold mb-2">Conception</h3>
              <p className="text-gray-600 text-sm">Nous créons une solution adaptée à vos exigences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold mb-2">Développement</h3>
              <p className="text-gray-600 text-sm">Nous développons votre solution avec les meilleures pratiques</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">4️⃣</span>
              </div>
              <h3 className="font-semibold mb-2">Livraison</h3>
              <p className="text-gray-600 text-sm">Nous livrons et assurons le support de votre solution</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Prêt à transformer votre entreprise ?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nos solutions peuvent vous aider à atteindre vos objectifs.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Contactez-nous
          </Link>
        </div>
      </section>
    </div>
  )
} 