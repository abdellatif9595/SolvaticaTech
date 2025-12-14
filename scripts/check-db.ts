import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDatabase() {
  console.log('🔍 Vérification de la connexion à la base de données...')

  try {
    // Test de connexion
    await prisma.$connect()
    console.log('✅ Connexion à la base de données réussie')

    // Vérifier les tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    
    console.log('📋 Tables disponibles :')
    ;(tables as any[]).forEach((table: any) => {
      console.log(`  - ${table.table_name}`)
    })

    // Compter les enregistrements
    const userCount = await prisma.user.count()
    const projectCount = await prisma.project.count()
    const blogCount = await prisma.blogPost.count()
    const serviceCount = await prisma.service.count()

    console.log('\n📊 Statistiques :')
    console.log(`  - Utilisateurs : ${userCount}`)
    console.log(`  - Projets : ${projectCount}`)
    console.log(`  - Articles de blog : ${blogCount}`)
    console.log(`  - Services : ${serviceCount}`)

    console.log('\n🎉 Base de données opérationnelle !')

  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données :', error)
    console.log('\n🔧 Solutions possibles :')
    console.log('  1. Vérifiez que PostgreSQL est démarré')
    console.log('  2. Vérifiez la configuration dans .env.local')
    console.log('  3. Vérifiez que la base de données existe')
    console.log('  4. Vérifiez le mot de passe PostgreSQL')
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase() 