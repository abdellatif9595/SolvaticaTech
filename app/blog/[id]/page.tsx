import Image from 'next/image'
import Link from 'next/link'
import DetailPageNav from '../../components/DetailPageNav'
import SocialShare from '../../components/SocialShare'
import Comments from '../../components/Comments'

// Simulons une base de données d'articles
const articles = {
  'ai-trends': {
    id: 'ai-trends',
    title: 'Les tendances de l\'IA en 2024',
    category: 'Intelligence Artificielle',
    excerpt: 'Découvrez les dernières tendances et innovations en matière d\'intelligence artificielle pour l\'année 2024.',
    content: `
      L'intelligence artificielle continue de révolutionner notre façon de travailler et de vivre. En 2024, nous assistons à plusieurs tendances majeures qui façonnent l'avenir de cette technologie.

      ## L'IA générative prend le dessus

      Les modèles d'IA générative comme GPT-4 et DALL-E 3 ont considérablement évolué, offrant des capacités de création de contenu de plus en plus sophistiquées. Ces outils transforment la façon dont nous créons du contenu, du code et des designs.

      ## L'IA au service de la durabilité

      Les entreprises utilisent de plus en plus l'IA pour optimiser leurs opérations et réduire leur impact environnemental. Des algorithmes sophistiqués permettent de :
      - Optimiser la consommation d'énergie
      - Réduire les déchets
      - Améliorer la logistique

      ## L'IA dans la santé

      Le secteur de la santé connaît une transformation majeure grâce à l'IA :
      - Diagnostic plus précis
      - Découverte de nouveaux médicaments
      - Personnalisation des traitements

      ## L'avenir de l'IA

      Les experts prévoient que l'IA continuera à évoluer dans les domaines suivants :
      1. IA plus accessible aux petites entreprises
      2. Meilleure intégration avec l'IoT
      3. Développement de l'IA éthique et responsable

      ## Conclusion

      L'IA en 2024 représente un tournant majeur dans l'histoire de la technologie. Les entreprises qui adoptent ces innovations se positionnent pour un succès futur.
    `,
    author: {
      name: 'Dr. Sarah Chen',
      role: 'Expert en IA',
      image: '/images/team/sarah.jpg'
    },
    date: '15 Mars 2024',
    readTime: '8 min',
    image: '/images/blog/ai-trends.jpg',
    tags: ['IA', 'Innovation', 'Technologie', 'Futur'],
    comments: [
      {
        id: 1,
        author: 'Alice Smith',
        avatar: '/images/avatar1.jpg',
        content: 'Excellent article ! J\'ai particulièrement apprécié la partie sur les micro-frontends.',
        date: '16 Mars 2024',
        replies: [
          {
            id: 2,
            author: 'Dr. Sarah Chen',
            avatar: '/images/team/sarah.jpg',
            content: 'Merci pour votre retour ! Les micro-frontends sont effectivement un sujet passionnant.',
            date: '16 Mars 2024'
          }
        ]
      }
    ]
  },
  'cybersecurity': {
    id: 'cybersecurity',
    title: 'Cybersécurité : Les meilleures pratiques en 2024',
    category: 'Sécurité',
    excerpt: 'Un guide complet sur les meilleures pratiques de cybersécurité pour protéger votre entreprise en 2024.',
    content: `
      La cybersécurité est plus importante que jamais dans notre monde numérique. Voici un guide complet des meilleures pratiques à adopter en 2024.

      ## Les menaces émergentes

      Les cybercriminels développent constamment de nouvelles méthodes d'attaque. Les plus préoccupantes en 2024 sont :
      - Les attaques par IA
      - Le phishing sophistiqué
      - Les ransomwares ciblés

      ## Protection des données

      La protection des données sensibles est cruciale. Voici les mesures essentielles :
      1. Chiffrement de bout en bout
      2. Authentification multi-facteurs
      3. Sauvegardes régulières

      ## Formation des employés

      La formation continue des employés est vitale :
      - Reconnaissance des emails suspects
      - Gestion sécurisée des mots de passe
      - Protocoles de sécurité

      ## Solutions technologiques

      Les solutions de sécurité modernes incluent :
      - Détection des menaces en temps réel
      - Analyse comportementale
      - Protection contre les attaques zero-day

      ## Conclusion

      Une approche proactive de la cybersécurité est essentielle pour protéger votre entreprise en 2024.
    `,
    author: {
      name: 'Marc Dubois',
      role: 'Expert en Cybersécurité',
      image: '/images/team/marc.jpg'
    },
    date: '10 Mars 2024',
    readTime: '6 min',
    image: '/images/blog/cybersecurity.jpg',
    tags: ['Cybersécurité', 'Sécurité', 'Protection', 'Données'],
    comments: [
      {
        id: 1,
        author: 'Alice Smith',
        avatar: '/images/avatar1.jpg',
        content: 'Excellent article ! J\'ai particulièrement apprécié la partie sur les micro-frontends.',
        date: '16 Mars 2024',
        replies: [
          {
            id: 2,
            author: 'Marc Dubois',
            avatar: '/images/team/marc.jpg',
            content: 'Merci pour votre retour ! Les micro-frontends sont effectivement un sujet passionnant.',
            date: '16 Mars 2024'
          }
        ]
      }
    ]
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const article = articles[params.id as keyof typeof articles]

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <Link href="/blog" className="text-primary-600 hover:text-primary-700">
            Retour au blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <span className="text-primary-400 font-semibold mb-4 block">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {article.title}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <Image
                src={article.author.image}
                alt={article.author.name}
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
              <span>{article.author.name}</span>
            </div>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime} de lecture</span>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <DetailPageNav
        title={article.title}
        category={article.category}
        breadcrumbs={[
          { label: 'Blog', href: '/blog' },
          { label: article.title, href: `/blog/${article.id}` }
        ]}
      />

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </article>

              {/* Tags */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag.toLowerCase()}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social Share */}
              <div className="mt-8">
                <SocialShare
                  url={`/blog/${article.id}`}
                  title={article.title}
                  description={article.excerpt}
                />
              </div>

              {/* Comments */}
              <div className="mt-12">
                <Comments
                  comments={article.comments}
                  articleId={article.id}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Author Info */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={article.author.image}
                      alt={article.author.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{article.author.name}</h3>
                    <p className="text-gray-600">{article.author.role}</p>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Restez informé</h3>
                <p className="text-gray-600 mb-4">
                  Recevez nos derniers articles et actualités directement dans votre boîte mail.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
                  >
                    S'abonner
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add related articles here */}
          </div>
        </div>
      </section>
    </div>
  )
} 