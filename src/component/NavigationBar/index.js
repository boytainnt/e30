/* eslint-disable */
import React, {Component} from 'react';
import {Navbar, NavItem, FormGroup, FormControl, Nav, Button, InputGroup,Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import FirebaseAuth from './../../services/auth';
import {Actions} from './../../reducers/auth';

class NavigationBar extends Component {

    constructor() {
        super();
        this.auth = this.auth.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            searchText : ''
        }
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

    handleChange(e) {
        console.log(e.target.value)
        this.setState({ searchText: e.target.value });
    }

    render() {
        return (
            <Navbar
                staticTop
                inverse
            >
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
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    onChange={this.handleChange}
                                />
                            </InputGroup>
                            <Button>
                                <Link to={`/search/${this.state.searchText}`}>
                                    <Glyphicon glyph="glyphicon glyphicon-search" />
                                </Link>
                            </Button>
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
        isLogin: state.auth.isLogin,
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