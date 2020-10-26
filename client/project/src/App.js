import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Nav from './Nav'
import Home from './Home'
import Schedule from './Schedule';
import Login from './Login';
import Tasks from './Tasks';

function App() {
  return (
    <div>
      <Nav/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/schedule" component={Schedule}/>
          <Route path="/login" component={Login}/>
          <Route path="/tasks" component={Tasks}/>
        </Switch>
        
    </div>
  );
}

export default App;
