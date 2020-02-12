import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

class Provider extends Component {
  data = new Data();
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user) {
      this.setState(() => ({ authenticatedUser: user }));
      // save cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 2 });
    }
    return user;
  };

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
      },
    };

    return <Context.Provider value={value}>{this.props.children}</Context.Provider>;
  }
}

const Consumer = Context.Consumer;

const withContext = Component => {
  return props => {
    return (
      <Context.Consumer>{context => <Component {...props} context={context} />}</Context.Consumer>
    );
  };
};

export default withContext;
export { Provider, Consumer };
