import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import DeleteCourse from './components/DeleteCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './PrivateRoute';
import Forbidden from './components/error/Forbidden';
import UnhandledError from './components/error/UnhandledError';
import NotFound from './components/error/NotFound';

const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Courses} />
        <PrivateRoute path='/courses/create' component={CreateCourse} />
        <PrivateRoute path='/courses/:id/update' component={UpdateCourse} />
        <PrivateRoute path='/courses/:id/delete' component={DeleteCourse} />
        <Route path='/courses/:id' component={CourseDetail} />
        <Route path='/signin' component={UserSignIn} />
        <Route path='/signup' component={UserSignUp} />
        <Route path='/signout' component={UserSignOut} />
        <Route path='/forbidden' component={Forbidden} />
        <Route path='/error' component={UnhandledError} />
        <Route path='/notfound' component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
