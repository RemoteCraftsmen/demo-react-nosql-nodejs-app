import { SET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from '@/store/actions/types';

const initialState = {
    tasks: [],
    isFetching: true
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                tasks: action.tasks,
                isFetching: false
            };

        case ADD_TASK:
            return {
                tasks: [...state.tasks, action.newTask]
            };

        case UPDATE_TASK:
            return {
                tasks: state.tasks.map(task => {
                    return task._id !== action.updatedTask._id ? task : action.updatedTask;
                })
            };

        case DELETE_TASK:
            return {
                tasks: state.tasks.filter(task => task._id !== action.taskId)
            };

        default:
            return state;
    }
};

export default taskReducer;
