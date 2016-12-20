import React from 'react';
import { withRouter } from 'react-router';
import base from './../firebase-config.js';

const Logout = ({ router }) => {
  var logout = () => {
    base.unauth();
    router.push({
      pathname: '/logout',
      state: {
        fromLogout: true
      }
    })
  }

  return (
    <button
      className="btn btn-secondary"
      onClick={() => logout()}
    >
      Logout
    </button>
  );
};

export default withRouter(Logout);
