
import React, { Component } from 'react';
import { withRouter } from 'react-router'
import validator from 'email-validator';

import invitationEmail from './../utils/emailer.js';

// Components
import Button from './../Components/Button';
import Alert from './../Components/Alert';

class InvitationEmail extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      emails: [{
        key: 0,
        email: ''
      }],
      button: {
        isDisabled: false,
        isLoading: false
      },
      error: null
    }
  }

  handleEmailChange = ({ target }, index) => {
    const emails = this.state.emails.map(email => {
      if (email.key === index) {
        return  { ...email, email: target.value }
      }
      return email;
    });

    this.setState({ emails });
  }

  addEmail = e => {
    e.preventDefault();

    this.setState({
      emails: this.state.emails.concat({
        key: this.state.emails.length,
        email: '',
      })
    });
  }

  goToHome = () => {
    this.props.router.push({
      pathname: '/home',
      state: {
        fromCreateNewTeam: true
      }
    });
  }

  sendEmails = e => {
    e.preventDefault();

    this.setState({ ...this.state, button: { isLoading: true } });

    const validMails = this.state.emails.filter(({ email }) => validator.validate(email));

    validMails.length ? validMails.forEach(({ email }) => {
      invitationEmail(email)
      .then(() => this.goToHome())
      .catch(() => this.goToHome())
    })
    : this.setState({ ...this.state, button: { isLoading: false } });
  }

  render() {
    return (
      <form>
        {this.state.error && (
          <Alert
            onClose={() => this.setState({ error: null })}
            message={this.state.error.message}
          />
        )}
        <div className="form-group row">
          <div className="col-sm-12">
            {this.state.emails.map((email, index) => (
              <input
                key={index}
                type="email"
                className="form-control"
                placeholder="email"
                // value={this.state.email}
                onChange={e => this.handleEmailChange(e, index)}
              />
            ))}
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-sm-2 col-sm-12">
            <Button onClick={this.sendEmails} isLoading={this.state.button.isLoading}>send invitations</Button>
            <Button type="secondary" onClick={this.addEmail}>Add email</Button>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(InvitationEmail);
