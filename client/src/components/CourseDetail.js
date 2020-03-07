import React, { useContext } from 'react';
import useGetCourse from '../hooks/useGetCourse';
import { Context } from '../Context';
import ActionsBar from './ActionsBar';
import Body from './Body';
import SideBar from './SideBar';

const CourseDetail = ({ match, history }) => {
  const id = match.params.id;

  // Retrieves a courses with a given 'id'
  const [course, user] = useGetCourse(id, history);

  // Retrieves the authenticated user from context
  const { authenticatedUser } = useContext(Context);

  // Stores the authenticated User's Id
  const authUser = authenticatedUser ? authenticatedUser._id : null;

  // Stores the course owner's Id
  const owner = user._id;

  return (
    <div>
      <ActionsBar authUser={authUser} owner={owner} id={course._id} />
      {course.user && (
        <div className='bounds course--detail'>
          <Body {...course} {...user} page='CourseDetails' />
          <SideBar {...course} page='CourseDetails' />
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
