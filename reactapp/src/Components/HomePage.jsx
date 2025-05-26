import React, { useEffect } from 'react'
import CustomerNavbar from '../CustomerComponents/CustomerNavbar';
import LoanManagerNavbar from '../LoanManagerComponents/LoanManagerNavbar';
import BranchManagerNavbar from '../BranchManagerComponents/BranchManagerNavbar';

const HomePage = () => {

    const currentUserRole = "Customer";

    useEffect(() => {
        // Get Current User Details using user email
    }, [])
    return (
        <div>
            {currentUserRole === "Customer" && <CustomerNavbar />}
            {currentUserRole === "Loan Manager" && <LoanManagerNavbar />}
            {currentUserRole === "Branch Manager" && <BranchManagerNavbar />}
        </div>
    )
}

export default HomePage