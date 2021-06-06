import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  loading: false,
  error: undefined,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearProjects: () => ({ ...initialState }),
    loadProjects: (state) => {
      state.error = undefined;
      state.loading = true;
    },
    loadProjectsSuccess: (state, { payload }) => {
      state.projects = payload;
      state.loading = false;
    },
    loadProjectsError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    createProject: (state) => {
      state.error = undefined;
      state.loading = true;
    },
    createProjectSuccess: (state, { payload }) => {
      state.projects.push(payload);
      state.loading = false;
    },
    createProjectError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    deleteProject: (state) => {
      state.error = undefined;
      state.loading = true;
    },
    deleteProjectSuccess: (state, { payload: projectId }) => {
      const index = state.projects.findIndex(({ id }) => id === projectId);
      state.projects.splice(index, 1);
      state.loading = false;
    },
    deleteProjectError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    addTask: (state) => {
      state.error = undefined;
      state.loading = true;
    },
    addTaskSuccess: (state, { payload: { projectId, task } }) => {
      const index = state.projects.findIndex(({ id }) => id === projectId);
      state.projects[index].tasks.push(task);
      state.loading = false;
    },
    addTaskError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    deleteTask: (state) => {
      state.error = undefined;
      state.loading = true;
    },
    deleteTaskSuccess: (state, { payload: { projectId, taskId } }) => {
      const projectIndex = state.projects.findIndex(
        ({ id }) => id === projectId,
      );
      const taskIndex = state.projects[projectIndex].tasks.findIndex(
        ({ id }) => id === taskId,
      );
      state.projects[projectIndex].tasks.splice(taskIndex, 1);
      state.loading = false;
    },
    deleteTaskError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    toggleTaskStatus: (state) => {
      state.error = undefined;
      state.loading = true;
    },
    toggleTaskStatusSuccess: (state, { payload: { projectId, task } }) => {
      const projectIndex = state.projects.findIndex(
        ({ id }) => id === projectId,
      );
      const taskIndex = state.projects[projectIndex].tasks.findIndex(
        ({ id }) => id === task.id,
      );
      state.projects[projectIndex].tasks[taskIndex] = task;
      state.loading = false;
    },
    toggleTaskStatusError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const {
  clearProjects,
  createProject,
  createProjectError,
  createProjectSuccess,
  deleteProject,
  deleteProjectError,
  deleteProjectSuccess,
  loadProjects,
  loadProjectsError,
  loadProjectsSuccess,
  addTask,
  addTaskError,
  addTaskSuccess,
  deleteTask,
  deleteTaskError,
  deleteTaskSuccess,
  toggleTaskStatus,
  toggleTaskStatusError,
  toggleTaskStatusSuccess,
} = projectsSlice.actions;

const projectsReducer = projectsSlice.reducer;
export default projectsReducer;
