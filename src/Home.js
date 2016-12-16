import React, { Component } from 'react';
import Webcam from "react-user-media";
import timeago from 'timeago.js';
import * as es from 'timeago.js/locales/es';

import base from './firebase-config';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCam: true,
      user: null,
      photoURL: '',
      screenshot: {
        screenshot: '',
        date: ''
      }
    };
  }

  timeAgo = date => {
    // // register your locale with timeago
    timeago.register('spanish', es.default);
    return new timeago().format(new Date(date), 'spanish')
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

  render() {
    return (
      <div>
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


          <button onClick={() => this.setState({activeCam: !this.state.activeCam})}>toggle cam</button>
      </div>
    );
  }
}

// Home.propTypes = {

// };

export default Home;
