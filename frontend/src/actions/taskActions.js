import axios from '../plugins/axios';

import { SET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from './types';

export const fetchTasks = () => async dispatch => {
    try {
        const { data: tasks } = await axios.get('/tasks');

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
        const { data: newTask } = await axios.post('/tasks', { name });

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
        const { data: updatedTask } = await axios.put('/tasks/' + task.id, { ...task });

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
        await axios.delete('/tasks/' + id);

        dispatch({
            type: DELETE_TASK,
            payload: id
        });
    } catch (error) {
        console.error(error);
    }
};
