import About from "./About";
import Hero from "./Hero";
import "./LandingPage.css";
import Navigation from "./Navigation";

const LandingPage = () => {
  return (
    <section id="landing-page">
      <Navigation />
      <Hero />
      <About />
    </section>
  );
};

export default LandingPage;
