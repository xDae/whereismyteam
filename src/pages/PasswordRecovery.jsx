import React, { Component } from 'react';
import base from './../firebase-config.js';
import { login } from './../utils/login';

class PasswordRecovery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    }
  }

  recover = e => {
    e.preventDefault();

    base.resetPassword({
      email: this.state.email
    }, this.errorHandler);
  }

  errorHandler = (err) => {
    console.log(err);
  }

  handleEmailChange = event => this.setState({ email: event.target.value });

  render() {
    return (
      <div className="new-event">
        <h3>Password recovery</h3>

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
              <div className="offset-sm-2 col-sm-12">
                <button type="submit" className="btn btn-primary" onClick={this.recover}>recover my mail</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PasswordRecovery;
