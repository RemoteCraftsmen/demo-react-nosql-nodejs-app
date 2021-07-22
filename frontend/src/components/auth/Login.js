import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { loginUser } from '@/store/actions/authActions';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
    textField: {
        width: '500px',
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '400px'
        },
        [theme.breakpoints.down('xs')]: {
            width: '280px'
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '108px'
    },
    button: {
        marginTop: '25px'
    },
    link: {
        marginTop: '30px'
    }
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
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

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const {
            classes: { form, textField, button, link }
        } = this.props;

        return (
            <div>
                <ValidatorForm ref="form" className={form} onSubmit={this.doLogin} instantValidate={false}>
                    <Typography variant="display1">Login</Typography>

                    <TextValidator
                        className={textField}
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        validators={['required', 'isEmail']}
                        errorMessages={['Email is required', 'Given email address is not valid']}
                    />

                    <TextValidator
                        className={textField}
                        type="password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        validators={['required']}
                        errorMessages={['Password is required']}
                    />

                    <Button
                        variant="contained"
                        color="secondary"
                        onSubmit={this.doLogin}
                        className={button}
                        type="submit"
                    >
                        Login
                    </Button>
                    <Link className={link} to="/register">
                        Don't have account? Register.
                    </Link>
                </ValidatorForm>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired
};

export default connect(null, { loginUser })(withRouter(withStyles(styles)(Login)));
