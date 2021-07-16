import React, { Component } from 'react';
import { Card, Button, Checkbox, TextField } from '@material-ui/core';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: {
                id: props.id,
                name: props.name,
                completed: props.completed
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
        console.log('🚀 ~ file: Task.js ~ line 49 ~ Task ~ render ~ completed', completed);

        return (
            <Card className="todo-item">
                <div className="input-and-checkox">
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
                </div>

                <div className="crud-buttons">
                    <Button
                        variant="contained"
                        color="primary"
                        className="save-todo-item"
                        onClick={() => this.props.updateTask(task)}
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
