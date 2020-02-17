import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DeleteCourse extends Component {
  constructor({ context, match }) {
    super();
    this.context = context;
    this.match = match;
    this.data = this.context.data;
    this.authUser = this.context.authenticatedUser;
  }

  state = {
    course: {},
  };

  componentDidMount() {
    const { id } = this.match.params;
    // Retrieves a courses with a given 'id'
    this.data
      .getCourse(id)
      .then(async res => {
        if (res.status === 200) {
          const course = await res.json();
          this.setState(() => ({
            course: course,
          }));
        } else {
          this.props.history.push('/notfound');
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  handleDelete = () => {
    const { id } = this.match.params;
    const { emailAddress, password } = this.authUser;
    this.data
      /* Passes the course's Id, the currently authenticated user's (who is also the owner)
      username and password as an argument to delete the course */
      .deleteCourse(id, emailAddress, password)
      .then(res => {
        if (res.status === 204) {
          this.props.history.push('/');
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  };

  render() {
    const { id } = this.match.params;
    return (
      <div className='bounds course--detail'>
        <h1>Are you sure, you want to delete this course?</h1>
        <div className='input-title course--title--input'>Course: {this.state.course.title}</div>
        <div className='bounds course--detail'>
          <Bottom id={id} handleDelete={this.handleDelete} />
        </div>
      </div>
    );
  }
}

const Bottom = ({ id, handleDelete }) => (
  <div className='grid-100 pad-bottom'>
    <Link className='button' onClick={handleDelete} to='/'>
      Delete Course
    </Link>
    <Link className='button button-secondary' to={`/courses/${id}`}>
      Cancel
    </Link>
  </div>
);

export default DeleteCourse;
