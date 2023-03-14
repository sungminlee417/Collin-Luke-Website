import React, { useEffect, useState } from "react";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);

  const openMenu = (): void => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (): void => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

  useEffect(() => {
    if (linkClicked) {
      setShowMenu(false);
      setLinkClicked(false);
    }
  }, [linkClicked]);

  function scrollSmoothlyTo(className: string) {
    if (className !== "hero-section") {
      setLinkClicked(true);
    }
    const element = document.querySelector(`.${className}`)!;
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="fixed flex items-center justify-between left-0 right-0 m-14 z-40">
        <div className="w-14"></div>
        <button
          className="bg-transparent border-none cursor-pointer text-6xl"
          onClick={() => {
            scrollSmoothlyTo("hero-section");
          }}
        >
          Muse Duo
        </button>
        <button
          onClick={openMenu}
          className="bg-transparent border-none cursor-pointer flex flex-col gap-3 w-14 justify-self-end"
        >
          <span
            className={`bg-[#00165a] h-2 w-14 transition ${
              showMenu ? "absolute rotate-135" : ""
            }`}
          ></span>
          <span
            className={`bg-[#00165a] h-2 w-14 transition  ${
              showMenu ? "absolute rotate-neg-135" : ""
            }`}
          ></span>
        </button>
      </div>

      <nav
        className={`fixed flex bg-[#becad4] justify-center items-center h-full right-0 p-16 z-30 md:w-4/12 w-full transition-all ease-in duration-150 md:opacity-100 opacity-95 ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col gap-20 justify-center md:items-start items-center">
          <li>
            <button
              className="lg:text-8xl text-7xl"
              onClick={() => {
                scrollSmoothlyTo("about-section");
              }}
            >
              About
            </button>
          </li>
          <li>
            <button
              className="lg:text-8xl text-7xl"
              onClick={() => {
                scrollSmoothlyTo("concerts-section");
              }}
            >
              Concerts
            </button>
          </li>
          <li>
            <button
              className="lg:text-8xl text-7xl"
              onClick={() => scrollSmoothlyTo("recordings-section")}
            >
              Recordings
            </button>
          </li>
          <li>
            <button
              className="lg:text-8xl text-7xl"
              onClick={() => scrollSmoothlyTo("photos-section")}
            >
              Photos
            </button>
          </li>
          <li>
            <button
              className="lg:text-8xl text-7xl"
              onClick={() => scrollSmoothlyTo("contact-section")}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
