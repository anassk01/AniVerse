import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo" end>
        AniVerse
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/anime">Anime</NavLink>
        <NavLink to="/characters">Characters</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/my-library">My Library</NavLink>
        <NavLink to="/my-ratings">My Ratings</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
