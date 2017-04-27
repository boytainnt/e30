import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import {Home, NewPost, Article, Favourite} from  './screen/screen'

const Routes = (props) => (
    <Router {...props}>
        <Route component={App}>
            <Route path="/" component={Home}/>
            <Route path="/article/:id" component={Article}/>
            <Route path="/newpost" component={NewPost}/>
            <Route path="/favourite" component={Favourite}/>
        </Route>
    </Router>
)

export default Routes;