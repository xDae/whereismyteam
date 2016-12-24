import React, {Component} from 'react';
import base from './../firebase-config.js';

import Box from './../Components/Box';

class Settings extends Component {
  static contextTypes = {
    currentUser: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      success: null,
      error: null,
      user: null
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({user: nextContext.currentUser});
  }

  componentDidMount() {
    if (base.auth().currentUser) {
      this.setState({
        user: base
          .auth()
          .currentUser
      });
    }
  }

  update = e => {
    e.preventDefault();

    var user = base
      .auth()
      .currentUser;
    console.log('current user', user);

    // let credential = new Promise((resolve, reject) => {   let credential =
    // base.auth.EmailAuthProvider.credential('pepe@pepe.es', '1234567');   const
    // reAuth = user.reauthenticate(credential)     .then(() =>
    // resolve('Success!'));   else {     reject('Failure!');   } });
    // user.updatePassword(this.state.password).then(() =>
    // console.log('updatePassword!'));

    user
      .updateProfile({displayName: this.state.user.displayName, photoURL: this.state.photo})
      .then(() => this.setState({success: true}))
      .catch(error => {
        console.log(error);
        this.setState({error: error});
      })
  }

  handleNameChange = e => this.setState({
    user: {
      displayName: e.target.value
    }
  });
  // handleEmailChange = e => this.setState({ email: e.target.value });
  // handlePasswordChange = e => this.setState({ password: e.target.value });

  render() {
    return (
      <div>
        <Box>
          {this.state.success &&
            <div className="alert alert-success" role="alert">
              <strong>Well done!</strong>
               Your profile has been updated.
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
                      placeholder="Name"
                      value={this.state.user.displayName}
                      onChange={this.handleNameChange}/>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="offset-sm-2 col-sm-12">
                    <button type="submit" className="btn btn-primary" onClick={this.update}>update</button>
                  </div>
                </div>
              </form>
            }
          </div>
        </Box>
      </div>
    );
  }
}

export default Settings;
