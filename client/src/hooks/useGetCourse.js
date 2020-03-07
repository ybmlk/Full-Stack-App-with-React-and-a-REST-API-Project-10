import { useEffect, useState, useContext } from 'react';
import { Context } from '../Context';

const useGetCourse = (id, history) => {
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});

  const { data } = useContext(Context);

  useEffect(() => {
    // Retrieves a courses with a given 'id'
    data
      .getCourse(id)
      .then(async res => {
        // If the course exists it updates the state with the corse details and owner
        if (res.status === 200) {
          const course = await res.json();
          setCourse(course);
          setUser(course.user);
          // else it renders '404' page
        } else {
          history.push('/notfound');
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      });
  }, [id, data, history]);

  return [course, user];
};

export default useGetCourse;
