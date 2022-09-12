import About from "./About";
import Hero from "./Hero";
import "./LandingPage.css";
import Photos from "./Photos";
import Recordings from "./Recordings";
import Contact from "./Contact";

const LandingPage = () => {
  return (
    <section id="landing-page">
      <Hero />
      <About />
      <Recordings />
      <Photos />
      <Contact />
    </section>
  );
};

export default LandingPage;
