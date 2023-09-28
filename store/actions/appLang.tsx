import { APP_LANG, } from '../types';

const setAppLang = (payload: number) => ({
    type: APP_LANG,
    payload,
});

export default {
    setAppLang,
};