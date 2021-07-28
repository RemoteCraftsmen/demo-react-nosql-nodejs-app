import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { logoutUser } from '@/store/actions/authActions';

const styles = theme => ({
    grow: {
        flexGrow: 1
    },
    control: {
        padding: theme.spacing(2)
    }
});

const SiteNavigation = ({ classes = {}, logoutUser, history }) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Grid container className={classes.grow} justifyContent="center">
                        <Grid item xs={12} sm={10} md={8}>
                            <div style={{ display: 'flex' }}>
                                <Button>
                                    <Link className="navigation-link" to="/tasks">
                                        Tasks
                                    </Link>
                                </Button>

                                <div className={classes.grow}></div>

                                <Button className="navigation-link" onClick={() => logoutUser(history)}>
                                    Logout
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};

SiteNavigation.propTypes = {
    logoutUser: PropTypes.func.isRequired
};

export default connect(null, { logoutUser })(withRouter(withStyles(styles)(SiteNavigation)));
