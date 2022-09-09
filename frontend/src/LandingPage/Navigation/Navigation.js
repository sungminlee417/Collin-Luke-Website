import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav id="navigation-container">
      <NavLink to="/">About</NavLink>
    </nav>
  );
};

export default Navigation;
