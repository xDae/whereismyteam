import React, {Component} from 'react';

class InvitationEmail extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      emails: [
        {
          key: 0,
          email: '',
        }
      ]
    }
  }

  addEmail = e => {
    e.preventDefault();

    this.setState({
      // ...this.state,
      emails: this.state.emails.concat({ key: this.state.length + 1, email: 'email 2' })
    });
  }

  render() {
    return (
      <form>
        <div className="form-group row">
          <div className="col-sm-12">
            {this.state.emails.map((email, index) => (
              <input
                key={index}
                type="email"
                className="form-control"
                placeholder="email"
                // value={this.state.email}
                // onChange={this.handleNameChange}
              />
            ))}
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-sm-2 col-sm-12">
            <button type="submit" className="btn btn-primary" onClick={this.createTeam}>send invitations</button>
            <button type="submit" className="btn btn-secondary" onClick={this.addEmail}>Add email</button>
          </div>
        </div>
      </form>
    );
  }
}

export default InvitationEmail;
