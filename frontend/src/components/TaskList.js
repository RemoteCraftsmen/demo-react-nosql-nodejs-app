import React, { Component } from 'react';
import AddItem from './AddItem';
import Task from './Task';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import Notification from './Notification';
import Unauthorized from './Unauthorized';

export default class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: true,
            tasks: [],
            notifications: [],
        };
    }

    componentDidMount = async () => {
        let response;

        try {
            response = await axios.get('/api/tasks');

            this.setState({
                tasks: response.data.tasks,
            });
        } catch (error) {
            console.error(error);
            this.setState({ isLoggedIn: false });
        }
    };

    handleAddItem = async (name) => {
        let response;

        try {
            response = await axios.post('/api/tasks', { name });

            const task = response.data;

            this.setState((state) => {
                return {
                    tasks: [...state.tasks, task],
                };
            });

            this.addNotification('Task added', 'info');
        } catch (error) {
            console.error(error);
            this.setState({ isLoggedIn: false });
        }
    };

    removeItem = async (id) => {
        await axios.delete('/api/tasks/' + id);

        this.setState((state) => {
            const tasks = state.tasks.filter((task) => task.id !== id);

            return {
                tasks,
            };
        });

        this.addNotification('Task removed', 'error');
    };

    closeNotification = async (ts) => {
        this.setState((state) => {
            const notifications = state.notifications.filter((task) => task.ts !== ts);

            return {
                notifications,
            };
        });
    };

    addNotification = async (message = '', variant = 'info') => {
        this.setState((state) => {
            return {
                notifications: state.notifications.concat({ variant, message, ts: Date.now() }),
            };
        });
    };

    render() {
        const tasks = this.state.tasks.map((task) => (
            <Task key={task.id} id={task.id} name={task.name} completed={task.completed} removeItem={this.removeItem} addNotification={this.addNotification} />
        ));

        const notifications = this.state.notifications.map((notification) => (
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
                {this.state.isLoggedIn ? (
                    <div>
                        <Typography component="h1" variant="h3" gutterBottom style={{ textAlign: 'center', marginTop: '50px', marginBottom: '25px' }}>
                            Tasks
                        </Typography>

                        <AddItem onClick={this.handleAddItem} />

                        {tasks.length > 0 ? (
                            tasks
                        ) : (
                            <Typography component="h2" variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '50px', marginBottom: '25px' }}>
                                No tasks <br /> Try adding some
                            </Typography>
                        )}

                        {notifications}
                    </div>
                ) : (
                    <Unauthorized />
                )}
            </div>
        );
    }
}
