import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: undefined,
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
      state.currentUser = payload;
      state.loading = false;
    },
    loginError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { login, loginError, loginSuccess } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
