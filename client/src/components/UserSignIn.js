import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';
import { Context } from '../Context';

const UserSignIn = ({ location, history }) => {
  // State Declaration
  const [user, setUser] = useState({
    emailAddress: 'john@smith.com',
    password: 'john12345',
  });
  const [errors, setErrors] = useState([]);

  // Retrieves the authenticated user and 'signIn' function from context
  const {
    authenticatedUser,
    actions: { signIn },
  } = useContext(Context);

  // Is called when there is change in input, and updates the state with the input data
  const change = event => {
    const name = event.target.name;
    const value = event.target.value;
    user[name] = value;
    setUser({ ...user });
  };

  // Is called when the form is submitted
  const submit = e => {
    e.preventDefault();
    /* 'this.props.location.state' stores the path the user tried to access without authentication
    So, when the user is eventually authenticated  it will be redirected to that path instead of the home page.
    But, if there's no such path the user once authenticated will be redirected to the home page */
    const { from } = location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = user;
    signIn(emailAddress, password)
      .then(data => {
        const { user } = data;
        if (user) {
          history.push(from);
          console.log(`SUCCESS! ${user.firstName} ${user.lastName} is now signed in!`);
        } else {
          setErrors([data.errors.message]);
        }
      })
      .catch(err => console.log(err));
  };

  // If there is an authenticated user '/signin' will redirect to '/' (homepage)
  if (authenticatedUser) {
    return <Redirect to='/' />;
  }
  return (
    <div className='bounds'>
      <div className='grid-33 centered signin'>
        <h1>Sign In</h1>
        <div>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={submit}>
            <div>
              <input
                id='emailAddress'
                name='emailAddress'
                type='text'
                value={user.emailAddress}
                placeholder='Email Address'
                onChange={change}
              />
            </div>
            <div>
              <input
                id='password'
                name='password'
                type='password'
                value={user.password}
                placeholder='Password'
                onChange={change}
              />
            </div>
            <div className='pad-bottom grid-100-padding'>
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
};

export default UserSignIn;
