import React, {Component} from 'react';
import { Link } from 'react-router';
import WebcamWrapper from './../Components/WebcamWrapper';
import base from './../firebase-config';

import Loader from './../Components/Loader';

class Home extends Component {
  static contextTypes = {
      currentUser: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      activeTeam: null,
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

  componentWillReceiveProps(nextProps, nextContext) {
    // nextContext.currentUser ? this.setState({ loading: false }) : ;
  }


  render() {
    return (
      <div>
        <h4>teams:</h4>

        {this.state.loading ? (
          <Loader />
        ) : (
          <ul>
            {this.state.teams.map(team => (
              <li
                key={team.key}
                onClick={() => this.setState({ activeTeam: team.key })}
              >
                {team.name}
              </li>
            ))}
          </ul>
        )}

        {this.state.teams.length < 1 &&
          <div>
            <Link to="/home/new-team" className="btn btn-primary">
              Create a new team
            </Link>
          </div>
        }

        {this.state.activeTeam !== null &&
          <WebcamWrapper
            roomId={this.state.activeTeam}
          />
        }

      </div>
    );
  }
}

export default Home;
