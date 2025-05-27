import React, { useEffect, useState } from 'react'
import CustomerNavbar from './CustomerNavbar'
import { getLoanApplicationsByUserId } from '../apiConfig';
import './AppliedLoans.css';

const AppliedLoans = () => {
  const [loanApplications, setLoanApplications] = useState([]);

  useEffect(() => {
    // userId to sent
    // async function fetchLoanApplications(){
    //   const appliedLoans=await getLoanApplicationsByUserId();
    //   setLoanApplications(appliedLoans);
    // }
    // fetchLoanApplications()
  }, [])

  return (
    <div>
      <CustomerNavbar />
      <table>
        <thead>
          <tr>
            <th>Loan Name</th>
            <th>Description</th>
            <th>Submission Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gold</td>
            <td>10%</td>
            <td>1000000</td>
            <td>100000</td>
            <td><select>
              <option>Select Action</option>
              <option value="View Loan">View Loan</option>
              <option value="Add Account">Add Account</option>
              <option value="Delete Loan">Delete Loan</option>
              </select></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AppliedLoans