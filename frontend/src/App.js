import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import News from './news/pages/News';
import Admin from './admin/pages/Admin';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Gallery from './admin/pages/Gallery';

const App = () => {
  /* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */
  let routes = (
    <Switch>
      <Route path="/news">
        <News />
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
      <main>{routes}</main>
    </Router>
  );
};

function Home() {
  return <h2>Home</h2>;
}

export default App;
