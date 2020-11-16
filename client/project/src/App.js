import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import Nav from './Nav'
import Home from './Home'
import Schedule from './Schedule';
import Login from './Login';
import Tasks from './Tasks';
import Signup from './Signup';

export function AppContainer() {
  return (
    <div>
      <Nav/>
      <Route path="/schedule" component={Schedule}/>
      <Route path="/home" component={Home}/>
      <Route path="/tasks" component={Tasks}/>
      <Route path="/newtask" component={Home}/>
    </div>
  );
}

export function LoginContainer(){
  return(
    <div>
      <Route exact path="/" render={() => <Redirect to="/login" />}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </div>
  )
}
