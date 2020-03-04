import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../src/img/img1.png';
import image2 from '../../src/img/img2.jpg';
import image3 from '../../src/img/img3.png';
import image4 from '../../src/img/img4.png';

class Courses extends Component {
  state = {
    courses: [],
    images: [image1, image2, image3, image4],
  };

  componentDidMount() {
    const { context } = this.props;
    const { data } = context;
    // Stores all the courses retrieved from the server in the 'courses' state
    data.getCourses().then(courses => this.setState(() => ({ courses })));
  }

  render() {
    return (
      <div className='bounds'>
        {/* Maps the courses info on cards */}
        {this.state.courses.map(course => (
          <Card key={course._id} {...course} images={this.state.images} />
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
  }
}

const Card = ({ images, ...course }) => {
  // Randomly assigns one of the 4 images to each card
  const randnum = Math.floor(Math.random() * 4);
  const newimg = images[randnum];
  return (
    <div className='grid-33'>
      <Link to={`/courses/${course._id}`}>
        <Fragment>
          <div className='card'>
            <div className='card-image'>
              <img src={newimg} alt='img' />
            </div>
            <div className='card-text'>
              <h3 className='course--title'>{course.title}</h3>
              <span className='owner'>{`${course.user.firstName} ${course.user.lastName}`}</span>
            </div>
          </div>
        </Fragment>
      </Link>
    </div>
  );
};

export default Courses;
