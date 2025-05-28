import React from 'react';
import './CustomerNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../slice/userSlice';
import LoanApplicationForm from './LoanApplicationForm';

const CustomerNavbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/");
  }

  const handleChange = (e) => {
    navigate(e.target.value);
  }

  return (
    <div>
      <header>
        <div>
          <Link to='/home' className='app'>LoanVault</Link>
        </div>
        <div className='user-details'>
          <p></p>
        </div>
        <div className='navbar-align'>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/loans">Loans</Link></li>
            <li><Link to="/applied-loans">Applied Loans</Link></li>
            <li>
              <select onChange={handleChange}>
                <option value="">Feedback</option>
                <option value="/customer-feedback">My Feedback</option>
                <option value="/customer-post-feedback"><Link to="/customer-post-feedback">Post Feedback</Link></option>
              </select>
            </li>
          </ul>
          <button id="logoutbutton" onClick={handleLogOut}>Logout</button>
        </div>
      </header>
    </div>
  )
}

export default CustomerNavbar