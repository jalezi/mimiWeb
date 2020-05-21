import React, { useState, useEffect } from 'react';

import './News.css';

const News = () => {
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
        console.log('[News] articles:', articles);
        return setNews({ articles });
      })
      .catch(err => {
        console.log(`Error, with message: ${err.statusText}`);
        return err;
      });
  }, []);

  htmlElements = news.articles.map(item => (
    <article key={item._id}>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </article>
  ));

  return (
    <div>
      <h2>News</h2>
      <div className="News">{htmlElements ? htmlElements : null}</div>
    </div>
  );
};

export default News;
