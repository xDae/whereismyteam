// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

// Redux
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

// Reducers
import userReducer from './reducers/user';
import teamsReducers from './reducers/teams';

import routes from './Routes';

// enable redux dev tools
const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const reducers = combineReducers({
  user: userReducer,
  teams: teamsReducers,
  routing: routerReducer
})

const middleware = routerMiddleware(browserHistory)

const store = createStore(reducers, composeEnhancers(
  // applyMiddleware(middleware, thunk, logger())
  applyMiddleware(middleware, thunk)
));

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
