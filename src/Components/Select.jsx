import React, {Component} from 'react';

class Select extends Component {
  render() {
    return (
      <div className="form-item country-item">
        <span className="jcf-select jcf-unselectable">
          <span className="jcf-select-text">
            <span className="">GERMANY</span>
          </span>
          <span className="jcf-select-opener">
            <i className="fa fa-caret-down" aria-hidden="true"></i>
          </span>
        </span>
      </div>
    );
  }
}

export default Select;
