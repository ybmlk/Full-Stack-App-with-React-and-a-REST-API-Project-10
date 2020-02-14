import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../src/img/img1.png';

class Courses extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    const { context } = this.props;
    const { data } = context;
    data.getCourses().then(courses => this.setState(() => ({ courses })));
  }

  render() {
    const { context } = this.props;

    return (
      <div className='bounds'>
        {this.state.courses.map(course => (
          <Card key={course.id} {...course} />
        ))}

        {context.authenticatedUser && (
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
        )}
      </div>
    );
  }
}

const Card = ({ ...course }) => {
  return (
    <div className='grid-33'>
      <Link to={`/courses/${course.id}`}>
        <Fragment>
          <div className='card'>
            <div className='card-image'>
              <img src={image1} alt='img' />
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
