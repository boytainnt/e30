import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase';

import {NavigationBar} from './component/component'
import {Actions} from './reducers/auth';

class App extends Component {

    componentDidMount() {
        //listening to auth change
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('auth')
                this.props.loginSuccess({
                    token: user.refreshToken,
                    user: user
                });
            } else {
                console.log('no auth')
                this.props.logout();
            }
        });
    }

    render() {
        return (
            <div>
              <NavigationBar/>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        login: () => dispatch(Actions.login()),
        loginSuccess: (data) => dispatch(Actions.loginSuccess(data)),
        loginFail: (error) => dispatch(Actions.loginFail(error)),
        logout: () => dispatch(Actions.logout()),
    }
}

export default connect(undefined,mapDispatchToProps)(App);