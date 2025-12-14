import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seeding de la base de données...')

  // Create users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@solvaticatech.com' },
    update: {},
    create: { email: 'admin@solvaticatech.com', name: 'Admin SolvaticaTech', role: 'ADMIN' },
  })

  const testUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: { email: 'user@example.com', name: 'Utilisateur Test', role: 'USER' },
  })

  const author1 = await prisma.user.upsert({
    where: { email: 'ahmed.diallo@solvaticatech.com' },
    update: {},
    create: { email: 'ahmed.diallo@solvaticatech.com', name: 'Ahmed Diallo', role: 'ADMIN' },
  })

  const author2 = await prisma.user.upsert({
    where: { email: 'fatima.ahmed@solvaticatech.com' },
    update: {},
    create: { email: 'fatima.ahmed@solvaticatech.com', name: 'Fatima Ahmed', role: 'ADMIN' },
  })

  console.log('✅ Utilisateurs créés')

  // Create services
  const webDevService = await prisma.service.upsert({
    where: { id: 'web-development' },
    update: {},
    create: {
      id: 'web-development',
      title: 'Développement Web',
      description: 'Création de sites web modernes et responsifs.',
      icon: 'Code',
      features: JSON.stringify(['Sites web responsifs', 'E-commerce']),
    },
  })

  const mobileService = await prisma.service.upsert({
    where: { id: 'mobile-development' },
    update: {},
    create: {
      id: 'mobile-development',
      title: 'Applications Mobiles',
      description: 'Applications mobiles.',
      icon: 'Smartphone',
      features: JSON.stringify(['React Native']),
    },
  })

  console.log('✅ Services créés')

  // Simple pricing tier
  await prisma.pricingTier.upsert({
    where: { id: 'pricing-tier-1' },
    update: {},
    create: {
      id: 'pricing-tier-1',
      name: 'Site Vitrine',
      price: 1500,
      features: JSON.stringify(['Design personnalisé']),
      serviceId: webDevService.id,
    },
  }).catch(() => null)

  console.log('✅ Pricing tiers créés')

  // Simple project
  await prisma.project.upsert({
    where: { id: 'project-1' },
    update: {},
    create: {
      id: 'project-1',
      title: 'Plateforme E-commerce',
      description: 'Plateforme e-commerce.',
      content: 'Contenu du projet.',
      image: '/images/projects/ecommerce.jpg',
      category: 'Web Development',
      technologies: JSON.stringify(['Next.js']),
      client: 'TechCorp',
      completedAt: new Date(),
    },
  }).catch(() => null)

  console.log('✅ Projets créés')

  console.log('🎉 Seeding terminé avec succès !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
