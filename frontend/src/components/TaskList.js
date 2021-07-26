import React, { useState, useEffect } from 'react';
import AddTask from './AddTask';
import Task from './Task';
import { Typography } from '@material-ui/core';
import Notification from './Notification';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTasks, addTask, updateTask, deleteTask } from '@/store/actions/taskActions';

const TaskList = ({ fetchTasks, tasks, addTask, updateTask, deleteTask }) => {
    const [notifications, setNotifications] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetchTasks();

        setIsFetching(false);
    }, []);

    const handleAddTask = async name => {
        try {
            await addTask(name);

            addNotification('Task added');
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateTask = async task => {
        try {
            await updateTask(task);

            addNotification('Task updated');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTask = async id => {
        try {
            await deleteTask(id);

            addNotification('Task removed', 'error');
        } catch (error) {
            console.error(error);
        }
    };

    const addNotification = async (message, variant = 'info', ts = Date.now()) => {
        const newNotification = { variant, message, ts };

        setNotifications([...notifications, newNotification]);
    };

    const closeNotification = async ts => {
        const filteredNotifications = notifications.filter(notification => notification.ts !== ts);

        setNotifications(filteredNotifications);
    };

    const tasksList =
        !isFetching &&
        tasks.map(task => (
            <Task
                key={task._id}
                id={task._id}
                name={task.name}
                completed={task.completed}
                updateTask={handleUpdateTask}
                deleteTask={handleDeleteTask}
                addNotification={addNotification}
            />
        ));

    const notificationsComponents = notifications.map(notification => (
        <Notification
            key={notification.ts}
            variant={notification.variant}
            message={notification.message}
            onClose={closeNotification}
            ts={notification.ts}
        />
    ));

    return (
        <div>
            <Typography
                component="h1"
                variant="h3"
                gutterBottom
                style={{ textAlign: 'center', marginTop: '50px', marginBottom: '25px' }}
            >
                Tasks
            </Typography>

            <AddTask handleAddTask={handleAddTask} />

            {tasksList.length ? (
                tasksList
            ) : (
                <Typography
                    component="h2"
                    variant="h4"
                    gutterBottom
                    style={{ textAlign: 'center', marginTop: '50px', marginBottom: '25px' }}
                >
                    No tasks <br /> Try adding some
                </Typography>
            )}

            {notificationsComponents}
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    fetchTasks: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { tasks } = state.taskReducer;

    return {
        tasks
    };
};

export default connect(mapStateToProps, { fetchTasks, addTask, updateTask, deleteTask })(TaskList);
