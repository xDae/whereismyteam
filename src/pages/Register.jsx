import React, { Component } from 'react';
import base from './../firebase-config.js';

import LoginContainer from './../Components/LoginContainer';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      email: '',
      password: '',
    }
  }

  createUser = e => {
    e.preventDefault();
    base.createUser({
      email: this.state.email,
      password: this.state.password
    }, this.authHandler);
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
          fromRegister: true
        }
      })
    } else {
      console.log('po aqui estamos');
    };
  }

  handleEmailChange = e => this.setState({ email: e.target.value });
  handlePasswordChange = e => this.setState({ password: e.target.value });

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

        <div className="new-event">
          <h3>Register</h3>

          <div className="section">
            <strong className="title">Email Signin</strong>

            <form>
              <div className="form-group row">
                <div className="col-sm-12">
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail3"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={e => this.handleEmailChange(e)}
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
                    onChange={e => this.handlePasswordChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="offset-sm-2 col-sm-12">
                  <button type="submit" className="btn btn-primary" onClick={this.createUser}>Sign in</button>
                </div>
              </div>
            </form>
          </div>

          <LoginContainer />
        </div>
      </div>
    );
  }
}

export default Register;
