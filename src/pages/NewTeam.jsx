/* global emailjs */
import React, {Component} from 'react';
import slugify from 'voca/slugify';
import latinise from 'voca/latinise';
import base from './../firebase-config';

import InvitationEmail from './../Components/InvitationEmail';
import Box from './../Components/Box';

class NewTeam extends Component {
  static contextTypes = {
      currentUser: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      // user: null,
      error: null,
      teamName: null,
      success: null,
      step: 1
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps, nextContext) {
  }

  handleNameChange = event => this.setState({ teamName: event.target.value });

  // checkTeamExists = team => {
  //   var teamRef = base.database().ref(`teams/${team}`);

  //   return teamRef.once('value')
  //     .then(snapshot => {
  //       return snapshot.exists();
  //     });
  // }

  sendEmail = () => {
    return emailjs.send('mailgun', 'template_nLMjVwVc', {
      email_to: this.context.currentUser.email,
      from_name: 'whereismyteam guys',
      to_name: 'James',
      mensaje: 'Check this out!'
    });
  }

  registerTeam = (id, name, adminId) => {
    return base.post(`teams/${id}`, {
      data: {
        name,
        admin: {
          [adminId]: true
        },
        users: {
          [adminId]: true
        },
        created: base.database.ServerValue.TIMESTAMP
      }
    });
  }

  addUser = (userid, teamId) => {
    return new Promise ((resolve, reject) => {
      return base.update(`users/${userid}/teams`, {
        data: {
          [teamId]: true
        }
      });
    })
  }

  createTeam = e => {
    e.preventDefault();

    if (this.state.teamName !== null) {
      const teamName = latinise(this.state.teamName);
      const teamId = slugify(teamName);

      this.registerTeam(teamId, teamName, this.context.currentUser.uid)
      .then(() => {
        this.addUser(this.context.currentUser.uid, teamId);
      })
      .then(() => {
        this.setState({ step: 2 });
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
          message: 'error'
        }
      });
    }
  }

  printStep = step => {
    if (step === 2) {
      return <InvitationEmail />
    } else {
      return (
        <form>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Team's name"
                value={this.state.email}
                onChange={this.handleNameChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-12">
              <button type="submit" className="btn btn-primary" onClick={this.createTeam}>Create</button>
            </div>
          </div>
        </form>
      )
    }
  }

  render() {
    return (
      <Box>
        <h3>Create a new team</h3>

        <div className="section">
          {this.state.error && (
            <div className="alert alert-danger alert-dismissible fade in" role="alert">
              <button
                onClick={() => this.setState({ error: null })}
                type="button"
                className="close"
              >
                <span>&times;</span>
              </button>
              {this.state.error.message}
            </div>
          )}

          {this.printStep(this.state.step)}
        </div>
      </Box>
    );
  }
}

export default NewTeam;
