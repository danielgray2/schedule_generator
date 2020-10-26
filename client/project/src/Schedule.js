import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import Grid from '@material-ui/core/Grid';
import './App.css';

function Schedule() {
  const [date, setDate] = React.useState();

  const onChange = (date) => {
    setDate(date)
  }

  return (
    <div className="App">
        <h1>Calendar</h1>
        <Grid container justify="center">
          <Calendar
            onChange={onChange}
            value={date}
          />
        </Grid>
    </div>
  );
}

export default Schedule;