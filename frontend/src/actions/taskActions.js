import axios from '../plugins/axios';

import { SET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from './types';

export const fetchTasks = () => async dispatch => {
    try {
        const tasks = await axios.get('/api/tasks');

        dispatch({
            type: SET_TASKS,
            payload: tasks
        });
    } catch (error) {
        console.error(error);
    }
};

export const addTask = name => async dispatch => {
    try {
        const newTask = await axios.post('/api/tasks', { name });

        dispatch({
            type: ADD_TASK,
            payload: newTask
        });
    } catch (error) {
        console.error(error);
    }
};

export const updateTask = task => async dispatch => {
    try {
        const updatedTask = await axios.put('/api/tasks/' + task.id, { ...task });

        dispatch({
            type: UPDATE_TASK,
            payload: updatedTask
        });
    } catch (error) {
        console.error(error);
    }
};

export const deleteTask = id => async dispatch => {
    try {
        await axios.delete('/api/tasks/' + id);

        dispatch({
            type: DELETE_TASK,
            payload: id
        });
    } catch (error) {
        console.error(error);
    }
};
