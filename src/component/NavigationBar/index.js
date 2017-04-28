/* eslint-disable */
import React, {Component} from 'react';
import {Navbar, NavItem, FormGroup, FormControl, Nav, Button, Image} from 'react-bootstrap';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import FirebaseAuth from './../../services/auth';
import {Actions} from './../../reducers/auth';

class NavigationBar extends Component {

    constructor() {
        super();
        this.auth = this.auth.bind(this);
    }

    auth() {
        let {isLogin} = this.props;
        if (isLogin) {
            //signout
            FirebaseAuth.logout()
        }
        else {
            //login
            this.props.login();
            FirebaseAuth.login(
                //fail
                (error) => {
                    this.props.loginFail(error)
                }
            )
        }
    }

    render() {
        //console.log(this.props.user)
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={``}>
                            e30
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>

                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search"/>
                        </FormGroup>
                        {' '}
                    </Navbar.Form>

                    <Navbar.Form pullRight>
                        <Nav>
                            <NavItem >
                                <Link to={``}>
                                    Home
                                </Link>
                            </NavItem>
                        </Nav>
                        {this.props.isLogin
                            ?
                            <Nav>
                                <NavItem eventKey={1}>
                                    <Link to={`/newpost`}>
                                        Post new article
                                    </Link>
                                </NavItem>
                                <NavItem eventKey={2}>
                                    <Link to={`/favourite`}>
                                        My favourite
                                    </Link>
                                </NavItem>
                                <NavItem eventKey={2}>
                                    {this.props.user.email}
                                </NavItem>
                            </Nav>
                            : <span/>}
                        <Nav>
                            <NavItem onClick={this.auth}>
                                {this.props.isLogin
                                    ? 'Signout'
                                    : 'Signin'}
                            </NavItem>
                        </Nav>
                    </Navbar.Form>
                </Navbar.Collapse>

            </Navbar>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.token != undefined,
        user: state.auth.user
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

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);


/*
 const styles = {
 container: {
 flexDirection: 'column',
 alignItems: 'center',
 justifyContent: 'center',
 backgroundColor: 'rgb(0,0,0)',
 flexGrow: 1
 },
 label: {
 padding: 5,
 margin: 5,
 color: "#ffffff",
 display: "inline-block",
 fontFamily: "monospace",
 fontSize: "32",
 textAlign: "center"
 },
 searchBar: {}
 }
 */