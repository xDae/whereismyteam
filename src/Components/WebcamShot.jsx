import React, { Component } from 'react';
import timeago from 'timeago.js';
import * as es from 'timeago.js/locales/es';

class WebcamShot extends Component {
  constructor(props) {
    super(props);

  }

  timeAgo = date => {
    // // register your locale with timeago
    timeago.register('spanish', es.default);
    return new timeago().format(new Date(date), 'spanish')
  }

  render() {
    return (
      <div className="webcamShot">
        <div className="webcamShot__info">
          {this.props.onlineStatus ? (
            <span>status: Online</span>
          ) : (
            <span>status: Offline</span>
          )
        }
          <span>{this.timeAgo(this.props.date)}</span>
        </div>
        <img
          role="presentation"
          className="snapshot-img"
          src={this.props.screenshot}
        />
      </div>
    );
  }
}

export default WebcamShot
