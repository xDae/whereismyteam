import React, {Component} from 'react';
import classNames from 'classnames';

class Sidebar extends Component {
  render() {
    const btnClass = classNames('mCustomScrollbar', this.props.className, {
      'active': this.props.isActive
    });

    return (
      <div
        id="sidebar-wrapper"
        className={btnClass}
        data-mcs-theme="minimal-dark">
        <a
          id="menu-close"
          href="#"
          className="btn btn-light btn-lg pull-right toggle"
          onClick={this.props.onCloseBtn}
        >
          <i className="fa fa-times"></i>
        </a>
        <div id='cssmenu'>
          <ul>
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#'>Events</a>
            </li>
            <li>
              <a href='#'>Blog</a>
            </li>
            <li>
              <a href='#'>About</a>
            </li>
            <li>
              <a href='#'>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
