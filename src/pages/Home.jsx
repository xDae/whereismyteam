import React, {Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import HomeContainer from './../containers/HomeContainer';
import Loader from './../Components/Loader';

class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        {this.props.user ?
          <HomeContainer />
        :
          <div className="centered">
            <Loader />
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps)(Home);
