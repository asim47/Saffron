import { combineReducers } from 'redux';
import { AuthReducer } from "./Auth.reducer"
import { ResReducer } from './Res.reducer';

export const Reducer = combineReducers({
    auth: AuthReducer,
    res: ResReducer,
});

