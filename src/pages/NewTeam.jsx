/* global emailjs */
import React, {Component} from 'react';
import slugify from 'voca/slugify';
import latinise from 'voca/latinise';
import base from './../firebase-config';

// import emailjs from './../utils/emailjs';

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
      teamName: null
    }
  }

  componentDidMount() {
    // emailjs.init("user_4llGQuJhsnBTOy0TgKTty");
  }


  componentWillReceiveProps(nextProps, nextContext) {
    // this.setState({
    //   user: nextContext.currentUser
    // });
  }

  handleNameChange = event => this.setState({ teamName: event.target.value });

  // checkTeamExists = team => {
  //   var teamRef = base.database().ref(`teams/${team}`);

  //   return teamRef.once('value')
  //     .then(snapshot => {
  //       return snapshot.exists();
  //     });
  // }

  createTeam = e => {
    e.preventDefault();

    const teamName = latinise(this.state.teamName);
    const teamId = slugify(teamName);

    // Create the team in Firebase
    base.post(`teams/${teamId}`, {
      data: {
        name: teamName,
        admin: {
          [this.context.currentUser.uid]: true
        },
        users: {
          [this.context.currentUser.uid]: true
        },
        created: base.database.ServerValue.TIMESTAMP
      }
    })
    .then(() => {
      emailjs.send("mailgun", "template_nLMjVwVc", {
        email_to: this.context.currentUser.email,
        from_name: 'whereismyteam guys',
        to_name: "James",
        mensaje: "Check this out!"
      })
      .then(function(response) {
        console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
      }, function(err) {
        console.log("FAILED. error=", err);
      });
    })
    .catch(err => {
      console.log(err);
    });

    // add user in the team members
    base.update(`users/${this.context.currentUser.uid}/teams`, {
      data: {
        [teamId]: true
      }
    })
    .then(() => {
      console.log('success')
    })
    .catch(err => {
      console.log(err);
    });

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
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              {this.state.error.message}
            </div>
          )}

          <form>
            <div className="form-group row">
              <div className="col-sm-12">
                <label>Name</label>
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
        </div>
      </Box>
    );
  }
}

export default NewTeam;
