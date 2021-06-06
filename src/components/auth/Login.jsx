import {
  Button,
  TextField,
  Typography,
  Link,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { VALIDATION_REGEXS } from '../../constants';
import { getAuthError, getIsAuthLoading } from '../../redux/selectors';
import { login } from '../../redux/slices/auth';
import AuthContainer from './AuthContainer';

const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: theme.spacing(1),
  },
  link: {
    marginTop: theme.spacing(2),
  },
}));

function Login() {
  const classes = useStyles();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const dispatch = useDispatch();
  const authError = useSelector(getAuthError);
  const isAuthLoading = useSelector(getIsAuthLoading);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <AuthContainer>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register('email', {
            required: true,
            pattern: VALIDATION_REGEXS.email,
          })}
          error={!!errors.email}
          helperText={
            errors.email?.type === 'pattern' &&
            'The email introduced is invalid.'
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password', { required: true })}
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        {authError && (
          <FormHelperText error>
            Failed to sign in, please review your credentials.
          </FormHelperText>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isAuthLoading}
        >
          {!isAuthLoading && 'Sign in'}
          {isAuthLoading && <CircularProgress color="inherit" size={24} />}
        </Button>
      </form>
      <Link
        component={RouterLink}
        to="/signup"
        className={classes.link}
        href="#"
        variant="body2"
      >
        {"Don't have an account? Sign up"}
      </Link>
    </AuthContainer>
  );
}

export default Login;
