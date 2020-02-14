import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  };

  change = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(() => ({ [name]: value }));
  };

  submit = e => {
    e.preventDefault();
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;
    context.actions
      .signIn(emailAddress, password)
      .then(data => {
        const { user } = data;
        if (user) {
          this.props.history.push(from);
          console.log(`SUCCESS! ${user.firstName} ${user.lastName} is now signed in!`);
        } else {
          this.setState(() => ({ errors: [data.errors.message] }));
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { emailAddress, password, errors } = this.state;
    const { context } = this.props;
    // If there is an authenticated user '/signin' will redirect to '/'
    if (context.authenticatedUser) {
      return <Redirect to='/' />;
    }
    return (
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign In</h1>
          <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={this.submit}>
              <div>
                <input
                  id='emailAddress'
                  name='emailAddress'
                  type='text'
                  value={emailAddress}
                  placeholder='Email Address'
                  onChange={this.change}
                />
              </div>
              <div>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  placeholder='Password'
                  onChange={this.change}
                />
              </div>
              <div className='grid-100 pad-bottom'>
                <button className='button' type='submit'>
                  Sign In
                </button>
                <Link className='button button-secondary' to='/'>
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Don't have a user account?
            <Link to='/signup'>Click here</Link>
            to sign up!
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

export default UserSignIn;
