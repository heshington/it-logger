import { combineReducers } from 'redux';
import logReducer from './logReducer';
import techReducer from './techRedcuer';

export default combineReducers({
  log: logReducer,
  tech: techReducer,
});
