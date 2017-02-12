import React, { Component } from 'react';
import base from './../firebase-config';

// Components
import Button from './../Components/Button';
import Webcam from "react-user-media";
import ReactInterval from 'react-interval';
import WebcamShot from './../Components/WebcamShot';

class WebcamWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCam: true,
      readytoScreenshot: false,
      users: [],
      error: null
    };
  }

  componentDidMount() {
    this.props.roomId && this.bindScreenshots();
  }

  componentWillReceiveProps(nextProps) {
    this.connectUser2room(nextProps.user.uid);

    const ref = base.database().ref(`teams/${nextProps.roomId}/users/${nextProps.user.uid}`);
    ref.onDisconnect().update({ onlineStatus: false });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  connectUser2room = user => {
    base.update(`teams/${this.props.roomId}/users/${user}`, {
      data: {
        onlineStatus: true
      }
    })
    .catch(err => {
      throw err;
    });
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

   base.update(`teams/${this.props.roomId}/users/${this.props.user.uid}`, {
      data: {
        screenshot,
        date: base.database.ServerValue.TIMESTAMP
      }
    })
    // .then(() => console.log('photo subida'));
  }

  render() {
    return (
      <section className="instagram-feed">
        <header>
          <div className="tags">
          {this.state.activeCam && (
            <Button type="secondary" onClick={this.takeSnapshot}>take snapshot</Button>
          )}
          </div>
        </header>

        {this.state.activeCam && (
          <ReactInterval
            timeout={60000}
            enabled={this.state.activeCam && this.state.readytoScreenshot}
            callback={this.takeSnapshot} />
        )}

        {this.state.activeCam && (
          <Webcam
            captureFormat="image/jpeg"
            width={300}
            height={225}
            ref="webcam"
            audio={false}
            onSuccess={() => this.setState({ readytoScreenshot: true })}
            onFailure={error => this.setState({ error })}
          />
        )}

        <div className="feed">
          {this.state.users.map(user => {
            const { key, screenshot, onlineStatus, date } = user;

            return (
              <WebcamShot
                key={key}
                onlineStatus={onlineStatus}
                screenshot={screenshot}
                date={date}
              />
            )
          })}
        </div>
      </section>
    );
  }
}

export default WebcamWrapper;
