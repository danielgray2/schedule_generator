import React from 'react';
import './App.css';
import { TaskForm } from './DateTime.js';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    marginTop: "60px",
    marginBottom: "50px"
  }
}));

function Home() {
  const classes = useStyles();
  return (
    <div className="App">
        <Typography variant="h3" className={classes.title}>
          New Task
        </Typography>
        <TaskForm/>
    </div>
  );
}

export default Home;