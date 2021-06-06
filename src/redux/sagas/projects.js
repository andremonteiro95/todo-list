import { all, delay, put, takeLatest } from 'redux-saga/effects';
import { apiDelete, apiGet, apiPost } from '../../api';
import { API_ENDPOINTS } from '../../constants';
import {
  addTask,
  addTaskError,
  addTaskSuccess,
  createProject,
  createProjectError,
  createProjectSuccess,
  deleteProject,
  deleteProjectError,
  deleteProjectSuccess,
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

function* deleteProjectSaga({ payload: projectId }) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      yield delay(1000); // For presentation purposes
    }
    yield apiDelete(API_ENDPOINTS.projects + `/${projectId}`, true);
    yield put(deleteProjectSuccess(projectId));
  } catch (err) {
    yield put(deleteProjectError(err.message));
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

function* addTaskSaga({ payload: { projectId, task } }) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      yield delay(1000); // For presentation purposes
    }
    const data = yield apiPost(API_ENDPOINTS.tasks(projectId), { task }, true);
    yield put(
      addTaskSuccess({
        projectId,
        task: data,
      }),
    );
  } catch (err) {
    yield put(addTaskError(err.message));
  }
}

function* projectsSaga() {
  yield all([
    takeLatest(addTask.type, addTaskSaga),
    takeLatest(createProject.type, createProjectSaga),
    takeLatest(deleteProject.type, deleteProjectSaga),
    takeLatest(loadProjects.type, loadProjectsSaga),
  ]);
}

export default projectsSaga;
