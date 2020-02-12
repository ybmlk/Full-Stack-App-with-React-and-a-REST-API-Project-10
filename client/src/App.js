import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';

// Connect componets to context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

const App = () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path='/' component={CoursesWithContext} />
        <Route path='/courses/create' component={CreateCourse} />
        <Route path='/courses/:id/update' component={UpdateCourse} />
        <Route path='/courses/:id' component={CourseDetail} />
        <Route path='/signin' component={UserSignInWithContext} />
        <Route path='/signup' component={UserSignUp} />
        <Route path='/signout' component={UserSignOutWithContext} />
      </Switch>
    </div>
  </Router>
);

export default App;
