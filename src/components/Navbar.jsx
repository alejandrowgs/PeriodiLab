import React from 'react';
import { NavLink } from 'react-router-dom';
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
    </nav>
  );
};

export default Navbar;
