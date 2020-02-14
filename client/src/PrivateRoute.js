import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';
import AuthOwner from './AuthOwner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props => {
            if (context.authenticatedUser) {
              // If a Private Route has a parameter (i.e /courses/:id/update)
              // The route should only be accessed by the owner of the course
              // Not just any authorized person
              if (props.match.params.id) {
                return (
                  <AuthOwner
                    {...props}
                    id={props.match.params.id}
                    component={Component}
                    context={context}
                  />
                );
              }
              return <Component {...props} />;
            } else {
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
      )}
    </Consumer>
  );
};

export default PrivateRoute;
