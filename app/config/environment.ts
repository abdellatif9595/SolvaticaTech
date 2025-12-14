export const environment = {
  // Configuration de base
  app: {
    name: 'SolvaticaTech',
    version: '1.0.0',
    description: 'Solutions Digitales Innovantes',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // Configuration de l'API
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },

  // Configuration de la base de données
  database: {
    url: process.env.DATABASE_URL,
    type: process.env.DATABASE_TYPE || 'postgresql',
  },

  // Configuration de l'authentification
  auth: {
    secret: process.env.AUTH_SECRET || 'your-secret-key',
    expiresIn: '7d',
    refreshTokenExpiresIn: '30d',
  },

  // Configuration des emails
  email: {
    provider: process.env.EMAIL_PROVIDER || 'smtp',
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM || 'noreply@solvaticatech.com',
  },

  // Configuration des paiements
  payments: {
    stripe: {
      publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },

  // Configuration du stockage
  storage: {
    provider: process.env.STORAGE_PROVIDER || 'local',
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1',
      bucket: process.env.AWS_S3_BUCKET,
    },
  },

  // Configuration des analytics
  analytics: {
    googleAnalytics: {
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    },
    googleTagManager: {
      containerId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
    },
  },

  // Configuration du chatbot
  chatbot: {
    enabled: process.env.NEXT_PUBLIC_CHATBOT_ENABLED === 'true',
    apiKey: process.env.CHATBOT_API_KEY,
    model: process.env.CHATBOT_MODEL || 'gpt-3.5-turbo',
  },

  // Configuration des notifications
  notifications: {
    push: {
      vapidPublicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      vapidPrivateKey: process.env.VAPID_PRIVATE_KEY,
    },
  },

  // Configuration du cache
  cache: {
    redis: {
      url: process.env.REDIS_URL,
      ttl: 3600, // 1 heure
    },
  },

  // Configuration de la sécurité
  security: {
    cors: {
      origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
      credentials: true,
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limite par IP
    },
  },

  // Configuration du développement
  development: {
    debug: process.env.NODE_ENV === 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
  },
}

// Fonctions utilitaires pour la configuration
export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isTest = process.env.NODE_ENV === 'test'

export const getConfig = (key: string) => {
  const keys = key.split('.')
  let value: any = environment
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return undefined
    }
  }
  
  return value
}

export const requireConfig = (key: string) => {
  const value = getConfig(key)
  if (value === undefined) {
    throw new Error(`Configuration manquante: ${key}`)
  }
  return value
} 