// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { requireAuth, notRequireAuth } from './utils/require-auth';

import App from './App';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Room from './pages/Room';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing}/>
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="room/:roomId" component={Room} />
      <Route path="login" component={Login} onEnter={notRequireAuth} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
