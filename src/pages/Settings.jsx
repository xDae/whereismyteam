import React, { Component } from 'react';
import base from './../firebase-config.js';

// Components
import Box from './../Components/Box';
import Button from './../Components/Button';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: null,
      error: null,
      user: null,
      newEmail: null
    }
  }

  // componentDidMount() {
  //   if (base.auth().currentUser) {
  //     this.setState({
  //       user: base.auth().currentUser
  //     });
  //   }
  // }

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

  handleNameChange = e => this.setState({
    user: {
      displayName: e.target.value
    }
  });

  handleEmailChange = e => this.setState({ newEmail: e.target.value });
  // handlePasswordChange = e => this.setState({ password: e.target.value });

  render() {
    return (
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
                  <Button onClick={this.updateProfile}>Sign in</Button>
                </div>
              </div>
            </form>
          }
        </div>
      </Box>
    );
  }
}

export default Settings;
