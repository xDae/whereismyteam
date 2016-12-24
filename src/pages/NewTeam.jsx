import React, {Component} from 'react';

import base from './../firebase-config';

import Box from './../Components/Box';

class NewTeam extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: null,
      teamName: null
    }
  }

  handleNameChange = event => this.setState({ teamName: event.target.value });

  checkTeamExists = team => {
    var teamRef = base.database().ref(`teams/${team}`);

    return teamRef.once('value')
      .then(snapshot => {
        return snapshot.exists();
      });
  }

  createTeam = e => {
    e.preventDefault();

    const teamName = this.state.teamName;

    base.post(`teams/${teamName}`, {
      data: {
        admin: this.context.user.uid,
        created: base.database.ServerValue.TIMESTAMP
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
