import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import Nav from './Nav'
import Home from './Home'
import Schedule from './Schedule';
import Login from './Login';
import Tasks from './Tasks';
import Signup from './Signup';
import State from './State';

export function AppContainer() {

  return (
    <div>
      <Nav/>
      <Route path="/schedule">
        {State.userId == "" ? <Redirect to="/login"/> : <Schedule/>}
      </Route>
      <Route path="/home">
        {State.userId == "" ? <Redirect to="/login"/> : <Home/>}
      </Route>
      <Route path="/tasks">
        {State.userId == "" ? <Redirect to="/login"/> : <Tasks/>}
      </Route>
      <Route path="/newtask">
        {State.userId == "" ? <Redirect to="/login"/> : <Home/>}
      </Route>
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
