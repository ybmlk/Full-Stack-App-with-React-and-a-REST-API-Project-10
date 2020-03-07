import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Context } from '../Context';
import ErrorsDisplay from './ErrorsDisplay';

const UserSignUp = ({ location, history }) => {
  // State declaration
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);

  // Import authenticated user,  'data' class and 'SignIn' function from Context
  const { authenticatedUser, data, actions } = useContext(Context);

  /* Is called when there is a change in input data. stores the 
  input data in the corresponding user property state */
  const change = e => {
    const name = e.target.name;
    const value = e.target.value;
    user[name] = value;
    setUser({ ...user });
  };

  const submit = e => {
    e.preventDefault();
    // Path the user attempted to access before authentication or Homepage
    const { from } = location.state || { from: { pathname: '/' } };

    // Destructure the user state values
    const { emailAddress, password } = user;

    data
      // Passes the user data as an argument to create a new user
      .createUser(user)
      .then(async res => {
        // If the user is created...
        if (res.status === 201) {
          actions.signIn(emailAddress, password).then(async data => {
            history.push(from);
            console.log(data);
            await console.log(`SUCCESS! ${data.user.firstName} ${data.user.lastName} is now signed in!`);
          });
        } else {
          const data = await res.json();
          // Stores error message for invalid inputs
          setErrors(data.errors);
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      });
  };

  // Destructure the user state values
  const { firstName, lastName, emailAddress, password, confirmPassword } = user;

  // If there is an authenticated user '/signup' will redirect to '/'
  if (authenticatedUser) {
    return <Redirect to='/' />;
  }

  return (
    <div className='bounds'>
      <div className='grid-33 centered signin'>
        <h1>Sign Up</h1>
        <div>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={submit}>
            <div>
              <input
                id='firstName'
                name='firstName'
                type='text'
                className=''
                placeholder='First Name'
                value={firstName}
                onChange={change}
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
                onChange={change}
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
                onChange={change}
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
                onChange={change}
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
                onChange={change}
              />
            </div>
            <div className='pad-bottom grid-100-padding'>
              <button className='button' type='submit'>
                Sign Up
              </button>
              <Link className='button button-secondary' to='/'>
                Cancel
              </Link>
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
};

export default UserSignUp;
