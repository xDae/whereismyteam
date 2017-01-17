import React, { Component } from 'react';
import { Link } from 'react-router';

import Box from './../Components/Box';

class TeamList extends Component {
  render() {
    return (
      <Box>
      {this.props.teams.map(team => (
        <div
          key={team}
          className="b-grid-item">
          <div
            className="post event-item">
            <div className="frame">
              <h2>
                <Link to={`/home/team/${team}`}>{team}</Link></h2>
            </div>
            <a
              className="more">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      ))}
      </Box>
    );
  }
}

export default TeamList;
