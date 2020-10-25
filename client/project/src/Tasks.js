import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const axios = require('axios').default;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: 18
  },
}));

function Row(props){
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item xs={3}>
        <Paper className={classes.paper}>{props.desc}</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>{new Date(props.dateTime).toLocaleDateString("en-US")}</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>{new Date(props.dateTime).toLocaleTimeString("en-US")}</Paper>
      </Grid>
    </React.Fragment>
  );
}

export default function Tasks() {
  const classes = useStyles();
  const [tasks, setTasks] = React.useState({});
  
  useEffect(() => {
    axios.get("/tasklist").then(resp => setTasks(resp.data));
  })

  return (
    <div className="App">
      <h1>Tasks</h1>
        <Grid container className={classes.root}>
          {Object.keys(tasks).map((value, index) => {
            return <Grid container item xs={12} spacing={3} justify="center"> <Row desc={tasks[value]["task_description"]} dateTime={tasks[value]["time"]}/> </Grid>
          })}
        </Grid>
    </div>
  );
}