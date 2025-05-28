import React from 'react';
import './LoanManagerNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../slice/userSlice';
import { userInfo } from '../Components/PrivateRoute';

const LoanManagerNavbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <div>
      <header>
        <div>
          <Link to='/home' className='app'>LoanVault</Link>
        </div>
        <div className='user-details'>
          <p>{userInfo()?.email} - {userInfo()?.role}</p>
        </div>
        <div className='navbar-align'>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/loans">Loans</Link></li>
            <li><Link to="/loan-request">Loans Requested</Link></li>
            <li><Link to="/loandisbursement">View Loan Disbursement</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
            </ul>
          <button id="logoutbutton" onClick={handleLogOut}>Logout</button>
        </div>
      </header>
    </div>
  )
}

export default LoanManagerNavbar