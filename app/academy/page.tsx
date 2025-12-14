'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Card from '../components/Card'
import AdvancedSearch from '../components/AdvancedSearch'

const filters = [
  {
    id: 'category',
    label: 'Catégorie',
    type: 'select',
    options: [
      { value: 'web', label: 'Développement Web' },
      { value: 'mobile', label: 'Développement Mobile' },
      { value: 'ai', label: 'Intelligence Artificielle' },
      { value: 'security', label: 'Cybersécurité' },
      { value: 'cloud', label: 'Cloud Computing' }
    ]
  },
  {
    id: 'level',
    label: 'Niveau',
    type: 'radio',
    options: [
      { value: 'beginner', label: 'Débutant' },
      { value: 'intermediate', label: 'Intermédiaire' },
      { value: 'advanced', label: 'Avancé' }
    ]
  },
  {
    id: 'duration',
    label: 'Durée',
    type: 'select',
    options: [
      { value: 'short', label: 'Court (< 5h)' },
      { value: 'medium', label: 'Moyen (5-10h)' },
      { value: 'long', label: 'Long (> 10h)' }
    ]
  }
]

const sortOptions = [
  { value: 'popular', label: 'Plus populaire' },
  { value: 'recent', label: 'Plus récent' },
  { value: 'rating', label: 'Mieux noté' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' }
]

// Exemple de données de cours
const courses = [
  {
    id: 1,
    title: 'Introduction à React',
    description: 'Apprenez les bases de React et créez votre première application web moderne.',
    image: '/images/course1.jpg',
    category: 'web',
    level: 'beginner',
    duration: 'short',
    price: '49.99',
    rating: 4.8,
    students: 1250,
    instructor: {
      name: 'John Doe',
      avatar: '/images/instructor1.jpg'
    }
  },
  {
    id: 2,
    title: 'Développement Mobile avec Flutter',
    description: 'Créez des applications mobiles cross-platform avec Flutter et Dart.',
    image: '/images/course2.jpg',
    category: 'mobile',
    level: 'intermediate',
    duration: 'medium',
    price: '79.99',
    rating: 4.6,
    students: 850,
    instructor: {
      name: 'Jane Smith',
      avatar: '/images/instructor2.jpg'
    }
  },
  // Ajoutez d'autres cours ici
]

const features = [
  {
    title: 'Formateurs Experts',
    description: 'Apprenez auprès de professionnels expérimentés du secteur.',
    icon: '👨‍🏫'
  },
  {
    title: 'Projets Pratiques',
    description: 'Mettez en pratique vos connaissances avec des projets réels.',
    icon: '💻'
  },
  {
    title: 'Certification',
    description: 'Obtenez un certificat reconnu par l\'industrie.',
    icon: '🎓'
  },
  {
    title: 'Support Carrière',
    description: 'Accompagnement dans votre recherche d\'emploi.',
    icon: '🤝'
  }
]

export default function AcademyPage() {
  const [filteredCourses, setFilteredCourses] = useState(courses)

  const handleSearch = (filters: Record<string, any>, sort: string) => {
    let result = [...courses]

    // Appliquer les filtres
    if (filters.category) {
      result = result.filter(course => course.category === filters.category)
    }

    if (filters.level) {
      result = result.filter(course => course.level === filters.level)
    }

    if (filters.duration) {
      result = result.filter(course => course.duration === filters.duration)
    }

    // Appliquer le tri
    switch (sort) {
      case 'popular':
        result.sort((a, b) => b.students - a.students)
        break
      case 'recent':
        // Ajouter une date de création aux cours pour un tri plus précis
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'price_asc':
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        break
      case 'price_desc':
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        break
    }

    setFilteredCourses(result)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Académie</h1>

        {/* Barre de recherche avancée */}
        <div className="mb-8">
          <AdvancedSearch
            filters={filters}
            sortOptions={sortOptions}
            onSearch={handleSearch}
            className="mb-8"
          />
        </div>

        {/* Grille de cours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/academy/${course.id}`}>
              <Card
                image={{
                  src: course.image,
                  alt: course.title
                }}
                title={course.title}
                className="h-full"
              >
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Image
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {course.instructor.name}
                    </span>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <span className="mr-1">{course.rating}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{course.students} étudiants</span>
                  <span className="font-semibold text-primary-600">{course.price} €</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun cours ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 