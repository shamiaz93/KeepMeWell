import { combineReducers } from 'redux';
import appLang from './appLang';


const appReducer = combineReducers({
    appLang,
});

export default appReducer;

export type State = ReturnType<typeof appReducer>