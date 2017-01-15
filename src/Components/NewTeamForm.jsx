import React, { Component } from 'react';
import Button from './../Components/Button';

class NewTeamForm extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      teamName: null,
      isLoading: false
    }
  }

  handleNameChange = ({ target }) => this.setState({ teamName: target.value });

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    this.props.onCreateTeam(this.state.teamName);
  }

  render() {
    return (
      <form>
        <div className="form-group row">
          <div className="col-sm-12">
            <input
              type="text"
              className="form-control"
              placeholder="Team's name"
              value={this.state.team}
              onChange={this.handleNameChange}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-sm-2 col-sm-12">
            <Button onClick={this.handleClick} isLoading={this.state.isLoading}>Create</Button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewTeamForm;
