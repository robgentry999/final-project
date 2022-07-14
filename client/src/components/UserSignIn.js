//shows sign in, sign up, and cancel
import React, {useState, useContext} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Form from './Form'
import {Context} from '../Context'

function UserSignIn(){
    //new user in state
    const [user, setUser] = useState({emailAddress: '', password: ''})
    //new errors instance with empty array
    const [errors, setErrors] = useState([])
    //sign in method from context
    const {signIn} = useContext(Context)
    //store useNavigate in a constant
    const navigate = useNavigate()
    //store useLocation in a constant
    const location = useLocation()

    //change function
    const change = (e) => {
        //name and value constant to hold events on input targets
        const name = e.target.name;
        const value = e.target.value;
        //set user to value of inputs
        setUser(user => ({...user, [name]: value}))
    }

    //submit function
    const submit = () => {
        const {emailAddress, password} = user
        signIn(emailAddress, password).then(() => {
            if(emailAddress === '' || password === ''){
                setErrors(['Invalid password or Email']) 
            }else{
                if(location.state?.from){
                    navigate(location.state.from)
                }else{
                    navigate('/')
                }
            }
        })
        .catch(err => {
            console.log(err);
            navigate('/error');
        })
    }

    const cancel = () => {
        navigate('/');
    }
    return (
        <div className="form--centered">
            <h2>Sign In</h2>
            <Form
                cancel = {cancel}
                errors = {errors}
                submit = {submit}
                submitButtonText = "Sign In"
                elements={() => (
                    <>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                        id = "emailAddress"
                        name = "emailAddress"
                        type = "email"
                        value = {user.emailAddress}
                        onChange = {change} />
                        
                        <label htmlFor="password">Password</label>
                        <input
                        id = 'password'
                        name = 'password'
                        type = 'password'
                        value = {user.password}
                        onChange = {change} />
                    </>
                )} />
                <p>
                    Don't have a user account? <Link to="/signup">Sign Up</Link>
                </p>
                </div>
    )
}

export default UserSignIn;