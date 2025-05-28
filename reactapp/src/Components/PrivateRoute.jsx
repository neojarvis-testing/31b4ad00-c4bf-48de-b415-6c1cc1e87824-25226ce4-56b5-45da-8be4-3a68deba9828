import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import './ErrorPage.css'

import { jwtDecode } from "jwt-decode"

export const userInfo = () => {
    return jwtDecode(localStorage.getItem("jwt_token"));
}


const PrivateRoute = ({ allowedRoles }) => {


    // current User Role to be called here using user email

    const userrole = userInfo()?.role;

    const user = {
        isAuthenticated: !!localStorage.getItem("jwt_token"),
        role: userrole
    }

    if (!user.isAuthenticated) {
        return <Navigate to="/" />
    }

    if(!allowedRoles.includes(userrole)){

        return (
            <div className='unathorizedPage'>
                <h1>You are not Authorized to view this Page.</h1>
            </div>
        )
    }


    return <Outlet />
}

export default PrivateRoute