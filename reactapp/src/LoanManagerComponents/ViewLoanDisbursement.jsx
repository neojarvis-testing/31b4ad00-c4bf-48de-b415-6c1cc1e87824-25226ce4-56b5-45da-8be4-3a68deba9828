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

  const handleViewDetails = (disbursement) => {
    setSelectedDisbursement(disbursement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDisbursement(null);
  };

  const handleDelete = (id) => {
    setDisbursements(
      disbursements.filter((disbursement) => disbursement.id !== id)
    );
  };

  return (
    <div>
      <h1>View Loan Disbursements</h1>
      <Link to="/add-disbursement">
        <button>Add New Disbursement</button>
      </Link>
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
                <button onClick={() => handleViewDetails(disbursement)}>
                  View Details
                </button>
                <Link to={`/edit-disbursement/${disbursement.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(disbursement.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to show Disbursement Details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Disbursement Details"
      >
        {selectedDisbursement && (
          <div>
            <h2>Disbursement Details</h2>
            <p>
              <strong>Date:</strong> {selectedDisbursement.disbursementDate}
            </p>
            <p>
              <strong>Amount:</strong> $
              {selectedDisbursement.disbursementAmount}
            </p>
            <p>
              <strong>Remarks:</strong> {selectedDisbursement.remarks}
            </p>
            <p>
              <strong>Method:</strong> {selectedDisbursement.method}
            </p>
            {/* Add more fields if necessary */}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ViewLoanDisbursements;
