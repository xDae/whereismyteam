import React, { Component } from 'react';
import { Link } from 'react-router';
import base from './../firebase-config.js';
import { login } from './../utils/login';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  authHandler = (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      this.props.router.push({
        pathname: '/home',
        state: {
          user,
          fromLogin: true
        }
      })
    } else {
      console.log('po aqui estamos');
    };
  }

  login = e => {
    e.preventDefault();

    base.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, this.authHandler);
  }

  handleEmailChange = event => this.setState({ email: event.target.value });
  handlePasswordChange = event => this.setState({ password: event.target.value });

  render() {
    return (
      <div className="new-event">
        <h3>Login</h3>

        <div className="section">
          <strong className="title">email login</strong>

          <form>
            <div className="form-group row">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail3"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword3"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="offset-sm-2 col-sm-12">
                <button type="submit" className="btn btn-primary" onClick={this.login}>Sign in</button>
                <Link to="passwordrecover" className="btn btn-secondary mr-20">Forgot your password?</Link>
              </div>
            </div>
          </form>
        </div>

        <div className="section">
          <strong className="title">Social login</strong>
          <div className="form-item address-item">
            <button
              className="btn btn-secondary"
              onClick={() => login('github', this.props.router)}
            >
              <i className="fa fa-github"></i> Login with github
            </button>
            <button
              className="btn btn-secondary btn-login-google"
              onClick={() => login('google', this.props.router)}
            >
              <i className="fa fa-google-plus"></i> Login with google
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
