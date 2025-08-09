import dynamic from 'next/dynamic'
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import LoadingSkeleton from "./components/LoadingSkeleton";

// Lazy load below-the-fold components for better performance
const Concerts = dynamic(() => import("./components/Concerts"), { 
  ssr: true,
  loading: () => <LoadingSkeleton title="concerts" className="concerts-section" />
});
const Recordings = dynamic(() => import("./components/Recordings"), { 
  ssr: false,
  loading: () => <LoadingSkeleton title="music" className="recordings-section" />
});
const Photos = dynamic(() => import("./components/Photos"), { 
  ssr: false,
  loading: () => <LoadingSkeleton title="gallery" className="photos-section" />
});
const Press = dynamic(() => import("./components/Press"), { 
  ssr: true,
  loading: () => <LoadingSkeleton title="press coverage" className="press-section" />
});
const Contact = dynamic(() => import("./components/Contact"), { 
  ssr: true,
  loading: () => <LoadingSkeleton title="contact information" className="contact-section" />
});
const Footer = dynamic(() => import("./components/Footer"), { 
  ssr: true,
  loading: () => <LoadingSkeleton title="footer" className="footer-section" />
});

export default function Home() {
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
      <main id="main-content" className="min-h-screen overflow-x-hidden">
        <Navigation />
        <Hero />
        <About />
        <Concerts />
        <Recordings />
        <Photos />
        <Press />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
