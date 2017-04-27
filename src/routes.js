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


export const Data = [
    {
        title:'abc1',
        id: 1
    },
    {
        title:'xyz2',
        id: 2
    },
    {
        title:'abc3',
        id: 3
    },
    {
        title:'xyz4',
        id: 4
    },
    {
        title:'abc5',
        id: 5
    },
    {
        title:'xy6',
        id: 6
    },
    {
        title:'abc7',
        id: 7
    },
    {
        title:'xyz8',
        id: 8
    },
    {
        title:'abc9',
        id: 9
    },
    {
        title:'xyz10',
        id: 10
    }

]

export default Routes;