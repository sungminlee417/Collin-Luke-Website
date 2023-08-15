import React, { useEffect, useState } from "react";
import BouncingArrow from "../ui/BouncingArrow";

const Hero = () => {
  // const [showArrow, setShowArrow] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => setShowArrow(true), 4000);
  // }, []);

  return (
    <section className="relative bg-[url(https://the-muse-duo.s3.us-west-1.amazonaws.com/landing.jpeg)] bg-cover bg-center bg-no-repeat lg:h-[90vh] lg:m-10">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/50 sm:to-white/25 sm:bg-gradient-to-r"></div>
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl sm:text-left text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Muse Duo</h1>
        </div>
      </div>
      {/* <BouncingArrow showArrow={showArrow} /> */}
    </section>
  );
};

export default Hero;
