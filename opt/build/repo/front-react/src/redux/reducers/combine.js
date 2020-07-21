import { combineReducers } from 'redux';
import userreducer from './user-reducer';


const reducers = combineReducers({
    user: userreducer,


});

export default reducers;
