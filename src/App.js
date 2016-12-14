import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rebase from 're-base';
import Webcam from "react-user-media";

var base = Rebase.createClass({
  apiKey: 'AIzaSyDh-01Z3gn5INCvcJ5n1cjkilfus_DeR_0',
  authDomain: 'whereismyteam-caa8e.firebaseapp.com',
  databaseURL: 'https://whereismyteam-caa8e.firebaseio.com',
  storageBucket: 'whereismyteam-caa8e.appspot.com',
  messagingSenderId: '159931923593'
}, 'myApp');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: ''
    };
  }

  componentDidMount(){
    base.bindToState('photo', {
      context: this,
      state: 'photo',
      asArray: false
    });

    setInterval(this.takeSnapshot, 60000);
  }

  addItem = newItem => {
    this.setState({
      items: this.state.items.concat([newItem]) //updates Firebase and the local state
    });
  }

  takeSnapshot = () => {
    console.log()
    const photo = this.refs.webcam.captureScreenshot();

    base.update('/', {
      data: { photo }
    }).then(() => console.log('photo subida'));
  }

  uploadToFirebase = () => {
    console.log('webcam ON');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Webcam
            width={300}
            height={225}
            ref="webcam"
            audio={false}
            onSuccess={this.uploadToFirebase}
            onFailure={(error) => console.log('EEEERROR!: ', error)}
          />
          <img className="snapshot-img" src={this.state.photo} />
          <button onClick={this.takeSnapshot}>take snapshot</button>
        </p>
      </div>
    );
  }
}

export default App;
