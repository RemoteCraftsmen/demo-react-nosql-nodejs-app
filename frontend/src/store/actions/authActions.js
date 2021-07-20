import axios from '@/plugins/axios';

import { SET_USER, LOGOUT_USER } from './types';

export const registerUser = (data, history) => async dispatch => {
    try {
        await axios.post('/auth/register', data);

        const { email, password } = data;

        dispatch(loginUser({ email, password }, history));
    } catch (error) {
        console.error(error);
    }
};

export const loginUser = (data, history) => async dispatch => {
    try {
        const { data: user } = await axios.post('/auth/login', data);

        setUser(user, dispatch);

        history.push('/tasks');
    } catch (error) {
        console.error(error);
    }
};

export const logoutUser = history => async dispatch => {
    try {
        await axios.post('/auth/logout');

        dispatch({
            type: LOGOUT_USER
        });

        localStorage.removeItem('user');

        history.push('/');
    } catch (error) {
        console.error(error);
    }
};

const setUser = (user, dispatch) => {
    console.log('🚀 ~ file: authActions.js ~ line 47 ~ setUser ~ user', user);
    dispatch({
        type: SET_USER,
        user
    });

    localStorage['user'] = JSON.stringify(user);
};
