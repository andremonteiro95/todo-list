import { all, delay, put, takeLatest } from 'redux-saga/effects';
import { apiPost } from '../../api';
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
    if (process.env.NODE_ENV !== 'production') {
      yield delay(1000); // For presentation purposes
    }
    const data = yield apiPost(API_ENDPOINTS.login, payload);
    yield put(loginSuccess(data));
  } catch (err) {
    yield put(loginError(err.message));
  }
}

function* signupSaga({ payload }) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      yield delay(1000); // For presentation purposes
    }
    const data = yield apiPost(API_ENDPOINTS.signup, payload);
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
