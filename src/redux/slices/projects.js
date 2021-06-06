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
  },
});

export const {
  clearProjects,
  createProject,
  createProjectError,
  createProjectSuccess,
  loadProjects,
  loadProjectsError,
  loadProjectsSuccess,
} = projectsSlice.actions;

const projectsReducer = projectsSlice.reducer;
export default projectsReducer;
