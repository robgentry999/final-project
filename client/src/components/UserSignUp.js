//displays a sign up page, button, and cancel button
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "./Form";
import {Context} from '../Context'

function UserSignUp(){
    //get data and sign in methods from context
    const {data, signIn} = useContext(Context)
    //new user instance in state and set to object
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
    })
    //new errors instance and set to emptya rray
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();

    const change = (e) => {
        //new name and value constants to store events
        const {name, value} = e.target;
        //set user to get data from inputs and spread the contents
        setUser(user => ({...user, [name]: value}))
    }

     const submit = () => {
         //create user method from data and pass to user
         data.createUser(user)
        .then(errors => {
            if(errors.length){
                setErrors(errors) 
            }else{
                signIn(user.emailAddress, user.password)
                .then(() => navigate('/'));
            }
        })
        .catch(err => {
            //catch errors
            console.log(err);
            navigate('/error');
        })
    }

     const cancel = () => {
        navigate('/');
    }
    return (
        <div className="form--centered">
                <h2>Sign Up</h2>
                <Form 
                cancel = {cancel}
                errors = {errors}
                submit = {submit}
                submitButtonText = "Sign Up"
                elements = {() => (
                    <>
                        <label htmlFor="firstName">First Name</label>
                        <input
                        id = "firstName"
                        name = "firstName"
                        type = "text"
                        value = {user.firstName}
                        onChange = {change}/>

                        <label htmlFor="lastName">Last Name</label>
                        <input
                        id = "lastName"
                        name = "lastName"
                        type = "text"
                        value = {user.lastName}
                        onChange = {change}/>

                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                        id = "emailAddress"
                        name = "emailAddress"
                        type = "email"
                        value = {user.emailAddress}
                        onChange = {change} />
                        
                        <label htmlFor="password">Password</label>
                        <input
                        id = "password"
                        name = "password"
                        type = "password"
                        value = {user.password}
                        onChange = {change} />
                        
                    </>
                )} />
                <p>
                    Already have an account? <Link to = "/signin">Sign In</Link>
                </p>
        </div>
    )
}

export default UserSignUp;