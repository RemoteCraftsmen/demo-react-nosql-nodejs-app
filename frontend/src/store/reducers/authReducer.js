import { SET_USER, LOGOUT_USER } from '../actions/types';

const user = JSON.parse(localStorage.getItem('user')) || null;

const initialState = {
    isAuthenticated: !!user,
    user
};

export default (state = initialState, { type, user }) => {
    switch (type) {
        case SET_USER:
            return {
                ...state,
                isAuthenticated: !!user,
                user
            };

        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };

        default:
            return state;
    }
};
