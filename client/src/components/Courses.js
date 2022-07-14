//displays all courses
//each course has custom link
//displays create course
import React, {useContext, useEffect, useState} from "react";
import {Context} from '../Context'
import {Link} from "react-router-dom";

function Courses() {
  //courses array in state
    const [courses, setCourses] = useState([]);
    //data from context api
    const {data} = useContext(Context)

    //when loaded to DOM
    useEffect(() => {
      //call get Courses from data
        data.getCourses()
        //set course in state with res
        .then(res => setCourses(res))
        //catch errors
        .catch(err => console.log(err))
        
        // eslint-disable-next-line
    },[]);

  return (
    <div className="wrap main--grid">
        {courses.map((course, index) => 
          <Link to={`courses/${course.id}`} key={index} className="course--module course--link">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        )}
        <Link to={`courses/create`} className="course--add--module course--module">
          <span className="course--add--title"> 
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          viewBox="0 0 13 13" className="add">
          <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 ">
          </polygon></svg>
          New Course
          </span>
        </Link>
    </div>
  );
}

export default Courses;