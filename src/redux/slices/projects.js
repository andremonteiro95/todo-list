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
} = projectsSlice.actions;

const projectsReducer = projectsSlice.reducer;
export default projectsReducer;
