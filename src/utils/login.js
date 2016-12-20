import base from './../firebase-config';

function login(provider, router) {
  var authHandler = (error, user) => {
      if (error) {
        console.log('EERROR', error);
      } else {
        router.replace({
          pathname: '/home',
          state: {
            fromLogin: true
          }
        })
      }
    }

  return base.authWithOAuthPopup(provider, authHandler);
}

export { login }
