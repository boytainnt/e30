import React, {Component} from 'react';
import {Link} from 'react-router'
import {Navbar, NavItem, FormGroup, FormControl, Nav} from 'react-bootstrap';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">e30</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            <Link to={`/newpost`}>
                                Post new article
                            </Link>
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            <Link to={`/favourite`}>
                                My favourite
                            </Link>
                        </NavItem>
                    </Nav>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search" />
                        </FormGroup>
                    </Navbar.Form>
                </Navbar>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;