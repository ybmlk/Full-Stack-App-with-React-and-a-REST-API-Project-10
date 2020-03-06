import React, { useState, useEffect, memo, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const CourseDetail = ({ context: { data, authenticatedUser }, match, history }) => {
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const id = match.params.id;
    // Retrieves a courses with a given 'id'
    data
      .getCourse(id)
      .then(async res => {
        // If the course exists it updates the state with the corse details and owner
        if (res.status === 200) {
          const course = await res.json();
          setCourse(course);
          setUser(course.user);
          // else it renders '404' page
        } else {
          history.push('/notfound');
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      });
  }, []);

  // Stores the authenticated User's Id
  const authUser = authenticatedUser ? authenticatedUser._id : null;
  // Stores the course owner's Id
  const owner = user._id;

  return (
    <div>
      <ActionsBar authUser={authUser} owner={owner} id={course._id} />
      <div className='bounds course--detail'>
        <Body {...course} {...user} />
        <SideBar {...course} />
      </div>
    </div>
  );
};

const ActionsBar = ({ authUser, owner, id }) => {
  return (
    <Fragment>
      {owner !== undefined && (
        <div className='actions--bar'>
          <div className='bounds'>
            <div className='grid-100'>
              {/* If the authenticated User is the owner of the course
              it will allow deleting and updating the course */}
              {authUser === owner && (
                <span>
                  <Link className='button' to={`/courses/${id}/update`}>
                    Update Course
                  </Link>
                  <Link className='button' to={`/courses/${id}/delete`}>
                    Delete Course
                  </Link>
                </span>
              )}
              <Link className='button button-secondary' to='/'>
                Return to List
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const Body = ({ title, description, firstName, lastName }) => {
  return (
    <div className='grid-66'>
      <div className='course--header'>
        <h4 className='course--label'>Course</h4>
        <h3 className='course--title'>{title}</h3>
        <p>By {`${firstName} ${lastName}`}</p>
      </div>
      <div className='course--description'>
        <ReactMarkdown source={description} />
      </div>
    </div>
  );
};

const SideBar = ({ estimatedTime, materialsNeeded }) => {
  return (
    <div className='grid-25 grid-right'>
      <div className='course--stats'>
        <ul className='course--stats--list'>
          <li className='course--stats--list--item'>
            <h4>Estimated Time</h4>
            <h3>{estimatedTime}</h3>
          </li>
          <li className='course--stats--list--item'>
            <h4>Materials Needed</h4>
            <ul>
              <ReactMarkdown source={materialsNeeded} />
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(CourseDetail);
