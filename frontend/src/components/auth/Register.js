import React, { useState, useRef } from 'react';
import { Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { registerUser } from '@/store/actions/authActions';
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
        marginTop: '25px',
        width: '90px'
    },
    link: {
        marginTop: '30px'
    }
});

const Register = ({ classes: { form, textField, button, link }, registerUser, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const formRef = useRef('form');

    ValidatorForm.addValidationRule('passwordsMustMatch', value => value === password);

    const handleRegister = e => {
        e.preventDefault();

        registerUser({ email, password, passwordConfirmation }, history);
    };

    return (
        <div>
            <ValidatorForm ref={formRef} className={form} onSubmit={handleRegister} instantValidate={false}>
                <Typography variant="h4">Registration</Typography>

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

                <TextValidator
                    className={textField}
                    type="password"
                    label="Confirm password"
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    validators={['required', 'passwordsMustMatch']}
                    errorMessages={['Password confirmation is required', 'Passwords do not match']}
                />

                <Button
                    variant="contained"
                    color="secondary"
                    onSubmit={handleRegister}
                    className={button}
                    type="submit"
                >
                    Register
                </Button>
                <Link className={link} to="/login">
                    Already registered? Login.
                </Link>
            </ValidatorForm>
        </div>
    );
};

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
};

export default connect(null, { registerUser })(withRouter(withStyles(styles)(Register)));
