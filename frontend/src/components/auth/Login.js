import React, { Component } from 'react';
import { Button, Typography, useMediaQuery } from '@material-ui/core';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
    textField: {
        width: '500px',
        marginBottom: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px'
    },
    button: {
        marginTop: '25px'
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
        const { classes } = this.props;

        return (
            <div>
                <ValidatorForm ref="form" className={classes.form} onSubmit={this.doLogin} instantValidate={false}>
                    <Typography variant="display1">Login</Typography>

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

                    <Button
                        variant="contained"
                        color="secondary"
                        onSubmit={this.doLogin}
                        className={classes.button}
                        type="submit"
                    >
                        Login
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(withRouter(withStyles(styles)(Login)));
