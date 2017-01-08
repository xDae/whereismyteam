// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import userReducer from './reducers/user';

import routes from './Routes';

// enable redux dev tools
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const reducers = combineReducers({
  user: userReducer,
  routing: routerReducer
})

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk, logger())
));

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
