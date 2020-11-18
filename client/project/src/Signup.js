import './App.css';

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [invalidEmail, setInvalidEmail] = React.useState(true);
  const [invalidPassword, setInvalidPassword] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handlefirstNameChange = (fName) => {
    setFirstName(fName.target.value);
  }

  const handlelastNameChange = (lName) => {
    setLastName(lName.target.value);
  }

  const handleemailChange = (Email) => {
    setInvalidEmail(EmailValidation(Email.target.value));
    setEmail(Email.target.value);
  }
  
  const handlepasswordChange = (pw) => {
    setInvalidPassword(PasswordValidation(pw.target.value));
    setPassword(pw.target.value);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try{
      var resp = await Axios.post("/signup", {
        "firstname": firstName,
        "lastname": lastName,
        "email": email,
        "password": password
      });
    }catch(error){
      setOpen(true);
      return resp;
    }
    
    props.history.push("/login");
    return resp;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function EmailValidation(email){
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !emailPattern.test(email);
  }

  function PasswordValidation(password){
    const pattern = /^[A-Za-z]\w{7,14}$/;
    return !pattern.test(password);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handlefirstNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handlelastNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={invalidEmail}
                helperText="Please enter a valid email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleemailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={invalidPassword}
                helperText="Passwords must contain 8 or more characters."
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlepasswordChange}
              />
            </Grid>
          </Grid>
          <div className={classes.errorAlert}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                  Unable to create account. Try a different email.
              </Alert>
            </Snackbar>
          </div>
          <Button
            type="submit"
            disabled={invalidEmail || invalidPassword}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignUp);