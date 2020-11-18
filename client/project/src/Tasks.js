import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import State from './State';
const axios = require('axios').default;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    marginTop: "60px",
    marginBottom: "50px"
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: "30px",
    textAlign: 'left',
    color: theme.palette.text.secondary,
    backgroundColor: "#f7f7f7",
    elevation: 2,
    fontWeight: 500,
    fontSize: 18
  },
}));

function Row(props){
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item xs={2}>
        <Paper className={classes.paper}>

          <Typography align="center" variant="h5">
            {props.desc}<br/>
          </Typography>

          <Typography display="inline" variant="h6">
            Date:{" "}
          </Typography>
            
          <Typography display="inline">
            {new Date(props.dateTime).toLocaleDateString("en-US")}<br/>
          </Typography>

          <Typography display="inline" variant="h6">
            Time:{" "}
          </Typography>
          
          <Typography display="inline">
            {new Date(props.dateTime).toLocaleTimeString("en-US")}
          </Typography>

        </Paper>
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
      <Typography variant="h3" className={classes.title}>
        Tasks
      </Typography>
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