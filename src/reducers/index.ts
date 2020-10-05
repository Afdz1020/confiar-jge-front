import { combineReducers } from 'redux';
import global from './globalReducers';

const rootReducer: any = combineReducers({
  global
});

export default rootReducer;
