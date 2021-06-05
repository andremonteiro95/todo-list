import { Button, TextField, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { signup } from '../../redux/slices/auth';
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
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

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
          {...register('name', { required: true })}
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
          {...register('email', { required: true })}
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
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
