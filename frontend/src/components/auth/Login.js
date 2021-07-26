import React, { useState, useRef } from 'react';
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

const Login = ({ classes: { form, textField, button, link }, loginUser, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formRef = useRef('form');

    const handleLogin = () => {
        loginUser({ email, password }, history);
    };

    return (
        <div>
            <ValidatorForm ref={formRef} className={form} onSubmit={handleLogin} instantValidate={false}>
                <Typography variant="display1">Login</Typography>

                <TextValidator
                    className={textField}
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    validators={['required', 'isEmail']}
                    errorMessages={['Email is required', 'Given email address is not valid']}
                />

                <TextValidator
                    className={textField}
                    type="password"
                    label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    validators={['required']}
                    errorMessages={['Password is required']}
                />

                <Button variant="contained" color="secondary" onSubmit={handleLogin} className={button} type="submit">
                    Login
                </Button>
                <Link className={link} to="/register">
                    Don't have account? Register.
                </Link>
            </ValidatorForm>
        </div>
    );
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired
};

export default connect(null, { loginUser })(withRouter(withStyles(styles)(Login)));
