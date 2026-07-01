import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo" end>
        AniVerse
      </NavLink>
      <div className="navbar-links"></div>
    </nav>
  );
}

export default Navbar;
