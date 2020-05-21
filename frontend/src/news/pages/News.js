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
      .then(data => {
        console.log('data', data);
        return setNews({ articles: data });
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
    <div className="News">
      <h2>News</h2>
      <div>{htmlElements ? htmlElements : null}</div>
    </div>
  );
};

export default News;
