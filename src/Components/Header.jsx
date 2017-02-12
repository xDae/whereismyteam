import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
// import HamburguerButton from './HamburguerButton';

// import Logout from './../Components/Logout';

class Header extends Component {
  renderName = () => {
    if (this.props.user) {
      return (
        <div className="header-right">
          <Link to="/home/settings" className="username">{this.props.user.displayName}</Link>
          <button
            className="btn btn-secondary"
            onClick={this.props.onLogout}
          >
            Logout
          </button>
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
        {/*<HamburguerButton onClick={this.props.onOpenBtn} />*/}

        <IndexLink to={this.props.user ? "/home" : "/"} className="logo">whereismyteam</IndexLink>

        {this.renderName()}
      </header>
    );
  }
}

export default Header;
