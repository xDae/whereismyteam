import React, { Component } from 'react';
import shortid from 'shortid';
// import localforage from "localforage";

import base from './../firebase-config.js';

// import WebcamSnapshot from './../Components/WebcamSnapshot';
import Home from './../pages/Home';
import WebcamShot from './../Components/WebcamShot';

class Room extends Component {
  static contextTypes = {
    currentUser: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      activeCam: true,
      readytoScreenshot: false,
      users: [],
    };
  }

  componentDidMount() {
    this.bindScreenshots();

    // localforage.getItem('userId')
    //   .then(value => {
    //     if (!value) {
    //       return localforage.setItem('userId', shortid.generate());
    //     } else {
    //       return value;
    //     }
    //   })
    //   .then(user => {
    //     this.setState({
    //       currentUser: user
    //     }, this.connectUser2room(user));

    //     const ref = base.database().ref(`rooms/${this.props.params.roomId}/${user}`);

    //     ref.onDisconnect().update({ onlineStatus: false });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  connectUser2room = user => {
    base.update(`rooms/${this.props.params.roomId}/${user}`, {
      data: {
        onlineStatus: true
      }
    })
    .catch(err => {
      throw err;
    });
  }

  bindScreenshots = () => {
    this.ref = base.bindToState(`rooms/${this.props.params.roomId}`, {
      context: this,
      state: 'users',
      asArray: true
    });
  }

  render() {
    return (
      <div>
        <h2> you are in the room: {this.props.params.roomId}</h2>

        {this.state.users.map(({ screenshot, onlineStatus, date }) => (
          <WebcamShot
            key={shortid.generate()}
            onlineStatus={onlineStatus}
            screenshot={screenshot}
            date={date}
          />
        ))}

        <Home
          room={this.props.params.roomId}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}

export default Room;
