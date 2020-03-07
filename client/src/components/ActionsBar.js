import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

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

export default ActionsBar;
