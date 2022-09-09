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

    const navigationButton = document.querySelector(".navigation-button");
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
    const navigationButton = document.querySelector(".navigation-button");
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

  function scrollSmoothlyTo(elementId) {
    setLinkedClicked(true);
    const element = document.getElementById(elementId);
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  return (
    <>
      <button onClick={openMenu} className="navigation-button">
        <span className="line-one"></span>
        <span className="line-two"></span>
      </button>
      <nav
        className="navigation-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="navigation-link"
          onClick={() => {
            scrollSmoothlyTo("about-section");
          }}
        >
          About
        </button>
        <button
          className="navigation-link"
          onClick={() => scrollSmoothlyTo("recordings-section")}
        >
          Recordings
        </button>

        <button className="navigation-link">Contact</button>
      </nav>
    </>
  );
};

export default Navigation;
