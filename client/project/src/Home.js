import React from 'react';
import './App.css';
import TaskForm from './DateTime.js';
const axios = require('axios').default;

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The Calendar</h1>
        <TaskForm/>
      </header>
    </div>
  );
}

export default Home;