import React, { Component } from 'react';
import Helmet from "react-helmet";
import classNames from 'classnames';
// import localforage from 'localforage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, userFetched } from './actions/user';

// Components
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer';

import base from './firebase-config';

import './styles/main.css';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sidebarOpen: false,
      user: null
    };
  }

  componentDidMount() {
    // localforage.config();
    this.props.fetchUser();

    base.onAuth(this.authDataCallback);
    fetchUser();
  }

  authDataCallback = user => user && this.props.userFetched(user);

  handleCloseSidebar = () => {
    this.setState({
      sidebarOpen: false
    });
  }

  handleOpenSidebar = () => {
    this.setState({
      sidebarOpen: true
    });
  }

  render() {
    const bgClass = classNames('du', 'font_bg', this.props.className, {
      'new_bg': this.state.sidebarOpen
    });

    return (
      <div className="h100">
        <Helmet
          htmlAttributes={{ lang: "en" }}
          title="whereismyteam"
        />

        <div className={bgClass} onClick={this.handleCloseSidebar} />

        <Sidebar
          isActive={this.state.sidebarOpen}
          onCloseBtn={this.handleCloseSidebar}
          onLinkClick={this.handleCloseSidebar}
        />
        <div id="wrapper">
          <Header user={this.props.user.user} onOpenBtn={this.handleOpenSidebar} />
          <main id="main">
            <div className="container">
              {this.props.children}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser, userFetched }, dispatch);
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
