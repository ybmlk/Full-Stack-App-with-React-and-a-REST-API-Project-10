import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context';
import useGetCourse from './hooks/useGetCourse';

/* This component restricts some private routes like '/update' and '/delete'
to only be accessed by the creators of the course */
const AuthOwner = ({ component: Component, id, history, ...rest }) => {
  // State declaration
  const [user, setUser] = useState({});

  // Import 'data' class from context
  const { authenticatedUser } = useContext(Context);

  // Retrieves a course with a given 'Id'
  const [, fetchedUser] = useGetCourse(id, history);

  useEffect(() => {
    setUser(fetchedUser);
  }, [fetchedUser]);


  // The owner of the course
  const owner = user._id;
  // The authenticated user
  const authUser = authenticatedUser._id;

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
            return (
              <Redirect
                to={{
                  pathname: '/forbidden',
                  state: { fromForbidden: props.location },
                }}
              />
            );
          }
        }
      }}
    />
  );
};

export default AuthOwner;
