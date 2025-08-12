import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { PerformanceWrapper } from './components/PerformanceWrapper'
import { DataProvider } from './lib/dataContext'

export const metadata: Metadata = {
  title: {
    default: 'The Muse Duo - Classical Music Ensemble',
    template: '%s | The Muse Duo'
  },
  description: 'The Muse Duo is a classical music ensemble bringing exceptional piano and guitar performances to audiences worldwide. Experience our unique blend of classical and contemporary music.',
  keywords: [
    'classical music',
    'duo',
    'ensemble', 
    'piano',
    'guitar',
    'concerts',
    'recordings',
    'live performance',
    'chamber music',
    'contemporary classical'
  ],
  authors: [{ name: 'The Muse Duo', url: 'https://themuseduo.com' }],
  creator: 'The Muse Duo',
  publisher: 'The Muse Duo',
  category: 'music',
  classification: 'entertainment',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://themuseduo.com'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'The Muse Duo',
    title: 'The Muse Duo - Classical Music Ensemble',
    description: 'Experience exceptional classical music performances by The Muse Duo - a unique piano and guitar ensemble.',
    url: '/',
    images: [
      {
        url: '/images/IMG_6718.jpg',
        width: 1200,
        height: 630,
        alt: 'The Muse Duo - Classical Music Ensemble',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@themuseduo',
    creator: '@themuseduo',
    title: 'The Muse Duo - Classical Music Ensemble',
    description: 'Experience exceptional classical music performances by The Muse Duo - a unique piano and guitar ensemble.',
    images: ['/images/IMG_6718.jpg']
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#EE2E31',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Candu-Condensed.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/images/IMG_4655.jpeg" as="image" />
        <link rel="dns-prefetch" href="https://the-muse-duo.s3.us-west-1.amazonaws.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              "name": "The Muse Duo",
              "description": "Classical music ensemble specializing in piano and guitar performances",
              "genre": ["Classical", "Chamber Music", "Contemporary Classical"],
              "url": "https://themuseduo.com",
              "image": "https://themuseduo.com/images/IMG_6718.jpg",
              "sameAs": [
                "https://www.instagram.com/muse__duo/",
                "https://www.youtube.com/@themuseduo",
                "https://open.spotify.com/artist/themuseduo"
              ],
              "member": [
                {
                  "@type": "Person",
                  "name": "Pianist"
                },
                {
                  "@type": "Person", 
                  "name": "Guitarist"
                }
              ],
              "musicAlbum": {
                "@type": "MusicAlbum",
                "name": "Experiments",
                "datePublished": "2023-04-01",
                "url": "https://open.spotify.com/album/06Q4h44XDIYrpE0EbGAFMy"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider
          defaultTheme="system"
          storageKey="muse-duo-theme"
        >
          <DataProvider>
            <PerformanceWrapper>
              {children}
            </PerformanceWrapper>
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}