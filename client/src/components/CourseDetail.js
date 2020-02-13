import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseDetail extends Component {
  state = {
    course: {},
    user: {},
    materialsNeeded: [],
  };

  componentDidMount() {
    const { context, match } = this.props;
    const { data } = context;
    const id = match.params.id;

    data
      .getCourse(id)
      .then(async res => {
        if (res.status === 200) {
          const course = await res.json();
          this.setState(() => ({
            course: course[0],
            user: course[0].user,
          }));
          // if 'materialsNeeded' is not null, the string will be split into array
          if (this.state.course.materialsNeeded) {
            this.setState(() => ({
              materialsNeeded: this.state.course.materialsNeeded.replace('*', '').split('\n*'),
            }));
          }
        } else {
          // ! Add 404 page
          alert('404 Page Not found');
          this.props.history.push('/');
        }
      })
      .catch(err => {
        // ! Add error page
        console.log(err);
        this.props.history.push('/');
      });
  }

  render() {
    const { context } = this.props;
    const owner = this.state.user.id;
    const authUser = context.authenticatedUser ? context.authenticatedUser.id : null;
    let actionBar = null;

    if (owner !== undefined) {
      if (authUser === owner) {
        actionBar = <ActionsBar id={this.state.course.id} />;
      }
    }
    return (
      <div>
        <div className='actions--bar'>
          <div className='bounds'>
            <div className='grid-100'>
              {actionBar}
              <Link className='button button-secondary' to='/'>
                Return to List
              </Link>
            </div>
          </div>
        </div>

        <div className='bounds course--detail'>
          <Body {...this.state.course} {...this.state.user} />
          <SideBar
            estimatedTime={this.state.course.estimatedTime}
            materialsNeeded={this.state.materialsNeeded}
          />
        </div>
      </div>
    );
  }
}

const ActionsBar = ({ id }) => (
  <span>
    <Link className='button' to={`/courses/${id}/update`}>
      Update Course
    </Link>
    <Link className='button' to='/'>
      Delete Course
    </Link>
  </span>
);

const Body = ({ title, description, firstName, lastName }) => {
  return (
    <div className='grid-66'>
      <div className='course--header'>
        <h4 className='course--label'>Course</h4>
        <h3 className='course--title'>{title}</h3>
        <p>By {`${firstName} ${lastName}`}</p>
      </div>
      <div className='course--description'>
        <p style={{ whiteSpace: 'pre-line' }}>{description}</p>
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
              {materialsNeeded.map((material, i) => (
                <li key={i}>{material}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CourseDetail;
