import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import TaskList from './components/TaskList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/NotFound';
import SiteNavigation from './components/SiteNavigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    control: {
        padding: theme.spacing.unit * 2
    },
    header: {
        margin: '20px'
    },
    noAuthenticatedContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 108px)'
    },
    authenticatedContent: {
        display: 'flex',
        justifyContent: 'center',
        height: 'calc(100vh - 108px)'
    }
});

const App = props => {
    const {
        classes: { root, header, authenticatedContent, noAuthenticatedContent },
        isAuthenticated
    } = props;

    return (
        <Router>
            {isAuthenticated && <SiteNavigation />}
            <div style={{ padding: 4 }}>
                <Grid container className={root} spacing={8} justify="center">
                    <Grid item xs={12} sm={10} md={8}>
                        {!isAuthenticated && (
                            <Typography align="center" variant="h2" className={header}>
                                Demo todo app
                            </Typography>
                        )}
                        <div className={isAuthenticated ? authenticatedContent : noAuthenticatedContent}>
                            <Grid item xs={12} sm={10} md={8}>
                                <Switch>
                                    <Route exact path="/" component={Login} />
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/register" component={Register} />
                                    {isAuthenticated && <Route exact path="/tasks" component={TaskList} />}
                                    <Route component={NotFound} />
                                </Switch>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Router>
    );
};

App.propTypes = {
    classes: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    const { isAuthenticated } = state.authReducer;

    return {
        isAuthenticated
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(App));
