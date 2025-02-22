import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import '../common/Header.css';

const AdminHeader = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header>
      <h1>Admin Panel</h1>
      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/url-list">Manage URLs</Link>
        <Link to="/admin/users">User List</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default AdminHeader;