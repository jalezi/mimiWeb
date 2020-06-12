import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const NavigationItem = props => {
  console.log('[NavigationItem] props: ', props);

  let item = (
    <li className="navigation-item">
      <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  );

  if (props.socialMediaLink) {
    item = (
      <li className="navigation-item">
        <a href={props.link} target={props.target} rel={props.rel}>
          {props.children}
        </a>
      </li>
    );
  }

  return item;
};
export default NavigationItem;
