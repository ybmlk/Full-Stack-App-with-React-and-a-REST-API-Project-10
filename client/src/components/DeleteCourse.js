import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../Context';
import useGetCourse from '../hooks/useGetCourse';
import BottomBar from './BottomBar';

const DeleteCourse = ({ match, history }) => {
  // State declaration
  const [course, setCourse] = useState({});

  // Course id from param
  const id = match.params.id;

  // Retrieves a courses with a given 'id'
  const [fetchedCourse] = useGetCourse(id, history);

  // Retrieves the authenticated user and data from context
  const {
    authenticatedUser: { emailAddress, password },
    data,
  } = useContext(Context);

  useEffect(() => {
    setCourse(fetchedCourse);
  }, [fetchedCourse]);

  const handleDelete = () => {
    data
      /* Passes the course's Id, the currently authenticated user's (who is also the owner)
      username and password as an argument to delete the course */
      .deleteCourse(id, emailAddress, password)
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
        <BottomBar id={id} handleDelete={handleDelete} page='delete' />
      </div>
    </div>
  );
};


export default DeleteCourse;
