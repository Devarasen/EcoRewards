import { Link } from 'react-router-dom';
import '../styles/Header.css';


function Header () {
  return (
    <header className="app-header">
      <nav className="header-nav">
        <span className="logo-container">
            <Link to="/" className="logo">EcoRewards</Link>
        </span>
        <ul className="nav-links">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/community">Community Board</Link>
          </li>
          <li>
            <Link to="/signout">Sign Out</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
