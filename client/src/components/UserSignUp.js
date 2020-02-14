import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class UserSignUp extends Component {
  constructor({ context }) {
    super();
    this.context = context;
    this.data = this.context.data;
    this.actions = this.context.actions;
  }

  state = {
    user: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
    },
    errors: [],
  };

  change = e => {
    const name = e.target.name;
    const value = e.target.value;
    const user = this.state.user;
    user[name] = value;
    this.setState(() => ({ user }));
  };

  submit = e => {
    e.preventDefault();
    const { user } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state.user;

    this.data
      .createUser(user)
      .then(async res => {
        if (res.status === 201) {
          this.actions.signIn(emailAddress, password).then(data => {
            this.props.history.push(from);
            console.log(`SUCCESS! ${data.user.firstName} ${data.user.lastName} is now signed in!`);
          });
        } else {
          const data = await res.json();
          // error message for invalid inputs
          this.setState(() => ({
            errors: data.errors,
          }));
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  };

  cancel = e => {
    e.preventDefault();
    this.props.history.push('/');
  };

  render() {
    const { firstName, lastName, emailAddress, password, confirmPassword } = this.state.user;
    const { context } = this.props;
    // If there is an authenticated user '/signup' will redirect to '/'
    if (context.authenticatedUser) {
      return <Redirect to='/' />;
    }

    return (
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign Up</h1>
          <div>
            <ErrorsDisplay errors={this.state.errors} />
            <form onSubmit={this.submit}>
              <div>
                <input
                  id='firstName'
                  name='firstName'
                  type='text'
                  className=''
                  placeholder='First Name'
                  value={firstName}
                  onChange={this.change}
                />
              </div>
              <div>
                <input
                  id='lastName'
                  name='lastName'
                  type='text'
                  className=''
                  placeholder='Last Name'
                  value={lastName}
                  onChange={this.change}
                />
              </div>
              <div>
                <input
                  id='emailAddress'
                  name='emailAddress'
                  type='text'
                  className=''
                  placeholder='Email Address'
                  value={emailAddress}
                  onChange={this.change}
                />
              </div>
              <div>
                <input
                  id='password'
                  name='password'
                  type='password'
                  className=''
                  placeholder='Password'
                  value={password}
                  onChange={this.change}
                />
              </div>
              <div>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  className=''
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={this.change}
                />
              </div>
              <div className='grid-100 pad-bottom'>
                <button className='button' type='submit'>
                  Sign Up
                </button>
                <button className='button button-secondary' onClick={this.cancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account? <Link to='/signin'>Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }
}

const ErrorsDisplay = ({ errors }) => {
  if (errors.length) {
    return (
      <div>
        <div className='validation-errors'>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return null;
};

export default UserSignUp;
