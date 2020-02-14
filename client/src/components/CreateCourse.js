import React, { Component } from 'react';

class CreateCourse extends Component {
  constructor({ context }) {
    super();
    this.context = context;
    this.data = this.context.data;
    this.authUser = this.context.authenticatedUser;
  }

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
    errors: [],
  };

  componentDidMount() {
    this.setState(() => ({
      user: this.authUser,
    }));
  }

  change = e => {
    const name = e.target.name;
    const value = e.target.value;
    let course = this.state.course;
    course[name] = value;
    this.setState(() => ({ course }));
  };

  submit = e => {
    e.preventDefault();
    const course = this.state.course;
    const username = this.authUser.emailAddress;
    const password = this.authUser.password;

    this.data
      .createCourse(course, username, password)
      .then(async res => {
        if (res.status === 201) {
          const course = await res.json();
          const { courseId } = course;
          this.props.history.push(`/courses/${courseId}`);
        } else {
          const data = await res.json();
          // error message for invalid inputs
          this.setState(() => ({
            errors: data.errors,
          }));
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      });
  };

  cancel = e => {
    e.preventDefault();
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className='bounds course--detail'>
          <h1>Create Course</h1>
          <div>
            <ErrorsDisplay errors={this.state.errors} />
            <form onSubmit={this.submit}>
              <Body {...this.state.course} {...this.state.user} change={this.change} />
              <SideBar {...this.state.course} change={this.change} />
              <Bottom cancel={this.cancel} />
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

const Bottom = ({ cancel }) => (
  <div className='grid-100 pad-bottom'>
    <button className='button' type='submit'>
      Create Course
    </button>
    <button className='button button-secondary' onClick={cancel}>
      Cancel
    </button>
  </div>
);

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

export default CreateCourse;
