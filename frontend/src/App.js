import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './home/pages/Home';
import News from './news/pages/News';
import Admin from './admin/pages/Admin';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Gallery from './admin/pages/Gallery';
import GalleryTemp from './admin/pages/temp/GalleryTemp';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import imageOne from './assets/images/ballet-1030921_1920.jpg';
import imageTwo from './assets/images/dancers2.jpg';
import imageOneSquare from './assets/images/square/ballet1_square.jpg';
import imageTwoSquare from './assets/images/square/ballet2_square.jpg';
import imageThreeSquare from './assets/images/square/dancers1_square.jpg';
import imageLogo from './assets/images/logo512.png';

const App = () => {
  /* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */
  let routes = (
    <Switch>
      <Route path="/classes"></Route>
      <Route path="/news">
        <News />
      </Route>
      <Route path="/admin/galleryTemp">
        <GalleryTemp />
      </Route>
      <Route path="/admin/gallery">
        <Gallery />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
  return (
    <Router>
      <MainNavigation />
      <section id="main-carousel">
        <div
          className="carousel"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexFlow: 'row',
            alignContent: 'center',
            textAlign: 'center',
          }}>
          <Carousel
            autoPlay={4000}
            animationSpeed={3000}
            infinite
            dots
            slidesPerPage={1}>
            <a href="/classes">
              <picture>
                <source media="(min-width:465px)" srcset={imageOne} />
                <img src={imageOneSquare} alt="img1" />
              </picture>
            </a>
            <a href="/news">
              <picture>
                <source media="(min-width:465px)" srcset={imageTwo} />
                <img src={imageTwoSquare} alt="img1" />
              </picture>
            </a>
            <a href="/">
              <picture>
                <source media="(min-width:465px)" srcset={imageLogo} />
                <img src={imageThreeSquare} alt="img1" />
              </picture>
            </a>
          </Carousel>
        </div>
      </section>
      <main>{routes}</main>
    </Router>
  );
};

export default App;
