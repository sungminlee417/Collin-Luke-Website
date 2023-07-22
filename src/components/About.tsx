import React from "react";
import image from "../images/IMG_4655.jpeg";

const About = () => {
  return (
    <section className="about-section flex flex-col gap-14 md:m-20 m-12">
      <h2 className="text-4xl">About</h2>
      <div className="flex items-center gap-20">
        <img
          className="lg:h-208 lg:block hidden"
          src={image}
          alt="collin and luke"
        />
        <div className="flex flex-col md:gap-14 gap-10">
          <h1 className="lg:text-9xl md:text-7xl text-6xl">The Muse Duo</h1>
          <div className="flex flex-col font-source lg:text-4xl md:text-3xl text-2xl gap-7">
            <div>
              Originally formed at the Eastman School of Music, the Muse Duo is
              a one-of-a-kind ensemble in the world of classical music.
              Comprised of the award-winning guitarist Collin Holloway and the
              dynamic pianist/composer Luke Benedict, the guitar and piano duo
              brings music that is eclectic and accessible to modern audiences.
            </div>
            <div>
              Just months after playing together for the first time, the duo
              embarked on a tour throughout the United States. Since then, the
              Muse Duo has performed in various venues and festivals, including
              the “Lynn New Music Festival”, “Off the Dock Chamber Festival”,
              and the “Shellpoint Young Artist Series”.
            </div>
            <div>
              The Muse Duo strives to champion new compositions for the unique
              ensemble. Their repertoire primarily consists of Luke’s original
              works, where he composes music tailored for the duo. In July of
              2022, the Duo traveled to New York to record their debut album,
              entitled “Experiments”. The album consists of entirely original
              music, composed by Luke. These works are melodically focused and
              neo-classically inspired, while engaging audiences through it’s
              modernistic rhythmic drive.
            </div>
            <div>
              Through unique instrumentation, a convincing blend of musical
              personalities, and music which is experimental and accessible, the
              Muse Duo brings an exciting new perspective to chamber music.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
