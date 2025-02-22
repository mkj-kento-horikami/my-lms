import React from 'react';
import Layout from '../common/Layout';

function Dashboard({ role }) {
  return (
    <Layout role={role}>
      <div className="container">
        <h2>Dashboard</h2>
        <p>Welcome to the Dashboard!</p>
      </div>
    </Layout>
  );
}

export default Dashboard;