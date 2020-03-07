import React, { useContext, useState, useEffect } from 'react';
import useGetCourse from '../hooks/useGetCourse';
import { Context } from '../Context';
import Body from './Body';
import SideBar from './SideBar';
import BottomBar from './BottomBar';
import ErrorsDisplay from './ErrorsDisplay';

const UpdateCourse = ({ match, history }) => {
  // State declaration
  const [course, setCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  });
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
  });
  const [errors, setError] = useState([]);

  // Course id from param
  const id = match.params.id;

  // Retrieves a courses with a given 'id'
  const [fetchedCourse] = useGetCourse(id, history);

  // Retrieves the authenticated user and data from context
  const { authenticatedUser: authUser, data } = useContext(Context);

  useEffect(() => {
    // Checks if the course is fetched and and assigns it to course state
    if (fetchedCourse._id) {
      setCourse(fetchedCourse);
      setUser(fetchedCourse.user);
    }
  }, [fetchedCourse]);

  // Is called when there is change in input, and updates the state with the input data
  const change = e => {
    const name = e.target.name;
    const value = e.target.value;
    course[name] = value;
    setCourse({ ...course });
  };

  const submit = e => {
    e.preventDefault();
    const { emailAddress, password } = authUser;

    data
      /* Passes the course's Id, the currently authenticated user's (who is also the owner)
      email and password as an argument to update the course */
      .updateCourse(id, course, emailAddress, password)
      .then(async res => {
        if (res.status === 204) {
          history.push(`/courses/${id}`);
        } else {
          const data = await res.json();
          // Stores error messages for invalid inputs
          setError(data.errors);
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      });
  };

  return (
    <div>
      <div className='bounds course--detail'>
        <h1>Update Course</h1>
        <div>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={submit}>
            <Body {...course} {...user} change={change} />
            <SideBar {...course} change={change} />
            <BottomBar id={id} page='update' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
