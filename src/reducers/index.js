import {combineReducers} from 'redux';
import auth from './auth'
import {routerReducer} from 'react-router-redux';



const reducers = combineReducers({
    routing:routerReducer,
    auth
})

export default reducers;
