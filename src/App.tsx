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
      <div className="flex flex-col gap-10">
        <About />
        <Concerts concerts={concerts} />
        <Recordings />
        <Photos />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
