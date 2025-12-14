export const siteConfig = {
  name: 'SolvaticaTech',
  description: 'Solutions Digitales Innovantes',
  url: 'https://solvaticatech.com',
  ogImage: 'https://solvaticatech.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/solvaticatech',
    github: 'https://github.com/solvaticatech',
  },
  contact: {
    email: 'abdellatifsow69@gmail.com',
    phone: '+222 4777 6444',
    address: 'Mauritanie',
  },
  social: {
    facebook: 'https://facebook.com/solvaticatech',
    twitter: 'https://twitter.com/solvaticatech',
    instagram: 'https://instagram.com/solvaticatech',
    linkedin: 'https://linkedin.com/company/solvaticatech',
  },
  services: [
    {
      title: 'Développement Web',
      description: 'Création de sites web et applications web modernes et performants',
      icon: 'code',
    },
    {
      title: 'Développement Mobile',
      description: 'Applications mobiles natives et cross-platform',
      icon: 'mobile',
    },
    {
      title: 'UI/UX Design',
      description: 'Design d\'interfaces utilisateur modernes et intuitives',
      icon: 'design',
    },
    {
      title: 'Consulting Digital',
      description: 'Conseil en transformation numérique et stratégie digitale',
      icon: 'consulting',
    },
  ],
  team: [
    {
      name: 'Abdellatif Sow',
      role: 'CEO & Fondateur',
      image: '/team/ceo.jpg',
      bio: 'Expert en développement web et mobile avec plus de 10 ans d\'expérience',
    },
    {
      name: 'Sarah Diallo',
      role: 'Directrice Design',
      image: '/team/design.jpg',
      bio: 'Designer UI/UX passionnée par la création d\'expériences utilisateur exceptionnelles',
    },
    {
      name: 'Mohamed Kane',
      role: 'Lead Developer',
      image: '/team/dev.jpg',
      bio: 'Développeur full-stack spécialisé dans les technologies modernes',
    },
  ],
  testimonials: [
    {
      content: 'SolvaticaTech a transformé notre présence en ligne avec un site web exceptionnel.',
      author: 'Amadou Ba',
      role: 'CEO, Entreprise A',
      image: '/testimonials/client1.jpg',
    },
    {
      content: 'Une équipe professionnelle qui a su répondre à tous nos besoins.',
      author: 'Fatou Diop',
      role: 'Directrice Marketing, Entreprise B',
      image: '/testimonials/client2.jpg',
    },
  ],
  blog: {
    title: 'Blog',
    description: 'Découvrez nos derniers articles et actualités',
    posts: [
      {
        title: 'Les tendances du développement web en 2024',
        excerpt: 'Découvrez les dernières technologies et pratiques en développement web',
        date: '2024-03-15',
        author: 'Abdellatif Sow',
        image: '/blog/web-dev.jpg',
        category: 'Développement',
      },
      {
        title: 'L\'importance du design UX dans le succès d\'une application',
        excerpt: 'Comment un bon design UX peut transformer l\'expérience utilisateur',
        date: '2024-03-10',
        author: 'Sarah Diallo',
        image: '/blog/ux-design.jpg',
        category: 'Design',
      },
    ],
  },
  faq: [
    {
      question: 'Quels services proposez-vous ?',
      answer: 'Nous proposons une gamme complète de services digitaux incluant le développement web, mobile, le design UI/UX et le consulting digital.',
    },
    {
      question: 'Comment puis-je démarrer un projet avec vous ?',
      answer: 'Contactez-nous via notre formulaire de contact ou par téléphone pour discuter de votre projet et obtenir un devis personnalisé.',
    },
    {
      question: 'Quels sont vos délais de livraison ?',
      answer: 'Les délais varient selon la complexité du projet. Nous établissons un planning détaillé lors de la phase initiale du projet.',
    },
  ],
  pricing: {
    title: 'Nos Tarifs',
    description: 'Des solutions adaptées à tous les budgets',
    plans: [
      {
        name: 'Starter',
        price: 'À partir de 1000€',
        features: [
          'Site web vitrine',
          'Design responsive',
          'Formulaire de contact',
          'SEO de base',
        ],
      },
      {
        name: 'Business',
        price: 'À partir de 2500€',
        features: [
          'Site web e-commerce',
          'Design personnalisé',
          'Intégration paiement',
          'SEO avancé',
        ],
      },
      {
        name: 'Enterprise',
        price: 'Sur mesure',
        features: [
          'Application web complète',
          'Design sur mesure',
          'Fonctionnalités avancées',
          'Support prioritaire',
        ],
      },
    ],
  },
  cta: {
    title: 'Prêt à démarrer votre projet ?',
    description: 'Contactez-nous dès aujourd\'hui pour discuter de votre projet',
    button: 'Contactez-nous',
    link: '/contact',
  },
} as const;

export const contactConfig = {
  email: 'contact@technovasolutions.com',
  phone: '+33 1 23 45 67 89',
  address: {
    street: '123 Rue de l\'Innovation',
    city: 'Paris',
    postalCode: '75001',
    country: 'France',
  },
  hours: {
    monday: '9h00 - 18h00',
    tuesday: '9h00 - 18h00',
    wednesday: '9h00 - 18h00',
    thursday: '9h00 - 18h00',
    friday: '9h00 - 18h00',
    saturday: 'Fermé',
    sunday: 'Fermé',
  },
} as const;

export const servicesConfig = {
  web: {
    title: 'Développement Web',
    description: 'Création de sites web et applications web sur mesure',
    features: [
      'Sites web vitrines',
      'Applications web',
      'E-commerce',
      'Intranets',
      'APIs',
    ],
  },
  mobile: {
    title: 'Applications Mobiles',
    description: 'Développement d\'applications mobiles natives et hybrides',
    features: [
      'Applications iOS',
      'Applications Android',
      'Applications hybrides',
      'PWA',
    ],
  },
  design: {
    title: 'Design UI/UX',
    description: 'Création d\'interfaces utilisateur modernes et intuitives',
    features: [
      'Design d\'interface',
      'Expérience utilisateur',
      'Prototypage',
      'Tests utilisateurs',
    ],
  },
  marketing: {
    title: 'Marketing Digital',
    description: 'Stratégies de marketing digital pour votre entreprise',
    features: [
      'SEO',
      'SEA',
      'Social Media',
      'Email Marketing',
    ],
  },
  formation: {
    title: 'Formation',
    description: 'Formations professionnelles en développement web',
    features: [
      'Formations sur mesure',
      'Bootcamps',
      'Tutorat',
      'Certifications',
    ],
  },
} as const;

export const blogConfig = {
  categories: [
    'Développement Web',
    'Applications Mobiles',
    'Design UI/UX',
    'Marketing Digital',
    'Formation',
    'Actualités',
  ],
  tags: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'HTML',
    'CSS',
    'UI/UX',
    'SEO',
    'Marketing',
    'Formation',
  ],
} as const;

export const academyConfig = {
  courses: [
    {
      id: 'web-dev-basics',
      title: 'Développement Web - Les Bases',
      description: 'Apprenez les fondamentaux du développement web',
      duration: '6 semaines',
      level: 'Débutant',
      price: '499€',
    },
    {
      id: 'react-advanced',
      title: 'React - Niveau Avancé',
      description: 'Maîtrisez React et ses écosystèmes',
      duration: '8 semaines',
      level: 'Intermédiaire',
      price: '699€',
    },
    {
      id: 'mobile-dev',
      title: 'Développement Mobile',
      description: 'Créez des applications mobiles natives',
      duration: '10 semaines',
      level: 'Intermédiaire',
      price: '899€',
    },
  ],
} as const; 