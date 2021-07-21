import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
        flexGrow: 1,
        marginTop: '20px'
    },
    control: {
        padding: theme.spacing.unit * 2
    }
});

class App extends Component {
    state = {
        spacing: '8'
    };

    render() {
        const { classes, isAuthenticated } = this.props;

        if (isAuthenticated) {
            return (
                <Router>
                    <SiteNavigation />
                    <div style={{ padding: 4 }}>
                        <Grid container className={classes.root} spacing={8} justify="center">
                            <Grid item xs={12} sm={10} md={8}>
                                <Switch>
                                    <Route exact path="/" component={Login} />
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/tasks" component={TaskList} />
                                    <Route component={NotFound} />
                                </Switch>
                            </Grid>
                        </Grid>
                    </div>
                </Router>
            );
        }

        return (
            <Router>
                <SiteNavigation />
                <div style={{ padding: 4 }}>
                    <Grid container className={classes.root} spacing={8} justify="center">
                        <Grid item xs={12} sm={10} md={8}>
                            <Switch>
                                <Route exact path="/" component={Login} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/register" component={Register} />
                                <Route component={NotFound} />
                            </Switch>
                        </Grid>
                    </Grid>
                </div>
            </Router>
        );
    }
}

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
