import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AdminArticle from './AdminArticle/AdminArticle';
import NewArticle from '../NewArticle/NewArticle';

import './AdminArticles.css';

const AdminArticles = () => {
  const [news, setNews] = useState({ articles: [] });
  const [showForm, setShowForm] = useState(false);
  let htmlElements = null;
  const history = useHistory();

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

  const onDeleteHandler = async (event, id) => {
    event.preventDefault();
    console.log(`[AdminArticles] [onDeleteHandler] id: ${id}`);
    try {
      await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        body: null,
      });

      const articles = news.articles.filter(item => {
        return item._id !== id;
      });

      setNews({ articles });

      history.push('/admin');
    } catch (err) {
      console.log(err);
    }
  };

  htmlElements = news.articles.map(item => (
    <AdminArticle
      key={item._id}
      item={item}
      clicked={event => {
        onDeleteHandler(event, item._id);
      }}
    />
  ));

  const showFormHandler = event => {
    setShowForm(!showForm);
  };

  return (
    <React.Fragment>
      <nav>
        <ul className="nav-links">
          <li>
            {!showForm ? (
              <button className="button" onClick={showFormHandler}>
                New Article
              </button>
            ) : (
              <button
                className="button button--danger"
                onClick={showFormHandler}>
                Cancel
              </button>
            )}
          </li>
        </ul>
      </nav>
      {showForm ? <NewArticle close={showFormHandler} /> : null}
      {showForm ? <hr /> : null}
      <div>{htmlElements ? htmlElements : null}</div>
    </React.Fragment>
  );
};

export default AdminArticles;
