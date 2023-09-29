import { LOGGED_IN_USER } from '../types';

const setLoggedInUser = (payload: number) => ({
    type: LOGGED_IN_USER,
    payload,
});

export default {
    setLoggedInUser,
};