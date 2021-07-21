import React, { Component } from 'react';
import AddItem from './AddItem';
import Task from './Task';
import { Typography } from '@material-ui/core';
import Notification from './Notification';
import Unauthorized from './Unauthorized';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTasks, addTask, updateTask, deleteTask } from '@/store/actions/taskActions';

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: true,
            notifications: [],
            fetching: true
        };
    }

    componentDidMount = async () => {
        try {
            await this.props.fetchTasks();

            this.setState({
                fetching: false
            });
        } catch (error) {
            console.error(error);
            this.setState({ isLoggedIn: false });
        }
    };

    handleAddTask = async name => {
        try {
            await this.props.addTask(name);

            this.addNotification('Task added', 'info');
        } catch (error) {
            console.error(error);
            this.setState({ isLoggedIn: false });
        }
    };

    handleUpdateTask = async task => {
        try {
            await this.props.updateTask(task);

            this.addNotification('Task updated', 'info');
        } catch (error) {
            console.error(error);
            this.setState({ isLoggedIn: false });
        }
    };

    handleDeleteTask = async id => {
        try {
            await this.props.deleteTask(id);

            this.addNotification('Task removed', 'error');
        } catch (error) {
            console.error(error);
            this.setState({ isLoggedIn: false });
        }
    };

    closeNotification = async ts => {
        this.setState(state => {
            const notifications = state.notifications.filter(task => task.ts !== ts);

            return {
                notifications
            };
        });
    };

    addNotification = async (message = '', variant = 'info') => {
        this.setState(state => {
            return {
                notifications: state.notifications.concat({ variant, message, ts: Date.now() })
            };
        });
    };

    render() {
        const { fetching, notifications, isLoggedIn } = this.state;
        const { tasks } = this.props;

        const tasksList =
            !fetching &&
            tasks.map(task => (
                <Task
                    key={task._id}
                    id={task._id}
                    name={task.name}
                    completed={task.completed}
                    updateTask={this.handleUpdateTask}
                    deleteTask={this.handleDeleteTask}
                    addNotification={this.addNotification}
                />
            ));

        const notificationsComponents = notifications.map(notification => (
            <Notification
                key={notification.ts}
                variant={notification.variant}
                message={notification.message}
                onClose={this.closeNotification}
                ts={notification.ts}
            />
        ));

        return (
            <div>
                {isLoggedIn ? (
                    <div>
                        <Typography
                            component="h1"
                            variant="h3"
                            gutterBottom
                            style={{ textAlign: 'center', marginTop: '50px', marginBottom: '25px' }}
                        >
                            Tasks
                        </Typography>

                        <AddItem onClick={this.handleAddTask} />

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
                ) : (
                    <Unauthorized />
                )}
            </div>
        );
    }
}

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
