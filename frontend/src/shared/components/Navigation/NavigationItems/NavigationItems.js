import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
  console.log('[NavigationItems] props: ', props);

  return (
    <ul className="navigation-items">
      <NavigationItem link="/classes" exact>
        Ponudba
      </NavigationItem>
      <NavigationItem link="/news" exact>
        Novice
      </NavigationItem>
      <NavigationItem link="/admin" exact>
        Admin
      </NavigationItem>
      <NavigationItem link="/" exact>
        Kontakt
      </NavigationItem>
      <NavigationItem
        socialMediaLink={true}
        link="https://www.instagram.com/mimiplesnicenter/"
        target="_blank"
        rel="noopener noreferrer">
        <i className="fab fa-instagram"></i>
      </NavigationItem>
      <NavigationItem
        socialMediaLink={true}
        link="https://www.facebook.com/mimiplesnicenter/"
        target="_blank"
        rel="noopener noreferrer">
        <i className="fab fa-facebook-square"></i>
      </NavigationItem>
      <NavigationItem
        socialMediaLink={true}
        link="https://goo.gl/maps/gkyokTmnZ9d1sEQx8"
        target="_blank"
        rel="noopener noreferrer">
        <i className="fas fa-map-marker-alt"></i>
      </NavigationItem>
    </ul>
  );
};
export default NavigationItems;
