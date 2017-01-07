// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import routes from './Routes';

import { Router, browserHistory } from 'react-router';

const logger = createLogger();

const nameInitialState = {}
export const reducer = (state = nameInitialState, action) => {
  switch (action.type) {
    case 'ACTION_TYPE_1':
      return state
    case 'ACTION_TYPE_2':
      return state
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk, logger)
));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
