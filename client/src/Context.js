import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

// Create a react context
const Context = React.createContext();

class Provider extends Component {
  // 'Data' is a helper class with some useful methods
  data = new Data();
  state = {
    // Get the authenticated user info from cookie if it exist, else  it's 'null'
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  // Is called when user signs in
  signIn = async (username, password) => {
    // Store the response from 'getUser' in data
    const data = await this.data.getUser(username, password);
    const { user } = data;
    // If data.user exist it means the user info is retrieved.
    if (user) {
      /* We're storing the password in plain text in a cookie b/c we always have to provide
      the password in the header of an http request when making requests that require authorization */
      user.password = password;
      // Store the user's data in the state
      this.setState(() => ({ authenticatedUser: user }));
      // Store the user data in a cookie for 2 days
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 2 });
    }
    return data;
  };

  signOut = () => {
    // Remove the user's data from the state
    this.setState(() => ({ authenticatedUser: null }));
    // Remove the user's data from the cookie
    Cookies.remove('authenticatedUser');
  };

  render() {
    const { authenticatedUser } = this.state;
    // These values will be accessble to components that subscribe to context
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    return <Context.Provider value={value}>{this.props.children}</Context.Provider>;
  }
}

const Consumer = Context.Consumer;

// Is wrapper function which subscribes a component that's passed to it to context
const withContext = Component => {
  return props => {
    return (
      <Context.Consumer>{context => <Component {...props} context={context} />}</Context.Consumer>
    );
  };
};

export default withContext;
export { Provider, Consumer, Context };
