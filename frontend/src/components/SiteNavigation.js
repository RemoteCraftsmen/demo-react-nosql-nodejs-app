import React, { Component } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class SiteNavigation extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        { this.props.auth.isAuthenticated ? (
                            <div>
                                <Button>
                                    <Link className="navigation-link" to="/tasks">
                                        Tasks
                                    </Link>
                                </Button>
                                <Button>
                                    <Link className="navigation-link" to="/logout">
                                        Logout
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div>
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
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

SiteNavigation.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    null
)(withRouter(SiteNavigation));
