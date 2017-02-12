import React, { Component } from 'react';
import Button from './../Components/Button';


class LoginContainer extends Component {
  render() {
    return (
      <div className="section">
          <strong className="title">Social login</strong>
          <div className="form-item social-login">
            <Button
              type="secondary"
              className="btn-login-google"
              onClick={() => this.props.onLogin('google')}
            >
              <i className="fa fa-google-plus"></i> Login with google
            </Button>
            <Button
              type="secondary"
              onClick={() => this.props.onLogin('github')}
            >
              <i className="fa fa-github"></i> Login with github
            </Button>
          </div>
        </div>
    );
  }
}

export default LoginContainer;
