import "./About.css";
import image from "../images/IMG_4655.jpeg";

const About = () => {
  return (
    <section className="about-section content-margin">
      <h3 id="about-section-header-text">About</h3>
      <div className="about-section-content">
        <img className="about-image-duo" src={image} alt="Collin and Luke" />
        <div className="about-duo-section">
          <h2 id="about-large-text">The Muse Duo </h2>
          <h3 id="about-small-text">
            <div>
              Originally formed at the Eastman School of Music, the MUSE DUO is
              a one-of-a-kind ensemble in the world of classical music.
              Comprised of the award-winning guitarist Collin Holloway and the
              dynamic pianist/composer Luke Benedict, the guitar and piano duo
              brings music that is eclectic and accessible to modern audiences.
            </div>
            <div>
              Just months after playing together for the first time, the duo
              embarked on a tour throughout the United States. Since then, the
              Muse Duo has performed in various venues and festivals, including
              a tour of the midwest United States, the “Lynn New Music Festival”
              and “Shellpoint Young Artist Series”. In July of 2022, the Duo
              traveled to New York to record their debut album, consisting of
              works composed by Luke, which will be released in the Spring of
              2023.
            </div>
            <div>
              The MUSE DUO strives to champion new compositions for the unique
              ensemble. Their repertoire primarily consists of Luke’s original
              works, where he crafts experiences tailored especially for the
              duo. These works are melodically focused and neo-classically
              inspired, while engaging audiences through it’s modernistic
              rhythmic drive.
            </div>
            <div>
              Through music that is both experimental and accessible, the Muse
              Duo brings a new perspective to chamber music.
            </div>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default About;
