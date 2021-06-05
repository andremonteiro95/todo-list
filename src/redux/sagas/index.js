import axios from 'axios';
import { all, put, takeLatest } from 'redux-saga/effects';
import { apiGet, apiPost } from '../../api';
import { API_ENDPOINTS } from '../../constants';
import {
  login,
  loginError,
  loginSuccess,
  signup,
  signupError,
  signupSuccess,
} from '../slices/auth';

function* loginSaga({ payload }) {
  try {
    const data = yield apiPost(API_ENDPOINTS.login, payload);
    yield put(loginSuccess(data));
  } catch (err) {
    yield put(loginError(err.message));
  }
}

function* signupSaga() {
  try {
    const data = yield apiGet(API_ENDPOINTS.signup);
    yield put(signupSuccess(data));
  } catch (err) {
    yield put(signupError(err.message));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(login.type, loginSaga),
    takeLatest(signup.type, signupSaga),
  ]);
}

export default rootSaga;
