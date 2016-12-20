import React, {Component} from 'react';
import localforage from "localforage";
import classNames from 'classnames';

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
      console.log("User " + user.uid + " is logged in with " + user.providerId);

      this.setState({
        user: {
          name: user.displayName,
          uid: user.uid,
          providerId: user.providerId
        },
        photoURL: user.photoURL
      });
    } else {
      console.log("User is logged out");
      this.setState({ user: null });
    }
  }

  renderName = () => {
    if (this.state.user) {
      return this.state.user.name;
    }

    return 'Anonymous';
  }

  onCloseSidebar = () => {
    this.setState({
      sidebarOpen: false
    });
  }

  onOpenSidebar = () => {
    console.log('open!');
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
        <div
          className={bgClass}
          onClick={this.onCloseSidebar}
        />
        <Sidebar
          isActive={this.state.sidebarOpen}
          onCloseBtn={this.onCloseSidebar}
        />
        <div id="wrapper">
          <Header onOpenBtn={this.onOpenSidebar} />
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
