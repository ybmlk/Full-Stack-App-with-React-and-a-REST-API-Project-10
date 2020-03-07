import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context';

// Renders when the user clicks 'Sign Out', it clears the currently authenticated user's data
const UserSignOut = () => {
  // Imports 'SignOut' function from context
  const { actions } = useContext(Context);
  actions.signOut();
  return <Redirect to='/' />;
};

export default UserSignOut;
