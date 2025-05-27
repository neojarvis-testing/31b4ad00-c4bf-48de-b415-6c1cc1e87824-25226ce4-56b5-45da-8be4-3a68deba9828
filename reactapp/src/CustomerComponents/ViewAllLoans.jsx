import React, { useEffect, useState } from 'react'
import CustomerNavbar from './CustomerNavbar'
import { useSelector } from 'react-redux';
import { getLoans } from '../apiConfig';
import './ViewAllLoans.css'

const ViewAllLoans = () => {
const token=localStorage.getItem("token");

const [loans,setLoans]=useState([]);
  // useEffect(()=>{
  //   async function fetchLoans(){
  //     const allLoans = await getLoans(token);
  //     setLoans(allLoans);
  //   }
    
  //   fetchLoans();
  // },[token])

  return (
    <div>
      <CustomerNavbar/>
      <h2>Available Loans</h2>
      <table>
        <thead>
          <tr>
            <th>Loan Type</th>
            <th>Interest Rate</th>
            <th>Max Amount</th>
            <th>Min Amount</th>
            <th>Min. Tenure</th>
            <th>Max. Tenure</th>
            <th>Description</th>
            <th>Late Amount Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gold</td>
            <td>10%</td>
            <td>1000000</td>
            <td>100000</td>
            <td>1yr</td>
            <td>5yr</td>
            <td>Gold Loan</td>
            <td>5%+ GST</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewAllLoans