import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    fetch('/api/courses')
      .then(res => res.json())
      .then(courses => this.setState({ courses }));
  }

  render() {
    return (
      <div>
        <p>Hello World</p>
        <ul>
          {this.state.courses.map(course => {
            return (
              <li key={course.id}>
                <p>
                  Title: <br />
                  {course.title}
                </p>
                <p>
                  Description:
                  <br />
                  {course.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
