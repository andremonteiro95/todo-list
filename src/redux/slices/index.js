import { combineReducers } from 'redux';
import authReducer from './auth';
import projectsReducer from './projects';

const rootReducer = combineReducers({
  authState: authReducer,
  projectsState: projectsReducer,
});

export default rootReducer;
