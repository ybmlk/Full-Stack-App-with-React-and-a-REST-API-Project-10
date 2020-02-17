import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

/* This component restricts some private routes like '/update' and '/delete'
to only be accessed by the creators of the course */
class AuthOwner extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const { context, id, history } = this.props;
    const { data } = context;

    // Retrieves a course with a given 'Id'
    data
      .getCourse(id)
      .then(async res => {
        if (res.status === 200) {
          const course = await res.json();
          // Stores the owner of that course inside state
          this.setState(() => ({
            user: course.user,
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
    // `component: Component` means import `component as Component`
    const { component: Component, id, context, ...rest } = this.props;
    // The owner of the course
    const owner = this.state.user.id;
    // The authenticated user
    const authUser = context.authenticatedUser.id;

    return (
      <Route
        {...rest}
        render={props => {
          if (owner !== undefined) {
            // If the authenticated user is the owner render the component
            if (authUser === owner) {
              return <Component {...props} />;
            } else {
              // Else redirect to '/forbidden' and store this path in 'props.location.state'
              // B/c when the user is eventually authenticated they will be redirected to the path which they originally attempted to access
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
