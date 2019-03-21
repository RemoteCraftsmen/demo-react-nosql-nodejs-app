import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TaskList from './components/TaskList';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import SiteNavigation from './components/SiteNavigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import css from '../src/App.css';

import store from './store';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '20px',
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

class App extends Component {
    state = {
        spacing: '8',
    };

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <Provider store={store}>
                <Router>
                    <SiteNavigation />
                    <Grid container className={classes.root} spacing={8} justify="center">
                        <Grid item xs={8}>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/logout" component={Logout} />
                            <Route exact path="/tasks" component={TaskList} />
                        </Grid>
                    </Grid>
                </Router>
            </Provider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
