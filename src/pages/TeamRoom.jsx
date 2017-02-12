import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
// import shortid from 'shortid';

import WebcamWrapper from './../Components/WebcamWrapper';

class TeamRoom extends Component {
  render() {
    return (
      <WebcamWrapper
        user={this.props.user}
        roomId={this.props.params.teamId}
      />
    );
  }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps)(TeamRoom);
