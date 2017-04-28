import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Routes from './routes';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';


const createStoreWithMiddleware = applyMiddleware(
    routerMiddleware(browserHistory)
)(createStore);
const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
    <Provider store={store}>
        <Routes browserHistory={history} />
    </Provider>,
    document.getElementById('root')
);