import React from 'react';
import NavBar from './components/navbar/navbar.js';
import HomePage from './pages/home';
import WatchPage from './pages/watch';
import SearchPage from './pages/search';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Router>

          <NavBar/>

          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/watch/:id" component={WatchPage}/>
            <Route path="/search" exact component={SearchPage}/>
            <Route path="/search/:q" component={SearchPage}/>
            <Route render={() => <h1>404: page not found</h1>}/>
          </Switch>

        </Router>
      </div>
    );
  }
}

export default App;
