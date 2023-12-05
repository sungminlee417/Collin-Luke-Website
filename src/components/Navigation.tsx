import React, { useEffect, useState } from "react";

const SECTIONS = [
  { sectionName: "About", containerName: "about" },
  { sectionName: "Concerts", containerName: "concerts" },
  { sectionName: "Music", containerName: "recordings" },
  { sectionName: "Gallery", containerName: "photos" },
  { sectionName: "Contact", containerName: "contact" },
];

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);

  const openMenu = (): void => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const closeMenu = (): void => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;

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
      <div
        className="fixed z-30 sm:top-12 sm:right-12 top-4 right-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={!showMenu ? openMenu : closeMenu}
          className="group bg-white border-none cursor-pointer flex flex-col justify-center items-center gap-3 justify-self-end md:h-20 h-10 sm:p-10 p-8 rounded-full shadow-lg hover:shadow-xl"
        >
          <span
            className={`bg-[#071E22] h-0.5 sm:w-10 w-9 absolute mb-6 group-hover:mb-7 transition-all ${
              showMenu ? "opacity-0" : "opacity-1"
            }`}
          ></span>
          <span
            className={`bg-[#071E22] h-0.5 sm:w-10 w-9 transition absolute ${
              showMenu ? "rotate-135" : ""
            }`}
          ></span>
          <span
            className={`bg-[#071E22] h-0.5 sm:w-10 w-9 transition absolute ${
              showMenu ? "rotate-neg-135" : ""
            }`}
          ></span>
          <span
            className={`bg-[#071E22] h-0.5 sm:w-10 w-9 absolute mt-6 group-hover:mt-7 transition-all ${
              showMenu ? "opacity-0" : "opacity-1"
            }`}
          ></span>
        </button>
      </div>

      <nav
        className={`text-white fixed flex bg-[#EE2E31] justify-center items-center h-screen right-0 p-12 z-20 md:w-4/12 w-full transition-all ease-in duration-150 md:opacity-100 opacity-95 top-0 font-semibold ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col gap-16 justify-center md:items-start items-center">
          {SECTIONS.map((section) => (
            <li>
              <button
                className="tracking-wide font-thin text-[#F1F1F1] xl:text-7xl lg:text-6xl text-4xl md:hover:translate-x-3 transition hover:-translate-y-2 md:hover:-translate-y-0"
                onClick={() => {
                  scrollSmoothlyTo(`${section.containerName}-section`);
                }}
              >
                {section.sectionName}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
