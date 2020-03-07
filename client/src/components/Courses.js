import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../src/img/img1.png';
import image2 from '../../src/img/img2.jpg';
import image3 from '../../src/img/img3.png';
import image4 from '../../src/img/img4.png';
import { Context } from '../Context';

const Courses = () => {
  // State declaration
  const [courses, setCourses] = useState([]);
  const images = [image1, image2, image3, image4];

  // Import the 'data' class from context
  const { data } = useContext(Context);

  useEffect(() => {
    // Stores all the courses retrieved from the server in the 'courses' state
    data.getCourses().then(newCourses => setCourses(newCourses));
  }, [data]);

  return (
    <div className='bounds'>
      {/* Maps the courses info on cards */}
      {courses.map(course => (
        <Card key={course._id} {...course} images={images} />
      ))}

      <div className='grid-33'>
        <Link className='course--module course--add--module' to='/courses/create'>
          <h3 className='course--add--title'>
            <svg
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 13 13'
              className='add'
            >
              <polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 '></polygon>
            </svg>
            New Course
          </h3>
        </Link>
      </div>
    </div>
  );
};

const Card = ({ images, ...course }) => {
  const {
    _id,
    title,
    user: { firstName, lastName },
  } = course;

  // Randomly assigns one of the 4 images to each card
  const randnum = Math.floor(Math.random() * 4);
  const newimg = images[randnum];
  return (
    <div className='grid-33'>
      <Link to={`/courses/${_id}`}>
        <Fragment>
          <div className='card'>
            <div className='card-image'>
              <img src={newimg} alt='img' />
            </div>
            <div className='card-text'>
              <h3 className='course--title'>{title}</h3>
              <span className='owner'>{`${firstName} ${lastName}`}</span>
            </div>
          </div>
        </Fragment>
      </Link>
    </div>
  );
};

export default Courses;
