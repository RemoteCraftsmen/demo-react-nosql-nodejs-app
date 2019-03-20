import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
        };
    }

    doRegister = () => {
        const data = {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.passwordConfirmation,
        };

        this.props.registerUser(data, this.props.history);
    };

    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        return (
            <form noValidate autoComplete="off">
                <TextField style={{ width: 250 }} label="Email" value={this.state.email} onChange={this.handleChange('email')} margin="dense" />

                <br />

                <TextField
                    style={{ width: 250 }}
                    type="password"
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    margin="dense"
                />
                <br />

                <TextField
                    style={{ width: 250 }}
                    type="password"
                    label="Confirm password"
                    value={this.state.passwordConfirmation}
                    onChange={this.handleChange('passwordConfirmation')}
                    margin="dense"
                />
                <br />
                <br />

                <Button variant="contained" color="secondary" onClick={this.doRegister}>
                    Register
                </Button>
            </form>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
