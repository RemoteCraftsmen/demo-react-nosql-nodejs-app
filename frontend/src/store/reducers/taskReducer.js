import { SET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from '../actions/types';

const initialState = {
    tasks: []
};

export default (state = initialState, { type, tasks, newTask, updatedTask, taskId }) => {
    switch (type) {
        case SET_TASKS:
            return {
                tasks
            };

        case ADD_TASK:
            return {
                tasks: [...state.tasks, newTask]
            };

        case UPDATE_TASK:
            return {
                tasks: state.tasks.map(task => {
                    return task._id !== updatedTask._id ? task : updatedTask;
                })
            };

        case DELETE_TASK:
            return {
                tasks: state.tasks.filter(task => task._id !== taskId)
            };

        default:
            return state;
    }
};
