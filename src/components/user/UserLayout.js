import React from 'react';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';
import '../common/Layout.css';

const UserLayout = ({ children }) => {
  return (
    <div>
      <UserHeader />
      <main>
        <div className="container">
          {children}
        </div>
      </main>
      <UserFooter />
    </div>
  );
};

export default UserLayout;