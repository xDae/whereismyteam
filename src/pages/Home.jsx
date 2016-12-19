import React, { Component } from 'react';
import Webcam from "react-user-media";
import ReactInterval from 'react-interval';
import timeago from 'timeago.js';
import * as es from 'timeago.js/locales/es';

import base from './../firebase-config';

class Home extends Component {
  static contextTypes = {
      currentUser: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      activeCam: true,
      readytoScreenshot: false,
      screenshot: '',
    };
  }

  componentDidMount() {
    // base.onAuth(this.authDataCallback);

    if (this.props.currentUser) {
      this.bindScreenshots(this.props.currentUser);
      this.setState({ readytoScreenshot: true });
    }
  }

  authDataCallback = user => {
    if (user) {
      console.log("caca " + user.uid + " is logged in with " + user.providerId);

      this.setState({
        user: {
          name: user.displayName,
          uid: user.uid,
          providerId: user.providerId,
        },
        photoURL: user.photoURL
      });
    } else {
      console.log("caca is logged out");

      base.unauth();
      this.props.router.redirect({
        pathname: '/'
      })
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // console.log('componentWillReceiveProps', nextContext);
    if (nextContext.currentUser) {
      this.bindScreenshots(nextContext.currentUser.uid);
      this.setState({ readytoScreenshot: true });
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  bindScreenshots = user => {
    this.ref = base.bindToState(user, {
      context: this,
      state: 'screenshot',
      asArray: false
    });
  }

  takeSnapshot = (room, user) => {
    const screenshot = this.refs.webcam.captureScreenshot();
    console.log('snapshot taked!');

    var strImage = screenshot.replace(/^data:image\/[a-z]+;base64,/, "");
    let storageRef = base.storage().ref('folderName/file.jpg');

    storageRef.putString(strImage, 'base64')
      .then(value => storageRef.getDownloadURL())
      .then(value => {
        return base.update(`rooms/${room}/${user}`, {
          data: {
            screenshot: value,
            date: base.database.ServerValue.TIMESTAMP
          }
        });
      })
      .then(() => console.log('photo subida'));
  }

  timeAgo = date => {
    // // register your locale with timeago
    timeago.register('spanish', es.default);
    return new timeago().format(new Date(date), 'spanish')
  }

  render() {
    // if (!this.props.currentUser) {
    //   return <span>registratre</span>
    // }

    return (
      <div>
        <ReactInterval
          timeout={60000}
          enabled={this.state.readytoScreenshot}
          callback={() => this.takeSnapshot(this.props.room, this.props.currentUser)}
        />
        {this.state.activeCam && (
          <Webcam
            captureFormat="image/jpeg"
            width={300}
            height={225}
            ref="webcam"
            audio={false}
            onSuccess={() => console.log('webcamOK')}
            onFailure={({ name }) => console.log('EEEERROR!: ', name)}
          />
        )}
        <br/>
        <span>{this.timeAgo(this.state.screenshot.date)}</span>
        <br/>
        {!this.state.activeCam && (
            <span>snapshot stopped</span>
        )}
        <br/>
        {this.state.activeCam && (
          <button onClick={() => this.takeSnapshot(this.props.room, this.props.currentUser)}>take snapshot</button>
        )}
        <br/>
        <button onClick={() => this.setState({ activeCam: !this.state.activeCam, readytoScreenshot: !this.state.activeCam})}>toggle cam</button>
      </div>
    );
  }
}

export default Home;
