import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class AuthOwner extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const { context, id } = this.props;
    const { data } = context;

    data.getCourse(id).then(course => {
      this.setState(() => ({
        user: course[0].user,
      }));
    });
  }
  render() {
    const { component: Component, id, context, ...rest } = this.props;
    const owner = this.state.user.id;
    const authUser = context.authenticatedUser.id;

    return (
      <Route
        {...rest}
        render={props => {
          if (owner !== undefined) {
            if (authUser === owner) {
              return <Component {...props} />;
            } else {
              alert('You can only update your own courses!');
              return <Redirect to={`/courses/${id}`} />;
            }
          }
        }}
      />
    );
  }
}

export default AuthOwner;
