import React, {Component} from 'react';
import Helmet from "react-helmet";
import classNames from 'classnames';
import localforage from 'localforage';

import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer';

import base from './firebase-config';

import './styles/main.css';
import './styles/App.css';

class App extends Component {
  static childContextTypes = {
    currentUser: React.PropTypes.object
  };

  getChildContext() {
    return { currentUser: this.state.user };
  }


  constructor(props) {
    super(props)

    this.state = {
      sidebarOpen: false,
      activeCam: true,
      user: null
    };
  }

  componentDidMount() {
    base.onAuth(this.authDataCallback);
    localforage.config();
  }

  authDataCallback = user => {
    if (user) {
    let { displayName, email, photoURL, providerId, uid } = user;

      console.log(`User ${uid} is logged in with ${providerId}`);

      this.setState({
        user: {
          displayName, email, photoURL, providerId, uid
        }
      });
    } else {
      console.log("User is logged out");
      this.setState({ user: null });
    }
  }

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
          <Header onOpenBtn={this.handleOpenSidebar} />
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
export default App;
