import { SET_USER, LOGOUT_USER } from '@/store/actions/types';

const user = JSON.parse(localStorage.getItem('user')) || null;

const initialState = {
    isAuthenticated: !!user,
    user
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuthenticated: true,
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

export default authReducer;
