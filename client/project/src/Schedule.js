import React, { useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import './App.css';
import State from './State';
import { Typography } from '@material-ui/core';
const axios = require('axios').default;

const useStyles = makeStyles(() => ({
  title: {
    marginTop: "60px",
    marginBottom: "50px"
  }
}));

function Schedule() {
  const [tasks, setTasks] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const localizer = momentLocalizer(moment);
  
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    var tempTasks = []
    axios.post("/tasklist", {
      "user_id": State.userId
    })
    .then(resp => {
      resp.data.forEach(evt => {
        var end = new Date(evt["time"]);
        end.setHours(end.getHours() + 1);
        var currObj = {
          "title": evt["task_description"],
          "start": new Date(evt["time"]),
          "end": end
        }
        tempTasks.push(currObj);
      });
      setTasks(tempTasks);
    })
    .catch(error => {
      console.log(error);
      setErrorMsg("User not found. Try relogging in.");
      setOpen(true);
    });
  }, []);

  return (
    <div className="App">
        <Typography variant="h3" className={classes.title}>
          Calendar
        </Typography>
        <Grid container justify="center">
        <Calendar
          startAccessor="start"
          endAccessor="end"
          events={tasks}
          localizer={localizer}
          style={{ height: 500 }}
        />
        </Grid>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity={"error"}>
            <AlertTitle>Error</AlertTitle>
              {errorMsg}
          </Alert>
        </Snackbar>
    </div>
  );
}

export default Schedule;