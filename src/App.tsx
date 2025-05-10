import React from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Concerts from "./components/Concerts";
import Recordings from "./components/Recordings";
import Photos from "./components/Photos";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Press from "./components/Press";

function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Concerts />
      <Recordings />
      <Photos />
      <Press />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
