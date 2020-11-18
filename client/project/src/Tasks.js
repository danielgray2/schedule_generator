import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import State from './State';
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
      <Grid item xs={6}>
        <Paper className={classes.paper}>{props.desc}---{new Date(props.dateTime).toLocaleDateString("en-US")}---{new Date(props.dateTime).toLocaleTimeString("en-US")}</Paper>
      </Grid>
    </React.Fragment>
  );
}

export default function Tasks() {
  const classes = useStyles();
  const [tasks, setTasks] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  
  useEffect(() => {
    axios.post("/tasklist", {
      "user_id": State.userId
    })
    .then(resp => setTasks(resp.data))
    .catch(error => {
      setErrorMsg("User not found. Try relogging in.");
      setOpen(true);
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <div className="App">
      <h1>Tasks</h1>
        <Grid container className={classes.root}>
          {Object.keys(tasks).map((value, index) => {
            return <Grid container item xs={12} spacing={3} justify="center"> <Row desc={tasks[value]["task_description"]} dateTime={tasks[value]["time"]}/> </Grid>
          })}
        </Grid>
        <div className={classes.errorAlert}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                  {errorMsg}
              </Alert>
            </Snackbar>
          </div>
    </div>
  );
}