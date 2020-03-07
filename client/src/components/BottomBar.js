import React from 'react';
import { Link } from 'react-router-dom';

const BottomBar = ({ id, handleDelete, page }) => {
  if (page === 'delete') {
    return (
      <div className='grid-100 pad-bottom'>
        <button className='button' onClick={handleDelete}>
          Delete Course
        </button>
        <Link className='button button-secondary' to={`/courses/${id}`}>
          Cancel
        </Link>
      </div>
    );
  }
  return (
    <div className='grid-100 pad-bottom'>
      <button className='button' type='submit'>
        {page === 'create' ? 'Create Course' : 'Update Course'}
      </button>
      {/* If the page is create redirects to homepage else redirect to course page */}
      <Link className='button button-secondary' to={page === 'create' ? '/' : `/courses/${id}`}>
        Cancel
      </Link>
    </div>
  );
};

export default BottomBar;
