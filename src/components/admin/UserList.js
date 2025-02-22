import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminLayout from './AdminLayout';

function UserList() {
  const [users, setUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (uid, newRole) => {
    const userDoc = doc(db, 'users', uid);
    await updateDoc(userDoc, { role: newRole });
    setUsers(users.map(user => user.id === uid ? { ...user, role: newRole } : user));
  };

  const handleDeleteUser = async (uid) => {
    await deleteDoc(doc(db, 'users', uid));
    setUsers(users.filter(user => user.id !== uid));
  };

  const handleAddUser = async () => {
    // 新しいユーザーのUIDを生成（ここでは簡単のためにメールアドレスをUIDとして使用）
    const newUserUid = newUserEmail.replace(/[@.]/g, '_');
    const userDoc = doc(db, 'users', newUserUid);
    await setDoc(userDoc, { email: newUserEmail, role: newUserRole });
    setUsers([...users, { id: newUserUid, email: newUserEmail, role: newUserRole }]);
    setNewUserEmail('');
    setNewUserRole('user');
  };

  return (
    <AdminLayout>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New User</h3>
      <input
        type="email"
        placeholder="User Email"
        value={newUserEmail}
        onChange={(e) => setNewUserEmail(e.target.value)}
      />
      <select
        value={newUserRole}
        onChange={(e) => setNewUserRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>
    </AdminLayout>
  );
}

export default UserList;