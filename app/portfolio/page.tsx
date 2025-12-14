'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Card from '../components/Card'
import AdvancedSearch from '../components/AdvancedSearch'
import Pagination from '../components/Pagination'

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Une plateforme e-commerce complète avec paiement en ligne.',
    image: '/images/projects/project1.jpg',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB'],
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Mobile App',
    description: 'Application mobile de gestion de tâches.',
    image: '/images/projects/project2.jpg',
    category: 'Mobile Development',
    tags: ['React Native', 'Firebase'],
    date: '2024-02-01'
  },
  {
    id: 3,
    title: 'Dashboard',
    description: 'Tableau de bord analytique pour entreprises.',
    image: '/images/projects/project3.jpg',
    category: 'UI/UX Design',
    tags: ['Vue.js', 'D3.js'],
    date: '2024-02-15'
  }
]

const filters = [
  {
    id: 'category',
    label: 'Catégorie',
    type: 'select',
    options: [
      { value: 'all', label: 'Toutes les catégories' },
      { value: 'Web Development', label: 'Développement Web' },
      { value: 'Mobile Development', label: 'Développement Mobile' },
      { value: 'UI/UX Design', label: 'UI/UX Design' }
    ]
  },
  {
    id: 'tags',
    label: 'Technologies',
    type: 'checkbox',
    options: [
      { value: 'React', label: 'React' },
      { value: 'Node.js', label: 'Node.js' },
      { value: 'Vue.js', label: 'Vue.js' },
      { value: 'React Native', label: 'React Native' }
    ]
  },
  {
    id: 'date',
    label: 'Date',
    type: 'select',
    options: [
      { value: 'all', label: 'Toutes les dates' },
      { value: 'recent', label: 'Plus récent' },
      { value: 'oldest', label: 'Plus ancien' }
    ]
  }
]

const sortOptions = [
  { value: 'recent', label: 'Plus récent' },
  { value: 'oldest', label: 'Plus ancien' },
  { value: 'name-asc', label: 'Nom (A-Z)' },
  { value: 'name-desc', label: 'Nom (Z-A)' }
]

export default function PortfolioPage() {
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6

  const handleSearch = (filters: Record<string, any>, sort: string) => {
    let result = [...projects]

    // Appliquer les filtres
    if (filters.category && filters.category !== 'all') {
      result = result.filter(project => project.category === filters.category)
    }

    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(project =>
        filters.tags.some((tag: string) => project.tags.includes(tag))
      )
    }

    // Appliquer le tri
    switch (sort) {
      case 'recent':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'oldest':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
    }

    setFilteredProjects(result)
    setCurrentPage(1)
  }

  // Calculer les projets à afficher pour la page courante
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Notre Portfolio
        </h1>

        {/* Filtres et recherche */}
        <div className="mb-8">
          <AdvancedSearch
            filters={filters}
            sortOptions={sortOptions}
            onSearch={handleSearch}
            className="bg-white p-6 rounded-lg shadow-md"
          />
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentProjects.map(project => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              link={`/portfolio/${project.id}`}
              tags={project.tags}
              date={project.date}
              variant="default"
            />
          ))}
        </div>

        {/* Pagination */}
        {filteredProjects.length > projectsPerPage && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredProjects.length / projectsPerPage)}
              onPageChange={setCurrentPage}
              showFirstLast
            />
          </div>
        )}

        {/* Message si aucun projet trouvé */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Aucun projet ne correspond à vos critères de recherche.
            </p>
          </div>
        )}
      </div>
    </main>
  )
} 