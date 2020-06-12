import React from 'react';
import Card from '../../shared/components/UIElements/Card/Card';

import './Home.css';

function Home(props) {
  return (
    <div className="home">
      <section id="home-news"></section>
      <section id="home-classes"></section>
      <section id="home-contact" className="home-contact">
        <div className="home-contact-flex">
          <div className="contact-data">
            <div className="innerbox">
              <p>
                <a href="tel:+38630611001">+386 30 611 001</a>
              </p>
              <p>
                <a href="mailto:mimi.plesnicenter@gmail.com">
                  mimi.plesnicenter@gmail.com
                </a>
              </p>
            </div>
            <div className="innerbox">
              <p>PE Laguna Befit</p>
              <p>Dunajska cesta 270, Ljubljana</p>
            </div>
            <div className="innerbox">
              <p>Pod kupolo d.o.o.</p>
              <p>Dunajska cesta 191</p>
              <p>SI-1000 Ljubljana</p>
            </div>
          </div>
          <div className="social-media-links">
            <a
              href="https://www.instagram.com/mimiplesnicenter/"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/mimiplesnicenter/"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a
              href="https://goo.gl/maps/gkyokTmnZ9d1sEQx8"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fas fa-map-marker-alt"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
