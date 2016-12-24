import React, {Component} from 'react';

class Box extends Component {
  render() {
    return (
      <div className="new-event">
        {this.props.children}
      </div>
    );
  }
}

export default Box;
