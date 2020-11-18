import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import State from './State';
const axios = require('axios').default;

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(10),
        width: '25ch',
      },
    },
  }));

export function TaskForm() {
  // The first commit of Material-UI, these are react hooks
  const [selectedDate, setSelectedDate] = React.useState(new Date().setSeconds(0, 0));
  const [description, setDescription] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("error");
  const [alertTitle, setAlertTitle] = React.useState("Error");
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleDateChange = (date) => {
    date = date.setSeconds(0,0);
    console.log("From here: " + date);
    setSelectedDate(date);
  };

  const handleDescChange = (desc) => {
    setDescription(desc.target.value);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(selectedDate);
    try{
      var resp = await axios.post("/additem", {
        "task_description": description,
        "precedent": 1,
        "time": selectedDate,
        "user_id": State.userId
      });
    }catch(error){
      if(error.response.status == 404){
        setAlertTitle("Error");
        setSeverity("error");
        setErrorMsg("Please choose a different time.");
        setOpen(true);
      }
      else{
        setAlertTitle("Error");
        setSeverity("error");
        setErrorMsg("User not found. Try relogging in.")
        setOpen(true);
      }
      return resp;
    }
    setAlertTitle("Success");
    setSeverity("success");
    setErrorMsg("Task added to task list.");
    setOpen(true);
    return resp;
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField id="standard-basic" label="Description" value={description} onChange={handleDescChange}/>
          
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <div className={classes.errorAlert}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert severity={severity}>
                <AlertTitle>{alertTitle}</AlertTitle>
                  {errorMsg}
              </Alert>
            </Snackbar>
          </div>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
    </MuiPickersUtilsProvider>
  );
}