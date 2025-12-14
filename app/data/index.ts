export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  image: string
  category: string
  tags: string[]
  readTime: number
}

export interface Project {
  id: string
  title: string
  description: string
  content: string
  image: string
  category: string
  technologies: string[]
  client: string
  completedAt: string
  liveUrl?: string
  githubUrl?: string
}

export interface AcademyCourse {
  id: string
  title: string
  description: string
  content: string
  instructor: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  image: string
  modules: CourseModule[]
}

export interface CourseModule {
  id: string
  title: string
  duration: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'text' | 'quiz'
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  pricing: PricingTier[]
}

export interface PricingTier {
  name: string
  price: number
  features: string[]
  popular?: boolean
}

export interface Testimonial {
  id: string
  content: string
  author: string
  role: string
  company: string
  image: string
  rating: number
}

// Données des services
export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Développement Web',
    description: 'Création de sites web modernes et responsifs avec les dernières technologies.',
    icon: 'Code',
    features: [
      'Sites web responsifs',
      'Applications web progressives (PWA)',
      'E-commerce',
      'CMS personnalisés',
      'Optimisation SEO',
      'Maintenance et support'
    ],
    pricing: [
      {
        name: 'Site Vitrine',
        price: 1500,
        features: ['Design personnalisé', 'Responsive', 'SEO de base', 'Formulaire de contact']
      },
      {
        name: 'Site E-commerce',
        price: 3500,
        features: ['Catalogue produits', 'Paiement sécurisé', 'Gestion des stocks', 'Panel admin'],
        popular: true
      },
      {
        name: 'Application Web',
        price: 8000,
        features: ['Fonctionnalités avancées', 'API REST', 'Base de données', 'Authentification']
      }
    ]
  },
  {
    id: 'mobile-development',
    title: 'Applications Mobiles',
    description: 'Développement d\'applications mobiles natives et cross-platform.',
    icon: 'Smartphone',
    features: [
      'Applications iOS et Android',
      'React Native',
      'Flutter',
      'Applications natives',
      'Intégration API',
      'Publication sur stores'
    ],
    pricing: [
      {
        name: 'App Simple',
        price: 3000,
        features: ['Interface utilisateur', 'Navigation', 'Stockage local', 'Notifications push']
      },
      {
        name: 'App Complète',
        price: 8000,
        features: ['Backend intégré', 'Authentification', 'Paiements', 'Analytics'],
        popular: true
      },
      {
        name: 'App Entreprise',
        price: 15000,
        features: ['Fonctionnalités avancées', 'Sécurité renforcée', 'Intégration ERP', 'Support 24/7']
      }
    ]
  },
  {
    id: 'cloud-solutions',
    title: 'Solutions Cloud',
    description: 'Mise en place et gestion d\'infrastructures cloud sécurisées.',
    icon: 'Cloud',
    features: [
      'Migration cloud',
      'Architecture scalable',
      'Sécurité et conformité',
      'Monitoring et alertes',
      'Sauvegarde automatique',
      'Support technique'
    ],
    pricing: [
      {
        name: 'Migration Basique',
        price: 2000,
        features: ['Audit infrastructure', 'Migration des données', 'Configuration de base']
      },
      {
        name: 'Infrastructure Complète',
        price: 5000,
        features: ['Architecture cloud', 'Sécurisation', 'Monitoring', 'Formation équipe'],
        popular: true
      },
      {
        name: 'Gestion Continue',
        price: 800,
        features: ['Maintenance 24/7', 'Mises à jour', 'Support prioritaire', 'Rapports mensuels']
      }
    ]
  },
  {
    id: 'data-analytics',
    title: 'Analyse de Données',
    description: 'Analyse et visualisation de données pour une meilleure prise de décision.',
    icon: 'BarChart3',
    features: [
      'Collecte de données',
      'Nettoyage et traitement',
      'Analyse statistique',
      'Visualisations interactives',
      'Tableaux de bord',
      'Rapports automatisés'
    ],
    pricing: [
      {
        name: 'Analyse Basique',
        price: 1500,
        features: ['Collecte données', 'Rapport simple', 'Recommandations de base']
      },
      {
        name: 'Dashboard Complet',
        price: 4000,
        features: ['Visualisations avancées', 'Métriques temps réel', 'Alertes automatiques'],
        popular: true
      },
      {
        name: 'IA et ML',
        price: 10000,
        features: ['Modèles prédictifs', 'Automatisation', 'Optimisation continue', 'Support expert']
      }
    ]
  }
]

