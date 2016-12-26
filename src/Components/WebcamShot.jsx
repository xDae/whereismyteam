import React, { Component } from 'react';
import timeago from 'timeago.js';
import * as es from 'timeago.js/locales/es';

class WebcamShot extends Component {
  timeAgo = date => {
    // // register your locale with timeago
    timeago.register('spanish', es.default);
    return new timeago().format(new Date(date), 'spanish')
  }

  render() {
    return (
      <div className="item">
        <a href="#">
          <img src={this.props.screenshot} alt="algo"/>
          <span className="caption">
            <span className="t">
              <span className="c">
                {this.props.onlineStatus ? (
                    <span>status: Online</span>
                  ) : (
                    <span>status: Offline</span>
                  )
                }
                <span>{this.timeAgo(this.props.date)}</span>
              </span>
            </span>
          </span>
        </a>
      </div>
    );
  }
}

export default WebcamShot
