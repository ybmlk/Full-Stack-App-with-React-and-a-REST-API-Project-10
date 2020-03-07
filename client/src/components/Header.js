import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

const Header = () => {
  const { authenticatedUser: authUser } = useContext(Context);
  return (
    <Fragment>
      <div className='header'>
        <div className='bounds'>
          <Link to='/'>
            <h1 className='header--logo'>Course Catalog</h1>
          </Link>
          <nav>
            {/* If there's authenticated user it'll show the name and 'Sign Out' 
              else it'll show 'Sign Up' and 'Sign In; */}
            {authUser ? (
              <Fragment>
                <span>
                  Welcome, {authUser.firstName} {authUser.lastName}!
                </span>
                <Link className='signout' to='/signout'>
                  Sign Out
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link className='signup' to='/signup'>
                  Sign Up
                </Link>
                <Link className='signin' to='/signin'>
                  Sign In
                </Link>
              </Fragment>
            )}
          </nav>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};

export default Header;
