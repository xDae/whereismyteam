import React, { Component } from 'react';
import shortid from 'shortid';
import base from './../firebase-config';

import Webcam from "react-user-media";
import ReactInterval from 'react-interval';
import WebcamShot from './../Components/WebcamShot';

import shot from './../images/screenshot.jpeg';

class WebcamWrapper extends Component {
  static contextTypes = {
    currentUser: React.PropTypes.object
  }


  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      activeCam: true,
      readytoScreenshot: false,
      users: [
        {
          date: 1483642493872,
          key: shortid.generate(),
          screenshot: shot
        },
        {
          date: 1445642493872,
          key: shortid.generate(),
          screenshot: shot
        },
        {
          date: 1483678493872,
          key: shortid.generate(),
          screenshot: shot
        },
        {
          date: 1483644593872,
          key: shortid.generate(),
          screenshot: shot
        },
        {
          date: 144542493872,
          key: shortid.generate(),
          screenshot: shot
        }
      ],
    };
  }

  componentDidMount() {
    // this.props.roomId && this.bindScreenshots();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roomId) {
      // this.bindScreenshots();
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  connectUser2room = user => {
    // base.update(`rooms/${this.props.roomId}/${user}`, {
    //   data: {
    //     onlineStatus: true
    //   }
    // })
    // .catch(err => {
    //   throw err;
    // });
  }

  bindScreenshots = () => {
    this.ref = base.bindToState(`teams/${this.props.roomId}/users`, {
      context: this,
      state: 'users',
      asArray: true
    });
  }

  takeSnapshot = () => {
    const screenshot = this.refs.webcam.captureScreenshot();
    console.log('snapshot taked!');

   base.update(`teams/${this.props.roomId}/users/${this.context.currentUser.uid}`, {
      data: {
        screenshot,
        date: base.database.ServerValue.TIMESTAMP
      }
    })
    .then(() => console.log('photo subida'));
  }

  render() {
    return (
      <section className="instagram-feed">
        <header>
          <div className="tags">
          {this.state.activeCam && (
            <button className="btn btn-secondary"onClick={() => this.takeSnapshot()}>take snapshot</button>
          )}
          </div>
        </header>

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

        <div className="feed">
          {this.state.users.map(({ screenshot, onlineStatus, date }) => (
            <WebcamShot
              key={shortid.generate()}
              onlineStatus={onlineStatus}
              screenshot={screenshot}
              date={date}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default WebcamWrapper;
