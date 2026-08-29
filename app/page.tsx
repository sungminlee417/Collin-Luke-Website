import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Concerts from "./components/Concerts";
import Recordings from "./components/Recordings";
import Photos from "./components/Photos";
import Press from "./components/Press";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import {
  getHero,
  getAbout,
  getContact,
  getConcerts,
  getRecordings,
  getGallery,
  getPress,
  getSiteSettings,
} from "../sanity/lib/fetch";

export const revalidate = 60

export default async function Home() {
  const [
    hero,
    about,
    contact,
    concerts,
    recordings,
    gallery,
    press,
    settings,
  ] = await Promise.all([
    getHero(),
    getAbout(),
    getContact(),
    getConcerts(),
    getRecordings(),
    getGallery(),
    getPress(),
    getSiteSettings(),
  ])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                   bg-muse-red text-white px-4 py-2 rounded-md z-50
                   focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen">
        <ErrorBoundary fallback={<div className="h-20 bg-gray-50 dark:bg-gray-900" />}>
          <Navigation menuItems={settings?.menuItems} />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div className="h-screen bg-gray-50 dark:bg-gray-900" />}>
          <Hero data={hero} />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div className="min-h-[400px]" />}>
          <About data={about} />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div className="min-h-[400px]" />}>
          <Concerts concerts={concerts} />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div className="min-h-[400px]" />}>
          <Recordings recordings={recordings} />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div className="min-h-[400px]" />}>
          <Photos
            images={gallery}
            social={{
              instagram: contact?.social?.instagram,
              youtube: contact?.social?.youtube,
              spotify: contact?.social?.spotify,
              appleMusic: contact?.social?.appleMusic,
              email: contact?.email,
            }}
          />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div className="min-h-[400px]" />}>
          <Press articles={press} />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div className="min-h-[400px]" />}>
          <Contact data={contact} />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div className="h-32 bg-gray-50 dark:bg-gray-900" />}>
          <Footer
            title={settings?.footerTitle}
            tagline={settings?.footerTagline}
            socialLinks={settings?.footerSocialLinks}
          />
        </ErrorBoundary>
      </main>
    </>
  );
}
