import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import '../common/Header.css';

const UserHeader = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header>
      <h1>My LMS</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/url-list">URL List</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default UserHeader;