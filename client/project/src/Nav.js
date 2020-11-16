import React from 'react';
import { Link } from 'react-router-dom';
import {Paper, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
    flexGrow: 1,
    },
});

export default function CenteredTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    let location = useLocation();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
        <Tabs
            value={location.pathname}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="New Task" value="/newtask" component={Link} to="/newtask" />
            <Tab label="Tasks" value="/tasks" component={Link} to="/tasks" />
            <Tab label="Calendar" value="/schedule" component={Link} to="/schedule" />
        </Tabs>
        </Paper>
    );
}