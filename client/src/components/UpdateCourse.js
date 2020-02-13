import React, { Component } from 'react';

class UpdateCourse extends Component {
  state = {
    course: {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
    },
    user: {
      firstName: '',
      lastName: '',
    },
  };

  componentDidMount() {
    const { context, match } = this.props;
    const { data } = context;
    const id = match.params.id;

    data.getCourse(id).then(course => {
      this.setState(() => ({
        course: course[0],
        user: course[0].user,
      }));
    });
  }

  change = e => {
    const name = e.target.name;
    const value = e.target.value;
    let course = this.state.course;
    course[name] = value;
    this.setState(() => ({ course }));
  };

  render() {
    return (
      <div>
        <div className='bounds course--detail'>
          <h1>Update Course</h1>
          <div>
            <form>
              <Body {...this.state.course} {...this.state.user} change={this.change} />
              <SideBar {...this.state.course} change={this.change} />
              <Bottom />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const Body = ({ title, description, firstName, lastName, change }) => (
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

const SideBar = ({ estimatedTime, materialsNeeded, change }) => (
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

const Bottom = () => (
  <div className='grid-100 pad-bottom'>
    <button className='button' type='submit'>
      Update Course
    </button>
    <button
      className='button button-secondary'
      // onClick="event.preventDefault(); location.href='course-detail.html';"
    >
      Cancel
    </button>
  </div>
);

export default UpdateCourse;