// Données des projets
export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'Plateforme E-commerce',
    description: 'Plateforme e-commerce complète avec paiement sécurisé et gestion des stocks.',
    content: 'Développement d\'une plateforme e-commerce moderne utilisant Next.js, Stripe pour les paiements, et une architecture microservices. Le projet inclut un système de gestion des stocks, des notifications en temps réel, et une interface d\'administration complète.',
    image: '/images/projects/ecommerce.jpg',
    category: 'Web Development',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Redis'],
    client: 'TechCorp',
    completedAt: '2024-01-15',
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/solvaticatech/ecommerce-platform'
  },
  {
    id: 'mobile-banking',
    title: 'Application Bancaire Mobile',
    description: 'Application mobile bancaire avec authentification biométrique.',
    content: 'Application mobile bancaire développée avec React Native, intégrant l\'authentification biométrique, les transferts d\'argent, la gestion des comptes, et des notifications push pour les transactions.',
    image: '/images/projects/banking.jpg',
    category: 'Mobile Development',
    technologies: ['React Native', 'Biometrics', 'Node.js', 'MongoDB', 'Firebase'],
    client: 'BankInnovate',
    completedAt: '2024-02-20',
    liveUrl: 'https://apps.apple.com/app/bankinnovate',
    githubUrl: 'https://github.com/solvaticatech/mobile-banking'
  },
  {
    id: 'analytics-dashboard',
    title: 'Tableau de Bord Analytique',
    description: 'Tableau de bord analytique pour la visualisation de données en temps réel.',
    content: 'Tableau de bord analytique développé avec D3.js et React, permettant la visualisation de données en temps réel, la génération de rapports automatisés, et l\'export de données dans différents formats.',
    image: '/images/projects/analytics.jpg',
    category: 'Data Science',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
    client: 'DataCorp',
    completedAt: '2024-03-10',
    liveUrl: 'https://analytics.datacorp.com',
    githubUrl: 'https://github.com/solvaticatech/analytics-dashboard'
  },
  {
    id: 'crm-system',
    title: 'Système CRM',
    description: 'Système de gestion de la relation client avec automatisation des processus.',
    content: 'Système CRM complet développé avec Vue.js et Laravel, incluant la gestion des contacts, l\'automatisation des emails, le suivi des opportunités, et des rapports détaillés.',
    image: '/images/projects/crm.jpg',
    category: 'Web Development',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'SendGrid'],
    client: 'SalesPro',
    completedAt: '2024-01-30',
    liveUrl: 'https://crm.salespro.com',
    githubUrl: 'https://github.com/solvaticatech/crm-system'
  },
  {
    id: 'iot-platform',
    title: 'Plateforme IoT',
    description: 'Plateforme IoT pour la collecte et l\'analyse de données de capteurs.',
    content: 'Plateforme IoT développée avec Node.js et MongoDB, permettant la collecte de données de capteurs en temps réel, l\'analyse des données, et la génération d\'alertes automatiques.',
    image: '/images/projects/iot.jpg',
    category: 'IoT',
    technologies: ['Node.js', 'MongoDB', 'MQTT', 'Grafana', 'Docker'],
    client: 'SmartTech',
    completedAt: '2024-02-15',
    liveUrl: 'https://iot.smarttech.com',
    githubUrl: 'https://github.com/solvaticatech/iot-platform'
  },
  {
    id: 'ai-chatbot',
    title: 'Chatbot IA',
    description: 'Chatbot intelligent avec traitement du langage naturel.',
    content: 'Chatbot développé avec Python et TensorFlow, intégrant le traitement du langage naturel, l\'apprentissage automatique, et une interface web moderne pour la gestion des conversations.',
    image: '/images/projects/chatbot.jpg',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL'],
    client: 'SupportAI',
    completedAt: '2024-03-05',
    liveUrl: 'https://chatbot.supportai.com',
    githubUrl: 'https://github.com/solvaticatech/ai-chatbot'
  }
]

