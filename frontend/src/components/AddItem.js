import React, { Component } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';

class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        });
    };

    render() {
        return (
            <div>
                <Typography>Add new task</Typography>

                <div className="add-item">
                    <TextField
                        id="outlined-bare"
                        placeholder="Task name"
                        variant="outlined"
                        style={{ width: '80%' }}
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />

                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ width: '19%' }}
                        disabled={!this.state.name.length}
                        onClick={() => {
                            this.props.onClick(this.state.name);

                            this.setState({ name: '' });
                        }}
                    >
                        Add
                    </Button>
                </div>
            </div>
        );
    }
}

export default AddItem;
