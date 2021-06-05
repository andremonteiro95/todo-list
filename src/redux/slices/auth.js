import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const getCurrentUser = () => {
  const token = Cookies.get('token');

  if (!token) {
    return undefined;
  }

  const { email, name } = jwt.decode(token);
  return { email, name };
};

const initialState = {
  currentUser: getCurrentUser(),
  loading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      const { name, email, exp } = jwt.decode(payload.token);
      Cookies.set('token', payload.token, {
        expires: exp * 1000,
      });
      state.currentUser = { email, name };
      state.loading = false;
    },
    loginError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    signup: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, { payload }) => {
      state.currentUser = payload;
      state.loading = false;
    },
    signupError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const {
  login,
  loginError,
  loginSuccess,
  signup,
  signupError,
  signupSuccess,
} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
