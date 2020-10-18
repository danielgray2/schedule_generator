import React from 'react';
import logo from './logo.svg';
import './App.css';

const axios = require('axios').default;

async function getText(){
  var resp = await axios.get("/another");
  console.log(resp);
  return resp;
}

function App() {
  getText();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          Here is the value:.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
