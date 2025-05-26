import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import ErrorPage from './Components/ErrorPage';
import './App.css';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import PrivateRoute from './Components/PrivateRoute';
import LoanApplicationApproval from './BranchManagerComponents/LoanApplicationApproval';
import LoansApproval from './BranchManagerComponents/LoansApproval';
import LoanDisbursementForm from './LoanManagerComponents/LoanDisbursementForm';
import AppliedLoans from './CustomerComponents/AppliedLoans';
import ViewAllLoans from './CustomerComponents/ViewAllLoans';
import LoanRequest from './LoanManagerComponents/LoanRequest';
import CustomerPostFeedback from './CustomerComponents/CustomerPostFeedback';
import CustomerMyFeedback from './CustomerComponents/CustomerMyFeedback';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route element={<PrivateRoute allowedRoles={['Branch Manager']} />} >
                        <Route path="/loansApproval" element={<LoansApproval />} />
                        <Route path="/loanapplications" element={<LoanApplicationApproval />} />
                    </Route>
                    <Route element={<PrivateRoute allowedRoles={['Loan Manager']} />} >
                        <Route path="/loan-request" element={<LoanRequest />} />
                        <Route path="/loandisbursement" element={<LoanDisbursementForm />} />
                    </Route>
                    <Route element={<PrivateRoute allowedRoles={['Customer']} />}>
                        <Route path="/applied-loans" element={<AppliedLoans />} />
                        <Route path="/loans" element={<ViewAllLoans />} />
                        <Route path='/customer-post-feedback' element={<CustomerPostFeedback />} />
                        <Route path='/customer-feedback' element={<CustomerMyFeedback />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;