import React from 'react';
import { NavLink } from 'react-router-dom';
import { Settings, Search } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <span className="brand-primary">Periodi</span>
        <span className="brand-secondary">Lab</span>
      </div>
      
      <div className="nav-links">
        <NavLink to="/explorer" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Tabla</NavLink>
        <NavLink to="/trends" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Tendencias</NavLink>
        <NavLink to="/history" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Historia</NavLink>
        <NavLink to="/quiz" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Quiz Educativo</NavLink>
      </div>

      <div className="nav-actions">
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Buscar elemento (ej. Oro, Au, 79)..." />
        </div>
        <button className="settings-btn" title="Configuración">
          <Settings size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
