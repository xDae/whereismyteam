import React, { Component } from 'react';
import timeago from 'timeago.js';
// import * as es from 'timeago.js/locales/es';

import OnlineStatusButton from './OnlineStatusButton'

class WebcamShot extends Component {
  timeAgo = date => {
    // register your locale with timeago
    // timeago.register('spanish', es.default);
    return new timeago().format(new Date(date), 'spanish');
  }

  render() {
    return (
      <div className="item">
        <img src={this.props.screenshot} alt="algo"/>
        <OnlineStatusButton />
        <span className="caption">
          <span className="t">
            <span className="c">
              <br />
              <span>{this.timeAgo(this.props.date)}</span>
            </span>
          </span>
        </span>
      </div>
    );
  }
}

export default WebcamShot
