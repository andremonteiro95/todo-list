export const getAuthError = (state) => state.authState.error;
export const getCurrentUser = (state) => state.authState.currentUser;
export const getIsAuthenticated = (state) => !!state.authState.currentUser;
export const getIsAuthLoading = (state) => state.authState.loading;
