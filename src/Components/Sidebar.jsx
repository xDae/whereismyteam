import React, {Component} from 'react';
import { Link } from 'react-router';
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
              <Link to="/" onClick={this.props.onLinkClick}>Home</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
