import React, { Component, useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';

const DeleteCourse = ({ context: { data, authenticatedUser }, match: { params }, history }) => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    // Retrieves a courses with a given 'id'
    data
      .getCourse(params.id)
      .then(async res => {
        if (res.status === 200) {
          const course = await res.json();
          setCourse({ course });
        } else {
          history.push('/notfound');
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      });
  }, []);

  const handleDelete = () => {
    const { emailAddress, password } = authenticatedUser;
    data
      /* Passes the course's Id, the currently authenticated user's (who is also the owner)
      username and password as an argument to delete the course */
      .deleteCourse(params.id, emailAddress, password)
      .then(res => {
        if (res.status === 204) {
          history.push('/');
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      });
  };

  return (
    <div className='bounds course--detail'>
      <h1>Are you sure, you want to delete this course?</h1>
      <div className='input-title course--title--input'>Course: {course.title}</div>
      <div className='bounds course--detail'>
        <Bottom id={params.id} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

const Bottom = ({ id, handleDelete }) => (
  <div className='grid-100 pad-bottom'>
    <button className='button' onClick={handleDelete}>
      Delete Course
    </button>
    <Link className='button button-secondary' to={`/courses/${id}`}>
      Cancel
    </Link>
  </div>
);

export default memo(DeleteCourse);
