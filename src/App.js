import React, { Component } from 'react';
import Rebase from 're-base';

import base from './firebase-config';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCam: true,
      user: null,
      photoURL: logo,
      screenshot: {
        screenshot: '',
        date: ''
      }
    };
  }

  componentDidMount() {
    base.bindToState(`/EUlHQ4lVLidhkwBRbMBSqjijfGy2/`, {
      context: this,
      state: 'screenshot',
      asArray: false
    });

    if (this.state.user) {
      setInterval(this.takeSnapshot(this.state.user.uid), 60000);
    }

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
        user: null,
        photoURL: logo
      });
    }
  }

  addItem = newItem => {
    this.setState({
      items: this.state.items.concat([newItem]) //updates Firebase and the local state
    });
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
        <div className="App-header">
          <img src={this.state.photoURL} className="App-logo" alt="logo" />
          <h2>Welcome {this.renderName()}</h2>
        </div>
        <div className="App-intro">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default App;
