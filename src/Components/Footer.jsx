import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <div className="container">
          <ul className="footer-nav">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Cookie Policy</a>
            </li>
          </ul>
          <div className="right">
            <a href="#" className="btn">SUBSCRIBE</a>
            <a href="#" className="btn btn-secondary">CONTACT US</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
