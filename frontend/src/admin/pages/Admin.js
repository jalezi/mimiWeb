import React from 'react';

import './Admin.css';
import AdminArticles from '../components/AdminArticles/AdminArticles';

const Admin = () => {
  return (
    <div>
      <h2>Admin</h2>
      <div className="Admin">
        <h3>News</h3>
        <ul>
          <li>Sort Articles</li>
          <li className="Striketrough">Add Article</li>
          <li className="Striketrough">Delete Article</li>
          <li>Edit Article</li>
        </ul>
        <AdminArticles />
      </div>
    </div>
  );
};

export default Admin;
