export function fetchUser() {
  return {
    type: 'FETCH_USER',
  };
}

export function userFetched(user) {
  return {
    type: 'USER_FETCHED',
    payload: user,
  };
}
