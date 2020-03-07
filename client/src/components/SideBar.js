import React from 'react';
import ReactMarkdown from 'react-markdown';

const SideBar = ({ estimatedTime, materialsNeeded, change, page }) => {
  if (page === 'CourseDetails') {
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
  }
  return (
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
};

export default SideBar;
