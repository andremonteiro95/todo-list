import { all } from 'redux-saga/effects';
import authSaga from './auth';
import projectsSaga from './projects';

function* rootSaga() {
  yield all([authSaga(), projectsSaga()]);
}

export default rootSaga;
