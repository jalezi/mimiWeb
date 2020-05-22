import React, { useState, useEffect } from 'react';
import AdminArticle from './AdminArticle';

const AdminArticles = () => {
  const [news, setNews] = useState({ articles: [] });
  let htmlElements = null;

  useEffect(() => {
    fetch('/api/news')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject({
            status: res.status,
            statusText: res.statusText,
          });
        }
      })
      .then(articles => {
        console.log('[AdminArticles] articles:', articles);
        return setNews({ articles });
      })
      .catch(err => {
        console.log(`Error, with message: ${err.statusText}`);
        return err;
      });
  }, []);

  htmlElements = news.articles.map(item => (
    <AdminArticle key={item._id} item={item} />
  ));
  return <div>{htmlElements ? htmlElements : null}</div>;
};

export default AdminArticles;
