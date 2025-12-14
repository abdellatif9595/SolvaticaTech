import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://solvaticatech.com'),
  title: {
    default: 'SolvaticaTech - Solutions Digitales Innovantes',
    template: '%s | SolvaticaTech',
  },
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
  creator: 'SolvaticaTech',
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
  twitter: {
    card: 'summary_large_image',
    title: 'SolvaticaTech - Solutions Digitales Innovantes',
    description: 'Solutions digitales innovantes pour votre entreprise',
    images: ['https://solvaticatech.com/og.jpg'],
    creator: 'SolvaticaTech',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: 'https://solvaticatech.com/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
} as const; 