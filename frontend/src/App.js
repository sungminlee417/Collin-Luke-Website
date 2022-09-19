import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Recordings from "./Recordings";
import Photos from "./Photos";
import Contact from "./Contact";
import Footer from "./Footer";

function App() {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", appHeight);
  appHeight();

  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Recordings />
      <Photos />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
