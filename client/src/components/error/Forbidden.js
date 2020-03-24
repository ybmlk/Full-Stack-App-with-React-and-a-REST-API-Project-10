import React from 'react';
import { Link } from 'react-router-dom';

/* The user is redirected to this componet if they try to access unauthorized path
e.g trying to update/delete courses created by other users*/
const Forbidden = ({ location }) => {
  const back = location.state ?
    location.state.fromForbidden.pathname.replace('/update', '').replace('/delete', '') : '/';
  return (
    <div className='bounds'>
      <h1>Forbidden</h1>
      <p>Sorry! You don't have permission to access this route</p>
      <Link to={back}> ← Go Back</Link>
    </div>
  );
};

export default Forbidden;
