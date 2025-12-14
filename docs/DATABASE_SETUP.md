# Guide d'installation de PostgreSQL pour SolvaticaTech

## 📋 Prérequis

- Windows 10/11
- Droits administrateur
- Connexion Internet

## 🚀 Installation de PostgreSQL

### Étape 1 : Téléchargement
1. Allez sur https://www.postgresql.org/download/windows/
2. Cliquez sur "Download the installer"
3. Choisissez la version **PostgreSQL 15** ou **16** (recommandée)

### Étape 2 : Installation
1. **Lancez l'installateur** téléchargé
2. **Configuration de l'installation :**
   - Port : `5432` (par défaut)
   - **Mot de passe pour l'utilisateur `postgres` :** `password123` (ou notez le vôtre)
   - Locale : `Default locale`
   - Stack Builder : Décochez (optionnel)

### Étape 3 : Vérification
Après installation, ouvrez un nouveau terminal et tapez :
```bash
psql --version
```

## 🛠️ Installation de pgAdmin (Interface graphique)

### Étape 1 : Téléchargement
1. Allez sur https://www.pgadmin.org/download/pgadmin-4-windows/
2. Téléchargez la version Windows

### Étape 2 : Installation
1. Lancez l'installateur
2. Suivez l'assistant avec les options par défaut

### Étape 3 : Configuration
1. Ouvrez pgAdmin
2. Créez un nouveau serveur :
   - Nom : `SolvaticaTech Local`
   - Host : `localhost`
   - Port : `5432`
   - Username : `postgres`
   - Password : `password123` (ou votre mot de passe)

## 🗄️ Création de la base de données

### Via pgAdmin :
1. Clic droit sur "Databases"
2. "Create" > "Database"
3. Nom : `solvaticatech`
4. Cliquez sur "Save"

### Via ligne de commande :
```bash
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -h localhost
CREATE DATABASE solvaticatech;
\q
```

## ⚙️ Configuration du projet

### 1. Vérifier le fichier .env.local
Assurez-vous que la ligne suivante est présente :
```env
DATABASE_URL=postgresql://postgres:password123@localhost:5432/solvaticatech
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NODE_ENV=development
NEXT_PUBLIC_CHATBOT_ENABLED=true
```

**Remplacez `password123`