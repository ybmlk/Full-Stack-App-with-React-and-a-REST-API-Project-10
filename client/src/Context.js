import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

// Create a react context
const Context = React.createContext();

const Provider = ({ children }) => {
  // Get the authenticated user info from cookie if it exist, else  it's 'null'
  const [authenticatedUser, setAuthenticatedUser] = useState(
    Cookies.getJSON('authenticatedUser') || null
  );

  // 'Data' is a helper class with some useful methods
  const data = new Data();

  // Is called when user signs in
  const signIn = async (username, password) => {
    // Store the response from 'getUser' in data
    const userData = await data.getUser(username, password);
    // If data.user exist it means the user info is retrieved.
    const { user } = userData;
    if (user) {
      /* We're storing the password in plain text in a cookie b/c we always have to provide
      the password in the header of an http request when making requests that require authorization */
      user.password = password;
      // Store the user's data in the state
      setAuthenticatedUser(user);
      // Store the user data in a cookie for 2 days
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 2 });
    }
    return userData;
  };

  const signOut = () => {
    // Remove the user's data from the state
    setAuthenticatedUser(null);
    // Remove the user's data from the cookie
    Cookies.remove('authenticatedUser');
  };

  // These values will be accessble to components that subscribe to context
  const value = {
    authenticatedUser,
    data,
    actions: {
      signIn: signIn,
      signOut: signOut,
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Provider, Context };
