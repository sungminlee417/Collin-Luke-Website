import React from "react";
import image from "../images/IMG_4655.jpeg";

const About = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <img
                alt="House"
                src="https://the-muse-duo.s3.us-west-1.amazonaws.com/duo-without-instruments.jpeg"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="relative flex items-center bg-gray-100">
            <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"></span>

            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold sm:text-3xl">The Muse Duo</h2>

              <p className="mt-4 text-gray-600 flex flex-col gap-2">
                <span>
                  Originally formed at the Eastman School of Music, the Muse Duo
                  is a one-of-a-kind ensemble in the world of classical music.
                  Comprised of the award-winning guitarist Collin Holloway and
                  the dynamic pianist/composer Luke Benedict, the guitar and
                  piano duo brings music that is eclectic and accessible to
                  modern audiences.
                </span>
                <span>
                  Just months after playing together for the first time, the duo
                  embarked on a tour throughout the United States. Since then,
                  the Muse Duo has performed in various venues and festivals,
                  including the “Lynn New Music Festival”, “Off the Dock Chamber
                  Festival”, and the “Shellpoint Young Artist Series”.
                </span>
                <span>
                  The Muse Duo strives to champion new compositions for the
                  unique ensemble. Their repertoire primarily consists of Luke’s
                  original works, where he composes music tailored for the duo.
                  In July of 2022, the Duo traveled to New York to record their
                  debut album, entitled “Experiments”. The album consists of
                  entirely original music, composed by Luke. These works are
                  melodically focused and neo-classically inspired, while
                  engaging audiences through it’s modernistic rhythmic drive.
                </span>
                <span>
                  Through unique instrumentation, a convincing blend of musical
                  personalities, and music which is experimental and accessible,
                  the Muse Duo brings an exciting new perspective to chamber
                  music.
                </span>
              </p>

              <a
                href="#"
                className="mt-8 inline-block rounded border border-[#660000] bg-[#660000] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
