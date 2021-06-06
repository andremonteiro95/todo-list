import { createSelector } from '@reduxjs/toolkit';

export const getAuthError = (state) => state.authState.error;
export const getCurrentUser = (state) => state.authState.currentUser;
export const getIsAuthenticated = (state) => !!state.authState.currentUser;
export const getIsAuthLoading = (state) => state.authState.loading;

export const getProjects = (state) => state.projectsState.projects;
export const getIsProjectsLoading = (state) => state.projectsState.loading;
export const getProjectById = (projectId) =>
  createSelector(getProjects, (projects) =>
    projects.find(({ id }) => id === projectId),
  );
export const getTasksByProjectId = (projectId) =>
  createSelector(getProjectById(projectId), ({ tasks }) => tasks);
export const getProjectsError = (state) => state.projectsState.error;
