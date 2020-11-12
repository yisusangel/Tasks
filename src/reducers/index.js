import taskReducer from './taskReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    taskList: taskReducer,
});

export default allReducers;