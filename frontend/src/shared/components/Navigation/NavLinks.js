import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
