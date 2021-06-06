import { all, delay, put, takeLatest } from 'redux-saga/effects';
import { apiGet, apiPost } from '../../api';
import { API_ENDPOINTS } from '../../constants';
import {
  createProject,
  createProjectError,
  createProjectSuccess,
  loadProjects,
  loadProjectsError,
  loadProjectsSuccess,
} from '../slices/projects';

function* createProjectSaga({ payload }) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      yield delay(1000); // For presentation purposes
    }
    const data = yield apiPost(API_ENDPOINTS.projects, payload, true);
    yield put(createProjectSuccess(data));
  } catch (err) {
    yield put(createProjectError(err.message));
  }
}

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
  yield all([
    takeLatest(createProject.type, createProjectSaga),
    takeLatest(loadProjects.type, loadProjectsSaga),
  ]);
}

export default projectsSaga;
