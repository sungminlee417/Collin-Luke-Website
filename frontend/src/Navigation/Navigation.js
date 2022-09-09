import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

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
      navigationButton.classList.remove("navigation-button-clicked");
      lineOne.classList.remove("line-one-changed");
      lineTwo.classList.remove("line-two-changed");
      navigationContainer.classList.remove("show-navigation-container");

      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

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
        <NavLink className="navigation-link" to="/">
          About
        </NavLink>
        <NavLink className="navigation-link" to="/">
          Recordings
        </NavLink>
        <NavLink className="navigation-link" to="/">
          Contact
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;
