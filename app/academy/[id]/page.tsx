'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Card from '../../components/Card'
import DetailPageNav from '../../components/DetailPageNav'
import SocialShare from '../../components/SocialShare'

// Exemple de données de cours
const course = {
  id: 1,
  title: 'Introduction à React',
  description: 'Apprenez les bases de React et créez votre première application web moderne.',
  image: '/images/course1.jpg',
  category: 'web',
  level: 'beginner',
  duration: '10 heures',
  price: '49.99',
  rating: 4.8,
  students: 1250,
  instructor: {
    name: 'John Doe',
    avatar: '/images/instructor1.jpg',
    bio: 'Développeur web senior avec plus de 10 ans d\'expérience'
  },
  sections: [
    {
      id: 1,
      title: 'Introduction',
      lessons: [
        { id: 1, title: 'Bienvenue dans le cours', duration: '5:00' },
        { id: 2, title: 'Prérequis', duration: '10:00' },
        { id: 3, title: 'Installation de l\'environnement', duration: '15:00' }
      ]
    },
    {
      id: 2,
      title: 'Les bases de React',
      lessons: [
        { id: 4, title: 'Composants et Props', duration: '20:00' },
        { id: 5, title: 'State et Lifecycle', duration: '25:00' },
        { id: 6, title: 'Gestion des événements', duration: '15:00' }
      ]
    }
  ],
  reviews: [
    {
      id: 1,
      user: {
        name: 'Alice Martin',
        avatar: '/images/user1.jpg'
      },
      rating: 5,
      comment: 'Excellent cours pour débuter avec React !',
      date: '2024-02-15'
    },
    {
      id: 2,
      user: {
        name: 'Pierre Dubois',
        avatar: '/images/user2.jpg'
      },
      rating: 4,
      comment: 'Très bon contenu, mais certains exercices pourraient être plus détaillés.',
      date: '2024-02-10'
    }
  ]
}

const navigationItems = [
  { id: 'overview', label: 'Aperçu', href: '#overview' },
  { id: 'curriculum', label: 'Programme', href: '#curriculum' },
  { id: 'instructor', label: 'Instructeur', href: '#instructor' },
  { id: 'reviews', label: 'Avis', href: '#reviews' }
]

export default function CoursePage() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* En-tête du cours */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{course.description}</p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="ml-2">{course.instructor.name}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">{course.rating}</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    fill={i < Math.floor(course.rating) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
              <span className="ml-1">({course.students} étudiants)</span>
            </div>
            <span>{course.duration}</span>
            <span>{course.level}</span>
          </div>
        </div>

        {/* Navigation */}
        <DetailPageNav
          items={navigationItems}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Aperçu */}
            <section id="overview" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Aperçu du cours</h2>
              <div className="prose max-w-none">
                <p>
                  Ce cours vous guidera à travers les concepts fondamentaux de React,
                  en commençant par les bases et en progressant vers des sujets plus avancés.
                </p>
                <h3>Ce que vous allez apprendre :</h3>
                <ul>
                  <li>Les composants React et leur utilisation</li>
                  <li>La gestion d'état avec useState et useReducer</li>
                  <li>Les effets de bord avec useEffect</li>
                  <li>La création d'applications React complètes</li>
                </ul>
              </div>
            </section>

            {/* Programme */}
            <section id="curriculum" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Programme du cours</h2>
              <div className="space-y-4">
                {course.sections.map((section) => (
                  <Card
                    key={section.id}
                    title={section.title}
                    className="mb-4"
                  >
                    <div className="space-y-2">
                      {section.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                        >
                          <span>{lesson.title}</span>
                          <span className="text-sm text-gray-500">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Avis */}
            <section id="reviews" className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Avis des étudiants</h2>
              <div className="space-y-4">
                {course.reviews.map((review) => (
                  <Card key={review.id}>
                    <div className="flex items-start space-x-4">
                      <Image
                        src={review.user.avatar}
                        alt={review.user.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{review.user.name}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex text-yellow-400 my-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4"
                              fill={i < review.rating ? 'currentColor' : 'none'}
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Carte du cours */}
              <Card className="mb-6">
                <div className="aspect-video relative mb-4">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-4">
                  {course.price} €
                </div>
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors">
                  S'inscrire au cours
                </button>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration} de contenu
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Accès à vie
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Certificat de complétion
                  </div>
                </div>
              </Card>

              {/* Partage social */}
              <Card title="Partager ce cours">
                <SocialShare
                  url={`/academy/${course.id}`}
                  title={course.title}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 