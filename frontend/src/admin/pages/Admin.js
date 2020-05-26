import React from 'react';

import './Admin.css';
import AdminArticles from '../components/AdminArticles/AdminArticles';

const Admin = () => {
  return (
    <div>
      <h2>Admin</h2>
      <div className="Admin">
        <h3>News</h3>
        <section id="tasks">
          <ul>
            <li className="Striketrough">Sort Articles</li>
            <li className="Striketrough">Add Article</li>
            <li className="Striketrough">Delete Article</li>
            <li>Edit Article</li>
          </ul>
        </section>
        <section id="admin-articles">
          <AdminArticles />
        </section>
      </div>
    </div>
  );
};

export default Admin;
