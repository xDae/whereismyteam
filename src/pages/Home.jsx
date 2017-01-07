import React, {Component} from 'react';
import { Link } from 'react-router';
import base from './../firebase-config';

import Loader from './../Components/Loader';

class Home extends Component {
  static contextTypes = {
      currentUser: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      teams: []
    };
  }

  getTeamList = () => {
    base.fetch(`users/${this.context.currentUser.uid}/teams`, {
      context: this,
      asArray: false,
      queries: {
        orderByValue: true,
        equalTo: true
      }
    })
    .then(data => {
      const teamKeys = Object.keys(data);

      teamKeys.forEach(key => {
        base.fetch(`teams/${key}`, {
          context: this,
          asArray: false
        })
        .then(data => {
          const newData = Object.assign(data, { key })

          this.setState({
            teams: this.state.teams.concat(newData)
          });
        })
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.context.currentUser ? this.getTeamList() : this.setState({ loading: true });
  }

  render() {
    return (
      <div>
        {<div className="form-item country-item">
          <span className="jcf-select jcf-unselectable">
            <span className="jcf-select-text">
              <span className="">GERMANY</span>
            </span>
            <span className="jcf-select-opener">
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </span>
          </span>
				</div>}

        {this.state.teams.length < 1 ?
          <div>
            <div className="block-404">
              {/*<strong>Oops, Looks like you don't have any teams</strong>*/}
              <span>Create a new team or join to one</span>
              <br />
              <Link to="home/new-team" className="btn btn-primary">
                Create a new team
              </Link>
            </div>
          </div>
          :
          <ul>
            {this.state.teams.map(team => (
              <li
                key={team.key}
                onClick={() => this.setState({ activeTeam: team.key })}
              >
                <Link to={`home/team/${team.key}`}>{team.name}</Link>
              </li>
            ))}
          </ul>
      }
      </div>
    );
  }
}

export default Home;
