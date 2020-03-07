import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import Body from './Body';
import SideBar from './SideBar';
import BottomBar from './BottomBar';
import ErrorsDisplay from './ErrorsDisplay';

const CreateCourse = ({ history }) => {
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

  // Retrieves the authenticated user and 'data' class from context
  const { authenticatedUser: authUser, data } = useContext(Context);

  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  /* Is called when there is a change in input data.
  stores the input data in the corresponding course property */
  const change = e => {
    const name = e.target.name;
    const value = e.target.value;
    course[name] = value;
    setCourse({ ...course });
  };

  // Is called when the form is submited
  const submit = e => {
    e.preventDefault();
    const username = authUser.emailAddress;
    const password = authUser.password;

    data
      /* Passes the course's data, the currently authenticated user's
      username and password as an argument to create a new course */
      .createCourse(course, username, password)
      .then(async res => {
        // If the course is created...
        if (res.status === 201) {
          const course = await res.json();
          // Gets the newly created course's Id
          const { courseId } = course;
          // ... and redirects to read mode
          history.push(`/courses/${courseId}`);
        } else {
          const data = await res.json();
          // Error message for invalid inputs is stored in 'errors'
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
        <h1>Create Course</h1>
        <div>
          {/* displays errors due to invalid input */}
          <ErrorsDisplay errors={errors} />
          <form onSubmit={submit}>
            <Body {...course} {...user} change={change} />
            <SideBar {...course} change={change} />
            <BottomBar page='create' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