// Données des articles de blog
export const blogPosts: BlogPost[] = [
  {
    id: 'nextjs-best-practices',
    title: 'Meilleures pratiques pour Next.js en 2024',
    excerpt: 'Découvrez les meilleures pratiques pour optimiser vos applications Next.js et améliorer les performances.',
    content: `
# Meilleures pratiques pour Next.js en 2024

Next.js continue d'évoluer rapidement, et il est important de suivre les meilleures pratiques pour créer des applications performantes et maintenables.

## 1. Utilisation du App Router

Le App Router est maintenant stable et recommandé pour tous les nouveaux projets. Il offre de meilleures performances et une meilleure expérience développeur.

## 2. Optimisation des images

Utilisez le composant Image de Next.js pour optimiser automatiquement vos images :

\`\`\`jsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority
/>
\`\`\`

## 3. Gestion du state

Pour la gestion du state, privilégiez les solutions modernes comme Zustand ou Jotai pour les applications simples, et Redux Toolkit pour les applications complexes.

## 4. Optimisation des performances

- Utilisez React.memo pour mémoriser les composants
- Implémentez la virtualisation pour les longues listes
- Utilisez les Suspense boundaries pour le chargement progressif

## 5. SEO et métadonnées

Configurez correctement les métadonnées pour améliorer le SEO :

\`\`\`jsx
export const metadata = {
  title: 'Mon Application',
  description: 'Description de mon application',
  openGraph: {
    title: 'Mon Application',
    description: 'Description de mon application',
  },
}
\`\`\`

## Conclusion

En suivant ces meilleures pratiques, vous créerez des applications Next.js plus performantes, maintenables et accessibles.
    `,
    author: 'Ahmed Diallo',
    publishedAt: '2024-03-15',
    image: '/images/blog/nextjs-best-practices.jpg',
    category: 'Développement Web',
    tags: ['Next.js', 'React', 'Performance', 'SEO'],
    readTime: 8
  },
  {
    id: 'ai-in-web-development',
    title: 'L\'IA dans le développement web : tendances 2024',
    excerpt: 'Comment l\'intelligence artificielle transforme le développement web et quelles sont les tendances à suivre.',
    content: `
# L'IA dans le développement web : tendances 2024

L'intelligence artificielle révolutionne le développement web, offrant de nouvelles possibilités et améliorant l'efficacité des développeurs.

## 1. Génération de code avec l'IA

Les outils comme GitHub Copilot et Amazon CodeWhisperer transforment la façon dont nous écrivons du code, offrant des suggestions intelligentes et automatisant les tâches répétitives.

## 2. Tests automatisés

L'IA permet de générer automatiquement des tests basés sur le comportement attendu de l'application, réduisant le temps de développement et améliorant la qualité du code.

## 3. Optimisation des performances

Les algorithmes d'IA analysent les performances des applications et suggèrent des optimisations automatiques pour améliorer la vitesse de chargement.

## 4. Personnalisation du contenu

L'IA permet de créer des expériences utilisateur personnalisées en analysant le comportement des utilisateurs et en adaptant le contenu en conséquence.

## 5. Sécurité renforcée

Les systèmes d'IA détectent automatiquement les vulnérabilités de sécurité et les menaces potentielles, protégeant les applications web.

## Conclusion

L'IA n'est plus une option mais une nécessité dans le développement web moderne. Les développeurs qui adoptent ces technologies auront un avantage concurrentiel significatif.
    `,
    author: 'Fatima Ahmed',
    publishedAt: '2024-03-10',
    image: '/images/blog/ai-web-development.jpg',
    category: 'Intelligence Artificielle',
    tags: ['IA', 'Développement Web', 'Innovation', 'Tendances'],
    readTime: 6
  },
  {
    id: 'mobile-app-development-trends',
    title: 'Tendances du développement mobile en 2024',
    excerpt: 'Les technologies et frameworks qui dominent le développement mobile cette année.',
    content: `
# Tendances du développement mobile en 2024

Le développement mobile évolue rapidement avec l'émergence de nouvelles technologies et l'amélioration des frameworks existants.

## 1. React Native continue de dominer

React Native reste le framework cross-platform le plus populaire, avec des améliorations continues et une communauté active.

## 2. Flutter gagne en popularité

Flutter de Google gagne rapidement des parts de marché grâce à ses performances natives et son développement rapide.

## 3. Applications natives avec SwiftUI et Jetpack Compose

Les frameworks natifs modernes offrent de meilleures performances et une meilleure intégration avec les plateformes.

## 4. PWA et applications web

Les Progressive Web Apps deviennent une alternative viable aux applications natives, offrant une expérience similaire sans installation.

## 5. Intégration de l'IA

L'intelligence artificielle s'intègre de plus en plus dans les applications mobiles, offrant des fonctionnalités intelligentes et personnalisées.

## Conclusion

Le développement mobile en 2024 se caractérise par la diversité des approches et l'importance croissante de l'IA et des technologies émergentes.
    `,
    author: 'Moussa Ba',
    publishedAt: '2024-03-05',
    image: '/images/blog/mobile-development-trends.jpg',
    category: 'Développement Mobile',
    tags: ['Mobile', 'React Native', 'Flutter', 'PWA'],
    readTime: 7
  }
]

