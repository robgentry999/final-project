import React, {useContext, useState } from 'react';
import {Context} from '../Context';
import {useNavigate, Link} from 'react-router-dom';

function CreateCourse(){
    //get data and authUser from context
    const {data, authenticatedUser} = useContext(Context);
    //new errors instance as an array
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    //new course with object instance 
    const [course, setCourse] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: authenticatedUser.id
    });
    //change function
    const change = (e) => {
        const {name, value} = e.target;
        setCourse(course => ({...course, [name]: value}))
    }
    //submit function
     const submit = (e) => {
         //stops page refresh
        e.preventDefault();
         data.createCourse(course, authenticatedUser)
        .then(errors => {
            if(errors.length){
                setErrors(errors) 
            }else{
                navigate('/')
            }
        })
        //catch errors
        .catch(err => {
            navigate('/error');
            
        })
    }

    return(
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
                        <button className='button' type='submit'>Create Course</button>
                        <Link className='button button-secondary' to='/'>Cancel</Link>
            </form>
        </div>
    )
}

export default CreateCourse;