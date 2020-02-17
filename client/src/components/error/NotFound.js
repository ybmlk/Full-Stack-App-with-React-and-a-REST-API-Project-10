import React from 'react';
import { Link } from 'react-router-dom';

// Renders when the requested page doesn't exist
const NotFound = () => (
  <div className='bounds'>
    <h1>404! Page Not Found</h1>
    <p>Sorry! The page you were looking for doesn't exist.</p>
    <Link to='/'> ← Go Back</Link>
  </div>
);

export default NotFound;
