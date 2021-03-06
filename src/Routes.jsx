import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { requireAuth, notRequireAuth } from './utils/require-auth';

// Components
import App from './App';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Main from './pages/Main';
import TeamRoom from './pages/TeamRoom.jsx';
import Settings from './pages/Settings';
import NewTeam from './pages/NewTeam';
// import Room from './pages/Room';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordRecovery from './pages/PasswordRecovery';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="home" component={Main} onEnter={requireAuth}>
      <IndexRoute component={Home} />
      <Route path="team/:teamId" component={TeamRoom} />
      <Route path="settings" component={Settings} />
      <Route path="new-team" component={NewTeam} />
    </Route>
    {/*<Route path="room/:roomId" component={Room} />*/}
    <Route path="login" component={Login} onEnter={notRequireAuth} />
    <Route path="register" component={Register} onEnter={notRequireAuth} />
    <Route path="passwordrecover" component={PasswordRecovery} onEnter={notRequireAuth} />
    <Route path="logout" component={Logout} />
    <Route path="*" component={NotFound}/>
  </Route>
);
