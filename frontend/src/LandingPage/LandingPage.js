import About from "./About";
import Hero from "./Hero";
import "./LandingPage.css";
import Photos from "./Photos";
import Recordings from "./Recordings";

const LandingPage = () => {
  return (
    <section id="landing-page">
      <Hero />
      <About />
      <Recordings />
      <Photos />
    </section>
  );
};

export default LandingPage;
