import React, { useState } from 'react'
import LoanManagerNavbar from './LoanManagerNavbar'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LoanForm from './LoanForm';


const initalLoans = [
  {
    id: 1, amount: 123, interestRate: 12, term:12,
    id: 2, amount: 123, interestRate: 12, term:12,
    id: 3, amount: 123, interestRate: 12, term:12,
  }
]



const ViewLoans = () => {
  const [loans, setLoans] = useState(initalLoans);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const openAddLoanModal = () => {
    setSelectedLoan(null);
    setIsModalOpen(true);
  }

  const openEditLoanModal = (loan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  }

  const deleteLoan = (id) => {
    setLoans(loans.filter(loan => loan.id !== id));
  }

  const handleSubmitLoan = (loan) => {
    if (selectedLoan) {
      setLoans(loans.map(l => (l.id === loan.id ? loan : l)));
    } else {
      setLoans([...loans, { ...loan, id: loans.length + 1 }]);
    }
    setIsModalOpen(false);
  }


  return (
    <div>
      <h1>Loan Information</h1>
      <button onClick={openAddLoanModal}>Add Loan</button>

      <table>
        <thead>
          <tr>
            <th>Loan id</th>
            <th>Loan id</th>
            <th>Loan id</th>
            <th>Loan id</th>
            <th>Loan id</th>
          </tr>
        </thead>

        <tbody>
          {
            loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.id}</td>
                <td>{loan.id}</td>
                <td>
                  <button onClick={() => openEditLoanModal(loan)}> Edit</button>
                  <button onClick={() => deleteLoan(loan)}> Delete</button>
                </td>
              </tr>

            ))
          }
        </tbody>
      </table>


      {
        isModalOpen && (<LoanForm loan={selectedLoan} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmitLoan} />)
      }
    </div>
  );
};

export default ViewLoans;
