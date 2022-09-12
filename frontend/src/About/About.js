import "./About.css";
import image from "../images/IMG_4655.jpeg";

const About = () => {
  return (
    <section className="about-section content-margin">
      <header id="about-section-header">
        <h3 id="about-section-header-text">(1) About</h3>
        <img className="about-image-duo" src={image} alt="Collin and Luke" />
      </header>
      <div className="about-duo-section">
        <h2 id="about-large-text">The Muse Duo </h2>
        <h3 id="about-small-text">
          is a guitar and piano duo comprised of the guitarist Collin Holloway
          and composer/pianist Robert Luke Benedict. The Duo champions new
          chamber music for this rare setting of instruments through Luke's
          compositions, as well as the Duo's premiere performances of these
          works. Through music that is both experimental and accessible, the
          Muse Duo brings a new musical perspective to chamber music.{" "}
        </h3>
      </div>
      {/* <div className="about-individ-section"></div> */}
    </section>
  );
};

export default About;
