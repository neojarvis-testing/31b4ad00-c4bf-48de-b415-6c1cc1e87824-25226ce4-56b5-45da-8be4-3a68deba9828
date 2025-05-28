// LoanRequest.jsx
import React, { useState } from "react";
import Modal from "react-modal";
import "./LoanRequest.css";

// Sample Loan Applications (In a real app, this would come from an API)
const sampleApplications = [
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

const LoanRequest = () => {
  const [applications, setApplications] = useState(sampleApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState(null); // To track whether we're approving or rejecting

  const handleApprove = (application) => {
    setAction("approve");
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleReject = (application) => {
    setAction("reject");
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (action === "approve") {
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === selectedApplication.id
            ? { ...app, status: "Approved" }
            : app
        )
      );
    } else if (action === "reject") {
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === selectedApplication.id
            ? { ...app, status: "Rejected" }
            : app
        )
      );
    }
    setIsModalOpen(false);
    setSelectedApplication(null);
    setAction(null);
  };

  const handleCancelAction = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
    setAction(null);
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
  };

  return (
    <div>
      <h1>Loan Requests</h1>
      <table>
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
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.name}</td>
              <td>{application.loanType}</td>
              <td>{application.amount}</td>
              <td>{application.status}</td>
              <td>
                <button onClick={() => handleViewDetails(application)}>
                  View Details
                </button>
                {application.status === "Pending" && (
                  <>
                    <button onClick={() => handleApprove(application)}>
                      Approve
                    </button>
                    <button onClick={() => handleReject(application)}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal for Approve/Reject */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancelAction}
        contentLabel="Confirm Action"
      >
        <h2>Are you sure you want to {action} this loan application?</h2>
        <button onClick={handleConfirmAction}>Yes</button>
        <button onClick={handleCancelAction}>No</button>
      </Modal>

      {/* Show Application Details */}
      {selectedApplication && (
        <div>
          <h2>Loan Application Details</h2>
          <p>
            <strong>Name:</strong> {selectedApplication.name}
          </p>
          <p>
            <strong>Loan Type:</strong> {selectedApplication.loanType}
          </p>
          <p>
            <strong>Amount:</strong> ${selectedApplication.amount}
          </p>
          <p>
            <strong>Status:</strong> {selectedApplication.status}
          </p>
          {/* You can add more fields if needed */}
        </div>
      )}
    </div>
  );
};

export default LoanRequest;
