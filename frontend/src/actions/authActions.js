import axios from 'axios';

import { SET_USER, LOGOUT_USER } from './types';

export const registerUser = (data, history) => async (dispatch) => {
    try {
        await axios.post('/api/auth/register', data);
        
        history.push('/login');
    } catch (error) {
        console.error(error); 
    }
};

export const loginUser = (data, history) => async (dispatch) => {
    try {
        const response = await axios.post('/api/auth/login', data);
        const user = response.data;

        dispatch({
            type: SET_USER,
            payload : user
        });

        localStorage['user'] = JSON.stringify(user);

        history.push('/tasks');
    } catch (error) {
        console.error(error);
    }
};

export const logoutUser = (history) => async (dispatch) => {
    try {
        await axios.get('/api/auth/logout');

        dispatch({
            type: LOGOUT_USER,
        });

        localStorage.removeItem('user');

        history.push('/');
    } catch (error) {
        console.error(error);
    }
};
