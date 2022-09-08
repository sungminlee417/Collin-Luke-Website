import About from "./About";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <section id="landing-page">
      <div id="hero-container">
      <header id="landing-page-header">
        Collin Holloway and Luke Benedict
      </header> 
      </div>
      <About/>
    </section>
  );
};

export default LandingPage;
