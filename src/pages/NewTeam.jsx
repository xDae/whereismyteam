import React, { Component } from 'react';
import { connect } from 'react-redux';

import slugify from 'voca/slugify';
import latinise from 'voca/latinise';

import { registerTeam, addUser } from './../api/create-team';

import Box from './../Components/Box';
import InvitationEmail from './../Components/InvitationEmail';
import NewTeamForm from './../Components/NewTeamForm';
import Alert from '../Components/Alert';

class NewTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      step: 1
    }
  }

  componentDidMount() {
  }

  handleCreateNewTeam = name => {
    if (name !== null && name !== '') {
      const latinisedTeamName = latinise(name);
      const teamId = slugify(latinisedTeamName);

      registerTeam(teamId, name, this.props.user.uid)
        .then(() => {
          addUser(this.props.user.uid, teamId);
        })
        .then(() => {
          this.setState({
            step: 2
          });
        })
        .catch(err => {
          this.setState({
            error: {
              message: 'caca'
            },
          });
        });
    } else {
      this.setState({
        error: {
          message: 'The name is not valid'
        }
      });
    }
  }

  render() {
    return (
      <Box>
        <h3>Create a new team</h3>

        <div className="section">
          {this.state.error && (
            <Alert
              onClose={() => this.setState({ error: null })}
              message={this.state.error.message}
            />
          )}

          {this.state.step === 2 ?
            <InvitationEmail /> :
            <NewTeamForm
              onCreateTeam={this.handleCreateNewTeam}
            />
          }
        </div>
      </Box>
    );
  }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps)(NewTeam);

