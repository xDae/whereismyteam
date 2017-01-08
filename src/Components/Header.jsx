import React, {Component} from 'react';
import { IndexLink, Link } from 'react-router';

import Logout from './../Components/Logout';

class Header extends Component {
  renderName = () => {
    if (this.props.user) {
      return (
        <div className="header-right">
          <Link to="/home/settings" className="username">{this.props.user.displayName}</Link>
          <Logout />
        </div>
      )
    }

    return (
      <div className="header-right">
        <Link to="/login" className="btn btn-primary btn-login">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    )
  }

  render() {
    return (
      <header id="header">
        <a
          id="menu-toggle"
          href="#"
          className="btn btn-dark btn-lg toggle"
          onClick={this.props.onOpenBtn}
        >
          <i className="fa fa-bars"></i>
        </a>

        <IndexLink to={this.props.user ? "/home" : "/"} className="logo">whereismyteam</IndexLink>

        {this.renderName()}
      </header>
    );
  }
}

export default Header;
