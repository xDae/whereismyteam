import React, { Component } from 'react';

import base from './../firebase-config.js';
import Box from './../Components/Box';

class PasswordRecovery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      email: ''
    }
  }

  recover = e => {
    e.preventDefault();

    base.resetPassword({
      email: this.state.email
    }, this.errorHandler);
  }

  errorHandler = error => {
    let { code, message } = error;
      this.setState({
        error: { code, message }
      });
  }

  handleEmailChange = event => this.setState({ email: event.target.value });

  render() {
    return (
      <Box>
        <h3>Password recovery</h3>

        <div className="section">
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

          <form>
            <div className="form-group row">
              <div className="col-sm-12">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="offset-sm-2 col-sm-12">
                <button type="submit" className="btn btn-primary" onClick={this.recover}>recover my password</button>
              </div>
            </div>
          </form>
        </div>
      </Box>
    );
  }
}

export default PasswordRecovery;
