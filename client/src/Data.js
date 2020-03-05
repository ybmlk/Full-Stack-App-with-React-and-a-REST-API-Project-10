// Is a helper class with important methods
class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = '/api' + path;

    /* 'option' is consists of the http method, header and body.
    It can be passed as a second argument in fetch request */
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    // If authentication is required, the credential data is stored in the header
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers.Authorization = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // GET request to get all courses
  async getCourses() {
    const response = await this.api('/courses');
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error();
    }
  }

  // GET request to get an individual course with a given 'id'
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`);
    return response;
  }

  // POST reqeust to create a new user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    return response;
  }

  // GET request to retrieve a user with a given 'username' and 'password'
  async getUser(username, password) {
    const response = await this.api('/users', 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => ({ user: data }));
    } else if (response.status === 401) {
      return response.json().then(data => ({ errors: data }));
    } else {
      throw new Error();
    }
  }

  // POST request to create a new course
  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, { username, password });
    return response;
  }

  // PUT request to update an existing course with a given 'Id'
  async updateCourse(id, course, username, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { username, password });
    return response;
  }

  // DELETE request to delete an existing course with a given 'Id'
  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { username, password });
    return response;
  }
}

export default Data;
