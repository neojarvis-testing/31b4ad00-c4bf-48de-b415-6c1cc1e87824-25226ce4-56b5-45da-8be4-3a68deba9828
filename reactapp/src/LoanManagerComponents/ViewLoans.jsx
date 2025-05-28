// ViewLoanRequests.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import LoanForm from "./LoanForm";
import './ViewLoans.css'
import LoanManagerNavbar from "./LoanManagerNavbar"

// Sample Loan Data (In real app, this should come from API)
const sampleLoans = [
  {
    id: 1,
    name: "John Doe",
    loanType: "Personal",
    amount: 10000,
    status: "Pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    loanType: "Auto",
    amount: 20000,
    status: "Pending",
  },
  {
    id: 3,
    name: "Emily Johnson",
    loanType: "Home",
    amount: 50000,
    status: "Approved",
  },
];

const ViewLoans = () => {
  const [loans, setLoans] = useState(sampleLoans);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoan(null);
  };

  const handleDelete = (id) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  return (
    <>
      <LoanManagerNavbar />
      <div>
        <h1>Loan Requests</h1>
        <Link to="/add-loan">
          <button>Add New Loan</button>
        </Link>
        <table style={{width: "80%", borderCollapse: "collapse", marginTop: "20px", marginLeft: "10%", alignItems: "center"}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Loan Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.name}</td>
                <td>{loan.loanType}</td>
                <td>{loan.amount}</td>
                <td>{loan.status}</td>
                <td>
                  <button onClick={() => handleViewDetails(loan)}>
                    View Details
                  </button>
                  <Link to={`/edit-loan/${loan.id}`}>
                    <button className="warn">Edit</button>
                  </Link>
                  <button className="danger" onClick={() => handleDelete(loan.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal to show Loan Details */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Loan Details"
          style={{
            content: {
              width: "400px",
              height: "350px",
              margin: "auto",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
              
            },

            overlay: {
              backgroundColor: "rgba(0,0,0,0.5)"
            }
          }}
        >
          {selectedLoan && (
            <div>
              <h2 style={{textDecoration: "underline", paddingBottom: "10px"}}>Loan Details</h2>
              <p style={{marginBottom: "10px"}}>
                <strong>Name:</strong> {selectedLoan.name}
              </p>
              <p style={{marginBottom: "10px"}}>
                <strong>Loan Type:</strong> {selectedLoan.loanType}
              </p>
              <p style={{marginBottom: "10px"}}>
                <strong>Amount:</strong> ${selectedLoan.amount}
              </p>
              <p style={{marginBottom: "20px"}}>
                <strong>Status:</strong> {selectedLoan.status}
              </p>
              {/* Add more fields if necessary */}
              <button onClick={handleCloseModal}>Close</button>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default ViewLoans;
