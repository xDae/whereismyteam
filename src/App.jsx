import React, { Component } from 'react';

import { login } from './utils/login';
import base from './firebase-config';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  static childContextTypes = {
    currentUser: React.PropTypes.object
  };

  getChildContext() {
    return {
      currentUser: this.state.user
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activeCam: true,
      user: {
        name: null,
        uid: null,
        providerId: null
      },
      photoURL: logo
    };
  }

  componentDidMount() {
    base.onAuth(this.authDataCallback);
  }

  authDataCallback = user => {
    if (user) {
      console.log("User " + user.uid + " is logged in with " + user.providerId);

      this.setState({
        user: {
          name: user.displayName,
          uid: user.uid,
          providerId: user.providerId,
        },
        photoURL: user.photoURL
      });
    } else {
      console.log("User is logged out");
      this.setState({
        user: {
          name: null,
          uid: null,
          providerId: null,
        },
        photoURL: logo
      });
    }
  }

  logout= () => {
    base.unauth();
    this.props.router.push({
      pathname: '/',
      query: { modal: true },
      state: { fromLogout: true }
    })
  }

  renderName = () => {
    if (this.state.user.uid) {
      return this.state.user.name;
    }

    return 'Anonymous';
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={this.state.photoURL} className="App-logo" alt="logo" />
          <h2>Welcome {this.renderName()}</h2>
          {!this.state.user.uid && <button onClick={() => login(this.props.router)}>login</button>}
          {this.state.user.uid && <button onClick={this.logout}>logout</button>}

        </div>
        <div className="App-intro">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default App;
