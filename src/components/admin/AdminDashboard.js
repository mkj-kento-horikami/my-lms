import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Layout from '../common/Layout';

function AdminDashboard({ role }) {
  const [clickLogs, setClickLogs] = useState([]);

  useEffect(() => {
    const fetchClickLogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'clickLogs'));
      const logsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClickLogs(logsList);
    };

    fetchClickLogs();
  }, []);

  return (
    <Layout role={role}>
      <div className="container">
        <h2>Click Logs</h2>
        <table>
          <thead>
            <tr>
              <th>User Email</th>
              <th>URL Title</th>
              <th>Clicked At</th>
            </tr>
          </thead>
          <tbody>
            {clickLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.userEmail}</td>
                <td>{log.urlTitle}</td>
                <td>{new Date(log.clickedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default AdminDashboard;