// Données des cours d'académie
export const academyCourses: AcademyCourse[] = [
  {
    id: 'web-development-basics',
    title: 'Fondamentaux du Développement Web',
    description: 'Apprenez les bases du développement web avec HTML, CSS et JavaScript.',
    content: 'Ce cours vous initie aux fondamentaux du développement web moderne. Vous apprendrez à créer des sites web responsifs et interactifs.',
    instructor: 'Ahmed Diallo',
    duration: '8 semaines',
    level: 'beginner',
    price: 299,
    image: '/images/academy/web-basics.jpg',
    modules: [
      {
        id: 'html-css',
        title: 'HTML et CSS',
        duration: '2 semaines',
        lessons: [
          { id: 'html-intro', title: 'Introduction à HTML', duration: '45 min', type: 'video' },
          { id: 'css-styling', title: 'Styling avec CSS', duration: '60 min', type: 'video' },
          { id: 'responsive-design', title: 'Design Responsive', duration: '90 min', type: 'video' },
          { id: 'html-css-quiz', title: 'Quiz HTML/CSS', duration: '30 min', type: 'quiz' }
        ]
      },
      {
        id: 'javascript',
        title: 'JavaScript',
        duration: '3 semaines',
        lessons: [
          { id: 'js-basics', title: 'Bases de JavaScript', duration: '60 min', type: 'video' },
          { id: 'dom-manipulation', title: 'Manipulation du DOM', duration: '75 min', type: 'video' },
          { id: 'async-js', title: 'JavaScript Asynchrone', duration: '90 min', type: 'video' },
          { id: 'js-project', title: 'Projet JavaScript', duration: '120 min', type: 'text' }
        ]
      },
      {
        id: 'react-intro',
        title: 'Introduction à React',
        duration: '3 semaines',
        lessons: [
          { id: 'react-basics', title: 'Bases de React', duration: '90 min', type: 'video' },
          { id: 'components', title: 'Composants React', duration: '75 min', type: 'video' },
          { id: 'state-management', title: 'Gestion d\'état', duration: '90 min', type: 'video' },
          { id: 'final-project', title: 'Projet Final', duration: '180 min', type: 'text' }
        ]
      }
    ]
  },
  {
    id: 'advanced-react',
    title: 'React Avancé',
    description: 'Maîtrisez React avec les hooks, le contexte, et les patterns avancés.',
    content: 'Ce cours avancé vous permettra de maîtriser React et de créer des applications complexes et performantes.',
    instructor: 'Fatima Ahmed',
    duration: '6 semaines',
    level: 'intermediate',
    price: 399,
    image: '/images/academy/advanced-react.jpg',
    modules: [
      {
        id: 'hooks',
        title: 'Hooks React',
        duration: '2 semaines',
        lessons: [
          { id: 'use-state', title: 'useState et useEffect', duration: '60 min', type: 'video' },
          { id: 'custom-hooks', title: 'Hooks personnalisés', duration: '75 min', type: 'video' },
          { id: 'use-context', title: 'useContext et useReducer', duration: '90 min', type: 'video' }
        ]
      },
      {
        id: 'performance',
        title: 'Optimisation des performances',
        duration: '2 semaines',
        lessons: [
          { id: 'memoization', title: 'Mémorisation', duration: '60 min', type: 'video' },
          { id: 'code-splitting', title: 'Code Splitting', duration: '75 min', type: 'video' },
          { id: 'lazy-loading', title: 'Chargement différé', duration: '60 min', type: 'video' }
        ]
      },
      {
        id: 'testing',
        title: 'Tests React',
        duration: '2 semaines',
        lessons: [
          { id: 'unit-tests', title: 'Tests unitaires', duration: '90 min', type: 'video' },
          { id: 'integration-tests', title: 'Tests d\'intégration', duration: '75 min', type: 'video' },
          { id: 'e2e-tests', title: 'Tests end-to-end', duration: '90 min', type: 'video' }
        ]
      }
    ]
  }
]

