import axios from '@/plugins/axios';

import { SET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from './types';

export const fetchTasks = () => async dispatch => {
    try {
        const { data: tasks } = await axios.get('/tasks');

        dispatch({
            type: SET_TASKS,
            tasks
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
            newTask
        });
    } catch (error) {
        console.error(error);
    }
};

export const updateTask = task => async dispatch => {
    try {
        const { data: updatedTask } = await axios.put(`/tasks/${task.id}`, { ...task });

        dispatch({
            type: UPDATE_TASK,
            updatedTask
        });
    } catch (error) {
        console.error(error);
    }
};

export const deleteTask = taskId => async dispatch => {
    try {
        await axios.delete(`/tasks/${taskId}`);

        dispatch({
            type: DELETE_TASK,
            taskId
        });
    } catch (error) {
        console.error(error);
    }
};
