import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class AuthOwner extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const { context, id, history } = this.props;
    const { data } = context;

    data
      .getCourse(id)
      .then(async res => {
        if (res.status === 200) {
          const course = await res.json();
          this.setState(() => ({
            user: course[0].user,
          }));
        } else {
          history.push('/notfound');
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
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
              return <Redirect to={{
                    pathname: '/forbidden',
                    state: { fromForbidden: props.location },
                  }} />;
            }
          }
        }}
      />
    );
  }
}

export default AuthOwner;
