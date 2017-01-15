import base from './../firebase-config';
import { push } from 'react-router-redux'

function fetchUser() {
  return dispatch => {
    dispatch({
      type: 'FETCH_USER'
    });

    const authDataCallback = user => user && dispatch(userFetched(user));

    base.onAuth(authDataCallback);
  }
}

function userFetched(user) {
  return {
    type: 'USER_FETCHED',
    payload: user,
  };
}

function logout() {
  return dispatch => {
    dispatch({
      type: 'LOGOUT_USER'
    });

    base.unauth();

    dispatch(push({
      pathname: '/logout',
      state: {
        fromLogout: true
      }
    }));
  }
}

export { fetchUser, logout }
