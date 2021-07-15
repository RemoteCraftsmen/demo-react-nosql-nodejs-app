import { SET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from '../actions/types';

const initialTasks = [];

export default (tasks = initialTasks, action) => {
    switch (action.type) {
        case SET_TASKS:
            return action.payload;

        case ADD_TASK:
            return [...tasks, action.payload];

        case UPDATE_TASK:
            return tasks.map(task => {
                return task._id !== action.payload.id ? task : action.payload;
            });

        case DELETE_TASK:
            return tasks.filter(task => task._id !== action.payload);

        default:
            return tasks;
    }
};
