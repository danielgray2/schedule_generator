import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Nav from './Nav'
import Home from './Home'
import Schedule from './Schedule';
import Login from './Login';

const axios = require('axios').default;

async function getText(){
  var resp = await axios.get("/another");
  console.log(resp);
  return resp;
}

function App() {
  getText();
  return (
    <div>
      <Nav/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/schedule" component={Schedule}/>
          <Route path="/login" component={Login}/>
        </Switch>
        
    </div>
  );
}

export default App;
