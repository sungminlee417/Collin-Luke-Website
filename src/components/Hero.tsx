import React from "react";
import landingImage from '../images/landing-logo.png';

const Hero = () => {
  return (
    <section className="relative bg-[url(https://the-muse-duo.s3.us-west-1.amazonaws.com/landing.jpeg)] bg-cover bg-center bg-no-repeat lg:h-[90vh] lg:m-10">
      <div className="absolute inset-0 bg-white/50 sm:bg-transparent sm:from-white/25 sm:to-white/25 sm:bg-gradient-to-r"></div>
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl sm:text-left text-center">
          <img src={landingImage} className="h-44 sm:h-52" alt="Muse Duo Logo" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
