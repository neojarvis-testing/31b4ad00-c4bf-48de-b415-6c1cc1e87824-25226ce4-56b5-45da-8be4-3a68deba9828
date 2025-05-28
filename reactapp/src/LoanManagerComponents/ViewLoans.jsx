// ViewLoanRequests.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Sample Loan Data (In real app, this should come from API or context)
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

  const handleDelete = (id) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Loan Requests</h1>
      <Link to="/add-loan">
        <button>Add New Loan</button>
      </Link>
      <table
        className="loan-table"
        style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
      >
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
              <td>${loan.amount}</td>
              <td>{loan.status}</td>
              <td>
                <Link to={`/edit-loan/${loan.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(loan.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLoans;
