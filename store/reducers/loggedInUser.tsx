import { LOGGED_IN_USER } from '../types';

const initialstate = {
    loggedInUser: {},
};

type Action = {
    type: string,
    payload?: any
}

export default (state: any = initialstate, action: Action) => {
    switch (action.type) {
        case LOGGED_IN_USER:
            return Object.assign({}, { loggedInUser: action.payload });
        default:
            return state;
    }
};