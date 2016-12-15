import React, { Component } from 'react';
import Rebase from 're-base';
import Webcam from "react-user-media";
import timeago from 'timeago.js';

import { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId } from './firebase-config';
import logo from './logo.svg';
import './App.css';

var base = Rebase.createClass({
  apiKey, authDomain, databaseURL, storageBucket, messagingSenderId
});

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

  componentDidMount(){
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

  takeSnapshot = user => {
    console.log('snapshot taked!')
    const screenshot = this.refs.webcam.captureScreenshot();

    base.update(`/${user}`, {
      data: {
        screenshot,
        date: base.database.ServerValue.TIMESTAMP
      }
    }).then(() => console.log('photo subida'));
  }

  timeAgo = date => {
    var es_ES = (number, index) => {
      // number: the timeago / timein number;
      // index: the index of array below;
      return [
        ['just now', 'right now'],
        ['hace %s segundos', 'in %s seconds'],
        ['hace 1 minutp', 'in 1 minute'],
        ['%s minutes ago', 'in %s minutes'],
        ['hace una hora', 'en una hora'],
        ['hace %s horas', 'en %s horas'],
        ['1 day ago', 'in 1 day'],
        ['%s days ago', 'in %s days'],
        ['1 week ago', 'in 1 week'],
        ['%s weeks ago', 'in %s weeks'],
        ['1 month ago', 'in 1 month'],
        ['%s months ago', 'in %s months'],
        ['1 year ago', 'in 1 year'],
        ['%s years ago', 'in %s years']
      ][index];
    };

    // register your locale with timeago
    timeago.register('spanish', es_ES);
    return new timeago().format(new Date(date), 'spanish')
  }

  uploadToFirebase = () => {
    console.log('webcam ON');
  }

  register = () => {
    var authHandler = (error, user) => {
      if(error) console.log('EERROR', error);
      console.log(user);
    }
    //basic
    base.authWithOAuthPopup('google', authHandler);
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
        <p className="App-intro">
          {this.state.activeCam && (
            <Webcam
              width={300}
              height={225}
              ref="webcam"
              audio={false}
              onSuccess={this.uploadToFirebase}
              onFailure={({ name }) => console.log('EEEERROR!: ', name)}
            />)
          }
          <img className="snapshot-img" src={this.state.screenshot.screenshot} />

          <span>{this.timeAgo(this.state.screenshot.date)}</span>
          {!this.state.activeCam && (
              <span>snapshot stopped</span>
            )
          }
          <button onClick={() => this.takeSnapshot(this.state.user.uid)}>take snapshot</button>

          <button onClick={this.register}>registro</button>
          <button onClick={() => base.unauth()}>logout</button>
          <button onClick={() => this.setState({activeCam: !this.state.activeCam})}>toggle cam</button>
        </p>
      </div>
    );
  }
}
export default App;
