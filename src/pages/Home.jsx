import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTeams } from './../actions/get-teams';

// import pickBy from 'lodash/pickBy';
// import base from './../firebase-config';

// Components
import CreateNewTeam from './../Components/CreateNewTeam';
import TeamList from './../Components/TeamList';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  // getTeamList = (userId) => {
  //   base.fetch(`users/${userId}/teams`, {
  //     context: this,
  //     asArray: false,
  //     queries: {
  //       orderByValue: true,
  //       equalTo: true
  //     }
  //   })
  //   .then(data => {
  //     const teamsArray = Object.keys(pickBy(data, (teams => teams === true)));

  //     this.props.teamListFetched(teamsArray);
  //   });
  // }

  componentDidMount() {
    // this.getTeamList(this.props.user.uid);
    this.props.getTeams(this.props.user.uid);
  }

  render() {
    return (
      <div>
        {this.props.teams.length ?
          <TeamList teams={this.props.teams} />
        :
          <CreateNewTeam />
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getTeams }, dispatch);
}

function mapStateToProps({ user, teams }) {
    return { user, teams };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
