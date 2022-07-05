//displays specific course information
//shows return to list, update, and delete button
import React, {useState, useContext, useEffect} from 'react';
import {Context} from '../Context';
import {useParams, Link, useNavigate} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function CourseDetail(){

    //data and authentication from context
    const {data, authenticatedUser} = useContext(Context);
    const [course, setCourse] = useState({});
    const {id} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        data.courseDetail(id)
        .then(res => setCourse(res))
        .catch(err => {
            console.log(err);
            navigate('/notfound');
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    useEffect(() => {
        if(course && authenticatedUser && course.userId === authenticatedUser.id){
            setIsEditing(true);
        }else{
            setIsEditing(false);
        }
    }, [course, authenticatedUser]);

    const deleteCourse = () => {
        data.deleteCourse(course.id, authenticatedUser)
        .then(errors => {
            if(errors){
                console.log(errors);
            }else{
                console.log('Course deleted');
            }
        })
        .then( () => navigate('/'))
        .catch(err => console.log(err))
    }

    const updateCourse = () => navigate(`/courses/${course.id}/update`);

    return (
        <>
        <div className='actions--bar'>
            <div className='wrap'>
                {isEditing ? (
                    <>
                        <button className='button' onClick={updateCourse}>Update Course</button>
                        <button className='button' onClick={deleteCourse}>Delete Course</button>
                    </>
                )
                : (<></>)}
                <Link to='/' className="button button-secondary">Return to List</Link>
            </div>
        </div>
        <div className='wrap'>
            <h2 className='course--detail--label'>Course Detail</h2>
            <form >
                <div className='main--flex'>
                    <div>
                        <h3 className='course--detail--title'>Course</h3>
                        <p className='course--name'>{course.title}</p>
                        {course.User ? (
                            <p>By {course.User.firstName} {course.User.lastName}</p>
                        ): (<></>)}
                        
                        <ReactMarkdown>{course.description}</ReactMarkdown>
                    </div>
                    <div>
                        <h3 className='course--detail--title'>Estimated Time</h3>
                        <p>{course.estimatedTime}</p>
                        <h3 className='course--detail--title'>Materials Needed</h3>
                        <ReactMarkdown class="course--detail--list">{course.materialsNeeded}</ReactMarkdown>
                    </div>
                </div>
            </form>
        </div>
        </>
    );
}

export default CourseDetail;