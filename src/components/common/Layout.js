import React from 'react';
import UserHeader from '../user/UserHeader';
import AdminHeader from '../admin/AdminHeader';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children, role }) => {
  return (
    <div className="layout">
      {role === 'admin' ? <AdminHeader /> : role === 'user' ? <UserHeader /> : null}
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;