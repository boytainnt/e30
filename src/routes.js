import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import Home from './screen/home';
import Article from './screen/article';

const Routes = (props) => (
    <Router {...props}>
        <Route component={App}>
            <Route path="/" component={Home}/>
            <Route path="/article/:id" component={Article}/>
        </Route>
    </Router>
)

export default Routes;