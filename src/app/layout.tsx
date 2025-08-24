import { Toaster } from 'sonner'
import './globals.css'
import { Inter, Playfair_Display, Roboto } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

// Define font variables using next/font/google
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_APP_NAME || 'Feedback Form - Share Your Valuable Experience',
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME || 'Feedback Form'}`
  },
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Share your valuable feedback and help us improve. Our interactive feedback form allows you to rate your experience and provide suggestions for improvement.',
  keywords: [
    'feedback form',
    'user feedback',
    'experience rating',
    'customer satisfaction',
    'improvement suggestions',
    'roundtable feedback',
    'user experience',
    'testimonials'
  ],
  authors: [{ name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Feedback Team' }],
  creator: process.env.NEXT_PUBLIC_APP_NAME || 'Feedback Form Application',
  publisher: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Feedback Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: process.env.NEXT_PUBLIC_APP_NAME || 'Feedback Form - Share Your Valuable Experience',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Share your valuable feedback and help us improve. Rate your experience and provide suggestions for our next roundtable.',
    siteName: process.env.NEXT_PUBLIC_APP_NAME || 'Feedback Form',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${process.env.NEXT_PUBLIC_APP_NAME || 'Feedback Form'} - Share Your Experience`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: process.env.NEXT_PUBLIC_APP_NAME || 'Feedback Form - Share Your Valuable Experience',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Share your valuable feedback and help us improve. Rate your experience and provide suggestions.',
    images: ['/twitter-image.png'],
    creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@feedbackform',
  },
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  category: 'feedback',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e3a8a' },
    { media: '(prefers-color-scheme: dark)', color: '#1e3a8a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable} ${roboto.variable}`}>
      <body>{children}
      <Toaster richColors position='top-right' />
      </body>
    </html>
  )
}
