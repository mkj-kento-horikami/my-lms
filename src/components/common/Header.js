import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <h1>My LMS</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/url-list">URL List</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
};

export default Header;