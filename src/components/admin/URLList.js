import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import Layout from '../common/Layout';

function URLList({ role }) {
  const [urls, setUrls] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchUrls = async () => {
      const querySnapshot = await getDocs(collection(db, 'urls'));
      const urlsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUrls(urlsList);
    };

    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      // 更新
      const urlDoc = doc(db, 'urls', editId);
      await updateDoc(urlDoc, { title, url, description });
      setUrls(urls.map(item => item.id === editId ? { id: editId, title, url, description } : item));
      setEditId(null);
    } else {
      // 追加
      const docRef = await addDoc(collection(db, 'urls'), { title, url, description });
      setUrls([...urls, { id: docRef.id, title, url, description }]);
    }
    setTitle('');
    setUrl('');
    setDescription('');
  };

  const handleEdit = (id) => {
    const urlToEdit = urls.find(item => item.id === id);
    setTitle(urlToEdit.title || '');
    setUrl(urlToEdit.url || '');
    setDescription(urlToEdit.description || '');
    setEditId(id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'urls', id));
    setUrls(urls.filter(item => item.id !== id));
  };

  return (
    <Layout role={role}>
      <div className="container">
        <h2>Manage URLs</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <button type="submit">{editId ? 'Update URL' : 'Add URL'}</button>
        </form>
        <h3>URL List</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.url}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default URLList;