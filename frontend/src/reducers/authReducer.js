import { SET_USER, LOGOUT_USER } from '../actions/types';

const user = JSON.parse(localStorage.getItem('user')) || null;

const initialState = {
    isAuthenticated: !!user,
    user
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuthenticated: !!action.payload,
                user: action.payload
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
