import React, { Component } from 'react';
import { Link } from 'react-router';

class CreateNewTeam extends Component {
  render() {
    return (
      <div className="block-404">
        <span>Create a new team or join to one</span>
        <br />
        <Link to="home/new-team" className="btn btn-primary">
          Create a new team
        </Link>
      </div>
    );
  }
}

export default CreateNewTeam;
