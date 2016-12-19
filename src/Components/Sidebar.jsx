import React, {Component} from 'react';
import classNames from 'classnames';

class Sidebar extends Component {
  render() {
    const btnClass = classNames('mCustomScrollbar', this.props.className, {
      'active': this.props.isActive
    });

    return (
      <div
        id="sidebar-wrapper"
        className={btnClass}
        data-mcs-theme="minimal-dark">
        <a
          id="menu-close"
          href="#"
          className="btn btn-light btn-lg pull-right toggle"
          onClick={this.props.onCloseBtn}
        >
          <i className="fa fa-times"></i>
        </a>
        <div id='cssmenu'>
          <ul>
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#'>Events</a>
            </li>
            <li>
              <a href='#'>Blog</a>
            </li>
            <li className='has-sub offset'>
              <a href='#'>Organizers
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </a>
              <ul>
                <li className='has-sub'>
                  <a href='#'>Product 1</a>
                  <ul>
                    <li>
                      <a href='#'>Sub Product</a>
                    </li>
                    <li>
                      <a href='#'>Sub Product</a>
                    </li>
                  </ul>
                </li>
                <li className='has-sub'>
                  <a href='#'>Product 2</a>
                  <ul>
                    <li>
                      <a href='#'>Sub Product</a>
                    </li>
                    <li>
                      <a href='#'>Sub Product</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href='#'>About</a>
            </li>
            <li className='has-sub offset'>
              <a href='#'>Pages
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
              </a>
              <ul>
                <li className='has-sub'>
                  <a href='#'>About</a>
                </li>
                <li className='has-sub'>
                  <a href='#'>Terms</a>
                </li>
                <li className='has-sub'>
                  <a href='#'>Privacy</a>
                </li>
                <li className='has-sub'>
                  <a href='#'>Help Center</a>
                </li>
              </ul>
            </li>
            <li>
              <a href='#'>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
