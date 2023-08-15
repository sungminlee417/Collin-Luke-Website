import React from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Concerts from "./components/Concerts";
import Recordings from "./components/Recordings";
import Photos from "./components/Photos";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import concerts from "./data/concerts";

function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Concerts concerts={concerts} />
      <Recordings />
      <Photos />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
