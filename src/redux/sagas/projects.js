import { all, delay, put, select, takeLatest } from 'redux-saga/effects';
import { createSelector } from '@reduxjs/toolkit';
import { apiDelete, apiGet, apiPost, apiPut } from '../../api';
import { API_ENDPOINTS } from '../../constants';
import { getProjectById } from '../selectors';
import {
  addTask,
  addTaskError,
  addTaskSuccess,
  renameProject,
  renameProjectError,
  renameProjectSuccess,
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
  renameTask,
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

function* renameProjectSaga({ payload: { name, projectId } }) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      yield delay(1000); // For presentation purposes
    }
    const data = yield apiPut(
      API_ENDPOINTS.projects + `/${projectId}`,
      { name },
      true,
    );
    yield put(renameProjectSuccess(data));
  } catch (err) {
    yield put(renameProjectError(err.message));
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
      yield delay(15000); // For presentation purposes
    }
    const data = yield apiGet(API_ENDPOINTS.projects, true);
    yield put(loadProjectsSuccess(data));
  } catch (err) {
    yield put(loadProjectsError(err.message));
  }
}

function* addTaskSaga({ payload: { projectId, description } }) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      yield delay(1000); // For presentation purposes
    }
    const task = yield apiPost(
      API_ENDPOINTS.tasks(projectId),
      { description },
      true,
    );
    yield put(
      addTaskSuccess({
        projectId,
        task,
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
    const { done } = yield select(
      createSelector(getProjectById(projectId), (project) =>
        project.tasks.find(({ id }) => id === taskId),
      ),
    );

    const newTask = yield apiPut(
      API_ENDPOINTS.tasks(projectId) + `/${taskId}`,
      { done: !done },
      true,
    );
    yield put(
      toggleTaskStatusSuccess({
        projectId,
        task: newTask,
      }),
    );
  } catch (err) {
    yield put(toggleTaskStatusError(err.message));
  }
}

function* renameTaskSaga({ payload: { projectId, taskId, description } }) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      yield delay(1000); // For presentation purposes
    }
    const newTask = yield apiPut(
      API_ENDPOINTS.tasks(projectId) + `/${taskId}`,
      { description },
      true,
    );
    yield put(
      toggleTaskStatusSuccess({
        projectId,
        task: newTask,
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
    takeLatest(renameProject.type, renameProjectSaga),
    takeLatest(addTask.type, addTaskSaga),
    takeLatest(deleteTask.type, deleteTaskSaga),
    takeLatest(toggleTaskStatus.type, toggleTaskStatusSaga),
    takeLatest(renameTask.type, renameTaskSaga),
  ]);
}

export default projectsSaga;
