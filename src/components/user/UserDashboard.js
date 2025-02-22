import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import URLList from './URLList';

function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div>ログインしてください</div>;
  }

  return (
    <div>
      <h2>ユーザーダッシュボード</h2>
      <URLList />
    </div>
  );
}

export default UserDashboard;