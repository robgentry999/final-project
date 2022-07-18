import React, {useContext} from 'react';
import {Context} from '../Context';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

function Authorised(){
    //gets auth user from context
    const {authenticatedUser} = useContext(Context);
    const location = useLocation()
    return(
        authenticatedUser ? <Outlet /> : <Navigate to ="/signin" replace state={{from: location}}/>
    )
}

export default Authorised;