import React from 'react';
import { Redirect } from 'react-router-dom';

// Renders when the user clicks 'Sign Out', it clears the currently authenticated user's data
const UserSignOut = ({ context }) => {
  context.actions.signOut();
  return <Redirect to='/' />;
};

export default UserSignOut;
