// ViewLoanDisbursements.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import LoanDisbursementForm from "./LoanDisbursementForm";

// Sample Loan Disbursements (In a real app, this would come from an API)
const sampleDisbursements = [
  {
    id: 1,
    disbursementDate: "2025-06-01",
    disbursementAmount: 10000,
    remarks: "First disbursement",
    method: "Bank Transfer",
  },
  {
    id: 2,
    disbursementDate: "2025-06-15",
    disbursementAmount: 5000,
    remarks: "Second disbursement",
    method: "Check",
  },
];

const ViewLoanDisbursements = () => {
  const [disbursements, setDisbursements] = useState(sampleDisbursements);
  const [selectedDisbursement, setSelectedDisbursement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    setDisbursements(
      disbursements.filter((disbursement) => disbursement.id !== id)
    );
  };

  const handleEdit = (disbursement) => {
    setSelectedDisbursement(disbursement);
  };

  const handleAdd = () => {
    setSelectedDisbursement(null); // Reset for adding a new disbursement
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>View Loan Disbursements</h1>
      <button onClick={handleAdd}>Add New Disbursement</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Remarks</th>
            <th>Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {disbursements.map((disbursement) => (
            <tr key={disbursement.id}>
              <td>{disbursement.disbursementDate}</td>
              <td>{disbursement.disbursementAmount}</td>
              <td>{disbursement.remarks}</td>
              <td>{disbursement.method}</td>
              <td>
                <button onClick={() => handleEdit(disbursement)}>Edit</button>
                <button onClick={() => handleDelete(disbursement.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <LoanDisbursementForm
        disbursement={selectedDisbursement}
        onClose={handleCloseModal}
        onSave={(disbursement) => {
          if (selectedDisbursement) {
            // Edit existing
            setDisbursements((prev) =>
              prev.map((d) => (d.id === disbursement.id ? disbursement : d))
            );
          } else {
            // Add new disbursement
            setDisbursements((prev) => [
              ...prev,
              { ...disbursement, id: disbursements.length + 1 },
            ]);
          }
          setIsModalOpen(false);
        }}
      />
      <button onClick={handleCloseModal}>Back</button>
    </div>
  );
};

export default ViewLoanDisbursements;
