import React, { useState, useEffect } from 'react';
import { Card, Button, Checkbox, TextField } from '@material-ui/core';

const Task = ({ updateTask, deleteTask, id, name, completed }) => {
    const [taskName, setTaskName] = useState(name);
    const [taskCompleted, setTaskCompleted] = useState(completed);
    const [didMount, setDidMount] = useState(false);

    const task = { id, name: taskName, completed: taskCompleted };

    useEffect(() => {
        if (didMount) {
            updateTask(task);
        }

        setDidMount(true);
    }, [taskCompleted]);

    const handleChange = event => {
        let { type, value, checked } = event.target;

        if (type === 'text') {
            setTaskName(value);
        }

        if (type === 'checkbox') {
            setTaskCompleted(checked);
        }
    };

    return (
        <Card className="todo-item">
            <div className="input-and-checkox">
                <Checkbox
                    name="completed"
                    checked={taskCompleted}
                    color="secondary"
                    onChange={handleChange}
                    style={{ marginRight: 25 }}
                />

                <TextField
                    name="name"
                    label="Name"
                    value={taskName}
                    onChange={handleChange}
                    style={{ flexGrow: 1, marginRight: 25 }}
                />
            </div>

            <div className="crud-buttons">
                <Button variant="contained" color="primary" className="save-todo-item" onClick={() => updateTask(task)}>
                    Save
                </Button>

                <Button variant="contained" color="secondary" className="save-todo-item" onClick={() => deleteTask(id)}>
                    Remove
                </Button>
            </div>
        </Card>
    );
};

export default Task;
