import React, {Component} from 'react';

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: null
    }
  }

  renderName = () => {
    if (this.state.user) {
      return this.state.user.name;
    }

    return 'Anonymous';
  }

  render() {
    return (
      <header id="header">
        {/* Welcome this.renderName() */}
        <a
          id="menu-toggle"
          href="#"
          className="btn btn-dark btn-lg toggle"
          onClick={this.props.onOpenBtn}
        >
          <i className="fa fa-bars"></i>
        </a>
        <a href="#" className="logo">whereismyteam</a>
      </header>
    );
  }
}

export default Header;
