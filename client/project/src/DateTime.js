import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
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

export default function TaskForm() {
  // The first commit of Material-UI, these are react hooks
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [description, setDescription] = React.useState("");
  const classes = useStyles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDescChange = (desc) => {
    setDescription(desc.target.value);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("UserID: " + State.userId);
    var resp = await axios.post("/additem", {
      "task_description": description,
      "precedent": 1,
      "time": selectedDate.getTime(),
      "user_id": State.userId
    });
    console.log(resp.data);
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
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
    </MuiPickersUtilsProvider>
  );
}