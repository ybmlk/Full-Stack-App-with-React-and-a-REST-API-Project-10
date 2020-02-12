import React, { Component } from 'react';

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
    const { emailAddress, password } = this.state;
    context.actions
      .signIn(emailAddress, password)
      .then(user => {
        if (user) {
          console.log(`SUCCESS! ${user.name} is now signed in!`);
        } else {
          this.setState(() => ({ errors: ['Sign-in was unsuccessful'] }));
        }
      })
      .catch(err => console.log(err));
  };

  cancel = e => {
    e.preventDefault();
    this.props.history.push('/');
  };

  render() {
    const { emailAddress, password } = this.state;
    return (
      <React.Fragment>
        <hr />
        <div className='bounds'>
          <div className='grid-33 centered signin'>
            <h1>Sign In</h1>
            <div>
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
                  <button className='button button-secondary' onClick={this.cancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <p>&nbsp;</p>
            <p>
              Don't have a user account? <a href='sign-up.html'>Click here</a> to sign up!
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserSignIn;
