import React, { useState, useEffect } from 'react';

import './News.css';
import Articles from '../components/Articles';

const News = () => {
  const [news, setNews] = useState({ articles: [] });

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

  return (
    <div>
      <h2>News</h2>
      <div className="News">
        <Articles articles={news.articles} />
      </div>
    </div>
  );
};

export default News;
