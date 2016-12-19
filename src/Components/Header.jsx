import React, { Component } from 'react';

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
      <div className="App-header">
        <h2>Welcome {this.renderName()}</h2>
      </div>
    );
  }
}

export default Header;
