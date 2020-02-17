import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ context }) => {
  // The currently authenticated user's info is stored in 'authenticatedUser'
  const authUser = context.authenticatedUser;
  return (
    <React.Fragment>
      <div className='header'>
        <div className='bounds'>
          <Link to='/'>
            <h1 className='header--logo'>Course Catalog</h1>
          </Link>
          <nav>
            {/* If there's authenticated user it'll show the name and 'Sign Out' 
            else it'll show 'Sign Up' and 'Sign In; */}
            {authUser ? (
              <React.Fragment>
                <span>
                  Welcome, {authUser.firstName} {authUser.lastName}!
                </span>
                <Link className='signout' to='/signout'>
                  Sign Out
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className='signup' to='/signup'>
                  Sign Up
                </Link>
                <Link className='signin' to='/signin'>
                  Sign In
                </Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Header;
