import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    doLogin = async () => {
        const { email, password } = this.state;

        const data = {
            email,
            password
        };

        this.props.loginUser(data, this.props.history);
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
                <br />

                <Button variant="contained" color="secondary" onClick={this.doLogin}>
                    Login
                </Button>
            </form>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(Login));
