import React, {Component} from 'react';

class Alert extends Component {
  render() {
    return (
      <div className="alert alert-danger alert-dismissible fade in" role="alert">
        <button
          onClick={this.props.onClose}
          type="button"
          className="close">
          <span>&times;</span>
        </button>
        {this.props.message}
      </div>
    );
  }
}

export default Alert;
