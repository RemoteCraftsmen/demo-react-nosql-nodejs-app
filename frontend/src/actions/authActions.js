import axios from 'axios';

import { SET_USER, LOGOUT_USER } from './types';

export const registerUser = (data, history) => async dispatch => {
    try {
        await axios.post(process.env.REACT_APP_API_URL + '/api/auth/register', data, {
            withCredentials: true
        });

        const { email, password } = data;

        dispatch(loginUser({ email, password }, history));
    } catch (error) {
        console.error(error);
    }
};

export const loginUser = (data, history) => async dispatch => {
    try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/api/auth/login', data, {
            withCredentials: true
        });
        const user = response.data;

        setUser(user, dispatch);

        history.push('/tasks');
    } catch (error) {
        console.error(error);
    }
};

export const logoutUser = history => async dispatch => {
    try {
        await axios.post(process.env.REACT_APP_API_URL + '/api/auth/logout', { withCredentials: true });

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
        payload: user
    });

    localStorage['user'] = JSON.stringify(user);
};
