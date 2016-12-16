import React, { Component } from 'react';
import base from './firebase-config';

class Landing extends Component {

  register = () => {
    var authHandler = (error, user) => {
      if(error) console.log('EERROR', error);
      console.log(user);
    }
    //basic
    base.authWithOAuthPopup('google', authHandler);
  }

  render() {
    return (
      <div>
        <span>welcome to bla bla bla</span>
          <button onClick={this.register}>registro</button>
          <button onClick={() => base.unauth()}>logout</button>
      </div>
    );
  }
}

export default Landing;
