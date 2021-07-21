import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { registerUser } from '@/store/actions/authActions';
import { withRouter } from 'react-router-dom';
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
        marginTop: '20px'
    },
    button: {
        marginTop: '25px',
        width: '90px'
    }
});

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordConfirmation: ''
        };
    }

    doRegister = event => {
        event.preventDefault();

        this.props.registerUser(this.state, this.props.history);
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        ValidatorForm.addValidationRule('passwordsMustMatch', value => value === this.state.password);

        return (
            <div>
                <ValidatorForm ref="form" className={classes.form} onSubmit={this.doRegister} instantValidate={false}>
                    <Typography variant="display1">Registration</Typography>

                    <TextValidator
                        className={classes.textField}
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        validators={['required', 'isEmail']}
                        errorMessages={['Email is required', 'Given email address is not valid']}
                    />

                    <TextValidator
                        className={classes.textField}
                        type="password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        validators={['required']}
                        errorMessages={['Password is required']}
                    />

                    <TextValidator
                        className={classes.textField}
                        type="password"
                        label="Confirm password"
                        value={this.state.passwordConfirmation}
                        onChange={this.handleChange('passwordConfirmation')}
                        validators={['required', 'passwordsMustMatch']}
                        errorMessages={['Password confirmation is required', 'Passwords do not match']}
                    />

                    <Button
                        variant="contained"
                        color="secondary"
                        onSubmit={this.doRegister}
                        className={classes.button}
                        type="submit"
                    >
                        Register
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
};

export default connect(null, { registerUser })(withRouter(withStyles(styles)(Register)));
