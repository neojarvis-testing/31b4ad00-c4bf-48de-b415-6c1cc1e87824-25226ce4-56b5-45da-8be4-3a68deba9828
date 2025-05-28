// ViewLoans.js
import React, { useState } from "react";
import LoanForm from "./LoanForm";
import Modal from "react-modal";

// Sample Loan data
const sampleLoans = [
  {
    id: 1,
    loanType: "Personal",
    description: "Personal loan for home renovation",
    interestRate: 5,
    maximumAmount: 50000,
    minimumAmount: 1000,
    minimumTenureMonths: 12,
    maximumTenureMonths: 60,
    processingFee: 1,
    prepaymentPenalty: 2,
    gracePeriodMonths: 2,
    latePaymentFee: 100,
  },
  {
    id: 2,
    loanType: "Auto",
    description: "Car loan",
    interestRate: 6,
    maximumAmount: 30000,
    minimumAmount: 5000,
    minimumTenureMonths: 24,
    maximumTenureMonths: 72,
    processingFee: 1.5,
    prepaymentPenalty: 3,
    gracePeriodMonths: 1,
    latePaymentFee: 150,
  },
];

const ViewLoans = () => {
  const [loans, setLoans] = useState(sampleLoans);
  const [editingLoan, setEditingLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState(null);

  // Open Edit Form with loan data
  const handleEdit = (loan) => {
    setEditingLoan(loan);
  };

  // Open Delete Confirmation Modal
  const handleDelete = (loan) => {
    setLoanToDelete(loan);
    setIsModalOpen(true);
  };

  // Handle Add Loan
  const handleAdd = () => {
    setEditingLoan(null); // Reset for Add form
  };

  // Handle Loan Delete
  const handleConfirmDelete = () => {
    setLoans(loans.filter((loan) => loan.id !== loanToDelete.id));
    setIsModalOpen(false);
    setLoanToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setLoanToDelete(null);
  };

  return (
    <div>
      <h1>View Loans</h1>
      <button onClick={handleAdd}>Add Loan</button>
      <table>
        <thead>
          <tr>
            <th>Loan Type</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.loanType}</td>
              <td>{loan.description}</td>
              <td>
                <button onClick={() => handleEdit(loan)}>Edit</button>
                <button onClick={() => handleDelete(loan)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Open the LoanForm when editing or adding */}
      {(editingLoan !== null || editingLoan === null) && (
        <LoanForm
          initialValues={
            editingLoan || {
              loanType: "",
              description: "",
              interestRate: "",
              maximumAmount: "",
              minimumAmount: "",
              minimumTenureMonths: "",
              maximumTenureMonths: "",
              processingFee: "",
              prepaymentPenalty: "",
              gracePeriodMonths: "",
              latePaymentFee: "",
            }
          }
          loanToEdit={editingLoan}
          setLoans={setLoans}
        />
      )}

      {/* Confirmation Modal for Deletion */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancelDelete}
        contentLabel="Confirm Deletion"
      >
        <h2>Are you sure you want to delete this loan?</h2>
        <button onClick={handleConfirmDelete}>Yes</button>
        <button onClick={handleCancelDelete}>No</button>
      </Modal>
    </div>
  );
};

export default ViewLoans;
