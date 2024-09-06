import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, handleLogout }) {
  return (
    <header className="header">
      <nav className="nav">
        {user.role === 'Mitarbeiter' && (
          <div className="nav-links">
            <Link to="/mitarbeiter" className="nav-link">Profil</Link>
            <Link to="/mitarbeiter/PraxisMitarbeiterTabelle" className="nav-link">PraxisMitarbeiter Verwaltung</Link>
            <Link to="/patientenTabelle" className="nav-link">Patienten Verwaltung</Link>
          </div>
        )}
        {user.role === 'PraxisMitarbeiter' && (
          <div className="nav-links">
            <Link to="/praxisMitarbeiter" className="nav-link">Profil</Link>
            <Link to="/patientenTabelle" className="nav-link">Patienten Verwaltung</Link>
          </div>
        )}
        {user.role === 'Patient' && (
          <div className="nav-links">
            <Link to="/patient" className="nav-link">Profil</Link>
          </div>
        )}
      </nav>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </header>
  );
}

export default Header;
