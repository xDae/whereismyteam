import React, {Component} from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="ball-pulse">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Loader;
