import { combineReducers } from 'redux';
import appLang from './appLang';
import loggedInUser from './loggedInUser';


const appReducer = combineReducers({
    appLang,
    loggedInUser,
});

export default appReducer;

export type State = ReturnType<typeof appReducer>