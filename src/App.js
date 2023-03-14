import React from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Recordings from "./components/Recordings";
import Photos from "./Photos";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
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
