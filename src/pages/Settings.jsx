import React, { Component, PropTypes } from 'react';
import base from './../firebase-config.js';

import Box from './../Components/Box';

class Settings extends Component {
  static contextTypes = {
    currentUser: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      success: null,
      error: null,
      user: null,
      newEmail: null
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ user: nextContext.currentUser });
  }

  componentDidMount() {
    if (base.auth().currentUser) {
      this.setState({
        user: base.auth().currentUser
      });
    }
  }

  updateProfile = e => {
    e.preventDefault();

    var user = base.auth().currentUser;
    console.log('current user', user);

    user.updateProfile({
      displayName: this.state.user.displayName,
      photoURL: this.state.photo
    })
    .then(() => this.setState({ success: true }))
    .catch(error => {
      this.setState({ error });
    })
  }

  // updateEmail = e => {
  //   e.preventDefault();
  //   const user = base.auth().currentUser;

  //   const credential = base.auth.EmailAuthProvider.credential('pepe@pepe.es', '1234567');
  //   const reAuth = user.reauthenticate(credential)
  //   .then(() => console.log('holii'))
  //   .catch(error => console.log(error))

  //   user.updateEmail(this.state.newEmail)
  //   .then(() => this.setState({ success: true }))
  //   .catch(error => {
  //     console.log(error);
  //     const { code, message } = error;
  //     this.setState({
  //       error: { code, message }
  //     });
  //   })
  // }

  handleNameChange = e => this.setState({
    user: {
      displayName: e.target.value
    }
  });

  handleEmailChange = e => this.setState({ newEmail: e.target.value });
  // handlePasswordChange = e => this.setState({ password: e.target.value });

  render() {
    return (
      <div>
        <Box>
          {this.state.success &&
            <div className="alert alert-success" role="alert">
              <strong>Well done!</strong> Your profile has been updated.
            </div>
          }

          {this.state.error &&
            <div className="alert alert-danger" role="alert">
              <strong>Something went wrong!</strong>
               {this.state.error.message}
            </div>
          }

          <h3>Settings</h3>

          <div className="section">
            <strong className="title">Personal info</strong>
            {this.state.user &&
              <form>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                      value={this.state.user.displayName}
                      onChange={this.handleNameChange}/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="offset-sm-2 col-sm-12">
                    <button type="submit" className="btn btn-primary" onClick={this.updateProfile}>update</button>
                  </div>
                </div>
              </form>
            }
          </div>
          {/*<div className="section">
            <strong className="title">Email</strong>
            {this.state.user &&
              <form>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your new email"
                      // value="Your new email"
                      onChange={this.handleEmailChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="offset-sm-2 col-sm-12">
                    <button type="submit" className="btn btn-primary" onClick={this.updateEmail}>update email</button>
                  </div>
                </div>
              </form>
            }
          </div>*/}
        </Box>
      </div>
    );
  }
}

export default Settings;
