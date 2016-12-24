import React, {Component} from 'react';
import { Link } from 'react-router';
// import WebcamWrapper from './../Components/WebcamWrapper';

class componentName extends Component {
  static contextTypes = {
      currentUser: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      teams: []
    };
  }

  render() {
    return (
      <div>
        {this.state.teams.length < 1 &&
          <Link to="/home/new-team" className="btn btn-primary">
            Create a new team
          </Link>
        }

        {/* <WebcamWrapper /> */}
      </div>
    );
  }
}

export default componentName;
