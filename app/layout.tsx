import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata: Metadata = {
  title: 'The Muse Duo - Classical Music Ensemble',
  description: 'The Muse Duo is a classical music ensemble bringing exceptional performances to audiences worldwide.',
  keywords: 'classical music, duo, ensemble, performance, concerts, recordings',
  authors: [{ name: 'The Muse Duo' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'The Muse Duo',
    description: 'Classical Music Ensemble',
    type: 'website',
    locale: 'en_US',
    siteName: 'The Muse Duo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Muse Duo',
    description: 'Classical Music Ensemble',
  },
  other: {
    'preload-font': '/fonts/Candu-Condensed.otf',
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
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </head>
      <body className="min-h-screen">
        <ThemeProvider
          defaultTheme="system"
          storageKey="muse-duo-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}