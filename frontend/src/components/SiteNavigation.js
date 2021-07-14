import React, { Component } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    grow: {
        flexGrow: 1
    },
    control: {
        padding: theme.spacing.unit * 2
    }
});

class SiteNavigation extends Component {
    state = {
        spacing: '8'
    };

    render() {
        const { classes = {} } = this.props;
        const { spacing } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container className={classes.grow} spacing={Number(spacing)} justify="center">
                            <Grid item xs={12} sm={10} md={8}>
                                {this.props.auth.isAuthenticated ? (
                                    <div style={{ display: 'flex' }}>
                                        <Button>
                                            <Link className="navigation-link" to="/tasks">
                                                Tasks
                                            </Link>
                                        </Button>

                                        <div className={classes.grow}></div>

                                        <Button>
                                            <Link className="navigation-link" to="/logout">
                                                Logout
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex' }}>
                                        <Button>
                                            <Link className="navigation-link" to="/login">
                                                Login
                                            </Link>
                                        </Button>

                                        <Button>
                                            <Link className="navigation-link" to="/register">
                                                Register
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

SiteNavigation.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(withRouter(withStyles(styles)(SiteNavigation)));
