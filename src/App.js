import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header.Component'
import Home from './Home/Home.Component'
import Search from './Search/Search.Component'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
         <div>
         <Header></Header>
          <Switch>
            <Route exact  path="/" component={Home}/>
            <Route exact path="/search" component={Search}/>
          </Switch>
         </div>
        </Router>
      </div>
    );
  }
}

export default App;
