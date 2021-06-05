import {
  Button,
  TextField,
  Typography,
  Link,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { VALIDATION_REGEXS } from '../../constants';
import { getAuthError, getIsAuthLoading } from '../../redux/selectors';
import { clearAuthError, signup } from '../../redux/slices/auth';
import AuthContainer from './AuthContainer';

const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: theme.spacing(1),
  },
  link: {
    marginTop: theme.spacing(2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const dispatch = useDispatch();
  const authError = useSelector(getAuthError);
  const isAuthLoading = useSelector(getIsAuthLoading);

  if (authError) {
    setError('email', {
      type: 'manual',
      message: 'This email is already in use',
    });
    dispatch(clearAuthError());
  }

  const onSubmit = (data) => {
    dispatch(signup(data));
  };

  return (
    <AuthContainer>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="name"
          label="Name"
          autoComplete="name"
          autoFocus
          {...register('name', {
            required: true,
            pattern: VALIDATION_REGEXS.name,
          })}
          error={!!errors.name}
          helperText={
            !!errors.name &&
            'The name introduced is invalid. Check if there is any whitespace in front of your name.'
          }
        />
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
          error={!!errors.email || !!authError}
          helperText={
            errors.email?.type === 'pattern'
              ? 'The email introduced is invalid.'
              : errors.email?.type === 'manual'
              ? 'This email is already in use.'
              : null
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
          {...register('password', {
            required: true,
            minLength: 8,
            pattern: VALIDATION_REGEXS.password,
          })}
          error={!!errors.password}
          helperText={
            !!errors.password &&
            'Your password must contain at least 8 characters, and must include uppercase and lowercase letters, digits, and special characters.'
          }
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          endIcon={
            isAuthLoading && <CircularProgress color="inherit" size={24} />
          }
          disabled={isAuthLoading}
        >
          {!isAuthLoading && 'Sign up'}
        </Button>
      </form>
      <Link
        component={RouterLink}
        to="/login"
        className={classes.link}
        variant="body2"
      >
        {'Already have an account? Log in'}
      </Link>
    </AuthContainer>
  );
}

export default SignUp;
