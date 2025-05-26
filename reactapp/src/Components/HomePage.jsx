import React, { useEffect } from 'react'
import CustomerNavbar from '../CustomerComponents/CustomerNavbar';
import LoanManagerNavbar from '../LoanManagerComponents/LoanManagerNavbar';
import BranchManagerNavbar from '../BranchManagerComponents/BranchManagerNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, dispatchCurrentUser, getUserByEmailId } from '../apiConfig';
import { userDetails } from '../slice/userSlice';
import LoanApplicationForm from '../CustomerComponents/LoanApplicationForm';

const HomePage = () => {

    const currentUserRole = "Customer";

    const currentUserEmail = useSelector((state) => state.userData.email);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.userData.userInfo);

    useEffect(() => {
        // Get Current User Details using user email
        // async function fetchCurrentUser() {
        //     currentUserEmail && (await dispatchCurrentUser(dispatch))
        // }
        // fetchCurrentUser();
    }, [currentUserEmail])
    return (
        <div>
            {currentUserRole === "Customer" && <LoanApplicationForm />}
            {currentUserRole === "Loan Manager" && <LoanManagerNavbar />}
            {currentUserRole === "Branch Manager" && <BranchManagerNavbar />}
        </div>
    )
}

export default HomePage