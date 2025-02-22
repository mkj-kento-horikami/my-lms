import React from 'react';
import Layout from '../common/Layout';

function Home({ role }) {
  return (
    <Layout role={role}>
      <div className="container">
        <h2>Welcome to My LMS</h2>
        <p>This is the home page.</p>
      </div>
    </Layout>
  );
}

export default Home;