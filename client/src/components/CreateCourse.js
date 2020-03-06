import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';

const CreateCourse = ({ history, context: { data, authenticatedUser: authUser } }) => {
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

  useEffect(() => {
    setUser({ authUser });
  }, []);

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
            <Bottom />
          </form>
        </div>
      </div>
    </div>
  );
};

const Body = ({ title, description, firstName, lastName, change }) => (
  <div className='grid-66'>
    <div className='course--header'>
      <h4 className='course--label'>Course</h4>
      <div>
        <input
          id='title'
          name='title'
          type='text'
          className='input-title course--title--input'
          placeholder='Course title...'
          value={title}
          onChange={change}
        />
      </div>
      <p>By {`${firstName} ${lastName}`}</p>
    </div>
    <div className='course--description'>
      <div>
        <textarea
          id='description'
          name='description'
          className=''
          placeholder='Course description...'
          value={description}
          onChange={change}
        ></textarea>
      </div>
    </div>
  </div>
);

const SideBar = ({ estimatedTime, materialsNeeded, change }) => (
  <div className='grid-25 grid-right'>
    <div className='course--stats'>
      <ul className='course--stats--list'>
        <li className='course--stats--list--item'>
          <h4>Estimated Time</h4>
          <div>
            <input
              id='estimatedTime'
              name='estimatedTime'
              type='text'
              className='course--time--input'
              placeholder='Hours'
              value={estimatedTime === null ? '' : estimatedTime}
              onChange={change}
            />
          </div>
        </li>
        <li className='course--stats--list--item'>
          <h4>Materials Needed</h4>
          <div>
            <textarea
              id='materialsNeeded'
              name='materialsNeeded'
              className=''
              placeholder='List materials...'
              value={materialsNeeded === null ? '' : materialsNeeded}
              onChange={change}
            ></textarea>
          </div>
        </li>
      </ul>
    </div>
  </div>
);

const Bottom = () => (
  <div className='grid-100 pad-bottom'>
    <button className='button' type='submit'>
      Create Course
    </button>
    <Link className='button button-secondary' to='/'>
      Cancel
    </Link>
  </div>
);

const ErrorsDisplay = ({ errors }) => {
  if (errors.length) {
    return (
      <div>
        <h2 className='validation--errors--label'>Invalid Input</h2>
        <div className='validation-errors'>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return null;
};

export default memo(CreateCourse);
