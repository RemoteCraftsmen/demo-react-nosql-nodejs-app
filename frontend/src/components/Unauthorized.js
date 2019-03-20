import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

export default class Unauthorized extends Component {
    render() {
        return (
            <div>
                <Typography variant="h4" style={{ color: 'red', marginTop: '50px' }}>
                    You are not authorized to view this page. <br />
                </Typography>
            </div>
        );
    }
}
