import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from './../Components/Loader';

class Main extends Component {
  render() {
    if (this.props.user) {
      return this.props.children
    }

    return (
      <div className="centered">
        <Loader />
      </div>
    )
  }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps)(Main);
