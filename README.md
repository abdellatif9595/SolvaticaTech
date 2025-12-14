# SolvaticaTech - Solutions Digitales Innovantes

Site web moderne et complet pour SolvaticaTech, une entreprise de solutions IT basée en Mauritanie.

## 🚀 Technologies utilisées

- **Framework:** Next.js 15 avec App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** Framer Motion
- **Tests:** Jest + React Testing Library
- **Authentification:** Système d'auth personnalisé
- **Chatbot:** Assistant IA intégré
- **Analytics:** Google Analytics 4 + GTM

## Prérequis

- Node.js 18.17 ou supérieur
- npm ou yarn

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/solvatica-tech.git
cd solvatica-tech
```

2. Installez les dépendances :
```bash
npm install
# ou
yarn install
```

3. Créez un fichier `.env.local` à la racine du projet et ajoutez vos variables d'environnement :
```env
# Configuration de base
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Authentification
AUTH_SECRET=your-super-secret-key-change-this-in-production

# Base de données PostgreSQL
DATABASE_URL=postgresql://postgres:password123@localhost:5432/solvaticatech

# Analytics (optionnel)
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
# NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX

# Chatbot (optionnel)
NEXT_PUBLIC_CHATBOT_ENABLED=true
# # CHATBOT_API_KEY=your_openai_api_key
```

4. **Installation de PostgreSQL (Recommandé) :**
   - Téléchargez PostgreSQL : https://www.postgresql.org/download/windows/
   - Installez avec le mot de passe : `password123`
   - Créez une base de données nommée `solvaticatech`
   - Voir le guide complet : `docs/DATABASE_SETUP.md`

## 🛠️ Développement

Pour lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

### Tests

```bash
# Lancer tous les tests
npm run test

# Tests en mode watch
npm run test:watch

# Tests avec couverture
npm run test:coverage
```

### Linting

```bash
npm run lint
```

### Base de données

```bash
# Vérifier la connexion à la base de données
npm run db:check

# Générer le client Prisma
npm run db:generate

# Synchroniser le schéma avec la base
npm run db:push

# Créer une migration
npm run db:migrate

# Ouvrir Prisma Studio (interface graphique)
npm run db:studio

# Peupler la base de données avec des données de test
npm run db:seed
```

## Production

Pour construire l'application pour la production :

```bash
npm run build
# ou
yarn build
```

Pour démarrer le serveur de production :

```bash
npm run start
# ou
yarn start
```

## 📁 Structure du projet

```
solvatica-tech/
├── app/                          # Dossier principal de l'application
│   ├── components/              # Composants réutilisables
│   │   ├── ui/                 # Composants UI (shadcn/ui)
│   │   ├── Chatbot.tsx         # Assistant IA intégré
│   │   ├── AuthProvider.tsx    # Gestion de l'authentification
│   │   ├── ErrorBoundary.tsx   # Gestion des erreurs
│   │   └── Analytics.tsx       # Intégration analytics
│   ├── data/                   # Données et configuration
│   │   └── index.ts           # Données centralisées
│   ├── config/                 # Configuration
│   │   └── environment.ts     # Variables d'environnement
│   ├── hooks/                  # Hooks personnalisés
│   ├── services/              # Services et API
│   ├── blog/                  # Pages du blog
│   ├── portfolio/             # Pages du portfolio
│   ├── academy/               # Pages de l'académie
│   ├── contact/               # Page de contact
│   ├── about/                 # Page à propos
│   ├── login/                 # Page de connexion
│   ├── page.tsx              # Page d'accueil
│   ├── layout.tsx            # Layout principal
│   ├── not-found.tsx         # Page 404 personnalisée
│   └── globals.css           # Styles globaux
├── __tests__/                 # Tests
├── public/                    # Fichiers statiques
├── scripts/                   # Scripts utilitaires
└── docs/                      # Documentation
```

## ✨ Fonctionnalités

### 🎨 Interface utilisateur
- Design moderne et responsive avec Tailwind CSS
- Composants UI réutilisables (shadcn/ui)
- Animations fluides avec Framer Motion
- Navigation intuitive et accessible

### 🤖 Chatbot IA
- Assistant virtuel intégré pour répondre aux visiteurs
- Questions rapides prédéfinies
- Interface de chat moderne et intuitive
- Réponses contextuelles aux questions fréquentes

### 🔐 Authentification
- Système d'authentification complet
- Gestion des rôles utilisateur/admin
- Protection des routes sensibles
- Persistance de session

### 📊 Analytics et Monitoring
- Intégration Google Analytics 4
- Google Tag Manager
- Suivi des événements personnalisés
- Monitoring des performances

### 🧪 Tests et Qualité
- Tests unitaires avec Jest
- Tests d'intégration avec React Testing Library
- Couverture de code
- Linting et formatage automatique

### 📱 Fonctionnalités avancées
- Blog avec articles dynamiques
- Portfolio de projets
- Académie avec cours en ligne
- Formulaire de contact intelligent
- Gestion d'erreurs robuste
- SEO optimisé
- Performance optimisée

### 🔧 Configuration
- Variables d'environnement centralisées
- Configuration flexible pour différents environnements
- Gestion des secrets sécurisée

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Déployez le dossier .next
```

### Docker
```bash
docker build -t solvaticatech .
docker run -p 3000:3000 solvaticatech
```

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Comptes de test
- **Admin:** admin@solvaticatech.com / admin123
- **Utilisateur:** user@example.com / user123

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email: contact@solvaticatech.com
- Site web: https://solvaticatech.com 