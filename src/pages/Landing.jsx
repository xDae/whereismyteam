import React, { Component } from 'react';
import { Link } from 'react-router';
import shortid from 'shortid';

class Landing extends Component {
  static contextTypes = {
      currentUser: React.PropTypes.object
  };

  render() {
    const { currentUser } = this.context;
    return (
      <div>
        <div>{currentUser && currentUser.name}</div>
        <span>welcome to bla bla bla</span>
        <br/>
          <span>this is our wonderful page</span>
          <br/>
          {currentUser && <Link to="/home">Go to Home</Link>}

          <br/>
          <Link className="btn btn-primary" to={`/room/${shortid.generate()}`}>generar sala aleatoria</Link>
      </div>
    );
  }
}

export default Landing;
