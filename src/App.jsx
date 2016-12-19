import React, { Component } from 'react';
import Header from './Components/Header';
import localforage from "localforage";

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
    super(props)

    this.state = {
      activeCam: true,
      user: null,
      photoURL: logo
    };
  }

  componentDidMount() {
    base.onAuth(this.authDataCallback);
    localforage.config();
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
        user: null,
        photoURL: logo
      });
    }
  }

  logout = () => {
    base.unauth();
    this.props.router.push({
      pathname: '/',
      state: { fromLogout: true }
    })
  }

  renderName = () => {
    if (this.state.user) {
      return this.state.user.name;
    }

    return 'Anonymous';
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-intro">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default App;
