export const getCurrentUser = (state) => state.authState.currentUser;
export const getIsAuthenticated = (state) => !!state.authState.currentUser;
