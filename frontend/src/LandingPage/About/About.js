import "./About.css";
import image from "../../images/IMG_4655.jpeg";

const About = () => {
  return (
    <section id="about-section">
      <header id="about-section-header">(1) About</header>
      <div className="about-duo-section">
        <h1 id="about-large-text">The Muse Duo </h1>
        <h2 id="about-small-text">
          is a guitar and piano duo comprised of the guitarist Collin Holloway
          and composer/pianist Robert Luke Benedict. The Duo champions new
          chamber music for this rare setting of instruments through Luke's
          compositions, as well as the Duo's premiere performances of these
          works. Through music that is both experimental and accessible, the
          Muse Duo brings a new musical perspective to chamber music.{" "}
        </h2>
        <div id="box-behind-duo"></div>
        <img
          className="about-image-duo"
          src={image}
          alt="Collin and Luke"
        ></img>
      </div>
      <div className="about-individ-section"></div>
    </section>
  );
};

export default About;
