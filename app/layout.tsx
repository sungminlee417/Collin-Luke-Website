import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { getSiteSettings, getContact } from "../sanity/lib/fetch";
import { urlForImage, sanityLoader } from "../sanity/lib/image";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://themuseduo.com";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.title || "The Muse Duo - Classical Music Ensemble";
  const description =
    settings?.description ||
    "The Muse Duo is a guitar and piano duo redefining classical chamber music through bold, original repertoire.";
  const seoImageUrl = settings?.seoImage
    ? sanityLoader({ src: urlForImage(settings.seoImage).url(), width: 1200, quality: 85 })
    : "/images/IMG_6718.jpg";

  return {
    title: { default: title, template: `%s | ${settings?.title || "The Muse Duo"}` },
    description,
    keywords: [
      "classical music",
      "chamber music",
      "guitar and piano duo",
      "Muse Duo",
      "Collin Holloway",
      "Luke Benedict",
    ],
    authors: [{ name: "The Muse Duo", url: SITE_URL }],
    creator: "The Muse Duo",
    publisher: "The Muse Duo",
    category: "music",
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: settings?.title || "The Muse Duo",
      title,
      description,
      url: "/",
      images: [{ url: seoImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    icons: settings?.favicon
      ? [{ rel: "icon", url: urlForImage(settings.favicon).width(64).url() }]
      : undefined,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EE2E31",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, contact] = await Promise.all([getSiteSettings(), getContact()]);
  const social = contact?.social || {};
  const sameAs = [social.instagram, social.youtube, social.spotify, social.appleMusic, social.facebook]
    .filter((u): u is string => !!u);
  const seoImageUrl = settings?.seoImage
    ? sanityLoader({ src: urlForImage(settings.seoImage).url(), width: 1200, quality: 85 })
    : `${SITE_URL}/images/IMG_6718.jpg`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storageKey = 'muse-duo-theme';
                const theme = localStorage.getItem(storageKey) || 'system';
                if (theme === 'system') {
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  document.documentElement.classList.add(systemTheme);
                } else {
                  document.documentElement.classList.add(theme);
                }
              } catch (e) {}
            `,
          }}
        />
        <link
          rel="preload"
          href="/fonts/Candu-Condensed.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: settings?.title || "The Muse Duo",
              description:
                settings?.description ||
                "Classical music ensemble specializing in guitar and piano performances",
              genre: ["Classical", "Chamber Music", "Contemporary Classical"],
              url: SITE_URL,
              image: seoImageUrl,
              sameAs,
              member: [
                { "@type": "Person", name: "Collin Holloway", roleName: "Guitar" },
                { "@type": "Person", name: "Luke Benedict", roleName: "Piano" },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider defaultTheme="system" storageKey="muse-duo-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
