import React from 'react';
import ReactMarkdown from 'react-markdown';

const Body = ({ title, description, firstName, lastName, change, page }) => {
  if (page === 'CourseDetails') {
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
  }
  return (
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
};

export default Body;