// Données des témoignages
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    content: "Une équipe professionnelle qui a su transformer notre vision en réalité. Le résultat dépasse nos attentes et nous a permis d'augmenter nos ventes de 40%.",
    author: "Jean Dupont",
    role: "CEO",
    company: "TechCorp",
    image: "/images/testimonials/1.jpg",
    rating: 5
  },
  {
    id: 'testimonial-2',
    content: "Un partenariat exceptionnel qui nous a permis d'accélérer notre transformation digitale. L'équipe SolvaticaTech est réactive et compétente.",
    author: "Marie Martin",
    role: "CTO",
    company: "Innovate",
    image: "/images/testimonials/2.jpg",
    rating: 5
  },
  {
    id: 'testimonial-3',
    content: "Des solutions innovantes et une équipe à l'écoute. Je recommande vivement leurs services pour tout projet digital ambitieux.",
    author: "Pierre Durand",
    role: "Directeur Digital",
    company: "FutureTech",
    image: "/images/testimonials/3.jpg",
    rating: 5
  },
  {
    id: 'testimonial-4',
    content: "L'application mobile développée par SolvaticaTech a révolutionné notre relation client. Interface intuitive et performances excellentes.",
    author: "Sophie Bernard",
    role: "Directrice Marketing",
    company: "RetailPlus",
    image: "/images/testimonials/4.jpg",
    rating: 5
  },
  {
    id: 'testimonial-5',
    content: "Un accompagnement complet de A à Z. De la conception à la mise en production, tout s'est déroulé parfaitement.",
    author: "Marc Leroy",
    role: "Fondateur",
    company: "StartupXYZ",
    image: "/images/testimonials/5.jpg",
    rating: 5
  }
]

// Fonctions utilitaires
export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id)
}

export const getBlogPostById = (id: string) => {
  return blogPosts.find(post => post.id === id)
}

export const getCourseById = (id: string) => {
  return academyCourses.find(course => course.id === id)
}

export const getServiceById = (id: string) => {
  return services.find(service => service.id === id)
}

export const getProjectsByCategory = (category: string) => {
  return projects.filter(project => project.category === category)
}

export const getBlogPostsByCategory = (category: string) => {
  return blogPosts.filter(post => post.category === category)
}

export const getCoursesByLevel = (level: 'beginner' | 'intermediate' | 'advanced') => {
  return academyCourses.filter(course => course.level === level)
} 