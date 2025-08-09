import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Concerts from './components/Concerts'
import Recordings from './components/Recordings'
import Photos from './components/Photos'
import Press from './components/Press'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
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
  )
}