import React, { Component } from 'react';
import { Card, Button, Checkbox, TextField } from '@material-ui/core';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: {
                id: props.id,
                name: props.name,
                completed: props.completed === 'true'
            }
        };
    }

    handleChange = event => {
        let { name, type, value, checked } = event.target;

        const isCheckbox = type === 'checkbox';

        if (isCheckbox) {
            value = checked;
        }

        this.setState(
            state => {
                const task = state.task;

                task[name] = value;

                return {
                    task
                };
            },
            () => {
                if (isCheckbox) {
                    this.props.updateTask(this.state.task);
                }
            }
        );
    };

    render() {
        const {
            task: { id, name, completed },
            task
        } = this.state;

        return (
            <Card className="todo-item">
                <Checkbox
                    name="completed"
                    checked={completed}
                    color="secondary"
                    onChange={this.handleChange}
                    style={{ marginRight: 25 }}
                />

                <TextField
                    name="name"
                    label="Name"
                    value={name}
                    onChange={this.handleChange}
                    style={{ flexGrow: 1, marginRight: 25 }}
                />

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className="save-todo-item"
                        onClick={() => this.props.updateTask(task)}
                        style={{ marginRight: '15px' }}
                    >
                        Save
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        className="save-todo-item"
                        onClick={() => this.props.deleteTask(id)}
                    >
                        Remove
                    </Button>
                </div>
            </Card>
        );
    }
}

export default Task;
