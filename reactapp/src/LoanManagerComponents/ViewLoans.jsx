// ViewLoanRequests.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ViewLoans.css";
import LoanManagerNavbar from "./LoanManagerNavbar";
import "./ViewLoans.css";
import { deleteLoan, getLoans } from "../apiConfig";

// Sample Loan Data (In real app, this should come from API or context)

const ViewLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("jwt_token");
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await getLoans(token);
        setLoans(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch loan data");
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, [token]);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (loanId) => {
    const confirmDelete = window.confirm("are you sure, do you want to delete this loan");
    
    if(!confirmDelete) return;
    try {
      await deleteLoan(loanId, token);
      setLoans((prev) => prev.filter((loan) => loan.loanId !== loanId));
    } catch(error) {
      alert("failed to delete");
    }

  };

  // const handleViewDetails = (loan) => {
  //   setSelectedLoan(loan);
  //   setIsModalOpen(true);
  // };

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error}</p>;

  return (
    <>
      <LoanManagerNavbar />
      <div style={{ padding: "20px" }}>
        <h1>Loan Requests</h1>``
        <Link to="/loan-form">
          <button>Add New Loan</button>
        </Link>
        <table
          className="loan-table"
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Loan Type</th>
              <th>Interest Rate</th>
              <th>Minimum Loan Amount</th>
              <th>Maximum Loan Amount</th>
              <th>Minimum Tenure (Months)</th>
              <th>Maximum Tenure (Months)</th>
              <th>Description</th>
              <th>Status</th>
              <th>Processing Fee</th>
              <th>Pre Payment Penalty</th>
              <th>Grace Period (Months)</th>
              <th>Late Payment Fee</th>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.loanId}>
                <td>{loan.loanType}</td>
                <td>{loan.interestRate}</td>
                <td>${loan.minAmount}</td>
                <td>{loan.maxAmount}</td>
                <td>{loan.minTenureMonths}</td>
                <td>{loan.maxTenureMonths}</td>
                <td>{loan.description}</td>
                <td>{loan.status}</td>
                <td>{loan.processingFee}</td>
                <td>{loan.prepaymentPenalty}</td>
                <td>{loan.gracePeriodMonths}</td>
                <td>{loan.latePaymentFee}</td>

                <td>
                  <Link to={`/loan-form/${loan.loanId}`}>
                    <button className="warn">Edit</button>
                  </Link>
                  <button
                    className="danger"
                    onClick={() => handleDelete(loan.loanId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewLoans;
