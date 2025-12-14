import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import { AuthProvider } from './components/AuthProvider'
import PageTransition from './components/PageTransition'
// import { Toaster } from './components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SolvaticaTech - Solutions Digitales Innovantes',
  description: 'SolvaticaTech est une entreprise de développement web et mobile basée en Mauritanie, spécialisée dans la création de solutions digitales innovantes.',
  keywords: [
    'développement web',
    'développement mobile',
    'design ui/ux',
    'consulting digital',
    'mauritanie',
    'solvaticatech',
  ],
  authors: [{ name: 'SolvaticaTech' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://solvaticatech.com',
    title: 'SolvaticaTech - Solutions Digitales Innovantes',
    description: 'Solutions digitales innovantes pour votre entreprise',
    siteName: 'SolvaticaTech',
    images: [
      {
        url: 'https://solvaticatech.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'SolvaticaTech',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <Chatbot />
          {/* <Toaster /> */}
        </AuthProvider>
      </body>
    </html>
  )
} 