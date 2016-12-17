function isUserLogged() {
  const key = Object.keys(localStorage).find(e => e.match(/firebase:authUser/))
  return JSON.parse(localStorage.getItem(key));
}

function requireAuth(nextState, replace) {
  if (!isUserLogged()) {
    replace({
      pathname: '/login',
      state: {
        cacadelavaca: nextState.location.pathname
      },
    });
  }
}

function notRequireAuth(nextState, replace) {
  if (isUserLogged()) {
    replace({ pathname: '/home' });
  }
}

export {
  requireAuth,
  notRequireAuth
}
