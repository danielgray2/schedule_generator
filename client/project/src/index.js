import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route} from 'react-router-dom';
import './index.css';
import { AppContainer, LoginContainer } from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

//axios.defaults.baseURL = 'http://schedule_generator_nginx_1:1337/';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path={["/", "/login", "/signup"]} component={LoginContainer}/>
      <Route component={AppContainer}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
