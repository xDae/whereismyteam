import base from './../firebase-config';

function saveUser({ uid, email }) {
  return base.post(`/users/${uid}/info`, {
    data: {
      email,
      uid
    }
  })
}

export { saveUser }
