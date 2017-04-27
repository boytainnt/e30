import React, {Component} from 'react';
import {Link} from 'react-router'

class App extends Component {
    render(){
        return(
            <div>

                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to={`/`}>
                                <label className="navbar-brand">
                                    e30
                                </label>
                            </Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">

                                <li className="navbar-header">
                                    <Link to={`/newpost`}>
                                        Post new article
                                    </Link>
                                </li>

                                <li className="navbar-header">
                                    <Link to={`/newpost`}>
                                        My favourite
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;