import { useEffect, useState } from "react";
import "./Navigation.css";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [linkClicked, setLinkedClicked] = useState(false);

  const openMenu = (e) => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const navigationButton = document.querySelector(".navigation-menu-button");
    const lineOne = document.querySelector(".line-one");
    const lineTwo = document.querySelector(".line-two");
    const navigationContainer = document.querySelector(".navigation-container");

    if (showMenu) {
      navigationButton.classList.toggle("navigation-button-clicked");
      lineOne.classList.toggle("line-one-changed");
      lineTwo.classList.toggle("line-two-changed");
      navigationContainer.classList.toggle("show-navigation-container");
    }

    const closeMenu = (e) => {
      navigationButton.classList.toggle("navigation-button-clicked");
      lineOne.classList.toggle("line-one-changed");
      lineTwo.classList.toggle("line-two-changed");
      navigationContainer.classList.toggle("show-navigation-container");

      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

  useEffect(() => {
    const navigationButton = document.querySelector(".navigation-menu-button");
    const lineOne = document.querySelector(".line-one");
    const lineTwo = document.querySelector(".line-two");
    const navigationContainer = document.querySelector(".navigation-container");

    if (linkClicked) {
      navigationButton.classList.toggle("navigation-button-clicked");
      lineOne.classList.toggle("line-one-changed");
      lineTwo.classList.toggle("line-two-changed");
      navigationContainer.classList.toggle("show-navigation-container");
      setShowMenu(false);
      setLinkedClicked(false);
    }
  }, [linkClicked]);

  function scrollSmoothlyTo(className) {
    if (className !== "hero-section") {
      setLinkedClicked(true);
    }
    const element = document.querySelector(`.${className}`);
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  return (
    <>
      <button onClick={openMenu} className="navigation-menu-button">
        <span className="line-one"></span>
        <span className="line-two"></span>
      </button>

      <button
        className="navigation-home-button"
        onClick={() => {
          scrollSmoothlyTo("hero-section");
        }}
      >
        Muse Duo
      </button>

      <nav
        className="navigation-container"
        onClick={(e) => e.stopPropagation()}
      >
        <ul id="navigation-links">
          <li className="navigation-link-container">
            <button
              className="navigation-link"
              onClick={() => {
                scrollSmoothlyTo("about-section");
              }}
            >
              About
            </button>
          </li>
          <li className="navigation-link-container">
            <button
              className="navigation-link"
              onClick={() => scrollSmoothlyTo("recordings-section")}
            >
              Recordings
            </button>
          </li>
          <li className="navigation-link-container">
            <button
              className="navigation-link"
              onClick={() => scrollSmoothlyTo("photos-section")}
            >
              Photos
            </button>
          </li>
          <li className="navigation-link-container">
            <button className="navigation-link">Contact</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
