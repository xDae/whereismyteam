import React, { Component } from 'react';
import classNames from 'classnames';

class Button extends Component {
  render() {
    const btnClass = classNames('btn', {
      'btn-primary': this.props.type === 'primary',
      'btn-secondary': this.props.type === 'secondary'
    },  this.props.className);

    return (
      <button
        type="submit"
        className={btnClass}
        onClick={this.props.onClick}
      >
        {this.props.isLoading ?
          <i className="fa fa-circle-o-notch fa-spin" /> :
          this.props.children
        }
      </button>
    );
  }
}

Button.defaultProps = {
  type: 'primary'
}

export default Button;
