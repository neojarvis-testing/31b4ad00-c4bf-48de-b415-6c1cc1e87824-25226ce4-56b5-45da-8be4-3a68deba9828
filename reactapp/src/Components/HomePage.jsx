import React, { useEffect } from 'react'
import CustomerNavbar from '../CustomerComponents/CustomerNavbar';
import LoanManagerNavbar from '../LoanManagerComponents/LoanManagerNavbar';
import BranchManagerNavbar from '../BranchManagerComponents/BranchManagerNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, dispatchCurrentUser, getUserByEmailId } from '../apiConfig';
import { userDetails } from '../slice/userSlice';
import LoanApplicationForm from '../CustomerComponents/LoanApplicationForm';

import { userInfo } from './PrivateRoute';

const HomePage = () => {

    const currentUserRole = userInfo()?.role;

    return (
        <div>
            {currentUserRole === "CUSTOMER" && <CustomerNavbar />}
            {currentUserRole === "LOAN MANAGER" && <LoanManagerNavbar />}
            {currentUserRole === "BRANCH MANAGER" && <BranchManagerNavbar />}
        </div>
    )
}

export default HomePage