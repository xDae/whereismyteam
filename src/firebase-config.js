import Rebase from 're-base';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDh-01Z3gn5INCvcJ5n1cjkilfus_DeR_0',
//   authDomain: 'whereismyteam-caa8e.firebaseapp.com",
//   databaseURL: "https://whereismyteam-caa8e.firebaseio.com",
//   storageBucket: "whereismyteam-caa8e.appspot.com",
//   messagingSenderId: "159931923593"
// };

const base = Rebase.createClass({
  // apiKey, authDomain, databaseURL, storageBucket, messagingSenderId
  apiKey: 'AIzaSyDh-01Z3gn5INCvcJ5n1cjkilfus_DeR_0',
  authDomain: 'whereismyteam-caa8e.firebaseapp.com',
  databaseURL: 'https://whereismyteam-caa8e.firebaseio.com',
  storageBucket: 'whereismyteam-caa8e.appspot.com',
  messagingSenderId: '159931923593'
});

// const { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId } = firebaseConfig;

export default base
