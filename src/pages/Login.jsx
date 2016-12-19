import React, { Component } from 'react';
import { login } from './../utils/login';

class Login extends Component {
  render() {
    return (
      <div>
        <h2>you need to login!</h2>
        <button onClick={() => login(this.props.router)}>Login madafaca</button>
      </div>
    );
  }
}

export default Login;
