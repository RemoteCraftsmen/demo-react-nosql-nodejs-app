import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Error, Info, Close, Warning, CheckCircle } from '@material-ui/icons';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';

const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: Error,
    info: Info
};

const styles = theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.dark
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
});

const Notification = props => {
    const { classes, message, onClose, variant, ts, ...other } = props;

    const handleClose = () => {
        onClose(ts);
    };

    const Icon = variantIcon[variant];

    return (
        <Snackbar
            autoHideDuration={2500}
            open={true}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            className={`notification-${variant} margin`}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={handleClose}
                >
                    <Close className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    );
};

Notification.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

export default withStyles(styles)(Notification);
