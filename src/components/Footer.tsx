import React from "react";
import logoIcon from '../images/icon.png';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-2">
        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col-reverse gap-4 sm:flex-row items-center sm:items-center sm:justify-between">
          <div className="flex items-center">
            <img className="h-10" src={logoIcon} alt="Muse Duo Icon" />
            <span className="text-gray-500 text-xs">&copy; {year} Muse Duo</span>
          </div>

          <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
            <li>
              <a
                href="https://www.youtube.com/channel/UCx_i6ym655rtGxqCg6d27ew"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                <span className="sr-only">YouTube</span>
                <i className="fa-brands fa-youtube text-xl" />
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/muse__duo/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">Instagram</span>
                <i className="fa-brands fa-instagram text-xl" />
              </a>
            </li>

            <li>
              <a
                href="https://twitter.com/themuseduo?s=11"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75"
              >
                <span className="sr-only">Twitter</span>
                <i className="fa-brands fa-twitter text-xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
