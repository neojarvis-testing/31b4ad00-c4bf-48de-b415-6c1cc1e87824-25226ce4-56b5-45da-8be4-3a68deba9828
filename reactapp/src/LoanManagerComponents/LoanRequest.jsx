import React, { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import axios from "axios";
import LoanManagerNavbar from "./LoanManagerNavbar";
import { getLoanApplications } from "../apiConfig";
import './LoanRequest.css'

const LoanRequest = () => {
  const [loans, setLoans] = useState([]);
  const [allLoans, setAllLoans] = useState([]); // Keep full data for filtering
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchLoans = async () => {
    try {
      const response = await getLoanApplications();
      setLoans(response.data);
      setAllLoans(response.data);
    } catch (error) {
      console.error("Failed to fetch loans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const formik = useFormik({
    initialValues: {
      status: "",
      loanType: "",
    },
    onSubmit: (values) => {
      const filtered = allLoans.filter((loan) => {
        return (
          (!values.status || loan.applicationStatus === values.status) &&
          (!values.loanType || loan.loanType === values.loanType)
        );
      });
      setLoans(filtered);
      setCurrentPage(1);
    },
  });

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedLoans = useMemo(() => {
    if (!sortField) return loans;
    return [...loans].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [loans, sortField, sortOrder]);

  const paginatedLoans = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedLoans.slice(start, start + pageSize);
  }, [sortedLoans, currentPage]);

  const totalPages = Math.ceil(loans.length / pageSize);

  const handleApproveReject = async (id, status) => {
    try {
      await axios.patch(`/api/loans/${id}/status`, { status }); // 🔁 Your API endpoint
      fetchLoans(); // Refresh data after update
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <>
      <LoanManagerNavbar />
      <div style={{ padding: "20px" }}>
        <h2>Loan Request Management</h2>

        <div>
          
          </div>

          <form onSubmit={formik.handleSubmit} style={{ marginBottom: "20px" }}>
            <label>Status:&nbsp;</label>
            <select
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
              style={{ width: "380px" }}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            &nbsp;&nbsp;&nbsp;
            <label>Loan Type:&nbsp;</label>
            <select
              style={{ width: "380px" }}
              name="loanType"
              onChange={formik.handleChange}
              value={formik.values.loanType}
            >
              <option value="">All</option>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
            </select>
            &nbsp;&nbsp;
            <button type="submit">Search</button>
          </form>

        {loading ? (
          <p>Loading loan applications...</p>
        ) : (
          <>
            <table
              border="1"
              cellPadding="10"
              cellSpacing="0"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th onClick={() => handleSort("loanApplicationId")}>ID</th>
                  <th onClick={() => handleSort("applicationDate")}>Date</th>
                  <th onClick={() => handleSort("loanAmount")}>Amount</th>
                  <th>Tenure</th>
                  <th>Status</th>
                  <th>Employment</th>
                  <th>Income</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLoans.map((loan) => (
                  <tr key={loan.loanApplicationId}>
                    <td>{loan.loanApplicationId}</td>
                    <td>{loan.applicationDate}</td>
                    <td>{loan.loanAmount}</td>
                    <td>{loan.tenureMonths}</td>
                    <td>{loan.applicationStatus}</td>
                    <td>{loan.employmentStatus}</td>
                    <td>{loan.annualIncome}</td>
                    <td>
                      <button onClick={() => setSelectedLoan(loan)}>
                        View
                      </button>
                      &nbsp;
                      <button
                        onClick={() =>
                          handleApproveReject(
                            loan.loanApplicationId,
                            "Approved"
                          )
                        }
                      >
                        Approve
                      </button>
                      &nbsp;
                      <button
                        onClick={() =>
                          handleApproveReject(
                            loan.loanApplicationId,
                            "Rejected"
                          )
                        }
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "10px" }}>
              Page: {currentPage} / {totalPages}
              &nbsp;
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                Prev
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
              >
                Next
              </button>
            </div>
          </>
        )}

        {selectedLoan && (
          <div className="modal">
            <div className="modal-content">
              <h3>Loan Details</h3>
              <p>
                <strong>Application ID:</strong>{" "}
                {selectedLoan.loanApplicationId}
              </p>
              <p>
                <strong>Date:</strong> {selectedLoan.applicationDate}
              </p>
              <p>
                <strong>Loan Amount:</strong> ₹{selectedLoan.loanAmount}
              </p>
              <p>
                <strong>Tenure:</strong> {selectedLoan.tenureMonths} months
              </p>
              <p>
                <strong>Status:</strong> {selectedLoan.applicationStatus}
              </p>
              <p>
                <strong>Employment:</strong> {selectedLoan.employmentStatus}
              </p>
              <p>
                <strong>Annual Income:</strong> ₹{selectedLoan.annualIncome}
              </p>
              <p>
                <strong>Remarks:</strong> {selectedLoan.remarks}
              </p>
              <p>
                <strong>Proof:</strong> {selectedLoan.proof}
              </p>
              <p>
                <strong>Account Holder:</strong> {selectedLoan.accountHolder}
              </p>
              <p>
                <strong>Account No:</strong> {selectedLoan.accountNumber}
              </p>
              <p>
                <strong>IFSC Code:</strong> {selectedLoan.ifscCode}
              </p>
              <button onClick={() => setSelectedLoan(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoanRequest;
