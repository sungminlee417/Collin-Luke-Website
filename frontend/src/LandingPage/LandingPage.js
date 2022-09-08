import About from "./About";
import Hero from "./Hero";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <section id="landing-page">
      <Hero />
      <About />
    </section>
  );
};

export default LandingPage;
