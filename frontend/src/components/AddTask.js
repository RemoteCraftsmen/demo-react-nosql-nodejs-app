import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';

const AddItem = ({ handleAddTask }) => {
    const [name, setName] = useState('');

    const handleClick = () => {
        handleAddTask(name);
        setName('');
    };

    return (
        <div>
            <Typography>Add new task</Typography>

            <div className="add-item">
                <TextField
                    id="outlined-bare"
                    placeholder="Task name"
                    variant="outlined"
                    style={{ width: '75%' }}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="secondary"
                    style={{ width: '20%' }}
                    disabled={!name.length}
                    onClick={handleClick}
                >
                    Add
                </Button>
            </div>
        </div>
    );
};

export default AddItem;
