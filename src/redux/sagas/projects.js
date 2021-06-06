import { all, delay, put, select, takeLatest } from 'redux-saga/effects';
import { apiDelete, apiGet, apiPost, apiPut } from '../../api';
import { API_ENDPOINTS } from '../../constants';
import { getProjectById } from '../selectors';
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
  deleteTask,
  deleteTaskError,
  deleteTaskSuccess,
  loadProjects,
  loadProjectsError,
  loadProjectsSuccess,
  toggleTaskStatus,
  toggleTaskStatusError,
  toggleTaskStatusSuccess,
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

function* deleteTaskSaga({ payload: { projectId, taskId } }) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      yield delay(1000); // For presentation purposes
    }
    yield apiDelete(API_ENDPOINTS.tasks(projectId) + `/${taskId}`, true);
    yield put(
      deleteTaskSuccess({
        projectId,
        taskId,
      }),
    );
  } catch (err) {
    yield put(deleteTaskError(err.message));
  }
}

function* toggleTaskStatusSaga({ payload: { projectId, taskId } }) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      yield delay(1000); // For presentation purposes
    }
    const { done } = yield select(getProjectById(projectId), (project) => {
      project.tasks.find(({ id }) => id === taskId);
    });

    yield apiPut(
      API_ENDPOINTS.tasks(projectId) + `/${taskId}`,
      { done: !done },
      true,
    );
    yield put(
      toggleTaskStatusSuccess({
        projectId,
        taskId,
      }),
    );
  } catch (err) {
    yield put(toggleTaskStatusError(err.message));
  }
}

function* projectsSaga() {
  yield all([
    takeLatest(createProject.type, createProjectSaga),
    takeLatest(deleteProject.type, deleteProjectSaga),
    takeLatest(loadProjects.type, loadProjectsSaga),
    takeLatest(addTask.type, addTaskSaga),
    takeLatest(deleteTask.type, deleteTaskSaga),
    takeLatest(toggleTaskStatus.type, toggleTaskStatusSaga),
  ]);
}

export default projectsSaga;
