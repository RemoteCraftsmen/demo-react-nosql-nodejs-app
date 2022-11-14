import axios from '@/plugins/axios';

import { SET_USER, LOGOUT_USER } from './types';

export const registerUser = (data, history) => async dispatch => {
    try {
        const { data: user } = await axios.post('/auth/register', data);

        setUser(user, dispatch);

        history.push('/tasks');
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
    dispatch({
        type: SET_USER,
        user
    });

    localStorage.setItem('user', JSON.stringify(user));
};
