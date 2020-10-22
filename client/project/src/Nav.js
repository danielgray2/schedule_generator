import React from 'react';
import { Link } from 'react-router-dom';
import {Paper, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
    flexGrow: 1,
    },
});

export default function CenteredTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log("Came here");
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
        <Tabs   
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Home" component={Link} to="/" />
            <Tab label="Schedule" component={Link} to="/schedule" />
        </Tabs>
        </Paper>
    );
}