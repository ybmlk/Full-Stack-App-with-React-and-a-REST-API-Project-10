import React, { memo } from 'react';

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

export default memo(ErrorsDisplay);
