import React, {Component} from 'react';
import { withRouter } from 'react-router';
import base from './../firebase-config';

class LoginContainer extends Component {
  login = provider => {
    const authHandler = (error, user) => {
        if (error) {
          console.log('EERROR', error);
        } else {
          this.props.router.replace({
            pathname: '/home',
            state: {
              fromLogin: true
            }
          })
        }
      }

    base.authWithOAuthPopup(provider, authHandler);
  }

  render() {
    return (
      <div className="section">
          <strong className="title">Social login</strong>
          <div className="form-item social-login">
            <button
              className="btn btn-secondary btn-login-google"
              onClick={() => this.login('google')}
            >
              <i className="fa fa-google-plus"></i> Login with google
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => this.login('github')}
            >
              <i className="fa fa-github"></i> Login with github
            </button>
          </div>
        </div>
    );
  }
}

export default withRouter(LoginContainer);
