import React, { Component } from 'react';
import { Link } from 'react-router';
import base from './../firebase-config.js';

import Box from './../Components/Box';
import LoginContainer from '../Components/LoginContainer';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      email: '',
      password: ''
    }
  }

  authHandler = (error, user) => {
    if (error) {
      let {code, message} = error;
      this.setState({
        error: { code, message }
      });
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
      <div>
        {this.state.error && (
          <div className="alert alert-danger alert-dismissible fade in" role="alert">
            <button
              onClick={() => this.setState({ error: null })}
              type="button"
              className="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {this.state.error.message}
          </div>
        )}

        <Box>
          <h3>Login</h3>

          <div className="section">
            <strong className="title">email login</strong>

            <form>
              <div className="form-group row">
                <div className="col-sm-12">
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
                <div className="col-sm-12">
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

          <LoginContainer />
        </Box>
      </div>
    );
  }
}

export default Login;
