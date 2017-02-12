import base from '../firebase-config';

export default function login (provider) {
  const authHandler = (error, user) => {
      if (error) {
        console.log('EERROR', error);
      }

      return user;
    }

  return base.authWithOAuthPopup(provider, authHandler);
}
