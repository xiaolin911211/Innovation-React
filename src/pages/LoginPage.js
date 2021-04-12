
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { httpAuthentication } from '../components/ApiCall';
import { selectorUserInfo } from '../components/GlobalState';
import { loginUseStyle } from '../components/SharedComponents';
import History from '../history';

const LoginPage = () => {
  const classes = loginUseStyle();
  const [userrole, setUserRole] = useRecoilState(selectorUserInfo('userrole'));
  const [username, setUserName] = useRecoilState(selectorUserInfo("username"));
  const [usernameRef, setUserNameRef] = useState('');
  const [userpasswordRef, setUserPasswordRef] = useState('');
  const [displayError, setDisplayError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const authenticationResponse = await httpAuthentication(usernameRef, userpasswordRef);
    console.log('authenticationResponse', authenticationResponse);
    if (authenticationResponse.status === 200) {
      setUserRole(authenticationResponse.data.userRole);
      setUserName(usernameRef);
      History.push('/home');
    }
    else {
      setDisplayError(true);
    }
  };
  return (
    <Grid container component="main" className={classes.root} >
      <CssBaseline />
      <Grid item xs={12} sm={8} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name='email'
              autoComplete="email"
              autoFocus
              onChange={(e) => setUserNameRef(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setUserPasswordRef(e.target.value)}
            />
            {displayError ? <Alert variant="filled" severity="error">Invalid Username or Password</Alert> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>

          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
