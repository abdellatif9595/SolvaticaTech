'use client'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DetailPageNav from '../../components/DetailPageNav'
import SocialShare from '../../components/SocialShare'
import ImageGallery from '../../components/ImageGallery'

// Simuler une base de données de projets
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Une plateforme e-commerce complète avec paiement en ligne.',
    longDescription: `
      <p>Ce projet est une plateforme e-commerce complète développée pour une entreprise de vente en ligne. 
      La plateforme permet aux utilisateurs de parcourir les produits, d'ajouter des articles à leur panier, 
      et de finaliser leurs achats en toute sécurité.</p>
      
      <h3>Fonctionnalités principales :</h3>
      <ul>
        <li>Interface utilisateur intuitive et responsive</li>
        <li>Système de paiement sécurisé</li>
        <li>Gestion des stocks en temps réel</li>
        <li>Tableau de bord administrateur</li>
        <li>Intégration avec les réseaux sociaux</li>
      </ul>
    `,
    image: '/images/projects/project1.jpg',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB'],
    date: '2024-01-15',
    client: 'E-commerce Company',
    duration: '3 mois',
    technologies: [
      'React.js',
      'Node.js',
      'Express',
      'MongoDB',
      'Stripe',
      'AWS'
    ],
    gallery: [
      '/images/projects/project1-gallery1.jpg',
      '/images/projects/project1-gallery2.jpg',
      '/images/projects/project1-gallery3.jpg'
    ],
    challenges: [
      'Mise en place d\'un système de paiement sécurisé',
      'Optimisation des performances',
      'Gestion des stocks en temps réel'
    ],
    results: [
      'Augmentation de 150% des ventes en ligne',
      'Réduction de 30% du temps de chargement',
      'Satisfaction client de 95%'
    ]
  }
]

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === parseInt(params.id))

  if (!project) {
    notFound()
  }

  const navigationItems = [
    { id: 'overview', label: 'Aperçu', href: '#overview' },
    { id: 'gallery', label: 'Galerie', href: '#gallery' },
    { id: 'technologies', label: 'Technologies', href: '#technologies' },
    { id: 'challenges', label: 'Défis', href: '#challenges' },
    { id: 'results', label: 'Résultats', href: '#results' }
  ]

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* En-tête du projet */}
        <div className="mb-8">
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-6">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <p>Client : {project.client}</p>
              <p>Durée : {project.duration}</p>
              <p>Date : {project.date}</p>
            </div>
            <SocialShare
              url={`/portfolio/${project.id}`}
              title={project.title}
              description={project.description}
            />
          </div>
        </div>

        {/* Navigation */}
        <DetailPageNav
          items={navigationItems}
          className="sticky top-0 bg-white shadow-sm z-10 mb-8"
        />

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Aperçu */}
            <section id="overview" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Aperçu</h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: project.longDescription }}
              />
            </section>

            {/* Galerie */}
            <section id="gallery" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Galerie</h2>
              <ImageGallery images={project.gallery} />
            </section>

            {/* Technologies */}
            <section id="technologies" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Technologies utilisées</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.technologies.map(tech => (
                  <div
                    key={tech}
                    className="p-4 bg-gray-50 rounded-lg text-center"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </section>

            {/* Défis */}
            <section id="challenges" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Défis rencontrés</h2>
              <ul className="list-disc list-inside space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-gray-600">
                    {challenge}
                  </li>
                ))}
              </ul>
            </section>

            {/* Résultats */}
            <section id="results" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Résultats</h2>
              <ul className="list-disc list-inside space-y-2">
                {project.results.map((result, index) => (
                  <li key={index} className="text-gray-600">
                    {result}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Informations</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Catégorie</p>
                    <p className="font-medium">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Client</p>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Durée</p>
                    <p className="font-medium">{project.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{project.date}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-primary-600 text-white py-3 px-6 rounded-lg
                    hover:bg-primary-700 transition-colors"
                >
                  Discuter de votre projet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 