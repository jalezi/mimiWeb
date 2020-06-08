import React from 'react';
import { NavLink } from 'react-router-dom';

import './Admin.css';
import AdminArticles from '../components/AdminArticles/AdminArticles';

const Admin = () => {
  return (
    <div>
      <h2>Admin</h2>
      <div className="Admin">
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/admin" exact>
                News
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/gallery">Gallery</NavLink>
            </li>
            <li>
              <NavLink to="/admin/galleryTemp">Temp Gallery</NavLink>
            </li>
          </ul>
        </nav>
        <section id="admin-articles">
          <h2>Articles</h2>
          <AdminArticles />
        </section>
      </div>
    </div>
  );
};

export default Admin;
