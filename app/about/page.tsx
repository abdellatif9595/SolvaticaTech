import Link from 'next/link'

const team = [
  {
    name: 'Abdellatif Sow',
    role: 'Fondateur & CEO',
    image: '/images/team/abdellatif.jpg',
    description: 'Expert en développement web avec 8+ années d\'expérience',
    skills: ['React', 'Node.js', 'Next.js', 'TypeScript']
  },
  {
    name: 'Fatima Mint Mohamed',
    role: 'Lead Designer',
    image: '/images/team/fatima.jpg',
    description: 'Designer UI/UX passionnée par l\'expérience utilisateur',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping']
  },
  {
    name: 'Ahmed Ould Mohamed',
    role: 'Développeur Mobile',
    image: '/images/team/ahmed.jpg',
    description: 'Spécialiste des applications mobiles natives et hybrides',
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin']
  },
  {
    name: 'Mariem Mint Salem',
    role: 'Développeuse Full-Stack',
    image: '/images/team/mariem.jpg',
    description: 'Passionnée par les technologies modernes et l\'innovation',
    skills: ['Vue.js', 'Python', 'Django', 'PostgreSQL']
  }
]

const values = [
  {
    icon: '🎯',
    title: 'Excellence',
    description: 'Nous nous engageons à fournir des solutions de qualité supérieure qui dépassent les attentes de nos clients.'
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    description: 'Nous croyons en la force du travail d\'équipe et en la collaboration étroite avec nos clients.'
  },
  {
    icon: '🚀',
    title: 'Innovation',
    description: 'Nous adoptons les dernières technologies et méthodologies pour rester à la pointe de l\'innovation.'
  },
  {
    icon: '💡',
    title: 'Transparence',
    description: 'Nous maintenons une communication claire et transparente tout au long du processus de développement.'
  }
]

const stats = [
  { number: '50+', label: 'Projets réalisés' },
  { number: '30+', label: 'Clients satisfaits' },
  { number: '5', label: 'Années d\'expérience' },
  { number: '100%', label: 'Taux de satisfaction' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            À propos de SolvaticaTech
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Votre partenaire de confiance pour la transformation digitale en Mauritanie et au-delà
          </p>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Fondée en 2019 par Abdellatif Sow, SolvaticaTech est née de la vision de démocratiser 
                  l'accès aux technologies de pointe en Mauritanie. Nous avons commencé comme une petite 
                  équipe passionnée par l'innovation technologique.
                </p>
                <p>
                  Au fil des années, nous avons grandi pour devenir l'une des entreprises de développement 
                  les plus reconnues du pays, avec plus de 50 projets réalisés et une clientèle diversifiée 
                  allant des startups aux grandes entreprises.
                </p>
                <p>
                  Notre mission est de transformer les idées en réalité numérique, en proposant des solutions 
                  innovantes, fiables et adaptées aux besoins spécifiques de nos clients mauritaniens et africains.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-6xl text-white opacity-80">🏢</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Équipe</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-white">👤</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nos Réalisations</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission et Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Notre Mission</h3>
              <p className="text-gray-600">
                Accompagner les entreprises mauritaniennes et africaines dans leur transformation digitale 
                en proposant des solutions technologiques innovantes, fiables et adaptées à leurs besoins spécifiques. 
                Nous nous engageons à démocratiser l'accès aux technologies de pointe sur le continent africain.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Notre Vision</h3>
              <p className="text-gray-600">
                Devenir le leader de l'innovation technologique en Mauritanie et en Afrique de l'Ouest, 
                en contribuant activement au développement économique du continent grâce à des solutions 
                digitales qui améliorent la vie des populations et transforment les entreprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Rejoignez-nous dans cette aventure</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Découvrez comment nous pouvons vous aider à transformer vos idées en réalité numérique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            >
              Démarrer un projet
            </Link>
            <Link 
              href="/services"
              className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Découvrir nos services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}