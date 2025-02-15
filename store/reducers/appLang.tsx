import { APP_LANG } from '../types';

const initialstate = {
    appLang: 'en',
};

type Action = {
    type: string,
    payload?: any
}

export default (state: any = initialstate, action: Action) => {
    switch (action.type) {
        case APP_LANG:
            return Object.assign({}, { appLang: action.payload });
        default:
            return state;
    }
};