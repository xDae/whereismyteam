import base from './../firebase-config';

export function fetchUser() {
  return dispatch => {
    dispatch({
      type: 'FETCH_USER'
    });

    const authDataCallback = user => user && dispatch(userFetched(user));

    base.onAuth(authDataCallback);
  }
}

export function userFetched(user) {
  return {
    type: 'USER_FETCHED',
    payload: user,
  };
}
