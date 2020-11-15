import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Nav from './Nav'
import Home from './Home'
import Schedule from './Schedule';
import Login from './Login';
import Tasks from './Tasks';
import Signup from './Signup';

function App() {
  return (
    <div>
      <Nav/>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/schedule" component={Schedule}/>
          <Route path="/home" component={Home}/>
          <Route path="/tasks" component={Tasks}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
        
    </div>
  );
}

export default App;
