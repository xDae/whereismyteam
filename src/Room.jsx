import React, { Component } from 'react';

class Room extends Component {
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

  render() {
    return (
      <div>
        <h2>you are in the room: {this.props.params.roomId}</h2>
      </div>
    );
  }
}

export default Room;
