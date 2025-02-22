import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import Layout from '../common/Layout';

function URLList({ role }) {
  const [urls, setUrls] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUrls = async () => {
      const querySnapshot = await getDocs(collection(db, 'urls'));
      const urlsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUrls(urlsList);
    };

    fetchUrls();
  }, []);

  const handleLinkClick = async (id) => {
    const urlDoc = doc(db, 'urls', id);
    const urlData = urls.find(url => url.id === id);
    const newClickCount = (urlData.clickCount || 0) + 1;
    const newLastClicked = new Date().toISOString();

    await updateDoc(urlDoc, {
      clickCount: newClickCount,
      lastClicked: newLastClicked
    });

    await addDoc(collection(db, 'clickLogs'), {
      userId: user.uid,
      userEmail: user.email,
      urlId: id,
      urlTitle: urlData.title,
      clickedAt: newLastClicked
    });

    setUrls(urls.map(url => url.id === id ? { ...url, clickCount: newClickCount, lastClicked: newLastClicked } : url));
  };

  const handleFavoriteClick = async (id) => {
    const urlDoc = doc(db, 'urls', id);
    const urlData = urls.find(url => url.id === id);
    const newFavorite = !urlData.favorite;

    await updateDoc(urlDoc, {
      favorite: newFavorite
    });

    setUrls(urls.map(url => url.id === id ? { ...url, favorite: newFavorite } : url));
  };

  return (
    <Layout role={role}>
      <div className="container">
        <h2>URL List</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>URL</th>
              <th>Click Count</th>
              <th>Last Clicked</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.id}>
                <td>{url.title}</td>
                <td>{url.description}</td>
                <td>
                  <a href={url.url} target="_blank" rel="noopener noreferrer" onClick={() => handleLinkClick(url.id)}>
                    {url.url}
                  </a>
                </td>
                <td>{url.clickCount || 0}</td>
                <td>{url.lastClicked ? new Date(url.lastClicked).toLocaleString() : 'N/A'}</td>
                <td>
                  <button onClick={() => handleFavoriteClick(url.id)}>
                    {url.favorite ? 'お気に入り解除' : 'お気に入り'}
                  </button>
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