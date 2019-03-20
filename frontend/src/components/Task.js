import React, { Component } from 'react';
import { Card, Button, Checkbox, TextField } from '@material-ui/core';
import axios from 'axios';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: {
                id: props.id,
                name: props.name,
                completed: props.completed,
            },
        };
    }

    updateItem = async () => {
        const { task } = this.state;

        await axios.patch('/api/tasks/' + task.id, { ...task });

        this.props.addNotification('Task updated', 'success');
    };

    handleChange = (event) => {
        let { name, type, value, checked } = event.target;

        const isCheckbox = type === 'checkbox';

        if (isCheckbox) {
            value = checked;
        }

        this.setState(
            (state) => {
                const task = state.task;

                task[name] = value;

                return {
                    task,
                };
            },
            () => {
                if (isCheckbox) {
                    this.updateItem();
                }
            }
        );
    };

    render() {
        return (
            <Card className="todo-item">
                <Checkbox name="completed" checked={this.state.task.completed} color="secondary" onChange={this.handleChange} />

                <TextField name="name" label="Name" value={this.state.task.name} onChange={this.handleChange} style={{ width: "300px" }}/>

                <div>
                    <Button variant="contained" color="primary" className="save-todo-item" onClick={this.updateItem} style={{ marginRight: '15px' }}>
                        Save
                    </Button>

                    <Button variant="contained" color="secondary" className="save-todo-item" onClick={() => this.props.removeItem(this.state.task.id)}>
                        Remove
                    </Button>
                </div>
            </Card>
        );
    }
}

export default Task;
