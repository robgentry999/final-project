import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../Context';
import { Outlet, Navigate, useParams, useNavigate } from 'react-router-dom'; 

function RedirectRoute() {
    //get auth user and data from useContext
    const {authenticatedUser, data} = useContext(Context);
    //new course instance set to null
    const [course, setCourse] = useState(null);
    //new change instance set to false
    const [change, setChange] = useState(false);
    //new loading instaance set to true
    const [Loading, setLoading] = useState(true);
    //id from use params
    const {id} = useParams();
    const navigate = useNavigate()
    //when component loads to DOM
    useEffect(() => {
        data.courseDetail(id)
        // If the response is there setCourse state 
        //else navigate to not found
        .then(res => res ? setCourse(res) : navigate('/notfound'))
        .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        //if course and auth user
        if(course && authenticatedUser){
            //loading  = false
            setLoading(false);
            //if course user if = auth user id
            course.userId === authenticatedUser.id ? setChange(true) : setChange(false);
        }else{
            //set loading true
            setLoading(true);
        }
    }, [course, authenticatedUser])

  return (
    <>
    {Loading ? (<></>) :
    (change ? <Outlet /> : <Navigate to="forbidden"/>)
    }
    </>
  )
}

export default RedirectRoute