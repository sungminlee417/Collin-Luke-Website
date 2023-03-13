import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <section className="md:m-20 m-12">
      <div className="flex items-center justify-between border-t-[1px] border-t-gray-400 pt-10">
        <div className="md:text-3xl text-2xl">&copy; {year} Muse Duo</div>
        <div className="flex gap-4">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.youtube.com/channel/UCx_i6ym655rtGxqCg6d27ew"
          >
            <i className="fa-brands fa-youtube fa-3x"></i>
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.instagram.com/muse__duo/"
          >
            <i className="fa-brands fa-instagram fa-3x"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
