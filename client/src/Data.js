class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers.Authorization = `Basic ${encodedCredentials}`;
    }

    return fetch(path, options);
  }

  async getCourses() {
    const response = await this.api('/courses');
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error();
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`);
    return response;
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    return response;
  }

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

  async createCourse(course, username, password) {
    const response = await this.api('/courses', 'POST', course, true, { username, password });
    return response;
  }

  async updateCourse(id, course, username, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { username, password });
    return response;
  }

  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { username, password });
    return response;
  }
}

export default Data;
