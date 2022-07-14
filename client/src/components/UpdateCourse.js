import React, {useContext, useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../Context';


function UpdateCourse() {
    //data and auth user from context
    const { data, authenticatedUser } = useContext(Context);
    //new course
    const [course, setCourse] = useState({});
    //get id from useParams
    const { id } = useParams();
    //navigate method stored
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    //when component loads to DOM
    useEffect(() => {
        //pass id as param from courseDetail
        data.courseDetail(id)
        //then set course in state
        .then (course => setCourse(course))
        //catch errors
        .catch(err => console.log(err));
        // eslint-disable-next-line
    }, [])
    //new change function
    const change = (e) => {
        const {name, value} = e.target;
        setCourse(course => ({...course, [name]: value}))
    }
    //new submit function
     const submit = (e) => {
        e.preventDefault();
        //get update course method from data and pass to data 
         data.updateCourse(course, authenticatedUser)
        .then(errors => {
            if(errors.length){
                setErrors(errors) 
                console.log(errors, id)
            }else{
                navigate(`/courses/${id}`)
            }
        })
        .catch(err => {
            console.log(err);
            navigate('/error');
            
        })
    }


    return (
        <div className='wrap'>
            <h2>Create Course</h2>
            {errors.length ? (
                <>
                <div className="validation--errors">
                <h3>Validation errors</h3>
                <ul>
                    {errors.map((error, index) => <li key = {index}>{error}</li>)}
                </ul>
            </div>
                </>
            ): (<></>)}
            <form onSubmit={submit}>
                <div className='main--flex'>
                    <div>
                        <label htmlFor='title'>Course Title</label>
                        <input 
                            id = "title"
                            name = "title"
                            type = "text"
                            value = {course.title}
                            onChange = {change}
                        />
                        <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>

                        <label htmlFor='description'>Course Description</label>
                        <textarea 
                            id = "description"
                            name = "description"
                            value = {course.description}
                            onChange = {change}
                        />
                    </div>
                    <div>
                        <label htmlFor='estimatedTime'>Estimated Time</label>
                        <input
                            id = "estimatedTime"
                            name = "estimatedTime"
                            type = "text"
                            value = {course.estimatedTime}
                            onChange = {change}
                        />
                        <label htmlFor='materialsNeeded'>Materials Needed</label>
                        <textarea 
                            id = "materialsNeeded"
                            name = "materialsNeeded"
                            value = {course.materialsNeeded}
                            onChange = {change}
                        />
                    </div>
                </div>
                        <button className='button' type='submit'>Update Course</button>
                        <Link className='button button-secondary' to={`/courses/${id}`}>Cancel</Link>
            </form>
        </div>
    )

}

export default UpdateCourse;