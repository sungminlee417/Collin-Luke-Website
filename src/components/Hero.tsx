import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-[url(https://the-muse-duo.s3.us-west-1.amazonaws.com/landing.jpeg)] bg-cover bg-center bg-no-repeat lg:h-[90vh]">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/50 sm:to-white/25 sm:bg-gradient-to-r"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Muse Duo</h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed italic">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <a
              href="#"
              className="block w-full rounded bg-[#660000] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#880000] focus:outline-none focus:ring active:bg-[#990000] sm:w-auto"
            >
              Get Started
            </a>

            <a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-[#660000] shadow hover:text-[#880000] focus:outline-none focus:ring active:text-[#990000] sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
