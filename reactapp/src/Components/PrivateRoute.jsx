import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import './ErrorPage.css'

const PrivateRoute = ({ allowedRoles }) => {

    // current User Role to be called here using user email
    const user = {
        isAuthenticated: true,
        role: 'Customer'
    }

    if (!user.isAuthenticated) {
        return <Navigate to="/" />
    }

    if (!allowedRoles.includes(user.role)) {
        return(
            <div className='unathorizedPage'>
                <h1>You are not Authorized to view this Page.</h1>
            </div>
        )
    }

    return <Outlet />
}

export default PrivateRoute