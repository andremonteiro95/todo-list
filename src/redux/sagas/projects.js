import { all, delay, put, takeLatest } from 'redux-saga/effects';
import { apiGet } from '../../api';
import { API_ENDPOINTS } from '../../constants';
import {
  loadProjects,
  loadProjectsError,
  loadProjectsSuccess,
} from '../slices/projects';

function* loadProjectsSaga() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      yield delay(1000); // For presentation purposes
    }
    const data = yield apiGet(API_ENDPOINTS.projects, true);
    yield put(loadProjectsSuccess(data));
  } catch (err) {
    yield put(loadProjectsError(err.message));
  }
}

function* projectsSaga() {
  yield all([takeLatest(loadProjects.type, loadProjectsSaga)]);
}

export default projectsSaga;
