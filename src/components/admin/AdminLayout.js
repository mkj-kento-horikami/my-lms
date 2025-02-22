import React from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import '../common/Layout.css';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminHeader />
      <main>
        <div className="container">
          {children}
        </div>
      </main>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;