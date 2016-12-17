import React, { Component } from 'react';
import Webcam from "react-user-media";
import ReactInterval from 'react-interval';
import timeago from 'timeago.js';
import * as es from 'timeago.js/locales/es';

import base from './firebase-config';

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
    if (this.context.currentUser.uid) {
      this.bindScreenshots(this.context.currentUser.uid);
      this.setState({ readytoScreenshot: true });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // console.log('componentWillReceiveProps', nextContext);
    if (nextContext.currentUser.uid) {
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

  setSnapshotsTimeOut = user => {
    console.log('intervalo');
    setInterval(this.takeSnapshot(user), 3000);
  }

  takeSnapshot = user => {
    const screenshot = this.refs.webcam.captureScreenshot();
    console.log('snapshot taked!')

    base.update(user, {
      data: {
        screenshot,
        date: base.database.ServerValue.TIMESTAMP
      }
    }).then(() => console.log('photo subida'));
  }

  timeAgo = date => {
    // // register your locale with timeago
    timeago.register('spanish', es.default);
    return new timeago().format(new Date(date), 'spanish')
  }

  render() {
    return (
      <div>
        <h2>you are in the room: XXX</h2>
        <ReactInterval
          timeout={60000}
          enabled={this.state.readytoScreenshot}
          callback={() => this.takeSnapshot(this.context.currentUser.uid)}
        />
        {this.state.activeCam && (
          <Webcam
            width={300}
            height={225}
            ref="webcam"
            audio={false}
            onSuccess={() => console.log('webcamOK')}
            onFailure={({ name }) => console.log('EEEERROR!: ', name)}
          />
        )}

        <img
          role="presentation"
          className="snapshot-img"
          src={this.state.screenshot.screenshot}
        />
        <br/>
        <span>{this.timeAgo(this.state.screenshot.date)}</span>
        <br/>
        {!this.state.activeCam && (
            <span>snapshot stopped</span>
        )}
        <br/>
        {this.state.activeCam && (
          <button onClick={() => this.takeSnapshot(this.context.currentUser.uid)}>take snapshot</button>
        )}
        <br/>
        <button onClick={() => this.setState({ activeCam: !this.state.activeCam, readytoScreenshot: !this.state.activeCam})}>toggle cam</button>
      </div>
    );
  }
}

export default Home;
