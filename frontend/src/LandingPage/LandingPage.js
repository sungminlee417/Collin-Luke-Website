import About from "./About";
import Hero from "./Hero";
import "./LandingPage.css";
import Recordings from "./Recordings";

const LandingPage = () => {
  return (
    <section id="landing-page">
      <Hero />
      <About />
      <Recordings />
    </section>
  );
};

export default LandingPage;
