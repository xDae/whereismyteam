import React, {Component} from 'react';
import { IndexLink, Link } from 'react-router';

import Logout from './../Components/Logout';

class Header extends Component {
  static contextTypes = {
      currentUser: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      user: null
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      user: nextContext.currentUser
    });
  }

  renderName = () => {
    if (this.state.user) {
      return (
        <div className="header-right">
          <span className="username">{this.state.user.name}</span>
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

        <IndexLink to="/" className="logo">whereismyteam</IndexLink>

        {this.renderName()}

      </header>
    );
  }
}

export default Header;
