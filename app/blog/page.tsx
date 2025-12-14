'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Card from '../components/Card'
import AdvancedSearch from '../components/AdvancedSearch'
import Pagination from '../components/Pagination'

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
    id: 'tags',
    label: 'Tags',
    type: 'checkbox',
    options: [
      { value: 'react', label: 'React' },
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'ai', label: 'IA' },
      { value: 'security', label: 'Sécurité' },
      { value: 'cloud', label: 'Cloud' }
    ]
  },
  {
    id: 'date',
    label: 'Date de publication',
    type: 'radio',
    options: [
      { value: 'week', label: 'Cette semaine' },
      { value: 'month', label: 'Ce mois-ci' },
      { value: 'year', label: 'Cette année' },
      { value: 'all', label: 'Tout' }
    ]
  }
]

const sortOptions = [
  { value: 'date_desc', label: 'Plus récent' },
  { value: 'date_asc', label: 'Plus ancien' },
  { value: 'title_asc', label: 'Titre (A-Z)' },
  { value: 'title_desc', label: 'Titre (Z-A)' }
]

// Exemple de données d'articles
const articles = [
  {
    id: 1,
    title: 'Les tendances du développement web en 2024',
    excerpt: 'Découvrez les dernières tendances et technologies qui façonnent le développement web en 2024.',
    image: '/images/blog1.jpg',
    category: 'web',
    tags: ['react', 'node'],
    date: '2024-03-15',
    author: 'John Doe',
    readTime: '5 min'
  },
  {
    id: 2,
    title: 'L\'IA dans le développement mobile',
    excerpt: 'Comment l\'intelligence artificielle transforme le développement d\'applications mobiles.',
    image: '/images/blog2.jpg',
    category: 'mobile',
    tags: ['ai', 'python'],
    date: '2024-03-10',
    author: 'Jane Smith',
    readTime: '7 min'
  },
  // Ajoutez d'autres articles ici
]

const ITEMS_PER_PAGE = 6

export default function BlogPage() {
  const [filteredArticles, setFilteredArticles] = useState(articles)
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearch = (filters: Record<string, any>, sort: string) => {
    let result = [...articles]

    // Appliquer les filtres
    if (filters.category) {
      result = result.filter(article => article.category === filters.category)
    }

    if (filters.tags?.length) {
      result = result.filter(article =>
        filters.tags.every((tag: string) => article.tags.includes(tag))
      )
    }

    if (filters.date) {
      const now = new Date()
      const filterDate = new Date()
      
      switch (filters.date) {
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }

      if (filters.date !== 'all') {
        result = result.filter(article => new Date(article.date) >= filterDate)
      }
    }

    // Appliquer le tri
    switch (sort) {
      case 'date_desc':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'date_asc':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'title_asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title_desc':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
    }

    setFilteredArticles(result)
    setCurrentPage(1)
  }

  // Calculer les articles à afficher pour la page courante
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentArticles = filteredArticles.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>

        {/* Barre de recherche avancée */}
        <div className="mb-8">
          <AdvancedSearch
            filters={filters}
            sortOptions={sortOptions}
            onSearch={handleSearch}
            className="mb-8"
          />
        </div>

        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map((article) => (
            <Link key={article.id} href={`/blog/${article.id}`}>
              <Card
                image={{
                  src: article.image,
                  alt: article.title
                }}
                title={article.title}
                className="h-full"
              >
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.author}</span>
                  <span>{article.readTime}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun article ne correspond à vos critères de recherche.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  )
} 