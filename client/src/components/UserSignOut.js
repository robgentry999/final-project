import React, {useEffect, useContext} from "react";
import {Navigate} from "react-router-dom";
import {Context} from "../Context";

function UserSignOut() {
  //get signOut method from context
  const {signOut} = useContext(Context);
//bring in signout Functionality when page loads
  useEffect(() => signOut());

  return (
    <Navigate to="/" />
  );
}

export default UserSignOut;