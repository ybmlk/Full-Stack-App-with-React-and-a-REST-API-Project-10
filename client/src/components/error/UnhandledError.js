import React from 'react';

// Renders when there is an internal (server) error
const UnhandledError = () => (
  <div className='bounds'>
    <h1>Error!</h1>
    <p>Sorry! We just encountered an unexpected error.</p>
  </div>
);

export default UnhandledError;
