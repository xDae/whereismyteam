import base from './../firebase-config';

function login(router ) {
  var authHandler = (error, user) => {
      if (error) console.log('EERROR', error);
      router.replace({
        pathname: '/home',
        state: {
          fromLogin: true
        }
      })
    }
    //basic
  return base.authWithOAuthPopup('google', authHandler);
}

export { login }
