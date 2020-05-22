import React from 'react';

import './Admin.css';
import NewArticle from './../components/NewArticle';

const Admin = () => {
  return (
    <div>
      <h2>Admin</h2>
      <div className="Admin">
        <h3>News</h3>
        <ul>
          <li>Add Article</li>
          <li>Delete Article</li>
        </ul>

        <NewArticle />
      </div>
    </div>
  );
};

export default Admin;
