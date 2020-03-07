import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context';
import AuthOwner from './AuthOwner';

// This component limits access to certain routes only to authenticated users
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticatedUser } = useContext(Context);

  return (
    <Route
      {...rest}
      render={props => {
        // If there's authenticated user ...
        if (authenticatedUser) {
          // If a Private Route has a parameter (i.e /courses/:id/update)
          // The route should only be accessed by the owner of the course
          // Not just any authorized user
          if (props.match.params.id) {
            return (
              <AuthOwner
                {...props}
                id={props.match.params.id}
                component={Component}
              />
            );
          }
          return <Component {...props} />;
        } else {
          // Else redirect to '/signin' and store this path in 'props.location.state'
          // B/c when the user is eventually authenticated they will be redirected to the path which they originally attempted to access
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
