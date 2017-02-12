import React, { Component } from 'react';
import { Link } from 'react-router';
// import shortid from 'shortid';

class Landing extends Component {
  render() {
    return (
      <div>
        <span>welcome to bla bla bla</span>
        <br/>
          <span>this is our wonderful page</span>
          <br/>
          <Link to="/home">Go to Home</Link>

          <br/>
      </div>
    );
  }
}

export default Landing;
