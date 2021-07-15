import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/authActions';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
    componentDidMount = () => {
        this.props.logoutUser(this.props.history);
    };

    render() {
        return <div />;
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Logout));
