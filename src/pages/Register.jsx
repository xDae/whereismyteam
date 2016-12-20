import React, {Component} from 'react';
import base from './../firebase-config.js';
import { login } from './../utils/login';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  authHandler = (err, user) => {
    if (err) {
      console.log(err);
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

  handleEmailChange = event => this.setState({ email: event.target.value });
  handlePasswordChange = event => this.setState({ password: event.target.value });

  render() {
    return (
      <div className="new-event">
        <h3>Register</h3>

        <div className="section">
          <strong className="title">Email Signin</strong>

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
                  onChange={(e) => this.handleEmailChange(e)}
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
                  onChange={(e) => this.handlePasswordChange(e)}
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

export default Register;
