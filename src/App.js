import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import Home from './components/user/Home';
import URLList from './components/user/URLList';
import Dashboard from './components/user/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminURLList from './components/admin/URLList';
import UserList from './components/admin/UserList';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Routes>
        {/* ログインページ */}
        <Route path="/login" element={<Login />} />
        {/* ユーザー登録ページ */}
        <Route path="/register" element={<Register />} />

        {/* ユーザー用のルート */}
        {user && (
          <>
            <Route path="/" element={<Home role={role} />} />
            <Route path="/url-list" element={<URLList role={role} />} />
            <Route path="/dashboard" element={<Dashboard role={role} />} />
          </>
        )}

        {/* 管理者用のルート */}
        {user && role === 'admin' && (
          <>
            <Route path="/admin" element={<AdminDashboard role={role} />} />
            <Route path="/admin/url-list" element={<AdminURLList role={role} />} />
            <Route path="/admin/users" element={<UserList role={role} />} />
          </>
        )}

        {/* ロールに基づいてリダイレクト */}
        <Route path="*" element={<Navigate to={user ? (role === 'admin' ? "/admin" : "/") : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;