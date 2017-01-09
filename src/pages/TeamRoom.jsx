import React, { Component } from 'react';
// import { Link } from 'react-router';
// import shortid from 'shortid';

import WebcamWrapper from './../Components/WebcamWrapper';

class TeamRoom extends Component {
  static contextTypes = {
      currentUser: React.PropTypes.object
  };

  render() {
    return (
      <div>
        <WebcamWrapper
          roomId={this.props.params.teamId}
        />
      </div>
    );
  }
}

export default TeamRoom;
