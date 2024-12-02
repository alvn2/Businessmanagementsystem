import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const isAuthenticated = true; // Replace with authentication state
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    console.log('User logged out');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo" onClick={() => navigate('/')}>
          Inventory Manager
        </h1>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/inventory" className={({ isActive }) => (isActive ? 'active' : '')}>
              Inventory
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
              Reports
            </NavLink>
          </li>
          <li className="dropdown">
            <button className="dropdown-btn">
              Settings
            </button>
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
                  General Settings
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Profile Settings
                </NavLink>
              </li>
            </ul>
          </li>
          {isAuthenticated ? (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
